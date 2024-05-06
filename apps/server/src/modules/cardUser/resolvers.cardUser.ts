import { GraphQLError } from "graphql";
import { CardUserModel } from "../../models";
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

export const CardUserResolvers: TResolvers = {
  CardUser: {
    balance: async ({ _id }) => {
      return await TransactionsUtility.getBalanceFromTransactions(_id);
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
      });

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
