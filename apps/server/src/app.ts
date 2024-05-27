import { ApolloServer } from "@apollo/server";
import GlobalTypes from "./graphql/definitions.graphql";
import {
  HealthModule,
  UserModule,
  CardUserModule,
  TransactionsModule,
  RequestsModule,
} from "./modules";
import { Env } from "./env";

const apolloServer = new ApolloServer({
  introspection: Env.MODE === "development",
  resolvers: [
    HealthModule.resolvers,
    UserModule.resolvers,
    CardUserModule.resolvers,
    TransactionsModule.resolvers,
    RequestsModule.resolvers,
  ],
  typeDefs: [
    HealthModule.typeDefs,
    UserModule.typeDefs,
    CardUserModule.typeDefs,
    TransactionsModule.typeDefs,
    RequestsModule.typeDefs,
    GlobalTypes,
  ],
});

export { apolloServer };
