import { GraphQLError } from "graphql";
import { TResolvers } from "../../../types";
import { onlyAdmin, onlyLoggedAccountUser } from "../../../guards";
import { pixService } from "../services/pixKey.service";
import { PixKeyModel } from "../../../models";
import { IAccountUserSchema } from "../../../models";

export const PixKeyResolvers: TResolvers = {
  Query: {
    listAsaasPixKeys: async (_, { filters }) => {
      try {
        const pixKeys = await pixService.listAsaasPixKeys(filters);
        return pixKeys;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    listPixKeys: async (_, { filters }, { accountUser }) => {
      onlyLoggedAccountUser(accountUser);
      try {
        const pixKeys = await pixService.listPixKeys(filters, accountUser._id);
        return pixKeys;
      } catch (error) {
        throw new GraphQLError("Failed to retrieve Pix keys in Database");
      }
    },
    getAsaasPixKey: async (_, { id }) => {
      try {
        const pixKey = await pixService.getAsaasPixKey(id);
        return pixKey;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    getPixKey: async (_, { id }) => {
      try {
        const pixKey = await pixService.getPixKeyById(id);
        return pixKey;
      } catch (error) {
        throw new GraphQLError("Failed to retrieve Pix key in Database");
      }
    },
  },

  Mutation: {
    createPixKey: async (_, { input }, { accountUser }) => {
      onlyLoggedAccountUser(accountUser);

      const { keyType } = input;
      const userId = accountUser._id;
      try {
        const pixKey = await pixService.createPixKey(userId, keyType);

        return pixKey;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};
