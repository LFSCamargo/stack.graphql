import { GraphQLError } from "graphql";
import { CardUserModel, RecoveryCodeModel } from "../../models";
import { GraphQLInput, GraphQLPaginationInput, TResolvers } from "../../types";
import {
  PasswordUtility,
  TokenUtility,
  TransactionsUtility,
} from "../../utils";
import {
  SignInInput,
  ChangeCardUserPassword,
  CreateCardUserInput,
} from "./types";
import { onlyAdmin, onlyLoggedCardUser } from "../../guards";
import { PaginationUtility } from "../../utils";
import { MailingHandler } from "../../mailing/handlers.mailing";

export const CardUserResolvers: TResolvers = {
  CardUser: {
    balance: async ({ _id }) => {
      return await TransactionsUtility.getBalanceFromTransactions(_id);
    },
    balanceChange: async ({ _id }) => {
      return await TransactionsUtility.getChangeFromTransactions(_id);
    },
  },
  Query: {
    cardUserById: async (_, { id }: { id: string }, { user }) => {
      onlyAdmin(user);

      return await CardUserModel.findOne({ _id: id });
    },
    cardUser: async (_, __, { creditUser }) => {
      return creditUser;
    },
    cardUsers: async (
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
          CardUserModel,
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
  },
  Mutation: {
    // TODO: Test this function to see if its working well
    resetPasswordWithCode: async (
      _,
      { input }: GraphQLInput<{ code: string; newPassword: string }>,
    ) => {
      const { code, newPassword } = input;
      const recoveryCode = await RecoveryCodeModel.findOne({
        recoveryCode: code,
        expiresAt: { $gt: new Date() },
      });

      if (!recoveryCode) {
        throw new GraphQLError("Invalid recovery code.");
      }

      const cardUser = await CardUserModel.findOne({
        _id: recoveryCode.cardUserId,
      });

      if (!cardUser) {
        throw new GraphQLError("Invalid recovery code.");
      }

      const password = PasswordUtility.encryptPassword(newPassword);

      cardUser.password = password;

      await recoveryCode.deleteOne({ _id: recoveryCode._id });

      await cardUser.save();

      return {
        message: "Password updated successfully.",
      };
    },
    // TODO: Check this function to see if its working well
    recoverPassword: async (
      _,
      { input }: GraphQLInput<{ cardNumber: string }>,
    ) => {
      const { cardNumber } = input;

      const cardUser = await CardUserModel.findOne({
        cardNumber,
      });

      if (!cardUser) {
        throw new GraphQLError("Invalid card number.");
      }

      const recoveryCode = await RecoveryCodeModel.findOne({
        cardUserId: cardUser._id,
      });

      if (recoveryCode) {
        await recoveryCode.deleteOne({ cardUserId: cardUser._id });
      }

      const generatedCode = PasswordUtility.generateTemporaryCode();

      const recovery = new RecoveryCodeModel({
        recoveryCode: generatedCode,
        cardUserId: cardUser._id,
      });

      await recovery.save();

      await MailingHandler.recoverPasswordEmail(
        {
          changePasswordCode: recovery.recoveryCode,
          name: cardUser.name,
        },
        cardUser.email,
      );

      return {
        message: "A recovery code has been sent to your email.",
      };
    },

    deleteCardUser: async (
      _,
      { input }: GraphQLInput<{ id: string }>,
      { user },
    ) => {
      onlyAdmin(user);

      await CardUserModel.updateOne(
        { _id: input.id },
        {
          active: false,
        },
      );

      return true;
    },
    editCardUser: async (
      _,
      { input }: GraphQLInput<CreateCardUserInput>,
      { user },
    ) => {
      onlyAdmin(user);

      const { cardNumber, name, password } = input;

      const payload: Partial<typeof input> = {
        name,
      };

      if (password) {
        payload.password = PasswordUtility.encryptPassword(password);
      }

      await CardUserModel.updateOne(
        {
          cardNumber,
        },
        payload,
      );

      return await CardUserModel.findOne({ cardNumber });
    },
    // TODO: Test this function to see if it's sending the email
    createCardUser: async (
      _,
      { input }: GraphQLInput<CreateCardUserInput>,
      { user },
    ) => {
      onlyAdmin(user);

      const { cardNumber, name, password } = input;

      const cardUser = new CardUserModel({
        cardNumber,
        name,
        password: PasswordUtility.encryptPassword(password),
        email: input.email,
      });

      await MailingHandler.createUserEmail(
        {
          newUserCardNumber: cardNumber,
          newUserPassword: password,
          newUserName: input.email,
        },
        input.email,
      );

      await cardUser.save();

      return cardUser;
    },
    changeCardUserPassword: async (
      _,
      { input }: GraphQLInput<ChangeCardUserPassword>,
      { creditUser },
    ) => {
      onlyLoggedCardUser(creditUser);

      const { oldPassword, newPassword } = input;

      if (!PasswordUtility.authenticate(oldPassword, creditUser.password)) {
        throw new GraphQLError("Invalid old password.");
      }

      const password = PasswordUtility.encryptPassword(newPassword);

      await CardUserModel.updateOne(
        { cardNumber: creditUser.cardNumber },
        { password },
      );

      return true;
    },
    signInCardUser: async (_, { input }: GraphQLInput<SignInInput>) => {
      const { cardNumber, password } = input;

      const cardUser = await CardUserModel.findOne({ cardNumber });

      if (!cardUser) {
        throw new GraphQLError(
          "Invalid card number or password. Please check your credentials and try again.",
        );
      }

      if (!PasswordUtility.authenticate(password, cardUser.password)) {
        throw new GraphQLError(
          "Invalid card number or password. Please check your credentials and try again.",
        );
      }

      const token = TokenUtility.generateToken({
        id: cardUser.cardNumber,
        type: "credit",
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });

      return {
        cardUser,
        token,
      };
    },
  },
};
