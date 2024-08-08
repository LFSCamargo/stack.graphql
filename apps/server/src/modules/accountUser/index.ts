export * from "./types/createAccountUser.accountUser.types";
import { AccountUserResolvers } from "./resolvers.accountUser";
import { AccountUserDefinitions } from "./definitions.accountUser";

export const AccountUserModule = {
  resolvers: AccountUserResolvers,
  typeDefs: AccountUserDefinitions,
};
