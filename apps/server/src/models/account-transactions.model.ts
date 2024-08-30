import { Schema, model, Document } from "mongoose";

interface Bank {
  ispb: string;
  code: string;
  name: string;
}

interface BankAccount {
  bank: Bank;
  accountName: string;
  ownerName: string;
  cpfCnpj: string;
  pixAddressKey: string | null;
}

interface AccountTransaction extends Document {
  object: string;
  id: string;
  type: string;
  asaasId: string;
  accountUserId: string;
  dateCreated: Date;
  value: number;
  netValue: number;
  status: string;
  transferFee: number;
  effectiveDate: Date | null;
  endToEndIdentifier: string | null;
  scheduleDate: Date;
  authorized: boolean;
  failReason: string | null;
  bankAccount: BankAccount;
  transactionReceiptUrl: string | null;
  operationType: string;
  description: string | null;
}

const AccountTransactionSchema = new Schema<AccountTransaction>(
  {
    object: { type: String, required: true, default: "transfer" },
    id: { type: String, required: true, unique: true },
    type: { type: String, required: true },
    asaasId: { type: String },
    accountUserId: { type: String },
    dateCreated: { type: Date, required: true },
    value: { type: Number, required: true },
    netValue: { type: Number, required: true },
    status: { type: String, required: true },
    transferFee: { type: Number, default: 0 },
    effectiveDate: { type: Date, default: null },
    endToEndIdentifier: { type: String, default: null },
    scheduleDate: { type: Date, required: true },
    authorized: { type: Boolean, required: true },
    failReason: { type: String, default: null },
    bankAccount: {
      bank: {
        ispb: { type: String, required: true },
        code: { type: String, required: true },
        name: { type: String, required: true },
      },
      accountName: { type: String, required: true },
      ownerName: { type: String, required: true },
      cpfCnpj: { type: String, required: true },
      pixAddressKey: { type: String, default: null },
    },
    transactionReceiptUrl: { type: String, default: null },
    operationType: { type: String, required: true },
    description: { type: String, default: null },
  },
  {
    timestamps: true,
    collection: "account-transactions",
  },
);

export const AccountTransactionModel = model<AccountTransaction>(
  "AccountTransaction",
  AccountTransactionSchema,
);
