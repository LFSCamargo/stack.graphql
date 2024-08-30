import { AccountTransactionResolvers } from "./accountTransactions.resolvers";
import { AccountTransactionDefinitions } from "./accountTransactions.definitions";

export const AccountTransactionModule = {
  resolvers: AccountTransactionResolvers,
  typeDefs: AccountTransactionDefinitions,
};
