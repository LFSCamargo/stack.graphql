import { GraphQLError } from "graphql";
import { ClientModel } from "../../models";
import { GraphQLInput, GraphQLPaginationInput, TResolvers } from "../../types";
import { PaginationUtility, PasswordUtility } from "../../utils";
import { onlyAdmin } from "../../guards";
import { asaasClientsService } from "./services/client.service";
import {
  ListAsaasClientsInput,
  UpdateClientInput,
} from "./types/Clients.clients.types";

export const ClientResolvers: TResolvers = {
  Query: {
    getClientById: async (_, { id }: { id: string }, { user }) => {
      onlyAdmin(user);

      return await ClientModel.findOne({ _id: id });
    },
    listClients: async (
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
          ClientModel,
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
    getAsaasClientById: async (_, { id }: { id: string }) => {
      try {
        const customer = await asaasClientsService.getClientById(id);
        return customer;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    listAsaasClients: async (
      _,
      { input }: GraphQLInput<ListAsaasClientsInput>,
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

        const response = await asaasClientsService.listClients(params);
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
    createClient: async (_, { input }, { user }) => {
      onlyAdmin(user);
      try {
        const hashedPassword = PasswordUtility.encryptPassword(input.password);

        const { password, ...asaasInput } = input;

        const asaasClient = await asaasClientsService.createClient(asaasInput);

        const newUser = await ClientModel.create({
          ...input,
          password: hashedPassword,
          asaasId: asaasClient.id,
        });

        return newUser;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    updateClient: async (
      _,
      { id, input }: { id: string; input: UpdateClientInput },
      { user },
    ) => {
      onlyAdmin(user);

      const payload: Partial<UpdateClientInput> = { ...input };

      const client = await ClientModel.findOneAndUpdate(
        { asaasId: id },
        payload,
        { new: true },
      );

      if (!client) {
        console.error(`Client with externalReference ${id} not found.`);
        throw new GraphQLError("Client not found.");
      }

      await asaasClientsService.updateClient(id, input);

      return client;
    },

    deleteClient: async (_, { id }: { id: string }, { user }) => {
      onlyAdmin(user);

      const client = await ClientModel.findOne({ asaasId: id });

      if (!client) {
        console.error(`Client with asaasId ${id} not found.`);
        throw new GraphQLError("Client not found.");
      }

      // Deactivate the user in the database
      await ClientModel.updateOne(
        { asaasId: id },
        {
          active: false,
        },
      );

      await asaasClientsService.deleteClient(id);

      return true;
    },
  },
};
