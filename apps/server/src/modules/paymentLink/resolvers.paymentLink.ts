import { GraphQLError } from "graphql";
import { paymentLinkService } from "./services/paymentLink.service";
import { CreatePaymentLinkInput } from "./types/paymentLink.types";
import { TResolvers } from "../../types";
import { onlyAdmin, onlyLoggedAccountUser } from "../../guards";
import { IAccountUserSchema } from '../../models';

export const PaymentLinkResolvers: TResolvers = {
  Query: {
    getPaymentLinksByUser: async (_, { userId }, { user }) => {
      onlyLoggedAccountUser(user as IAccountUserSchema | null);
      try {
        if (user?._id !== userId) {
          throw new GraphQLError("Unauthorized");
        }
        const paymentLinks = await paymentLinkService.getPaymentLinksByUser(userId);
        return paymentLinks;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    listPaymentLinks: async (_, { queryParams }, { user }) => {
      onlyLoggedAccountUser(user as IAccountUserSchema | null);
      try {
        const paymentLinks = await paymentLinkService.listPaymentLinks(queryParams, user?._id);
        return paymentLinks;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    listAllPaymentLinks: async (_, { queryParams }, { user }) => {
      onlyAdmin(user);
      try {
        const paymentLinks = await paymentLinkService.listPaymentLinks(queryParams, user?._id);
        return paymentLinks;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
  Mutation: {
    createPaymentLink: async (_, { input }: { input: CreatePaymentLinkInput }, { user }) => {
      onlyLoggedAccountUser(user as IAccountUserSchema | null);
      try {
        const paymentLink = await paymentLinkService.createPaymentLink(user?._id, input);
        return paymentLink;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
    createPaymentLinkForUser: async (_, { input, intendedUserId }: { input: CreatePaymentLinkInput, intendedUserId: string }, { user }) => {
      onlyLoggedAccountUser(user as IAccountUserSchema | null);
      try {
        const paymentLink = await paymentLinkService.createPaymentLinkForUser(user?._id, intendedUserId, input);
        return paymentLink;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};