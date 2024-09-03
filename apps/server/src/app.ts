import { ApolloServer } from "@apollo/server";
import GlobalTypes from "./graphql/definitions.graphql";
import {
  HealthModule,
  UserModule,
  CardUserModule,
  TransactionsModule,
  RequestsModule,
  AccountUserModule,
  pixModule,
  pixStaticQrCodeModule,
  transactionPixModule,
  AccountTransactionModule,
  ClientModule,
  webhookModule,
  BasketModule,
  BasketItemsModule,
  PaymentLinkModule,
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
    AccountUserModule.resolvers,
    pixModule.resolvers,
    pixStaticQrCodeModule.resolvers,
    transactionPixModule.resolvers,
    AccountTransactionModule.resolvers,
    ClientModule.resolvers,
    webhookModule.resolvers,
    BasketModule.resolvers,
    BasketItemsModule.resolvers,
    PaymentLinkModule.resolvers,
  ],
  typeDefs: [
    HealthModule.typeDefs,
    UserModule.typeDefs,
    CardUserModule.typeDefs,
    TransactionsModule.typeDefs,
    RequestsModule.typeDefs,
    AccountUserModule.typeDefs,
    pixModule.typeDefs,
    pixStaticQrCodeModule.typeDefs,
    transactionPixModule.typeDefs,
    AccountTransactionModule.typeDefs,
    webhookModule.typeDefs,
    ClientModule.typeDefs,
    BasketModule.typeDefs,
    BasketItemsModule.typeDefs,
    PaymentLinkModule.typeDefs,
    GlobalTypes,
  ],
});

export { apolloServer };
