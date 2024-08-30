import { gql } from "graphql-tag";

export const pixKeyDefinitions = gql`
  type QrCode {
    encodedImage: String!
    payload: String!
  }

  type PixKey {
    id: ID!
    type: String!
    key: String!
    status: String!
    accountUserId: ID!
    asaasKeyId: String!
    userMail: String!
    dateCreated: String!
    canBeDeleted: Boolean!
    cannotBeDeletedReason: String
    qrCode: QrCode!
  }

  type PixKeyReturn {
    id: ID!
    type: String
    key: String
    status: String!
    dateCreated: String!
    canBeDeleted: Boolean!
    cannotBeDeletedReason: String
    qrCode: QrCode!
  }

  type DeletePixKeyResponse {
    success: Boolean!
    message: String!
  }

  type DeleteStaticQRCodeResponse {
    id: ID!
    deleted: Boolean!
  }

  type StaticQRCode {
    id: ID!
    encodedImage: String!
    payload: String!
    allowsMultiplePayments: Boolean!
    expirationDate: String!
    externalReference: String
    dateCreated: String!
    accountUserId: ID!
    asaasId: String!
  }

  input PixKeyFilterInput {
    status: String
    statusList: String
    offset: Int
    limit: Int
  }

  input CreatePixKeyInput {
    keyType: String!
  }

  input CreateStaticQRCodeInput {
    addressKey: String!
    description: String!
    value: Float
    format: String!
    expirationDate: String
    expirationSeconds: Int
    allowsMultiplePayments: Boolean
    externalReference: String
  }

  type Query {
    listAsaasPixKeys(filters: PixKeyFilterInput): [PixKeyReturn!]!
    getAsaasPixKey(id: ID!): PixKey!
    listPixKeys(filters: PixKeyFilterInput): [PixKey!]!
    getPixKey(id: ID!): PixKey!
  }

  type Mutation {
    createPixKey(input: CreatePixKeyInput!): PixKey!
    deletePixKey(id: String!): DeletePixKeyResponse!
    createStaticQRCode(input: CreateStaticQRCodeInput!): StaticQRCode!
    deleteStaticQRCode(id: String!): DeleteStaticQRCodeResponse!
  }
`;
