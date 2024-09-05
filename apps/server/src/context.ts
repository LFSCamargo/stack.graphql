import { GraphQLError } from "graphql";
import { GraphQLContext } from "./types";
import { TokenUtility } from "./utils";
import { CardUserModel, UserModel, AccountUserModel } from "./models";
import { ContextFunction } from "@apollo/server";

export const context: ContextFunction<
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [any],
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

    if (jwtPayload.type === "account") {
      const accountUser = await AccountUserModel.findOne({
        email: jwtPayload.id,
      });
      payload.accountUser = accountUser;
    }
  }

  return payload;
};
