import { Schema, model, Document } from "mongoose";

interface ExternalAccount {
  ispb: number;
  ispbName: string;
  name: string;
  cpfCnpj: string;
  addressKey?: string;
  addressKeyType?: string;
}

interface Payer {
  name: string;
  cpfCnpj: string;
}

interface QRCodeResponse {
  payer: Payer;
  conciliationIdentifier: string;
  originalValue: number;
  dueDate: string;
  interest: number;
  fine: number;
  discount: number;
  expirationDate: string;
}

interface TransactionPix extends Document {
  id: string;
  endToEndIdentifier: string | null;
  finality: string | null;
  value: number;
  changeValue: number | null;
  refundedValue: number;
  effectiveDate: string;
  scheduledDate: string;
  status: string;
  type: string;
  originType: string;
  description: string;
  transactionReceiptUrl: string | null;
  refusalReason: string | null;
  canBeCanceled: boolean;
  originalTransaction: string | null;
  externalAccount: ExternalAccount;
  qrCode: QRCodeResponse;
  payment: string | null;
  canBeReunded: boolean;
  refundDisabledReason: string | null;
  chargedFeeValue: number;
  dateCreated: string;
  addressKey: string | null;
  addressKeyType: string | null;
  transferId: string | null;
  externalReference: string | null;
}

const ExternalAccountSchema = new Schema<ExternalAccount>({
  ispb: { type: Number, required: true },
  ispbName: { type: String, required: true },
  name: { type: String, required: true },
  cpfCnpj: { type: String, required: true },
  addressKey: { type: String },
  addressKeyType: { type: String },
});

const PayerSchema = new Schema<Payer>({
  name: { type: String, required: true },
  cpfCnpj: { type: String, required: true },
});

const QRCodeResponseSchema = new Schema<QRCodeResponse>({
  payer: { type: PayerSchema, required: true },
  conciliationIdentifier: { type: String, required: true },
  originalValue: { type: Number, required: true },
  dueDate: { type: String, required: true },
  interest: { type: Number, required: true },
  fine: { type: Number, required: true },
  discount: { type: Number, required: true },
  expirationDate: { type: String, required: true },
});

const TransactionPixSchema = new Schema<TransactionPix>({
  id: { type: String, required: true },
  endToEndIdentifier: { type: String, default: null },
  finality: { type: String, default: null },
  value: { type: Number, required: true },
  changeValue: { type: Number, default: null },
  refundedValue: { type: Number, required: true },
  effectiveDate: { type: String, required: true },
  scheduledDate: { type: String, required: true },
  status: { type: String, required: true },
  type: { type: String, required: true },
  originType: { type: String, required: true },
  description: { type: String, required: true },
  transactionReceiptUrl: { type: String, default: null },
  refusalReason: { type: String, default: null },
  canBeCanceled: { type: Boolean, required: true },
  originalTransaction: { type: String, default: null },
  externalAccount: { type: ExternalAccountSchema, required: true },
  qrCode: { type: QRCodeResponseSchema, required: true },
  payment: { type: String, default: null },
  canBeReunded: { type: Boolean, required: true },
  refundDisabledReason: { type: String, default: null },
  chargedFeeValue: { type: Number, required: true },
  dateCreated: { type: String, required: true },
  addressKey: { type: String, default: null },
  addressKeyType: { type: String, default: null },
  transferId: { type: String, default: null },
  externalReference: { type: String, default: null },
});

export const TransactionPixModel = model<TransactionPix>(
  "TransactionPix",
  TransactionPixSchema,
);
