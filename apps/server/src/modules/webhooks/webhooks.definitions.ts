import { gql } from "graphql-tag";
import { WebhookEvents } from "./enums/payment-events.enum";

export const webhookDefinitions = gql`
  enum WebhookEvents {
    ${Object.values(WebhookEvents).join("\n    ")}
  }

  type Webhook {
    id: ID!
    name: String!
    url: String!
    email: String!
    enabled: Boolean!
    interrupted: Boolean!
    authToken: String!
    sendType: String!
    events: [WebhookEvents!]!
  }

  input CreateWebhookInput {
    name: String!
    url: String!
    email: String!
    sendType: String!
    enabled: Boolean
    interrupted: Boolean
    authToken: String!
    events: [WebhookEvents!]!
  }
  

  input UpdateWebhookInput {
    name: String
    url: String
    email: String
    sendType: String
    enabled: Boolean
    interrupted: Boolean
    authToken: String
    events: [WebhookEvents!]
  }
  
  type WebhookList {
  object: String!
  hasMore: Boolean!
  totalCount: Int!
  limit: Int!
  offset: Int!
  data: [Webhook!]!
}
  type RemoveWebhookResponse {
    id: ID!
    deleted: Boolean!
  }

  type Query {
    listAsaasWebhooks(offset: Int, limit: Int): WebhookList!
    getAsaasWebhook(id: ID!): Webhook!
    getWebhook(id: ID!): Webhook!
    listWebhooks: WebhookList!
  }

  type Mutation {
    createWebhook(input: CreateWebhookInput!): Webhook!
    updateAsaasWebhook(id: ID!, input: UpdateWebhookInput!): Webhook!
    removeAsaasWebhook(id: ID!): RemoveWebhookResponse!
  }
`;
