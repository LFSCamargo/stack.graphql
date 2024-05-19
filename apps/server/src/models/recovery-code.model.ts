import { Schema, model, Document } from "mongoose";

export interface IRecoveryCodeSchema extends Document {
  cardUserId: string;
  recoveryCode: string;
  expiresAt: Date;
  createdAt: Date;
}

const recoveryCodeSchema = new Schema(
  {
    recoveryCode: {
      type: String,
      required: true,
      unique: true,
    },
    cardUserId: {
      type: Schema.Types.ObjectId,
      ref: "CardUser",
      required: true,
    },
    expiresAt: {
      type: Date,
      // default expires in 1 hour
      default: Date.now() + 60 * 60 * 1000,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "recovery-codes",
  },
);

export const RecoveryCodeModel = model<IRecoveryCodeSchema>(
  "RecoveryCode",
  recoveryCodeSchema,
);
