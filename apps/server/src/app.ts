import { ApolloServer } from "@apollo/server";
import GlobalTypes from "./graphql/definitions.graphql";
import http from "http";
import express from "express";

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
  CustomerModule,
  webhookModule,
  BasketModule,
  BasketItemsModule,
  PaymentLinkModule,
  AccountDocumentsModule,
  TransferModule,
} from "./modules";
import { Env } from "./env";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

const app = express();
const httpServer = http.createServer(app);

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
    CustomerModule.resolvers,
    webhookModule.resolvers,
    BasketModule.resolvers,
    BasketItemsModule.resolvers,
    PaymentLinkModule.resolvers,
    AccountDocumentsModule.resolvers,
    TransferModule.resolvers,
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
    CustomerModule.typeDefs,
    BasketModule.typeDefs,
    BasketItemsModule.typeDefs,
    PaymentLinkModule.typeDefs,
    AccountDocumentsModule.typeDefs,
    TransferModule.typeDefs,
    GlobalTypes,
  ],
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

export { app, httpServer, apolloServer };
