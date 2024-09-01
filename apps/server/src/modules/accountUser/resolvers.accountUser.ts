import { GraphQLError } from "graphql";
import { AccountUserModel } from "../../models";
import { GraphQLInput, TResolvers } from "../../types";
import { PasswordUtility, TokenUtility } from "../../utils";
import { onlyAdmin, onlyLoggedAccountUser } from "../../guards";
import { accountUserService } from "./services/accountUser.service";
import { CreateAccountUserInput } from "./types/AccountUser.accountUser.types";
import { SignInInput } from "./types/signIn.accountUser.types";
import { ChangeAccountUserPassword } from "./types/changePassword.accountUser.types";
import { MailingHandler } from "../../mailing/handlers.mailing";
import { AccountUserRecoveryCodeModel } from "../../models/account-user-recovery-code.model";
import { AccountStatus } from "./enums/accountStatus.enum";
import { ErrorMessages } from "../../utils/errorMessages.enum";

export const AccountUserResolvers: TResolvers = {
  Query: {
    getPendingAccounts: async (_, __, { user }) => {
      onlyAdmin(user);
      try {
        const accountUsers = await accountUserService.getPendingAccounts();
        return accountUsers;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    getPendingAccountByEmail: async (_, { email }, { user }) => {
      onlyAdmin(user);
      try {
        const accountUser =
          await accountUserService.getPendingAccountByEmail(email);
        return accountUser;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    preRegisterAccount: async (
      _,
      { input }: { input: CreateAccountUserInput },
    ) => {
      try {
        const accountUser = await accountUserService.preRegisterAccount(input);
        return accountUser;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    linkBasketToUser: async (
      _,
      { input }: GraphQLInput<{ userId: string; basketId: string }>,
      { user }
    ) => {
      onlyAdmin(user);
      try {
        const accountUser = await accountUserService.linkBasketToUser(
          input.userId,
          input.basketId,
          user._id,
        );
        return accountUser;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    signInAccountUser: async (_, { input }: GraphQLInput<SignInInput>) => {
      const { email, password } = input;

      const accountUser = await AccountUserModel.findOne({ email });

      if (!accountUser) {
        throw new GraphQLError(ErrorMessages.INVALID_EMAIL_OR_PASSWORD);
      }

      if (!PasswordUtility.authenticate(password, accountUser.password)) {
        throw new GraphQLError(ErrorMessages.INVALID_EMAIL_OR_PASSWORD);
      }

      const pendingStatus = await accountUserService.checkUserStatus(
        accountUser.email as string,
      );

      if (pendingStatus !== AccountStatus.ACTIVE) {
        throw new GraphQLError(pendingStatus);
      }

      const token = TokenUtility.generateToken({
        id: accountUser.email as string,
        type: "account",
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });

      return {
        accountUser,
        token,
      };
    },
    resetAccountUserPasswordWithCode: async (
      _,
      { input }: GraphQLInput<{ code: string; newPassword: string }>,
    ) => {
      const { code, newPassword } = input;
      const recoveryCode = await AccountUserRecoveryCodeModel.findOne({
        recoveryCode: code,
        expiresAt: { $gt: new Date() },
      });

      if (!recoveryCode) {
        throw new GraphQLError(ErrorMessages.INVALID_RECOVERY_CODE);
      }

      const accountUser = await AccountUserModel.findOne({
        _id: recoveryCode.accountUserId,
      });

      if (!accountUser) {
        throw new GraphQLError(ErrorMessages.INVALID_RECOVERY_CODE);
      }

      const password = PasswordUtility.encryptPassword(newPassword);

      accountUser.password = password;

      await recoveryCode.deleteOne({ _id: recoveryCode._id });

      await accountUser.save();

      return {
        message: "Password updated successfully.",
      };
    },
    recoverAccountUserPassword: async (
      _,
      { input }: GraphQLInput<{ email: string }>,
    ) => {
      const { email } = input;

      const accountUser = await AccountUserModel.findOne({
        email,
      });

      if (!accountUser) {
        throw new GraphQLError(ErrorMessages.INVALID_EMAIL);
      }

      const recoveryCode = await AccountUserRecoveryCodeModel.findOne({
        accountUserId: accountUser._id,
      });

      if (recoveryCode) {
        await recoveryCode.deleteOne({ accountUserId: accountUser._id });
      }

      const generatedCode = PasswordUtility.generateTemporaryCode();

      const recovery = new AccountUserRecoveryCodeModel({
        recoveryCode: generatedCode,
        accountUserId: accountUser._id,
      });

      await recovery.save();

      await MailingHandler.recoverPasswordEmail(
        {
          changePasswordCode: recovery.recoveryCode,
          name: accountUser.name,
        },
        accountUser.email as string,
      );

      return {
        message: "A recovery code has been sent to your email.",
      };
    },
    changeAccountUserPassword: async (
      _,
      { input }: GraphQLInput<ChangeAccountUserPassword>,
      { accountUser },
    ) => {
      onlyLoggedAccountUser(accountUser);

      const { oldPassword, newPassword } = input;

      if (!PasswordUtility.authenticate(oldPassword, accountUser.password)) {
        throw new GraphQLError(ErrorMessages.INVALID_OLD_PASSWORD);
      }

      const password = PasswordUtility.encryptPassword(newPassword);

      await AccountUserModel.updateOne(
        { email: accountUser.email },
        { password },
      );

      return true;
    },
  },
};
