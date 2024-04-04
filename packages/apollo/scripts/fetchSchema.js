import fs from "fs";
import apollo from "@apollo/client/core/core.cjs";
import { getIntrospectionQuery } from "graphql";

const client = new apollo.ApolloClient({
  uri: process.env.URI || "http://localhost:4000/graphql",
  cache: new apollo.InMemoryCache(),
});

client
  .query({
    query: apollo.gql`
      ${getIntrospectionQuery()}
    `,
  })
  .then((result) => {
    const currentDir = process.cwd();
    fs.writeFileSync(
      currentDir + "/generated/schema.json",
      JSON.stringify(result.data, null, 2),
    );
  })
  .catch((error) => {
    console.log(
      "Error while fetching schema from server. Please make sure that your server is running and that you have provided the correct URI in the .env file",
      error,
    );
  });
