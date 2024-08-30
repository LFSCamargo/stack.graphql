import { Schema, model, Document } from "mongoose";

export interface IBasketItemSchema extends Document {
  name: string;
  description: string;
}

const basketItemSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String, required: true },
  },
  {
    timestamps: true,
    collection: "basket-items",
  },
);

export const BasketItemModel = model<IBasketItemSchema>(
  "BasketItem",
  basketItemSchema,
);
