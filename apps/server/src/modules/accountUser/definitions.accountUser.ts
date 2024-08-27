import { gql } from "graphql-tag";

export const AccountUserDefinitions = gql`
  # Input types
  input AccountSignInInput {
    email: String!
    password: String!
  }

  type AccountUser {
    _id: ID!
    name: String!
    cpfCnpj: String!
    email: String!
    asaasId: String!
    phone: String
    mobilePhone: String
    address: String
    addressNumber: String
    complement: String
    province: String
    postalCode: String
    externalReference: String
    notificationDisabled: Boolean
    municipalInscription: String
    stateInscription: String
    observations: String
    groupName: String
    company: String
    createdAt: String!
  }

  input CreateAccountUserInput {
    name: String!
    password: String!
    cpfCnpj: String!
    email: String
    phone: String
    mobilePhone: String
    address: String
    addressNumber: String
    complement: String
    province: String
    postalCode: String
    externalReference: String
    notificationDisabled: Boolean
    municipalInscription: String
    stateInscription: String
    observations: String
    groupName: String
    company: String
  }

  input UpdateAccountUserInput {
    name: String
    password: String
    cpfCnpj: String
    email: String
    asaasId: String
    phone: String
    mobilePhone: String
    address: String
    addressNumber: String
    complement: String
    province: String
    postalCode: String
    externalReference: String
    notificationDisabled: Boolean
    municipalInscription: String
    stateInscription: String
    observations: String
    groupName: String
    company: String
  }

  input ListAsaasCustomersInput {
    name: String
    email: String
    cpfCnpj: String
    groupName: String
    externalReference: String
    offset: Int
    limit: Int
  }

  type AsaasCustomer {
    id: String!
    dateCreated: String!
    name: String!
    email: String!
    cpfCnpj: String!
    phone: String
    mobilePhone: String
    address: String
    addressNumber: String
    complement: String
    province: String
    postalCode: String
    city: Int
    cityName: String
    deleted: Boolean
    externalReference: String
    notificationDisabled: Boolean
    groups: [Group]
  }

  type Group {
    name: String!
  }

  type AsaasCustomerPagination {
    hasMore: Boolean!
    totalCount: Int!
    limit: Int!
    offset: Int!
    data: [AsaasCustomer!]!
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
    asaasId: String!
    phone: String!
    mobilePhone: String!
    address: String!
    addressNumber: String!
    complement: String
    province: String!
    postalCode: String!
    externalReference: String
    notificationDisabled: Boolean
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
    listAsaasCustomers(
      input: ListAsaasCustomersInput!
    ): AsaasCustomerPagination!
    getAsaasCustomerById(id: String!): AsaasCustomer!
  }

  type Mutation {
    createAccountUser(input: CreateAccountUserInput!): AccountUser!
    deleteAccountUser(id: String!): Boolean!
    resetAccountUserPasswordWithCode(
      input: ResetPasswordWithCodeInput!
    ): MessageOutput!

    recoverAccountUserPassword(input: RecoverPasswordInput!): MessageOutput!
    updateAccountUser(id: String!, input: UpdateAccountUserInput!): AccountUser!
    changeAccountUserPassword(input: ChangeAccountUserPassword!): Boolean!
    signInAccountUser(input: SignInInput!): SignInResponse!
  }
`;
