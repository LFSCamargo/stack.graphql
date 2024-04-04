import { GraphQLError } from "graphql";
import { GraphQLContext } from "../types";

export function onlyLoggedCardUser(
  creditUser: GraphQLContext["creditUser"],
): asserts creditUser is NonNullable<GraphQLContext["creditUser"]> {
  if (!creditUser) {
    throw new GraphQLError("You are not authorized to perform this action");
  }
}
