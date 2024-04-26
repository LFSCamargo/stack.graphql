import { ApolloClient, InMemoryCache } from "@apollo/client/core";
import { createHttpLink } from "@apollo/client/link/http";
import { setContext } from "@apollo/client/link/context";
import { onError } from "@apollo/client/link/error";
import { StorageUtility } from "../utils";

const link = createHttpLink({
  uri: "http://localhost:4000/graphql",
});

const authLink = setContext(async (_, { headers }) => {
  const token = await StorageUtility.getToken();
  return {
    headers: {
      ...headers,
      authorization: token || "",
    },
  };
});

const errorLink = onError(({ graphQLErrors }) => {
  if (graphQLErrors) {
    for (const error of graphQLErrors) {
      if (error.message === "Invalid authorization token provided") {
        StorageUtility.removeToken();
      }
    }
  }
});

export const apolloClient = new ApolloClient({
  link: errorLink.concat(authLink.concat(link)),
  cache: new InMemoryCache(),
});
