import { GraphQLError } from "graphql";
import { CardUserModel } from "../../models";
import { GraphQLInput, TResolvers } from "../../types";
import { PasswordUtility, TokenUtility } from "../../utils";
import { SignInInput, ChangeCardUserPassword } from "./types";
import { onlyLoggedCardUser } from "../../guards";

export const CardUserResolvers: TResolvers = {
  CardUser: {
    balance: async () => {
      return 0;
    },
  },
  Query: {
    cardUser: async (_, __, { creditUser }) => {
      return creditUser;
    },
  },
  Mutation: {
    changeCardUserPassword: async (
      _,
      { input }: GraphQLInput<ChangeCardUserPassword>,
      { creditUser },
    ) => {
      onlyLoggedCardUser(creditUser);

      const { oldPassword, newPassword } = input;

      if (!PasswordUtility.authenticate(oldPassword, creditUser.password)) {
        throw new GraphQLError("Invalid old password.");
      }

      const password = PasswordUtility.encryptPassword(newPassword);

      await CardUserModel.updateOne(
        { cardNumber: creditUser.cardNumber },
        { password },
      );

      return true;
    },
    signInCardUser: async (_, { input }: GraphQLInput<SignInInput>) => {
      const { cardNumber, password } = input;

      const cardUser = await CardUserModel.findOne({ cardNumber });

      if (!cardUser) {
        throw new GraphQLError(
          "Invalid card number or password. Please check your credentials and try again.",
        );
      }

      if (!PasswordUtility.authenticate(password, cardUser.password)) {
        throw new GraphQLError(
          "Invalid card number or password. Please check your credentials and try again.",
        );
      }

      const token = TokenUtility.generateToken({
        id: cardUser.cardNumber,
        type: "credit",
        expiresAt: Date.now() + 24 * 60 * 60 * 1000,
      });

      return {
        cardUser,
        token,
      };
    },
  },
};
