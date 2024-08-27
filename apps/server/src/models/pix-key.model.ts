import { Schema, model, Document, Types } from "mongoose";

interface QrCode {
  encodedImage: string;
  payload: string;
}

interface PixKey extends Document {
  id: string;
  key: string;
  type: string;
  status: string;
  userMail: string;
  accountUserId: Types.ObjectId;
  asaasId: string;
  dateCreated: Date;
  canBeDeleted: boolean;
  cannotBeDeletedReason: string | null;
  qrCode: QrCode;
}

const QrCodeSchema = new Schema<QrCode>({
  encodedImage: { type: String, required: true },
  payload: { type: String, required: true },
});

const PixKeySchema = new Schema<PixKey>(
  {
    id: { type: String, required: true },
    key: { type: String, required: true },
    type: { type: String, required: true, default: "EVP" },
    status: { type: String, required: true },
    userMail: {
      type: String,
      ref: "AccountUser",
      required: true,
    },
    accountUserId: {
      type: Schema.Types.ObjectId,
      ref: "AccountUser",
      required: true,
    },
    asaasId: {
      type: String,
      ref: "AccountUser",
      required: true,
    },
    dateCreated: { type: Date, required: true },
    canBeDeleted: { type: Boolean, required: true },
    cannotBeDeletedReason: { type: String, default: null },
    qrCode: { type: QrCodeSchema, required: true },
  },
  {
    timestamps: true,
    collection: "pix-keys",
  },
);

export const PixKeyModel = model<PixKey>("PixKey", PixKeySchema);
