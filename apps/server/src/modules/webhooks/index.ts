import { webhookDefinitions } from "./webhooks.definitions";
import { WebhookResolvers } from "./webhooks.resolvers";

export const webhookModule = {
  resolvers: WebhookResolvers,
  typeDefs: webhookDefinitions,
};
