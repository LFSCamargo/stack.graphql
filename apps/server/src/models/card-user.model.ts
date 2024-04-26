import { Schema, model, Document } from "mongoose";

export interface ICardUserSchema extends Document {
  name: string;
  cardNumber: string;
  password: string;
  createdAt: Date;
  active: boolean;
  newAccount: boolean;
}

const cardUserSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    cardNumber: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    newAccount: {
      type: Boolean,
      default: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "card-users",
  },
);

export const CardUserModel = model<ICardUserSchema>("CardUser", cardUserSchema);
