import { GraphQLError } from "graphql";
import { TResolvers } from "../../types";
import { onlyLoggedAccountUser } from "../../guards";
import { pixService } from "./services/pixKey.service";
import { IAccountUserSchema } from "../../models";

export const QrCodeResolvers: TResolvers = {
  Mutation: {
    createQrCode: async (_, { input }, { user }) => {
      if (!user || !("cpfCnpj" in user)) {
        throw new GraphQLError("User not found.");
      }
      onlyLoggedAccountUser(user as IAccountUserSchema);

      try {
        const qrCode = await pixService.createQrCode(input);
        return qrCode;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};
