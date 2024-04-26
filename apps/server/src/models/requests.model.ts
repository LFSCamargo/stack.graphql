import { Document, Schema, model } from "mongoose";

interface IRequest extends Document {
  type: "card-password-change" | "withdrawal";
  cardUserId: Schema.Types.ObjectId;
  status: "pending" | "approved" | "rejected";
  reason?: string;
  active: boolean;
  createdAt: Date;
  payload:
    | {
        amount: number;
      }
    | {
        oldCardPassword: string;
        newCardPassword: string;
      };
}

const schema = new Schema(
  {
    type: { type: String, required: true },
    cardUserId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    status: { type: String, default: "pending" },
    reason: { type: String },
    payload: { type: Schema.Types.Mixed },
    active: { type: Boolean, default: true },
    createdAt: { type: Date, default: Date.now },
  },
  {
    collection: "requests",
  },
);

export const RequestModel = model<IRequest>("Request", schema);
