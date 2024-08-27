export * from "./types/AccountUser.accountUser.types";
import { AccountUserResolvers } from "./resolvers.accountUser";
import { AccountUserDefinitions } from "./definitions.accountUser";

export const AccountUserModule = {
  resolvers: AccountUserResolvers,
  typeDefs: AccountUserDefinitions,
};
