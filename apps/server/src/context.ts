import { GraphQLError } from "graphql";
import { GraphQLContext } from "./types";
import { TokenUtility } from "./utils";
import { CardUserModel, UserModel } from "./models";
import { ContextFunction } from "@apollo/server";
import { StandaloneServerContextFunctionArgument } from "@apollo/server/dist/esm/standalone";

export const context: ContextFunction<
  [StandaloneServerContextFunctionArgument],
  GraphQLContext
> = async ({ req }) => {
  const { authorization } = req.headers;

  const payload = {
    user: null,
  } as GraphQLContext;

  if (authorization) {
    const jwtPayload = await TokenUtility.verifyToken(authorization);

    if (!jwtPayload) {
      throw new GraphQLError(
        "Invalid authorization token provided. Please provide a valid token.",
      );
    }

    if (jwtPayload.type === "dashboard") {
      const user = await UserModel.findOne({
        email: jwtPayload.id,
      });

      if (!user) {
        throw new GraphQLError(
          "Invalid authorization token provided. Please provide a valid token.",
        );
      }

      payload.user = user;
    }

    if (jwtPayload.type === "credit") {
      const creditUser = await CardUserModel.findOne({
        cardNumber: jwtPayload.id,
      });

      payload.creditUser = creditUser;
    }
  }

  return payload;
};
