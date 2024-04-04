import { UserDefinitions } from "./definitions.user";
import { UserResolvers } from "./resolvers.user";

export const UserModule = {
  resolvers: UserResolvers,
  typeDefs: UserDefinitions,
};
