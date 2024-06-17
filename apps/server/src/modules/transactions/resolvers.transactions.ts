import { GraphQLError } from "graphql";
import { onlyAdmin, onlyLoggedCardUser } from "../../guards";
import { CardUserModel, CardUserTransactionsModel } from "../../models";
import { GraphQLInput, GraphQLPaginationInput, TResolvers } from "../../types";
import { PaginationUtility } from "../../utils";

type Inputs = {
  injestTransactions: {
    transactions: {
      amount: number;
      balanceUpdated: number;
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
          {
            date: -1,
          },
        );

      return {
        count,
        data,
        pageInfo,
      };
    },
    transactionsByCardUserId: async (
      _,
      {
        cardUserId,
        input,
      }: { cardUserId: string; input: GraphQLPaginationInput },
      { user },
    ) => {
      onlyAdmin(user);

      const cardUser = await CardUserModel.findById(cardUserId);

      if (!cardUser) {
        throw new GraphQLError("Card user not found");
      }

      const { count, data, pageInfo } =
        await PaginationUtility.paginateCollection(
          CardUserTransactionsModel,
          { cardUserId: cardUser?._id },
          input.limit,
          input.offset,
          {
            date: -1,
          },
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
          {
            date: -1,
          },
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
    deleteTransaction: async (_, { id }: { id: string }, { user }) => {
      onlyAdmin(user);

      await CardUserTransactionsModel.deleteOne({ _id: id });

      return {
        message: "Transaction deleted successfully",
      };
    },
    injestTransactions: async (
      _,
      { input }: GraphQLInput<Inputs["injestTransactions"]>,
      { user },
    ) => {
      onlyAdmin(user);

      await CardUserTransactionsModel.insertMany([
        ...input.transactions.map((transaction) => ({
          ...transaction,
          date: new Date(transaction.date).toISOString(),
          createdAt: new Date().toISOString(),
          cardUserId: input.cardUserId,
          balanceUpdated: transaction.balanceUpdated,
          amount: transaction.amount,
        })),
      ]);

      return await CardUserTransactionsModel.find({
        cardUserId: input.cardUserId,
      });
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
