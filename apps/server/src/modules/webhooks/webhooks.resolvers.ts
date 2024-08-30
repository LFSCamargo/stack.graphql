import { GraphQLError } from "graphql";
import { TResolvers } from "../../types";
import { webhookService } from "./services/webhook.services";

export const WebhookResolvers: TResolvers = {
  Query: {
    listAsaasWebhooks: async (
      _,
      { offset = 0, limit = 10 }: { offset: number; limit: number },
    ) => {
      try {
        const webhooks = await webhookService.listAsaasWebhooks({
          offset,
          limit,
        });
        return webhooks;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    getAsaasWebhook: async (_, { id }) => {
      try {
        const webhook = await webhookService.getAsaasWebhook(id);
        return webhook;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    getWebhook: async (_, { id }) => {
      try {
        const webhook = await webhookService.getWebhookById(id);
        return webhook;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    listWebhooks: async () => {
      try {
        const webhooks = await webhookService.listWebhooks();
        return webhooks;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },

  Mutation: {
    createWebhook: async (_, { input }) => {
      try {
        const webhook = await webhookService.registerWebhook(input);
        return webhook;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    updateAsaasWebhook: async (_, { id, input }) => {
      try {
        const webhook = await webhookService.updateAsaasWebhook(id, input);
        return webhook;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    removeAsaasWebhook: async (_, { id }) => {
      try {
        const result = await webhookService.removeAsaasWebhook(id);
        return result;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};
