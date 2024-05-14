import { Schema, model, Document } from "mongoose";

export interface ICardUserTransactionsSchema extends Document {
  amount: number;
  description: string;
  balanceUpdated: number;
  date: Date;
  cardUserId: string;
  createdAt: Date;
}

const cardUserTransactionsSchema = new Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    balanceUpdated: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    cardUserId: {
      type: Schema.Types.ObjectId,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
    collection: "card-user-transactions",
  },
);

export const CardUserTransactionsModel = model<ICardUserTransactionsSchema>(
  "CardUserTransactions",
  cardUserTransactionsSchema,
);
