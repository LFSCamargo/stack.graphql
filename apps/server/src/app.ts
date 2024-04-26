import { ApolloServer } from "@apollo/server";
import GlobalTypes from "./graphql/definitions.graphql";
import { HealthModule, UserModule, CardUserModule } from "./modules";

const apolloServer = new ApolloServer({
  introspection: true,
  resolvers: [
    HealthModule.resolvers,
    UserModule.resolvers,
    CardUserModule.resolvers,
  ],
  typeDefs: [
    HealthModule.typeDefs,
    UserModule.typeDefs,
    CardUserModule.typeDefs,
    GlobalTypes,
  ],
});

export { apolloServer };
