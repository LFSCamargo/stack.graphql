import { BasketModel } from "../../../models/basket.model";
import { BasketItemModel } from "../../../models/basket-item.model";
import { IBasketSchema } from "../../../models/basket.model";
import { CreateBasketInput, UpdateBasketInput } from "../types/basket.types";
import { ErrorMessages } from "../../../utils/errorMessages.enum";

class BasketService {
  async createBasket(data: CreateBasketInput) {
    if (!data.name || !data.items || !data.basketValue) {
      throw new Error("Name, items, and basket value are required.");
    }

    const itemIds = data.items.map((item) => item.id.toString());
    const basketItems = await BasketItemModel.find({ _id: { $in: itemIds } });
    if (basketItems.length !== data.items.length) {
      throw new Error("Some basket items do not exist.");
    }
    try {
      const basket = await BasketModel.create({
        name: data.name,
        items: itemIds,
        basketValue: data.basketValue,
      });

      const basketItemsString = basketItems.map((item) => {
        return {
          id: item._id.toString(),
          name: item.name,
          description: item.description,
        };
      });
      return {
        id: basket.id,
        name: basket.name,
        items: basketItemsString,
        basketValue: basket.basketValue,
      };
    } catch (error) {
      throw new Error(`Error creating basket: ${error.message}`);
    }
  }

  async findBasketById(id: string): Promise<IBasketSchema | null> {
    if (!id) {
      throw new Error("ID is required.");
    }

    try {
      const basket = await BasketModel.findById(id).populate("items");
      if (!basket) {
        throw new Error("Basket not found.");
      }
      return basket;
    } catch (error) {
      throw new Error(`Error finding basket: ${error.message}`);
    }
  }

  async listBaskets(): Promise<IBasketSchema[]> {
    try {
      return await BasketModel.find().populate("items");
    } catch (error) {
      throw new Error(`Error listing baskets: ${error.message}`);
    }
  }

  async updateBasket(
    id: string,
    data: UpdateBasketInput,
  ): Promise<IBasketSchema | null> {
    if (!id) {
      throw new Error("ID is required.");
    }

    if (!data.name && !data.items && !data.basketValue) {
      throw new Error(
        "At least one field (name, items, basketValue) is required to update.",
      );
    }

    // Validate and ensure all items exist if items are provided
    if (data.items) {
      const itemIds = data.items.map((item) => item.id);
      const basketItems = await BasketItemModel.find({ _id: { $in: itemIds } });

      if (basketItems.length !== data.items.length) {
        throw new Error("Some basket items do not exist.");
      }
    }

    try {
      const updatedBasket = await BasketModel.findByIdAndUpdate(
        id,
        {
          $set: {
            ...(data.name && { name: data.name }),
            ...(data.items && { items: data.items.map((item) => item.id) }),
            ...(data.basketValue && { basketValue: data.basketValue }),
          },
        },
        { new: true },
      ).populate("items");

      if (!updatedBasket) {
        throw new Error("Basket not found.");
      }

      return updatedBasket;
    } catch (error) {
      throw new Error(`Error updating basket: ${error.message}`);
    }
  }

  async removeBasketById(
    id: string,
  ): Promise<{ id: string; deleted: boolean }> {
    if (!id) {
      throw new Error("ID is required.");
    }

    try {
      const basket = await BasketModel.findByIdAndDelete(id);
      if (!basket) {
        throw new Error(ErrorMessages.BASKET_NOT_FOUND);
      }
      return {
        id: basket.id,
        deleted: true,
      };
    } catch (error) {
      throw new Error(`Error removing basket: ${error.message}`);
    }
  }
}

export const basketService = new BasketService();
