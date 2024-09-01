import axios from 'axios';
import { PaymentLinkModel, IPaymentLinkSchema } from "../../../models/payment-link.model";
import { Types } from "mongoose";
import { CreatePaymentLinkInput, ListPaymentLinksQueryParams } from "../types/paymentLink.types";

class PaymentLinkService {
  private API_URL = 'https://sandbox.asaas.com/api/v3/paymentLinks';

  async createPaymentLink(userId: string, paymentLinkData: CreatePaymentLinkInput): Promise<IPaymentLinkSchema> {
    try {
      const response = await axios.post(this.API_URL, paymentLinkData);
      const paymentLink = response.data;

      const newPaymentLink = await PaymentLinkModel.create({
        ...paymentLink,
        userId: new Types.ObjectId(userId),
      });

      return newPaymentLink;
    } catch (error) {
      throw new Error(`Error creating payment link: ${error.message}`);
    }
  }

  async createPaymentLinkForUser(userId: string, intendedUserId: string, paymentLinkData: CreatePaymentLinkInput): Promise<IPaymentLinkSchema> {
    try {
      const response = await axios.post(this.API_URL, paymentLinkData);
      const paymentLink = response.data;

      const newPaymentLink = await PaymentLinkModel.create({
        ...paymentLink,
        userId: new Types.ObjectId(userId),
        intendedUserId: new Types.ObjectId(intendedUserId),
      });

      return newPaymentLink;
    } catch (error) {
      throw new Error(`Error creating payment link for user: ${error.message}`);
    }
  }

  async getPaymentLinksByUser(userId: string): Promise<IPaymentLinkSchema[]> {
    return await PaymentLinkModel.find({ userId: new Types.ObjectId(userId) });
  }

  async listPaymentLinks(queryParams: ListPaymentLinksQueryParams, userId: string): Promise<IPaymentLinkSchema[]> {
    const query = {
      userId: new Types.ObjectId(userId),
      ...(queryParams.active !== undefined && { active: queryParams.active === 'true' }),
      ...(queryParams.includeDeleted !== undefined && { deleted: queryParams.includeDeleted === 'true' }),
      ...(queryParams.name && { name: { $regex: queryParams.name, $options: 'i' } }),
    };

    const options = {
      skip: queryParams.offset ? queryParams.offset : 0,
      limit: queryParams.limit ? Math.min(queryParams.limit, 100) : 100,
    };

    return await PaymentLinkModel.find(query, null, options);
  }

  async listAllPaymentLinks(queryParams: ListPaymentLinksQueryParams): Promise<IPaymentLinkSchema[]> {
    const query = {
      ...(queryParams.active !== undefined && { active: queryParams.active === 'true' }),
      ...(queryParams.includeDeleted !== undefined && { deleted: queryParams.includeDeleted === 'true' }),
      ...(queryParams.name && { name: { $regex: queryParams.name, $options: 'i' } }),
    };

    const options = {
      skip: queryParams.offset ? queryParams.offset : 0,
      limit: queryParams.limit ? Math.min(queryParams.limit, 100) : 100,
    };

    return await PaymentLinkModel.find(query, null, options);
  }
}

export const paymentLinkService = new PaymentLinkService();