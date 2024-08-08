import { gql } from "graphql-tag";

export const pixKeyTypeDefs = gql`
  type QrCode {
    encodedImage: String!
    payload: String!
  }

  type PixKey {
    id: ID!
    keyType: String!
    keyValue: String!
    accountUserId: ID!
    asaasKeyId: String!
    status: String!
    dateCreated: String!
    canBeDeleted: Boolean!
    cannotBeDeletedReason: String
    qrCode: QrCode!
  }

  input CreatePixKeyInput {
    keyType: String!
    keyValue: String!
  }
  extend type Query {
    listPixKeys: [PixKey!]!
    getPixKey(id: ID!): PixKey!
    listPixKeysFromAsaas: [PixKey!]!
    getPixKeyFromAsaas(asaasKeyId: ID!): PixKey!
  }

  type Mutation {
    createPixKey(input: CreatePixKeyInput!): PixKey!
    deletePixKey(id: ID!): Boolean!
  }
`;
