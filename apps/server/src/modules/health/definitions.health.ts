import gql from "graphql-tag";

export const HealthDefinitions = gql`
  type Health {
    status: String!
  }

  type Query {
    health: Health!
  }
`;
