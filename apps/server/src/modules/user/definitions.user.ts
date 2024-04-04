import gql from "graphql-tag";

export const UserDefinitions = gql`
  type User {
    id: ID!
    email: String!
    name: String!
  }

  type AuthPayload {
    token: String!
    user: User!
  }

  input SignInInput {
    email: String!
    password: String!
  }

  type Query {
    me: User
  }

  type Mutation {
    signIn(input: SignInInput!): AuthPayload
  }
`;
