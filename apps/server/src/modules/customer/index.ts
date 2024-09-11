export * from "./types/Customer.customer.types";
import { CustomerResolvers } from "./resolvers.customers";
import { CustomerDefinitions } from "./definitions.customers";

export const CustomerModule = {
  resolvers: CustomerResolvers,
  typeDefs: CustomerDefinitions,
};
