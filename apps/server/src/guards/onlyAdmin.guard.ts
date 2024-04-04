import { GraphQLError } from "graphql";
import { GraphQLContext } from "../types";

export function onlyAdmin(
  user: GraphQLContext["user"],
): asserts user is NonNullable<GraphQLContext["user"]> {
  if (!user) {
    throw new GraphQLError("You are not authorized to perform this action");
  }
}
