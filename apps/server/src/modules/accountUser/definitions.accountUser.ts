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

  input RecoverPassword {
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

  # GraphQL Main Types
  type Query {
    accountUserById(id: String!): AccountUser
    accountUser: AccountUser
    accountUsers(input: PaginationInput!): AccountUserPagination
    listAsaasCustomers: [AccountUser!]!
  }

  type Mutation {
    # Admin mutations
    deleteAccountUser(input: DeleteAccountUserInput!): Boolean
    editAccountUser(input: CreateAccountUserInput!): AccountUser
    createAccountUser(input: CreateAccountUserInput!): AccountUser

    # Account user mutations
    signInAccountUser(input: AccountSignInInput!): AccountAuthPayload
    changeAccountUserPassword(input: ChangeAccountUserPassword!): Boolean

    recoverPassword(input: RecoverPassword!): MessageOutput
    resetPasswordWithCode(input: ResetPasswordWithCodeInput!): MessageOutput
  }
`;
