import { GraphQLError } from "graphql";
import { CustomerModel } from "../../models";
import { GraphQLInput, GraphQLPaginationInput, TResolvers } from "../../types";
import { PaginationUtility, PasswordUtility } from "../../utils";
import { onlyAdmin } from "../../guards";
import { asaasCustomersService } from "./services/customer.service";
import {
  ListAsaasCustomersInput,
  UpdateCustomerInput,
} from "./types/Customer.customer.types";

export const CustomerResolvers: TResolvers = {
  Query: {
    getCustomerById: async (_, { id }: { id: string }, { user }) => {
      onlyAdmin(user);

      return await CustomerModel.findOne({ _id: id });
    },
    listCustomers: async (
      _,
      { input }: GraphQLInput<GraphQLPaginationInput>,
      { user },
    ) => {
      onlyAdmin(user);

      const params = {
        // active: true,
      } as Record<string, unknown>;

      if (input.search) {
        params.name = { $regex: input.search, $options: "i" };
      }

      const { count, data, pageInfo } =
        await PaginationUtility.paginateCollection(
          CustomerModel,
          params,
          input.limit,
          input.offset,
        );

      return {
        count,
        data,
        pageInfo,
      };
    },
    getAsaasCustomerById: async (_, { id }: { id: string }) => {
      try {
        const customer = await asaasCustomersService.getCustomerById(id);
        return customer;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    listAsaasCustomers: async (
      _,
      { input }: GraphQLInput<ListAsaasCustomersInput>,
    ) => {
      try {
        const params = {
          name: input.name,
          email: input.email,
          cpfCnpj: input.cpfCnpj,
          groupName: input.groupName,
          externalReference: input.externalReference,
          offset: input.offset,
          limit: input.limit,
        } as Record<string, unknown>;

        const response = await asaasCustomersService.listCustomers(params);
        return {
          hasMore: response.hasMore,
          totalCount: response.totalCount,
          limit: response.limit,
          offset: response.offset,
          data: response.data,
        };
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createCustomer: async (_, { input }, { user }) => {
      onlyAdmin(user);
      try {
        const asaasCustomer = await asaasCustomersService.createCustomer(input);

        const newUser = await CustomerModel.create({
          ...input,
          customerId: asaasCustomer.id,
        });

        return newUser;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    updateCustomer: async (
      _,
      { id, input }: { id: string; input: UpdateCustomerInput },
      { user },
    ) => {
      onlyAdmin(user);

      const payload: Partial<UpdateCustomerInput> = { ...input };

      const customer = await CustomerModel.findOneAndUpdate(
        { customerId: id },
        payload,
        { new: true },
      );

      if (!customer) {
        console.error(`Customer with externalReference ${id} not found.`);
        throw new GraphQLError("Customer not found.");
      }

      await asaasCustomersService.updateCustomer(id, input);

      return customer;
    },

    deleteCustomer: async (_, { id }: { id: string }, { user }) => {
      onlyAdmin(user);

      const customer = await CustomerModel.findOne({ customerId: id });

      if (!customer) {
        console.error(`Customer with asaasId ${id} not found.`);
        throw new GraphQLError("Customer not found.");
      }

      // Deactivate the user in the database
      await CustomerModel.updateOne(
        { customerId: id },
        {
          active: false,
        },
      );

      await asaasCustomersService.deleteCustomer(id);

      return true;
    },
  },
};
