import { Types } from "mongoose";

export interface CreateBasketInput {
  name: string;
  items: {
    id: Types.ObjectId;
  }[];
  basketValue: number;
}
export interface UpdateBasketInput {
  name?: string;
  items?: {
    id: Types.ObjectId;
  }[];
  basketValue?: number;
}

export interface BasketType {
  _id: Types.ObjectId;
  name: string;
  items: {
    id: Types.ObjectId;
  }[];
  basketValue: number;
}