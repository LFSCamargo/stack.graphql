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

  input PixKeyFilterInput {
    status: String
    statusList: String
    offset: Int
    limit: Int
  }

  input CreatePixKeyInput {
    keyType: String!
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
  }
`;
