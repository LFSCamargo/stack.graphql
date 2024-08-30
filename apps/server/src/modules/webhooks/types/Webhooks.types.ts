import { WebhookEvents } from "../enums/payment-events.enum";

export interface WebhookData {
  name: string;
  url: string;
  email: string;
  sendType: string;
  enabled?: boolean;
  interrupted?: boolean;
  authToken: string;
  events: WebhookEvents[];
}
