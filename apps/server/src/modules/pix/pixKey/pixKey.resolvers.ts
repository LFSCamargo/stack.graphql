import { GraphQLError } from "graphql";
import { TResolvers } from "../../../types";
import { onlyLoggedAccountUser } from "../../../guards";
import { pixService } from "../services/pixKey.service";
import { AccountUserModel } from "../../../models";

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
    deletePixKey: async (_, { id }, { accountUser }) => {
      onlyLoggedAccountUser(accountUser);
      try {
        const result = await pixService.deletePixKey(id);
        return result;
      } catch (error) {
        console.error("Error in deletePixKey resolver:", error);
        throw new GraphQLError("Failed to delete Pix key");
      }
    },

    createStaticQRCode: async (_, { input }, { accountUser }) => {
      onlyLoggedAccountUser(accountUser);

      try {
        // Fetch the account user data to get asaasId
        const user = await AccountUserModel.findById(accountUser._id);
        if (!user) {
          throw new GraphQLError("Account user not found");
        }

        const qrCode = await pixService.createStaticQRCode({
          ...input,
          accountUserId: user._id,
          asaasId: user.asaasId,
        });
        return qrCode;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },

    deleteStaticQRCode: async (_, { id }, { accountUser }) => {
      onlyLoggedAccountUser(accountUser);

      try {
        const result = await pixService.deleteStaticQRCode(id);
        return result;
      } catch (error) {
        console.error("Error in deleteStaticQRCode resolver:", error);
        throw new GraphQLError(error.message);
      }
    },
  },
};
