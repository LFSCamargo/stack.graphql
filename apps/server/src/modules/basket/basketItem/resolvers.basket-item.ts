import { GraphQLError } from "graphql";
import { TResolvers } from "../../../types";
import { basketItemService } from "./services/basket-item.service";
import { CreateBasketItemInput } from "./definitions.basket-item";
import { onlyAdmin } from "../../../guards";

export const BasketItemResolvers: TResolvers = {
  Query: {
    listBasketItems: async (_, __, { user }) => {
      onlyAdmin(user);
      try {
        const basketItems = await basketItemService.listBasketItems();
        return basketItems;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    findBasketItemById: async (_, { id }, { user }) => {
      onlyAdmin(user);
      try {
        const basketItem = await basketItemService.findBasketItemById(id);
        return basketItem;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createBasketItem: async (
      _,
      { input }: { input: CreateBasketItemInput },
      { user },
    ) => {
      onlyAdmin(user);
      try {
        const basketItem = await basketItemService.createBasketItem(input);
        return basketItem;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    removeBasketItemById: async (_, { id }, { user }) => {
      onlyAdmin(user);
      try {
        const basketItem = await basketItemService.removeBasketItemById(id);
        return basketItem;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};
