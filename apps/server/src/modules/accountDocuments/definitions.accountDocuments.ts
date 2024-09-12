import { gql } from "graphql-tag";

export const AccountDocumentsDefinitions = gql`
  type Responsible {
    name: String
    type: String!
  }

  type Document {
    id: String!
    status: String!
    type: String!
    title: String!
    description: String!
    responsible: Responsible!
    onboardingUrl: String
    documents: [String!]!
  }

  type DocumentResponse {
    rejectReasons: String
    data: [Document!]!
  }

  type SubmitDocumentResponse {
    id: String!
    status: String!
  }

  input SubmitDocumentInput {
    documentFile: String!
    type: String!
  }

  type Query {
    getPendingDocuments(userId: ID!): DocumentResponse!
  }

  type Mutation {
    sendPendingDocumentsToEmail(userId: ID!): Boolean!
    submitDocument(userId: ID!, documentId: ID!, documentBody: SubmitDocumentInput!): SubmitDocumentResponse!
    updateDocument(userId: ID!, documentId: ID!, documentBody: SubmitDocumentInput!): SubmitDocumentResponse!
    removeDocument(userId: ID!, documentId: ID!): Boolean!
  }
`;