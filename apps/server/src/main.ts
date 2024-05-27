import { connect } from "mongoose";
import { startStandaloneServer } from "@apollo/server/standalone";

import { apolloServer } from "./app";
import { Env } from "./env";

import { context } from "./context";

async function main() {
  console.log(
    "Running Apollo Server with the following environment variables:",
    Env,
  );

  await connect(Env.MONGO_URI, {
    dbName: Env.DB_NAME,
  });

  const { url } = await startStandaloneServer(apolloServer, {
    listen: {
      port: 4000,
    },
    context,
  });

  console.log(`Apollo Server up and running at ${url}`);
}

main();
