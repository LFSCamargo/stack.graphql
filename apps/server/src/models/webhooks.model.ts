import { Schema, model, Document } from "mongoose";
import { WebhookEvents } from "../modules/webhooks/enums/payment-events.enum";

interface Webhook extends Document {
  id: string;
  name: string;
  url: string;
  email: string;
  enabled: boolean;
  interrupted: boolean;
  authToken: string;
  sendType: string;
  events: WebhookEvents[];
}

const WebhookSchema = new Schema<Webhook>(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    url: { type: String, required: true },
    email: { type: String, required: true },
    enabled: { type: Boolean, default: true },
    interrupted: { type: Boolean, default: false },
    authToken: { type: String, required: true },
    sendType: { type: String, required: true, default: "SEQUENTIALLY" },
    events: {
      type: [String],
      enum: Object.values(WebhookEvents),
      required: true,
    },
  },
  {
    timestamps: true,
    collection: "webhooks",
  },
);

export const WebhookModel = model<Webhook>("Webhook", WebhookSchema);
