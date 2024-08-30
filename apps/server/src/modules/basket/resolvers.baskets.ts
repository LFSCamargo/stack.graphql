import { GraphQLError } from "graphql";
import { TResolvers } from "../../types";
import { basketService } from "./services/basket.service";
import { CreateBasketInput, UpdateBasketInput } from "./types/basket.types";
import { onlyAdmin } from "../../guards";

export const BasketResolvers: TResolvers = {
  Query: {
    listBaskets: async (_, __, { user }) => {
      onlyAdmin(user);
      try {
        const baskets = await basketService.listBaskets();
        return baskets;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    findBasketById: async (_, { id }, { user }) => {
      onlyAdmin(user);
      try {
        const basket = await basketService.findBasketById(id);
        return basket;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createBasket: async (
      _,
      { input }: { input: CreateBasketInput },
      { user },
    ) => {
      onlyAdmin(user);
      try {
        const basket = await basketService.createBasket(input);
        return basket;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    updateBasket: async (
      _,
      { id, input }: { id: string; input: UpdateBasketInput },
      { user },
    ) => {
      onlyAdmin(user);
      try {
        const basket = await basketService.updateBasket(id, input);
        return basket;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    removeBasketById: async (_, { id }, { user }) => {
      onlyAdmin(user);
      try {
        const basket = await basketService.removeBasketById(id);
        return basket;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};
