import { Schema, model, Document, Types } from "mongoose";

interface QrCode {
  encodedImage: string;
  payload: string;
}

interface PixKey extends Document {
  keyType: string;
  keyValue: string;
  accountUserId: Types.ObjectId;
  asaasKeyId: string;
  status: string;
  dateCreated: Date;
  canBeDeleted: boolean;
  cannotBeDeletedReason: string | null;
  qrCode: QrCode;
}

const QrCodeSchema = new Schema<QrCode>({
  encodedImage: { type: String, required: true },
  payload: { type: String, required: true },
});

const PixKeySchema = new Schema<PixKey>({
  keyType: { type: String, required: true },
  keyValue: { type: String, required: true },
  accountUserId: {
    type: Schema.Types.ObjectId,
    ref: "AccountUser",
    required: true,
  },
  asaasKeyId: { type: String, required: true },
  status: { type: String, required: true },
  dateCreated: { type: Date, required: true },
  canBeDeleted: { type: Boolean, required: true },
  cannotBeDeletedReason: { type: String, default: null },
  qrCode: { type: QrCodeSchema, required: true },
});

export const PixKeyModel = model<PixKey>("PixKey", PixKeySchema);
