import { gql } from "graphql-tag";

export const CardUserDefinitions = gql`
  # Input types
  input CardSignInInput {
    cardNumber: String!
    password: String!
  }

  input ChangeCardUserPassword {
    oldPassword: String!
    newPassword: String!
  }

  # Output types
  type CardUser {
    id: ID!
    cardNumber: String!
    name: String!
    balance: String
  }

  type CardAuthPayload {
    token: String!
    cardUser: CardUser!
  }

  # GraphQL Main Types
  type Query {
    cardUser: CardUser
  }

  type Mutation {
    signInCardUser(input: CardSignInInput!): CardAuthPayload
    changeCardUserPassword(input: ChangeCardUserPassword!): Boolean
  }
`;
