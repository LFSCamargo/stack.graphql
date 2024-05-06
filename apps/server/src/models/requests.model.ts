import { Document, Schema, model } from "mongoose";

interface IRequest extends Document {
  type: "CARD_PASSWORD_CHANGE" | "WITHDRAWAL";
  cardUserId: Schema.Types.ObjectId;
  status: "PENDING" | "APPROVED" | "REJECTED" | "CANCELED";
  reason?: string;
  active: boolean;
  createdAt: Date;
  payload:
    | {
        type: "PIX" | "TED";
        payload:
          | {
              cpf: string;
              name: string;
              pixKey: string;
              ammount: number;
            }
          | {
              cpf: string;
              name: string;
              bankCode: string;
              agency: string;
              accountDigit: string;
              ammount: number;
            };
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
