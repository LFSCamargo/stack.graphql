import { Schema, model, Document } from "mongoose";


export interface typeInvoiceViewedDate {
  date: Date | null;
  viewed: boolean;
}

export interface IPaymentEventSchema extends Document {
  id: string;
  event: string;
  dateCreated: Date;
  payment: {
    object: string;
    id: string;
    dateCreated: Date;
    customer: string;
    subscription?: string;
    installment?: string;
    paymentLink?: string;
    dueDate: Date;
    originalDueDate: Date;
    value: number;
    netValue: number;
    originalValue?: number;
    interestValue?: number;
    nossoNumero?: string;
    description?: string;
    canBePaidAfterDueDate?: boolean;
    externalReference: string;
    billingType: string;
    status: string;
    pixTransaction?: string;
    confirmedDate: Date;
    paymentDate?: Date;
    clientPaymentDate?: Date;
    installmentNumber?: number;
    creditDate?: Date;
    custody?: string;
    estimatedCreditDate?: Date;
    invoiceUrl?: string;
    bankSlipUrl?: string;
    transactionReceiptUrl?: string;
    invoiceNumber?: string;
    deleted?: boolean;
    anticipated?: boolean;
    anticipable: boolean;
    lastInvoiceViewedDate?: Date | null;
    lastBankSlipViewedDate?: Date | null;
    postalService: boolean;
    creditCard?: {
      creditCardNumber?: string;
      creditCardBrand?: string;
      creditCardToken?: string;
    };
    discount?: {
      value?: number;
      dueDateLimitDays?: number;
      limitedDate?: Date;
      type?: string;
    };
    fine?: {
      value?: number;
      type?: string;
    };
    interest?: {
      value?: number;
      type?: string;
    };
    split?: {
      walletId?: string;
      fixedValue?: number;
      percentualValue?: number;
      status?: string;
      refusalReason?: string;
    }[];
    chargeback?: {
      status: string;
      reason: string;
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    refunds?: any;
  };
}

const paymentEventSchema = new Schema(
  {
    id: { type: String, required: true },
    event: { type: String, required: true },
    dateCreated: { type: Date, required: true },
    payment: {
      object: { type: String, required: true },
      id: { type: String, required: true },
      dateCreated: { type: Date, required: true },
      customer: { type: String, required: true },
      subscription: { type: String },
      installment: { type: String },
      paymentLink: { type: String },
      dueDate: { type: Date },
      originalDueDate: { type: Date },
      value: { type: Number, required: true },
      netValue: { type: Number, required: true },
      originalValue: { type: Number },
      interestValue: { type: Number },
      nossoNumero: { type: String },
      description: { type: String },
      externalReference: { type: String },
      billingType: { type: String, required: true },
      status: { type: String, required: true },
      canBePaidAfterDueDate: { type: Boolean },
      pixTransaction: { type: String },
      confirmedDate: { type: Date },
      paymentDate: { type: Date },
      clientPaymentDate: { type: Date },
      installmentNumber: { type: Number },
      creditDate: { type: Date },
      custody: { type: String },  
      estimatedCreditDate: { type: Date },
      invoiceUrl: { type: String },
      bankSlipUrl: { type: String },
      transactionReceiptUrl: { type: String },
      invoiceNumber: { type: String, required: true },
      deleted: { type: Boolean },
      anticipated: { type: Boolean },
      anticipable: { type: Boolean },
      lastInvoiceViewedDate: { type: Date },
      lastBankSlipViewedDate: { type: Date },
      postalService: { type: Boolean, required: true },
      creditCard: {
        creditCardNumber: { type: String },
        creditCardBrand: { type: String },
        creditCardToken: { type: String },
      },
      discount: {
        value: { type: Number },
        dueDateLimitDays: { type: Number },
        limitedDate: { type: Date },
        type: { type: String },
      },
      fine: {
        value: { type: Number },
        type: { type: String },
      },
      interest: {
        value: { type: Number },
        type: { type: String },
      },
      split: [
        {
          walletId: { type: String, required: true },
          fixedValue: { type: Number },
          percentualValue: { type: Number },
          status: { type: String, required: true },
          refusalReason: { type: String },
        },
      ],
      chargeback: {
        status: { type: String },
        reason: { type: String },
      },
      refunds: { type: Schema.Types.Mixed },
    },
  },
  {
    timestamps: true,
    collection: "payment-events",
  },
);

export const PaymentEventModel = model<IPaymentEventSchema>(
  "PaymentEvent",
  paymentEventSchema,
);