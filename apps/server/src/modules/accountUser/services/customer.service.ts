import { asaasClient } from "../../../utils/asaasClient.utils";
import { CreateAccountUserInput } from "../types/createAccountUser.accountUser.types";

class AsaasCustomersService {
  async listCustomers() {
    try {
      const response = await asaasClient.get("/customers");
      return response.data;
    } catch (error) {
      console.error("Error fetching customers from Asaas:", error);
      throw new Error("Failed to fetch customers from Asaas");
    }
  }

  async createCustomer(input: CreateAccountUserInput) {
    try {
      const response = await asaasClient.post("/customers", input);
      return response.data;
    } catch (error) {
      console.error("Error creating customer in Asaas:", error);
      throw new Error("Failed to create customer in Asaas");
    }
  }

  async updateCustomer(id: string, input: CreateAccountUserInput) {
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
