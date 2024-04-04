import { ApolloServer } from "@apollo/server";
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
  ],
});

export { apolloServer };
