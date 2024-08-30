import { Schema, model, Document, Types } from "mongoose";

interface StaticQRCode extends Document {
  id: string;
  encodedImage: string;
  payload: string;
  allowsMultiplePayments: boolean;
  expirationDate: Date;
  externalReference: string | null;
  dateCreated: Date;
  accountUserId: Types.ObjectId;
  asaasId: string;
}

const StaticQRCodeSchema = new Schema<StaticQRCode>(
  {
    id: { type: String, required: true },
    encodedImage: { type: String, required: true },
    payload: { type: String, required: true },
    allowsMultiplePayments: { type: Boolean, required: true, default: true },
    expirationDate: { type: Date, required: true },
    externalReference: { type: String, default: null },
    dateCreated: { type: Date, default: Date.now },
    accountUserId: {
      type: Schema.Types.ObjectId,
      ref: "AccountUser",
      required: true,
    },
    asaasId: { type: String, required: true, ref: "AccountUser" },
  },
  {
    timestamps: true,
    collection: "static-qr-codes",
  },
);

export const StaticQRCodeModel = model<StaticQRCode>(
  "StaticQRCode",
  StaticQRCodeSchema,
);
