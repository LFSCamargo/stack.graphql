import { BasketItemResolvers } from "./basketItem/resolvers.basket-item";
import { BasketItemDefinitions } from "./basketItem/definitions.basket-item";
import { BasketResolvers } from "./resolvers.baskets";
import { BasketDefinitions } from "./definitions.baskets";

export const BasketModule = {
  resolvers: BasketResolvers,
  typeDefs: BasketDefinitions,
};

export const BasketItemsModule = {
  resolvers: BasketItemResolvers,
  typeDefs: BasketItemDefinitions,
};
