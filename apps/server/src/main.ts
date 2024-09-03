import { connect } from "mongoose";
import { apolloServer, httpServer, app } from "./app";
import { Env } from "./env";
import express from "express";
import cors from "cors";
import { expressMiddleware } from "@apollo/server/express4";
import { router } from "./router";
import { context } from "./context";

async function main() {
  console.log(
    "Running Apollo Server with the following environment variables:",
    Env,
  );

  await apolloServer.start();

  app.use(cors())
  app.use(express.json());
  app.use(router);

  app.use(
    '/graphql',
    expressMiddleware(apolloServer, {
      context: context,
    }),
  );

  await connect(Env.MONGO_URI, {
    dbName: Env.DB_NAME,
  });

  await new Promise<void>((resolve) => httpServer.listen({ port: Env.PORT }, resolve));

  console.log(`Apollo Server up and running at port ${Env.PORT}`);
}

main();
