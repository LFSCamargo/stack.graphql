import { GraphQLError } from "graphql";
import { AccountUserModel } from "../../models";
import { GraphQLInput, GraphQLPaginationInput, TResolvers } from "../../types";
import { PaginationUtility, PasswordUtility, TokenUtility } from "../../utils";
import { onlyAdmin, onlyLoggedAccountUser } from "../../guards";
import { asaasCustomersService } from "./services/customer.service";
import {
  ListAsaasCustomersInput,
  UpdateAccountUserInput,
} from "./types/AccountUser.accountUser.types";
import { SignInInput } from "./types/signIn.accountUser.types";
import { ChangeAccountUserPassword } from "./types/changePassword.accountUser.types";
import { MailingHandler } from "../../mailing/handlers.mailing";
import { AccountUserRecoveryCodeModel } from "../../models/account-user-recovery-code.model";

export const AccountUserResolvers: TResolvers = {
  Query: {
    getAccountUserById: async (_, { id }: { id: string }, { user }) => {
      onlyAdmin(user);

      return await AccountUserModel.findOne({ _id: id });
    },
    getAccountUser: async (_, __, { accountUser }) => {
      return accountUser;
    },
    listAccountUsers: async (
      _,
      { input }: GraphQLInput<GraphQLPaginationInput>,
      { user },
    ) => {
      onlyAdmin(user);

      const params = {
        // active: true,
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
    getAsaasCustomerById: async (_, { id }: { id: string }) => {
      try {
        const customer = await asaasCustomersService.getCustomerById(id);
        return customer;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    listAsaasCustomers: async (
      _,
      { input }: GraphQLInput<ListAsaasCustomersInput>,
    ) => {
      try {
        const params = {
          name: input.name,
          email: input.email,
          cpfCnpj: input.cpfCnpj,
          groupName: input.groupName,
          externalReference: input.externalReference,
          offset: input.offset,
          limit: input.limit,
        } as Record<string, unknown>;

        const response = await asaasCustomersService.listCustomers(params);
        return {
          hasMore: response.hasMore,
          totalCount: response.totalCount,
          limit: response.limit,
          offset: response.offset,
          data: response.data,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createAccountUser: async (_, { input }, { user }) => {
      onlyAdmin(user);
      try {
        const hashedPassword = PasswordUtility.encryptPassword(input.password);

        const { password, ...asaasInput } = input;

        const asaasCustomer =
          await asaasCustomersService.createCustomer(asaasInput);

        const newUser = await AccountUserModel.create({
          ...input,
          password: hashedPassword,
          asaasId: asaasCustomer.id,
        });

        return newUser;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    updateAccountUser: async (
      _,
      { id, input }: { id: string; input: UpdateAccountUserInput },
      { user },
    ) => {
      onlyAdmin(user);

      const payload: Partial<UpdateAccountUserInput> = { ...input };

      const accountUser = await AccountUserModel.findOneAndUpdate(
        { asaasId: id },
        payload,
        { new: true },
      );

      if (!accountUser) {
        console.error(`Account user with externalReference ${id} not found.`);
        throw new GraphQLError("Account user not found.");
      }

      await asaasCustomersService.updateCustomer(id, input);

      return accountUser;
    },

    deleteAccountUser: async (_, { id }: { id: string }, { user }) => {
      onlyAdmin(user);

      const accountUser = await AccountUserModel.findOne({ asaasId: id });

      if (!accountUser) {
        console.error(`Account user with asaasId ${id} not found.`);
        throw new GraphQLError("Account user not found.");
      }

      // Deactivate the user in the database
      await AccountUserModel.updateOne(
        { asaasId: id },
        {
          active: false,
        },
      );

      await asaasCustomersService.deleteCustomer(id);

      return true;
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
    recoverAccountUserPassword: async (
      _,
      { input }: GraphQLInput<{ email: string }>,
    ) => {
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
        id: accountUser.email as string,
        type: "account",
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });

      return {
        accountUser,
        token,
      };
    },
  },
};
