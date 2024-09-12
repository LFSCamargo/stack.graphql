import { gql } from "graphql-tag";

export const AccountUserDefinitions = gql`
  # Input types
  input AccountSignInInput {
    email: String!
    password: String!
  }

  input PreRegisterAccountInput {
    name: String!
    email: String!
    loginEmail: String
    password: String!
    cpfCnpj: String!
    birthDate: String
    companyType: String
    phone: String
    mobilePhone: String!
    site: String
    incomeValue: Float!
    address: String!
    addressNumber: String!
    complement: String
    province: String!
    postalCode: String!
    webhooks: [WebhookAccountUserInput!]!
  }

  input WebhookAccountUserInput {
    name: String!
    url: String!
    email: String!
    sendType: String!
    apiVersion: Int
    enabled: Boolean
    interrupted: Boolean
    authToken: String
    events: [String!]!
  }

  input ChangeAccountUserPassword {
    oldPassword: String!
    newPassword: String!
  }

  input DeleteAccountUserInput {
    id: String!
  }

  input ResetPasswordWithCodeInput {
    code: String!
    newPassword: String!
  }

  input RecoverPasswordInput {
    email: String!
  }

  input MessageOutput {
    message: String!
  }

  input LinkBasketToUserInput {
    userId: String!
    basketId: String!
  }

  type WebhookAccountUser {
    name: String!
    url: String!
    email: String!
    sendType: String!
    apiVersion: Int
    enabled: Boolean
    interrupted: Boolean
    authToken: String
    events: [String!]!
  }

  type AccountUser {
    id: ID!
    name: String!
    email: String!
    loginEmail: String
    password: String!
    accountStatus: String!
    basketId: ID
    cpfCnpj: String!
    birthDate: String
    companyType: String
    phone: String
    mobilePhone: String!
    site: String
    incomeValue: Float!
    address: String!
    addressNumber: String!
    complement: String
    province: String!
    postalCode: String!
    webhooks: [WebhookAccountUser!]!
  }

  # type AccountAuthPayload {

  # }

  type AccountUsersOutput {
    count: Int!
    data: [AccountUser!]!
    pageInfo: PageInfo!
  }

  type AccountUserPagination {
    count: Int!
    data: [AccountUser!]!
    pageInfo: PageInfo!
  }

  type SignInResponse {
    accountUser: AccountUser!
    token: String!
  }

  type MessageOutput {
    message: String!
  }

  type Query {
    getPendingAccounts: [AccountUser!]!
    getPendingAccountByEmail(email: String!): AccountUser
    checkAccountRegistrationStatus(userId: String!): Boolean!
  }

  type Mutation {
    preRegisterAccount(input: PreRegisterAccountInput!): AccountUser!
    linkBasketToUser(input: LinkBasketToUserInput!): AccountUser!
    signInAccountUser(input: AccountSignInInput!): SignInResponse!

    resetAccountUserPasswordWithCode(
      input: ResetPasswordWithCodeInput!
    ): MessageOutput!
    recoverAccountUserPassword(input: RecoverPasswordInput!): MessageOutput!
    changeAccountUserPassword(input: ChangeAccountUserPassword!): Boolean!
  }
`;
