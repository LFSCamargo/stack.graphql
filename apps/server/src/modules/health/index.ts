import { HealthDefinitions } from "./definitions.health";
import { HealthResolvers } from "./resolvers.health";

export const HealthModule = {
  typeDefs: HealthDefinitions,
  resolvers: HealthResolvers,
};
