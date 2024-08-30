import { gql } from "graphql-tag";

export const AccountTransactionDefinitions = gql`
  type Bank {
    ispb: String!
    code: String!
    name: String!
  }

  type BankAccount {
    bank: Bank!
    accountName: String!
    ownerName: String!
    cpfCnpj: String!
    pixAddressKey: String
  }

  type Transaction {
    object: String!
    id: ID!
    type: String!
    dateCreated: String!
    value: Float!
    netValue: Float!
    status: String!
    transferFee: Float!
    effectiveDate: String
    endToEndIdentifier: String
    scheduleDate: String!
    authorized: Boolean!
    failReason: String
    bankAccount: BankAccount!
    transactionReceiptUrl: String
    operationType: String!
    description: String
    asaasId: String!
    accountUserId: ID!
  }

  input BankInput {
    ispb: String!
    code: String!
    name: String!
  }

  input BankAccountInput {
    bank: BankInput!
    accountName: String!
    ownerName: String!
    cpfCnpj: String!
    pixAddressKey: String
  }

  input CreateTransactionInput {
    value: Float!
    bankAccount: BankAccountInput
    operationType: String
    pixAddressKey: String
    pixAddressKeyType: String
    description: String
    scheduleDate: String
  }

  type Mutation {
    createTransaction(input: CreateTransactionInput!): Transaction!
  }
`;
