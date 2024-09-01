import { Types } from 'mongoose';
import { BillingType, ChargeType, SubscriptionCycle } from "../enums/paymentLikns.enum";

export interface CreatePaymentLinkInput {
  userId?: Types.ObjectId;
  intendedUserId?: Types.ObjectId;
  amount: number;
  dueDate: Date;
  name: string;
  description?: string;
  endDate?: Date;
  value?: number;
  billingType: BillingType;
  chargeType: ChargeType;
  dueDateLimitDays?: number;
  subscriptionCycle?: SubscriptionCycle;
  maxInstallmentCount?: number;
  notificationEnabled?: boolean;
  callback: {
    successUrl: string;
    autoRedirect?: boolean;
  };
}

export interface ListPaymentLinksQueryParams {
  active?: string;
  includeDeleted?: string;
  name?: string;
  offset?: number;
  limit?: number;
}

export interface PaymentLinkType {
  _id: Types.ObjectId;
  userId: Types.ObjectId;
  intendedUserId?: Types.ObjectId;
  amount: number;
  dueDate: Date;
  status: boolean;
  name: string;
  description?: string;
  endDate?: Date;
  value?: number;
  billingType: BillingType;
  chargeType: ChargeType;
  dueDateLimitDays?: number;
  subscriptionCycle?: SubscriptionCycle;
}