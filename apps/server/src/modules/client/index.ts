export * from "./types/Clients.clients.types";
import { ClientResolvers } from "./resolvers.clients";
import { ClientDefinitions } from "./definitions.clients";

export const ClientModule = {
  resolvers: ClientResolvers,
  typeDefs: ClientDefinitions,
};
