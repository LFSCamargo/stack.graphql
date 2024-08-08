import { gql } from "graphql-tag";

export const qrCodeTypeDefs = gql`
  type QrCode {
    id: ID!
    encodedImage: String!
    payload: String!
    allowsMultiplePayments: Boolean!
    expirationDate: String!
    externalReference: String
  }

  input CreateQrCodeInput {
    addressKey: String!
    description: String!
    value: Float
    format: String!
    expirationDate: String
    expirationSeconds: Int
    allowsMultiplePayments: Boolean
    externalReference: String
  }

  type Mutation {
    createQrCode(input: CreateQrCodeInput!): QrCode!
  }
`;
