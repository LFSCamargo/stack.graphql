import { Schema, model, Document } from "mongoose";

interface Receiver {
  ispb: number;
  ispbName: string;
  name: string;
  tradingName?: string;
  cpfCnpj?: string;
  personType: string;
  accountType: string;
}

interface Payer {
  name: string;
  cpfCnpj: string;
}

interface DecodedPix extends Document {
  payload: string;
  type: string;
  transactionOriginType: string;
  pixKey: string;
  conciliationIdentifier: string;
  endToEndIdentifier: string;
  dueDate: string;
  expirationDate: string;
  finality: string;
  value: number;
  changeValue: number;
  interest: number;
  fine: number;
  discount: number;
  totalValue: number;
  canBePaidWithDifferentValue: boolean;
  canBeModifyChangeValue: boolean;
  receiver: Receiver;
  payer: Payer;
  description: string;
  canBePaid: boolean;
  cannotBePaidReason: string | null;
}

const ReceiverSchema = new Schema<Receiver>({
  ispb: { type: Number, required: true },
  ispbName: { type: String, required: true },
  name: { type: String, required: true },
  tradingName: { type: String },
  cpfCnpj: { type: String },
  personType: { type: String, required: true },
  accountType: { type: String, required: true },
});

const PayerSchema = new Schema<Payer>({
  name: { type: String, required: true },
  cpfCnpj: { type: String, required: true },
});

const DecodedPixSchema = new Schema<DecodedPix>({
  payload: { type: String, required: true },
  type: { type: String, required: true },
  transactionOriginType: { type: String, required: true },
  pixKey: { type: String, required: true },
  conciliationIdentifier: { type: String, required: true },
  endToEndIdentifier: { type: String, required: true },
  dueDate: { type: String, required: true },
  expirationDate: { type: String, required: true },
  finality: { type: String, required: true },
  value: { type: Number, required: true },
  changeValue: { type: Number, required: true },
  interest: { type: Number, required: true },
  fine: { type: Number, required: true },
  discount: { type: Number, required: true },
  totalValue: { type: Number, required: true },
  canBePaidWithDifferentValue: { type: Boolean, required: true },
  canBeModifyChangeValue: { type: Boolean, required: true },
  receiver: { type: ReceiverSchema, required: true },
  payer: { type: PayerSchema, required: true },
  description: { type: String, required: true },
  canBePaid: { type: Boolean, required: true },
  cannotBePaidReason: { type: String, default: null },
});

export const DecodedPixModel = model<DecodedPix>(
  "DecodedPix",
  DecodedPixSchema,
);
