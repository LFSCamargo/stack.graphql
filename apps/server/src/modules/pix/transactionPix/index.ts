import { transactionPixDefinitions } from "./transactionPix.definitions";
import { TransactionPixResolvers } from "./transactionPix.resolvers";

export const transactionPixModule = {
  resolvers: TransactionPixResolvers,
  typeDefs: transactionPixDefinitions,
};
