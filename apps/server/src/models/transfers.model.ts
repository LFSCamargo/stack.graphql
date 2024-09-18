import { Schema, model, Document, Types } from "mongoose";
import { OperationType } from "../modules/transfers/types/transfer.types";

export interface ITransferSchema extends Document {
  userId: Types.ObjectId;
  object: string;
  transferId: string;
  type: string;
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
  bankAccount: {
    bank: {
      ispb: string;
      code: string;
      name: string;
    };
    accountName: string;
    ownerName: string;
    cpfCnpj: string;
    pixAddressKey: string | null;
  };
  transactionReceiptUrl: string | null;
  operationType: OperationType;
  description: string;
}

const transferSchema = new Schema(
  {
    userId: { type: Types.ObjectId, ref: "AccountUser", required: true },
    object: { type: String },
    transferId: { type: String, required: true },
    type: { type: String, },
    dateCreated: { type: Date, },
    value: { type: Number, required: true},
    netValue: { type: Number },
    status: { type: String },
    transferFee: { type: Number },
    effectiveDate: { type: Date, default: null },
    endToEndIdentifier: { type: String, default: null },
    scheduleDate: { type: Date },
    authorized: { type: Boolean },
    failReason: { type: String, default: null },
    bankAccount: {
      bank: {
        ispb: { type: String, required: true },
        code: { type: String, required: true },
        name: { type: String, required: true },
      },
      accountName: { type: String },
      ownerName: { type: String },
      cpfCnpj: { type: String },
      pixAddressKey: { type: String, default: null },
    },
    transactionReceiptUrl: { type: String, default: null },
    operationType: { type: String, enum: Object.values(OperationType), required: true },
    description: { type: String },
  },
  {
    timestamps: true,
    collection: "transfers",
  },
);

export const TransferModel = model<ITransferSchema>("Transfer", transferSchema);