import { GraphQLError } from "graphql";
import { TResolvers } from "../../../types";
import { transactionPixService } from "./services/transactionPix.service";

export const TransactionPixResolvers: TResolvers = {
  Query: {
    getTransactionPix: async (_, { id }, { user }) => {
      try {
        const transaction = await transactionPixService.getTransactionPix(id);
        return transaction;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    listTransactionPix: async (_, { input }, { user }) => {
      try {
        const transactions =
          await transactionPixService.listTransactionPix(input);
        return transactions;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createTransactionPix: async (_, { input }, { user }) => {
      try {
        const transaction =
          await transactionPixService.createTransactionPix(input);
        return transaction;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    decodePix: async (_, { input }, { user }) => {
      try {
        const decodedPix = await transactionPixService.decodePix(input);
        return decodedPix;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    cancelTransactionPix: async (_, { id }, { user }) => {
      try {
        const transaction =
          await transactionPixService.cancelTransactionPix(id);
        return transaction;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};
