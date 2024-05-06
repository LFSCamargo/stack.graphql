import { TransactionsDefinitions } from "./definitions.transactions";
import { TransactionsResolvers } from "./resolvers.transactions";

export const TransactionsModule = {
  typeDefs: TransactionsDefinitions,
  resolvers: TransactionsResolvers,
};
