import { BasketItemModel } from "../../../../models/basket-item.model";
import { IBasketItemSchema } from "../../../../models/basket-item.model";
import { CreateBasketItemInput } from "../types/basketItem.types";

class BasketItemService {
  async createBasketItem(
    data: CreateBasketItemInput,
  ): Promise<IBasketItemSchema> {
    if (!data.name || !data.description) {
      throw new Error("Name and description are required.");
    }

    try {
      const basketItem = new BasketItemModel(data);
      return await basketItem.save();
    } catch (error) {
      throw new Error(`Error creating basket item: ${error.message}`);
    }
  }

  async findBasketItemById(id: string): Promise<IBasketItemSchema | null> {
    if (!id) {
      throw new Error("ID is required.");
    }

    try {
      const basketItem = await BasketItemModel.findById(id);
      if (!basketItem) {
        throw new Error("Basket item not found.");
      }
      return basketItem;
    } catch (error) {
      throw new Error(`Error finding basket item: ${error.message}`);
    }
  }

  async listBasketItems(): Promise<IBasketItemSchema[]> {
    try {
      return await BasketItemModel.find();
    } catch (error) {
      throw new Error(`Error listing basket items: ${error.message}`);
    }
  }

  async removeBasketItemById(
    id: string,
  ): Promise<{ id: string; deleted: boolean }> {
    if (!id) {
      throw new Error("ID is required.");
    }

    try {
      const basketItem = await BasketItemModel.findByIdAndDelete(id);
      if (!basketItem) {
        throw new Error("Basket item not found.");
      }
      return { id, deleted: true };
    } catch (error) {
      throw new Error(`Error removing basket item: ${error.message}`);
    }
  }
}

export const basketItemService = new BasketItemService();
