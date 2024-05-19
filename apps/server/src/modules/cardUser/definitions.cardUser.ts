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

  input CreateCardUserInput {
    cardNumber: String!
    name: String!
    password: String!
    email: String!
  }

  input DeleteCardUserInput {
    id: ID!
  }

  input ResetPasswordWithCodeInput {
    code: String!
    newPassword: String!
  }

  input RecoverPassword {
    cardNumber: String!
  }

  # Output types
  type CardUser {
    _id: ID!
    cardNumber: String!
    name: String!
    email: String!
    balance: String
    balanceChange: String
    newAccount: Boolean!
    active: Boolean
  }

  type CardAuthPayload {
    token: String!
    cardUser: CardUser!
  }

  type MessageOutput {
    message: String!
  }

  type CardUsersOutput {
    count: Int!
    data: [CardUser!]!
    pageInfo: PageInfo!
  }

  # GraphQL Main Types
  type Query {
    # Admin queries
    cardUsers(input: PaginationInput!): CardUsersOutput
    cardUserById(id: ID!): CardUser

    # Card user queries
    cardUser: CardUser
  }

  type Mutation {
    # Admin mutations
    deleteCardUser(input: DeleteCardUserInput!): Boolean
    editCardUser(input: CreateCardUserInput!): CardUser
    createCardUser(input: CreateCardUserInput!): CardUser

    # Card user mutations
    signInCardUser(input: CardSignInInput!): CardAuthPayload
    changeCardUserPassword(input: ChangeCardUserPassword!): Boolean

    recoverPassword(input: RecoverPassword!): MessageOutput
    resetPasswordWithCode(input: ResetPasswordWithCodeInput!): MessageOutput
  }
`;
