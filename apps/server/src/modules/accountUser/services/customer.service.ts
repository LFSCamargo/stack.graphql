import { asaasClient } from "../../../utils/asaasClient.utils";
import {
  CreateAccountUserInput,
  UpdateAccountUserInput,
} from "../types/AccountUser.accountUser.types";

class AsaasCustomersService {
  async getCustomerById(id: string) {
    try {
      const response = await asaasClient.get(`/customers/${id}`);
      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        throw new Error("Customer not found.");
      }
      console.error("Error fetching customer from Asaas:", error);
      throw new Error("Failed to fetch customer from Asaas");
    }
  }

  async listCustomers(params: Record<string, unknown>) {
    try {
      const response = await asaasClient.get("/customers", { params });
      return {
        hasMore: response.data.hasMore,
        totalCount: response.data.totalCount,
        limit: response.data.limit,
        offset: response.data.offset,
        data: Array.isArray(response.data.data) ? response.data.data : [],
      };
    } catch (error) {
      console.error(
        "Error listing customers from Asaas:",
        error.response?.data || error.message,
      );
      throw new Error("Failed to list customers from Asaas");
    }
  }

  async createCustomer(input: CreateAccountUserInput) {
    try {
      const response = await asaasClient.post("/customers", input);
      return response.data;
    } catch (error) {
      console.error(
        "Error creating customer in Asaas:",
        error.response?.data || error.message,
      );
      throw new Error("Failed to create customer in Asaas");
    }
  }

  async updateCustomer(id: string, input: Partial<UpdateAccountUserInput>) {
    try {
      const response = await asaasClient.put(`/customers/${id}`, input);
      return response.data;
    } catch (error) {
      console.error("Error updating customer in Asaas:", error);
      throw new Error("Failed to update customer in Asaas");
    }
  }

  async deleteCustomer(id: string) {
    try {
      const response = await asaasClient.delete(`/customers/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error deleting customer in Asaas:", error);
      throw new Error("Failed to delete customer in Asaas");
    }
  }
}

export const asaasCustomersService = new AsaasCustomersService();
