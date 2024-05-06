import { GraphQLError } from "graphql";
import { onlyAdmin, onlyLoggedCardUser } from "../../guards";
import { CardUserModel, CardUserTransactionsModel } from "../../models";
import { GraphQLInput, GraphQLPaginationInput, TResolvers } from "../../types";
import { PaginationUtility } from "../../utils";

type Inputs = {
  injestTransactions: {
    transactions: {
      amount: number;
      description: string;
      date: string;
    }[];
    cardUserId: string;
  };

  clearTransactions: {
    startDate: string;
    endDate: string;
    cardUserId: string;
  };
};

export const TransactionsResolvers: TResolvers = {
  Query: {
    cardUserTransactions: async (
      _,
      { input }: GraphQLInput<GraphQLPaginationInput>,
      { creditUser },
    ) => {
      onlyLoggedCardUser(creditUser);

      const { count, data, pageInfo } =
        await PaginationUtility.paginateCollection(
          CardUserTransactionsModel,
          { cardUserId: creditUser?._id },
          input.limit,
          input.offset,
        );

      return {
        count,
        data,
        pageInfo,
      };
    },
    transactionsByCardNumber: async (
      _,
      {
        input,
        cardNumber,
      }: GraphQLInput<GraphQLPaginationInput> & { cardNumber: string },
      { user },
    ) => {
      onlyAdmin(user);

      const cardUser = await CardUserModel.findOne({ cardNumber });

      if (!cardUser) {
        throw new GraphQLError("Card user not found");
      }

      const { count, data, pageInfo } =
        await PaginationUtility.paginateCollection(
          CardUserTransactionsModel,
          { cardUserId: cardUser?._id },
          input.limit,
          input.offset,
        );

      return {
        count,
        data,
        pageInfo,
      };
    },

    allTransactions: async (
      _,
      { input }: GraphQLInput<GraphQLPaginationInput>,
      { user },
    ) => {
      onlyAdmin(user);

      const { count, data, pageInfo } =
        await PaginationUtility.paginateCollection(
          CardUserTransactionsModel,
          {},
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
    injestTransactions: async (
      _,
      { transactions, cardUserId }: Inputs["injestTransactions"],
      { user },
    ) => {
      onlyAdmin(user);

      await CardUserTransactionsModel.insertMany([
        ...transactions.map((transaction) => ({
          ...transaction,
          date: new Date(transaction.date).toISOString(),
          createdAt: new Date().toISOString(),
          cardUserId,
        })),
      ]);

      return await CardUserTransactionsModel.find({ cardUserId });
    },
    clearTransactions: async (
      _,
      { startDate, endDate, cardUserId }: Inputs["clearTransactions"],
      { user },
    ) => {
      onlyAdmin(user);
      await CardUserTransactionsModel.deleteMany({
        date: { $gte: startDate, $lte: endDate },
      });

      return await CardUserTransactionsModel.find({ cardUserId });
    },
  },
};
