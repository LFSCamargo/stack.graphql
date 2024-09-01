import { Schema, model, Document, Types } from "mongoose";

export interface IPaymentLinkSchema extends Document {
  id: string;
  name: string;
  value: number;
  active: boolean;
  userId: Types.ObjectId;
  intendedUserId?: Types.ObjectId;
  chargeType: string;
  url: string;
  billingType: string;
  subscriptionCycle?: string;
  description?: string;
  endDate?: Date;
  deleted: boolean;
  viewCount: number;
  maxInstallmentCount: number;
  dueDateLimitDays?: number;
  notificationEnabled: boolean;
}

const paymentLinkSchema = new Schema(
  {
    id: { type: String, required: true },
    name: { type: String, required: true },
    value: { type: Number, required: true },
    active: { type: Boolean, required: true },
    chargeType: { type: String, required: true },
    url: { type: String, required: true },
    billingType: { type: String, required: true },
    subscriptionCycle: { type: String, default: null },
    description: { type: String, default: null },
    endDate: { type: Date, default: null },
    deleted: { type: Boolean, required: true },
    viewCount: { type: Number, default: 0 },
    maxInstallmentCount: { type: Number, default: 1 },
    dueDateLimitDays: { type: Number, default: null },
    notificationEnabled: { type: Boolean, default: true },
    userId: { type: Types.ObjectId, ref: "AccountUser", required: true },
    intendedUserId: { type: Types.ObjectId, ref: "AccountUser"},
  },
  {
    timestamps: true,
    collection: "payment-links",
  },
);

export const PaymentLinkModel = model<IPaymentLinkSchema>(
  "PaymentLink",
  paymentLinkSchema,
);