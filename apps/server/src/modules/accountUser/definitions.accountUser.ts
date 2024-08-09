import { gql } from "graphql-tag";

export const AccountUserDefinitions = gql`
  # Input types
  input AccountSignInInput {
    email: String!
    password: String!
  }

  input CreateAccountUserInput {
    name: String!
    cpfCnpj: String!
    email: String!
    password: String!
    phone: String!
    mobilePhone: String!
    address: String!
    addressNumber: String!
    complement: String
    province: String!
    postalCode: String!
    externalReference: String
    notificationDisabled: Boolean
    additionalEmails: [String!]
    municipalInscription: String
    stateInscription: String
    observations: String
    groupName: String
    company: String
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

  # Output types
  type AccountUser {
    _id: ID!
    name: String!
    cpfCnpj: String!
    email: String!
    phone: String!
    mobilePhone: String!
    address: String!
    addressNumber: String!
    complement: String
    province: String!
    postalCode: String!
    externalReference: String
    notificationDisabled: Boolean
    additionalEmails: [String!]
    municipalInscription: String
    stateInscription: String
    observations: String
    groupName: String
    company: String
    createdAt: String!
  }

  type AccountAuthPayload {
    token: String!
    accountUser: AccountUser!
  }

  input MessageOutput {
    message: String!
  }

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
  # GraphQL Main Types
  type Query {
    getAccountUserById(id: String!): AccountUser
    getAccountUser: AccountUser
    listAccountUsers(input: PaginationInput!): AccountUserPagination
    listAsaasCustomers: [AccountUser!]!
  }

  type Mutation {
    createAccountUser(input: CreateAccountUserInput!): AccountUser!
    deleteAccountUser(input: DeleteAccountUserInput!): Boolean!
    resetAccountUserPasswordWithCode(
      input: ResetPasswordWithCodeInput!
    ): MessageOutput!

    recoverAccountUserPassword(input: RecoverPasswordInput!): MessageOutput!
    updateAccountUser(input: CreateAccountUserInput!): AccountUser!
    changeAccountUserPassword(input: ChangeAccountUserPassword!): Boolean!
    signInAccountUser(input: SignInInput!): SignInResponse!
  }
`;
