import { gql } from "graphql-tag";

export const transactionPixDefinitions = gql`
  type ExternalAccount {
    ispb: Int!
    ispbName: String!
    name: String!
    cpfCnpj: String!
    addressKey: String
    addressKeyType: String
  }

  type Payer {
    name: String!
    cpfCnpj: String!
  }

  type QRCodeResponse {
    payer: Payer!
    conciliationIdentifier: String!
    originalValue: Float!
    dueDate: String!
    interest: Float!
    fine: Float!
    discount: Float!
    expirationDate: String!
  }

  type TransactionPixResponse {
    id: ID!
    endToEndIdentifier: String
    finality: String
    value: Float!
    changeValue: Float
    refundedValue: Float!
    effectiveDate: String!
    scheduledDate: String!
    status: String!
    type: String!
    originType: String!
    description: String!
    transactionReceiptUrl: String
    refusalReason: String
    canBeCanceled: Boolean!
    originalTransaction: String
    externalAccount: ExternalAccount!
    qrCode: QRCodeResponse
    payment: String
    canBeReunded: Boolean!
    refundDisabledReason: String
    chargedFeeValue: Float!
    dateCreated: String!
    addressKey: String
    addressKeyType: String
    transferId: String
    externalReference: String
  }

  input QRCodeInput {
    payload: String!
    changeValue: Float
  }

  input TransactionPixInput {
    qrCode: QRCodeInput!
    value: Float!
    description: String
    scheduleDate: String
  }

  type Receiver {
    ispb: Int!
    ispbName: String!
    name: String!
    tradingName: String
    cpfCnpj: String
    personType: String!
    accountType: String!
  }

  type DecodedPix {
    payload: String!
    type: String!
    transactionOriginType: String!
    pixKey: String!
    conciliationIdentifier: String!
    endToEndIdentifier: String!
    dueDate: String!
    expirationDate: String!
    finality: String!
    value: Float!
    changeValue: Float!
    interest: Float!
    fine: Float!
    discount: Float!
    totalValue: Float!
    canBePaidWithDifferentValue: Boolean!
    canBeModifyChangeValue: Boolean!
    receiver: Receiver!
    payer: Payer!
    description: String!
    canBePaid: Boolean!
    cannotBePaidReason: String
  }

  input DecodePixInput {
    payload: String!
    changeValue: Float
  }

  type TransactionPixListResponse {
    object: String!
    hasMore: Boolean!
    totalCount: Int!
    limit: Int!
    offset: Int!
    data: [TransactionPixResponse!]!
  }

  input ListTransactionPixInput {
    status: String
    type: String
    endToEndIdentifier: String
    offset: Int
    limit: Int
  }

  extend type Mutation {
    createTransactionPix(input: TransactionPixInput!): TransactionPixResponse!
    decodePix(input: DecodePixInput!): DecodedPix!
    cancelTransactionPix(id: ID!): TransactionPixResponse!
  }

  extend type Query {
    getTransactionPix(id: ID!): TransactionPixResponse!
    listTransactionPix(
      input: ListTransactionPixInput!
    ): TransactionPixListResponse!
  }
`;
