import { GraphQLError } from "graphql";
import { TResolvers } from "../../../types";
import { onlyAdmin, onlyLoggedAccountUser } from "../../../guards";
import { pixService } from "../services/pixKey.service";
import { PixKeyModel } from "../../../models/PixKey.model";
import { IAccountUserSchema } from "../../../models";

export const PixKeyResolvers: TResolvers = {
  Query: {
    listPixKeys: async (_, __, { user }) => {
      onlyAdmin(user);

      try {
        const pixKeys = await PixKeyModel.find({ accountUserId: user.id });
        return pixKeys;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    getPixKey: async (_, { id }, { user }) => {
      // tirar duvida com o luiz
      if (!user || !("cpfCnpj" in user)) {
        throw new GraphQLError("User not found.");
      }
      onlyLoggedAccountUser(user as IAccountUserSchema);

      try {
        const pixKey = await PixKeyModel.findOne({
          _id: id,
          accountUserId: user.id,
        });
        if (!pixKey) {
          throw new GraphQLError("Pix key not found.");
        }
        return pixKey;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    listPixKeysFromAsaas: async (_, __, { user }) => {
      onlyAdmin(user);

      try {
        const pixKeys = await pixService.listPixKeysFromAsaas();
        return pixKeys;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    getPixKeyFromAsaas: async (_, { asaasKeyId }, { user }) => {
      if (!user || !("cpfCnpj" in user)) {
        throw new GraphQLError("User not found.");
      }
      onlyLoggedAccountUser(user as IAccountUserSchema);

      try {
        const pixKey = await pixService.getPixKeyFromAsaas(asaasKeyId);
        return pixKey;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },

  Mutation: {
    createPixKey: async (_, { input }, { user }) => {
      if (!user || !("cpfCnpj" in user)) {
        throw new GraphQLError("User not found.");
      }
      onlyLoggedAccountUser(user as IAccountUserSchema);

      const { keyType, keyValue } = input;

      try {
        const pixKey = await pixService.createPixKey(
          user.id,
          keyType,
          keyValue,
        );
        return pixKey;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    deletePixKey: async (_, { id }, { user }) => {
      if (!user || !("cpfCnpj" in user)) {
        throw new GraphQLError("User not found.");
      }
      onlyLoggedAccountUser(user as IAccountUserSchema);

      try {
        const success = await pixService.deletePixKey(user.id, id);
        return success;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};
