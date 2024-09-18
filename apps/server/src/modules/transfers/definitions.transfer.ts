import { gql } from 'graphql-tag';

export const TransferDefinitions = gql`
  enum BankAccountType {
    CURRENT_ACCOUNT
    SAVINGS_ACCOUNT
  }

  enum OperationType {
    PIX
    TED
  }

  enum PixAddressKeyType {
    CPF
    CNPJ
    EMAIL
    PHONE
    RANDOM
  }

  input Bank {
    code: String!
  }

  input BankAccount {
    bank: Bank!
    accountName: String
    ownerName: String!
    ownerBirthDate: String
    cpfCnpj: String!
    agency: String!
    account: String!
    accountDigit: String!
    bankAccountType: BankAccountType!
    ispb: String
  }

  input TransferRequest {
    value: Float!
    bankAccount: BankAccount
    operationType: OperationType
    pixAddressKey: String
    pixAddressKeyType: PixAddressKeyType
    description: String
    scheduleDate: String
  }

  input TransferToAsaasAccountRequest {
    value: Float!
    walletId: String!
  }

  input ListTransfersRequest {
    dateCreatedGe: String
    dateCreatedLe: String
    transferDateGe: String
    transferDateLe: String
    type: String
  }

  type TransferResponse {
    object: String!
    id: String!
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
    bankAccount: BankAccountResponse!
    transactionReceiptUrl: String
    operationType: OperationType!
    description: String!
  }

  type TransferToAsaasAccountResponse {
    object: String!
    id: String!
    type: String!
    dateCreated: String!
    value: Float!
    status: String!
    transferFee: Float!
    effectiveDate: String!
    endToEndIdentifier: String
    scheduleDate: String!
    authorized: Boolean!
    walletId: String!
    account: AccountResponse!
    transactionReceiptUrl: String!
    operationType: String!
    description: String
  }

  type BankAccountResponse {
    bank: BankResponse!
    accountName: String!
    ownerName: String!
    cpfCnpj: String!
    pixAddressKey: String
  }

  type BankResponse {
    ispb: String!
    code: String!
    name: String!
  }

  type AccountResponse {
    name: String!
    cpfCnpj: String!
    agency: String!
    account: String!
    accountDigit: String!
  }

  type ListTransfersResponse {
    data: [TransferResponse!]!
    totalCount: Int!
    limit: Int!
    offset: Int!
  }

  type CancelTransferResponse {
    object: String!
    id: String!
    dateCreated: String!
    status: String!
    effectiveDate: String
    endToEndIdentifier: String
    type: String!
    value: Float!
    netValue: Float!
    transferFee: Float!
    scheduleDate: String!
    authorized: Boolean!
    failReason: String
    bankAccount: BankAccountResponse!
    transactionReceiptUrl: String
    operationType: OperationType!
    description: String
  }

  type Transfer {
    object: String!
    id: String!
    dateCreated: String!
    status: String!
    effectiveDate: String
    endToEndIdentifier: String
    type: String!
    value: Float!
    netValue: Float!
    transferFee: Float!
    scheduleDate: String!
    authorized: Boolean!
    failReason: String
    bankAccount: BankAccountResponse!
    transactionReceiptUrl: String
    operationType: OperationType!
    description: String
  }

  type Query {
    listTransfers(userId: ID!, filters: ListTransfersRequest!): ListTransfersResponse!
    getTransferById(userId: ID!, transferId: ID!): Transfer!
  }

  type Mutation {
    createTransfer(userId: ID!, transferRequest: TransferRequest!): TransferResponse!
    createTransferToAsaasAccount(userId: ID!, transferRequest: TransferToAsaasAccountRequest!): TransferToAsaasAccountResponse!
    cancelTransfer(userId: ID!, transferId: ID!): CancelTransferResponse!
  }
`;