import { Schema, model, Document, Types } from "mongoose";
import { IBasketItemSchema } from "./basket-item.model";

export interface IBasketSchema extends Document {
  name: string;
  items: Types.DocumentArray<IBasketItemSchema>;
  basketValue: number;
}

const basketSchema = new Schema(
  {
    name: { type: String, required: true },
    items: [
      {
        type: Types.ObjectId,
        ref: "BasketItem",
        required: true,
      },
    ],
    basketValue: { type: Number, required: true },
  },
  {
    timestamps: true,
    collection: "baskets",
  },
);

export const BasketModel = model<IBasketSchema>("Basket", basketSchema);
