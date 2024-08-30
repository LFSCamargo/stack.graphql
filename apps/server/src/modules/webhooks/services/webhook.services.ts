import { asaasClient } from "../../../utils/asaasClient.utils";
import { WebhookModel } from "../../../models/webhooks.model";
import { WebhookData } from "../types/Webhooks.types";

class WebhookService {
  async registerWebhook(data: WebhookData) {
    try {
      const response = await asaasClient.post("/webhooks", {
        name: data.name,
        url: data.url,
        email: data.email,
        sendType: data.sendType,
        enabled: data.enabled ?? true,
        interrupted: data.interrupted ?? false,
        authToken: data.authToken,
        events: data.events,
      });

      if (!response || !response.data) {
        throw new Error("Failed to register webhook");
      }

      const webhookData = response.data;

      const webhook = new WebhookModel({
        id: webhookData.id,
        name: webhookData.name,
        url: webhookData.url,
        email: webhookData.email,
        enabled: webhookData.enabled,
        interrupted: webhookData.interrupted,
        authToken: webhookData.authToken,
        sendType: webhookData.sendType,
        events: webhookData.events,
      });

      await webhook.save();

      return webhook;
    } catch (error) {
      console.error(
        "Error registering webhook:",
        error.response?.data || error.message,
      );
      throw new Error("Failed to register webhook");
    }
  }

  async listAsaasWebhooks(params: Record<string, unknown>) {
    try {
      const response = await asaasClient.get("/webhooks", { params });
      return {
        object: response.data.object,
        hasMore: response.data.hasMore,
        totalCount: response.data.totalCount,
        limit: response.data.limit,
        offset: response.data.offset,
        data: Array.isArray(response.data.data) ? response.data.data : [],
      };
    } catch (error) {
      console.error(
        "Error listing webhooks from Asaas:",
        error.response?.data || error.message,
      );
      throw new Error("Failed to list webhooks from Asaas");
    }
  }

  async getAsaasWebhook(id: string) {
    try {
      const response = await asaasClient.get(`/webhooks/${id}`);
      if (!response || !response.data) {
        throw new Error("Failed to retrieve webhook from Asaas API");
      }
      return response.data;
    } catch (error) {
      console.error(
        "Error retrieving webhook from Asaas API:",
        error.response?.data || error.message,
      );
      throw new Error("Failed to retrieve webhook from Asaas API");
    }
  }

  async updateAsaasWebhook(id: string, data: Partial<WebhookData>) {
    try {
      const response = await asaasClient.put(`/webhooks/${id}`, data);
      if (!response || !response.data) {
        throw new Error("Failed to update webhook in Asaas API");
      }

      const updatedWebhook = await WebhookModel.findOneAndUpdate(
        { id },
        { $set: data },
        { new: true },
      );

      if (!updatedWebhook) {
        throw new Error("Failed to update webhook in database");
      }

      return updatedWebhook;
    } catch (error) {
      console.error(
        "Error updating webhook in Asaas API:",
        error.response?.data || error.message,
      );
      throw new Error("Failed to update webhook in Asaas API");
    }
  }

  async removeAsaasWebhook(id: string) {
    try {
      const response = await asaasClient.delete(`/webhooks/${id}`);
      if (!response || !response.data || !response.data.deleted) {
        throw new Error("Failed to remove webhook from Asaas API");
      }

      const result = await WebhookModel.findOneAndDelete({ id });
      if (!result) {
        throw new Error("Failed to remove webhook from database");
      }

      return { id, deleted: true };
    } catch (error) {
      console.error(
        "Error removing webhook from Asaas API:",
        error.response?.data || error.message,
      );
      throw new Error("Failed to remove webhook from Asaas API");
    }
  }

  async getWebhookById(id: string) {
    try {
      const webhook = await WebhookModel.findOne({ id });
      if (!webhook) {
        throw new Error("Webhook not found.");
      }
      return webhook;
    } catch (error) {
      console.error("Error retrieving webhook from database:", error);
      throw new Error("Failed to retrieve webhook from database");
    }
  }

  async listWebhooks() {
    try {
      const webhooks = await WebhookModel.find();
      return webhooks;
    } catch (error) {
      console.error("Error listing webhooks from database:", error);
      throw new Error("Failed to list webhooks from database");
    }
  }
}

export const webhookService = new WebhookService();
