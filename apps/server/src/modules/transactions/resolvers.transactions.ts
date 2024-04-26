import { onlyAdmin, onlyLoggedCardUser } from "../../guards";
import { CardUserTransactionsModel } from "../../models";
import { TResolvers } from "../../types";

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
    cardUserTransactions: async (_, __, { creditUser }) => {
      onlyLoggedCardUser(creditUser);
      return await CardUserTransactionsModel.find({
        cardUserId: creditUser?._id,
      });
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
