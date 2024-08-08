import { GraphQLError } from "graphql";
import { AccountUserModel } from "../../models";
import { GraphQLInput, GraphQLPaginationInput, TResolvers } from "../../types";
import { PaginationUtility, PasswordUtility, TokenUtility } from "../../utils";
import { onlyAdmin, onlyLoggedAccountUser } from "../../guards";
import { asaasCustomersService } from "./services/customer.service";
import { CreateAccountUserInput } from "./types/createAccountUser.accountUser.types";
import { SignInInput } from "./types/signIn.accountUser.types";
import { ChangeAccountUserPassword } from "./types/changePassword.accountUser.types";
import { MailingHandler } from "../../mailing/handlers.mailing";
import { AccountUserRecoveryCodeModel } from "../../models/account-user-recovery-code.model";

export const AccountUserResolvers: TResolvers = {
  Query: {
    accountUserById: async (_, { id }: { id: string }, { user }) => {
      onlyAdmin(user);

      return await AccountUserModel.findOne({ _id: id });
    },
    accountUser: async (_, __, { accountUser }) => {
      return accountUser;
    },
    accountUsers: async (
      _,
      { input }: GraphQLInput<GraphQLPaginationInput>,
      { user },
    ) => {
      onlyAdmin(user);

      const params = {
        active: true,
      } as Record<string, unknown>;

      if (input.search) {
        params.name = { $regex: input.search, $options: "i" };
      }

      const { count, data, pageInfo } =
        await PaginationUtility.paginateCollection(
          AccountUserModel,
          params,
          input.limit,
          input.offset,
        );

      return {
        count,
        data,
        pageInfo,
      };
    },
    listAsaasCustomers: async () => {
      try {
        const customers = await asaasCustomersService.listCustomers();
        return customers;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    //criar também no asaas
    createAccountUser: async (_, { input }, { user }) => {
      onlyAdmin(user);

      try {
        input.password = PasswordUtility.encryptPassword(input.password);
        const newUser = new AccountUserModel(input);
        await newUser.save();

        await asaasCustomersService.createCustomer(input);
        return newUser;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    resetPasswordWithCode: async (
      _,
      { input }: GraphQLInput<{ code: string; newPassword: string }>,
    ) => {
      const { code, newPassword } = input;
      const recoveryCode = await AccountUserRecoveryCodeModel.findOne({
        recoveryCode: code,
        expiresAt: { $gt: new Date() },
      });

      if (!recoveryCode) {
        throw new GraphQLError("Invalid recovery code.");
      }

      const accountUser = await AccountUserModel.findOne({
        _id: recoveryCode.accountUserId,
      });

      if (!accountUser) {
        throw new GraphQLError("Invalid recovery code.");
      }

      const password = PasswordUtility.encryptPassword(newPassword);

      accountUser.password = password;

      await recoveryCode.deleteOne({ _id: recoveryCode._id });

      await accountUser.save();

      return {
        message: "Password updated successfully.",
      };
    },

    recoverPassword: async (_, { input }: GraphQLInput<{ email: string }>) => {
      const { email } = input;

      const accountUser = await AccountUserModel.findOne({
        email,
      });

      if (!accountUser) {
        throw new GraphQLError("Invalid email.");
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
        accountUser.email,
      );

      return {
        message: "A recovery code has been sent to your email.",
      };
    },
    deleteAccountUser: async (
      _,
      { input }: GraphQLInput<{ id: string }>,
      { user },
    ) => {
      onlyAdmin(user);

      await AccountUserModel.updateOne(
        { _id: input.id },
        {
          active: false,
        },
      );

      await asaasCustomersService.deleteCustomer(input.id);

      return true;
    },
    editAccountUser: async (
      _,
      { input }: GraphQLInput<CreateAccountUserInput>,
      { user },
    ) => {
      onlyAdmin(user);

      const { email, name, password } = input;

      const payload: Partial<typeof input> = {
        name,
      };

      if (password) {
        payload.password = PasswordUtility.encryptPassword(password);
      }

      const accountUser = await AccountUserModel.findOneAndUpdate(
        { email },
        payload,
        { new: true },
      );

      if (!accountUser) {
        throw new GraphQLError("Account user not found.");
      }

      await asaasCustomersService.updateCustomer(accountUser.id, input);

      return accountUser;
    },

    changeAccountUserPassword: async (
      _,
      { input }: GraphQLInput<ChangeAccountUserPassword>,
      { accountUser },
    ) => {
      onlyLoggedAccountUser(accountUser);

      const { oldPassword, newPassword } = input;

      if (!PasswordUtility.authenticate(oldPassword, accountUser.password)) {
        throw new GraphQLError("Invalid old password.");
      }

      const password = PasswordUtility.encryptPassword(newPassword);

      await AccountUserModel.updateOne(
        { email: accountUser.email },
        { password },
      );

      return true;
    },
    signInAccountUser: async (_, { input }: GraphQLInput<SignInInput>) => {
      const { email, password } = input;

      const accountUser = await AccountUserModel.findOne({ email });

      if (!accountUser) {
        throw new GraphQLError(
          "Invalid email or password. Please check your credentials and try again.",
        );
      }

      if (!PasswordUtility.authenticate(password, accountUser.password)) {
        throw new GraphQLError(
          "Invalid email or password. Please check your credentials and try again.",
        );
      }

      const token = TokenUtility.generateToken({
        id: accountUser.email,
        type: "account_user",
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });

      return {
        accountUser,
        token,
      };
    },
  },
};
