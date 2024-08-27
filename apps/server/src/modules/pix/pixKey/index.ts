import { PixKeyResolvers } from "./pixKey.resolvers";
import { pixKeyDefinitions } from "./pixKey.definitions";

export const pixModule = {
  resolvers: PixKeyResolvers,
  typeDefs: pixKeyDefinitions,
};
