import { Types } from 'mongoose';

export interface CreateBasketItemInput {
  name: string;
  description: string;
}

export interface BasketItem {
  _id: Types.ObjectId;
  name: string;
  description: string;
}