import { GraphQLError } from "graphql";
import { GraphQLContext } from "../types";

export function onlyLoggedAccountUser(
  accountUser: GraphQLContext["accountUser"],
): asserts accountUser is NonNullable<GraphQLContext["accountUser"]> {
  if (!accountUser) {
    throw new GraphQLError("You are not authorized to perform this action", {
      extensions: {
        code: "BAD_REQUEST",
      },
    });
  }
}
