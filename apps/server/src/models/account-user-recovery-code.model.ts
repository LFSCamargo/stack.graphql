import { Schema, model, Document } from "mongoose";

export interface IAccountUserRecoveryCodeSchema extends Document {
  accountUserId: string;
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
    accountUserId: {
      type: Schema.Types.ObjectId,
      ref: "AccountUser",
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

export const AccountUserRecoveryCodeModel =
  model<IAccountUserRecoveryCodeSchema>(
    "AccountUserRecoveryCode",
    recoveryCodeSchema,
  );
