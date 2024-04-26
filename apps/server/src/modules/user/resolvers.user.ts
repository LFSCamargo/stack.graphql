import { GraphQLError } from "graphql";
import { UserModel } from "../../models";
import { GraphQLInput, TResolvers } from "../../types";
import { PasswordUtility, TokenUtility } from "../../utils";
import { ChangePasswordInput, SignInInput } from "./types";
import { onlyAdmin } from "../../guards/onlyAdmin.guard";

export const UserResolvers: TResolvers = {
  Query: {
    me: async (_, __, { user }) => {
      onlyAdmin(user);
      return user;
    },
  },
  Mutation: {
    changePassword: async (
      _,
      { input }: GraphQLInput<ChangePasswordInput>,
      { user },
    ) => {
      onlyAdmin(user);
      const { password } = user;

      const isValidOldPassword = PasswordUtility.authenticate(
        input.oldPassword,
        password,
      );

      if (!isValidOldPassword) {
        throw new GraphQLError(
          "Invalid old password. Please check your credentials and try again",
        );
      }

      const newPassword = PasswordUtility.encryptPassword(input.newPassword);

      await UserModel.updateOne(
        {
          _id: user._id,
        },
        { password: newPassword },
      );

      return true;
    },
    signIn: async (_, { input }: GraphQLInput<SignInInput>) => {
      const { email, password } = input;

      const user = await UserModel.findOne({ email });

      if (!user) {
        throw new GraphQLError(
          "Invalid email or password. Please check your credentials and try again.",
        );
      }

      if (!PasswordUtility.authenticate(password, user.password)) {
        throw new GraphQLError(
          "Invalid email or password. Please check your credentials and try again.",
        );
      }

      return {
        user,
        token: TokenUtility.generateToken({
          id: user.email,
          type: "dashboard",
          expiresAt: Date.now() + 24 * 60 * 60 * 1000,
        }),
      };
    },
  },
};
