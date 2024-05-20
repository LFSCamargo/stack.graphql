import { onlyAdmin, onlyLoggedCardUser } from "../../guards";
import { MailingHandler } from "../../mailing/handlers.mailing";
import { RequestModel } from "../../models";
import { GraphQLInput, GraphQLPaginationInput, TResolvers } from "../../types";
import { PaginationUtility } from "../../utils";
import {
  TCreateChangePasswordRequestInput,
  TCreatePixRequestInput,
  TCreateTedRequestInput,
} from "./types";

export const RequestsResolvers: TResolvers = {
  Query: {
    myRequests: async (
      _,
      { input }: GraphQLInput<GraphQLPaginationInput>,
      { creditUser },
    ) => {
      onlyLoggedCardUser(creditUser);

      const { count, data, pageInfo } =
        await PaginationUtility.paginateCollection(
          RequestModel,
          {
            cardUserId: creditUser._id,
          },
          input.limit,
          input.offset,
        );

      return {
        count,
        data,
        pageInfo,
      };
    },
    request: async (_, { id }, { user }) => {
      onlyAdmin(user);

      const request = await RequestModel.findOne({
        _id: id,
      });

      return request;
    },
    requests: async (
      _,
      {
        input,
        status,
        type,
      }: GraphQLInput<GraphQLPaginationInput> & {
        status?: "PENDING" | "APPROVED" | "REJECTED" | "CANCELED";
        type?: "WITHDRAWAL" | "CARD_PASSWORD_CHANGE";
      },
      { user },
    ) => {
      onlyAdmin(user);

      const params: {
        status?: "PENDING" | "APPROVED" | "REJECTED" | "CANCELED";
        type?: "WITHDRAWAL" | "CARD_PASSWORD_CHANGE";
      } = {};

      if (status) {
        params.status = status;
      }

      if (type) {
        params.type = type;
      }

      const { count, data, pageInfo } =
        await PaginationUtility.paginateCollection(
          RequestModel,
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
  },
  Mutation: {
    createPixRequest: async (
      _,
      { input }: GraphQLInput<TCreatePixRequestInput>,
      { creditUser },
    ) => {
      onlyLoggedCardUser(creditUser);

      const request = new RequestModel({
        type: "WITHDRAWAL",
        cardUserId: creditUser._id,
        status: "PENDING",
        reason: "Pix Request",
        active: true,
        payload: {
          type: "PIX",
          payload: {
            cpf: input.cpf,
            name: input.name,
            pixKey: input.pixKey,
            ammount: input.ammount,
          },
        },
      });

      await request.save();

      const currentDate = new Date();

      await MailingHandler.pixRequestEmail({
        cardNumber: creditUser.cardNumber,
        ammount: input.ammount,
        cpf: input.cpf,
        name: input.name,
        pixKey: input.pixKey,
        date: `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`,
      });

      return await RequestModel.findOne({
        _id: request._id,
      });
    },
    createTedRequest: async (
      _,
      { input }: GraphQLInput<TCreateTedRequestInput>,
      { creditUser },
    ) => {
      onlyLoggedCardUser(creditUser);

      const request = new RequestModel({
        type: "WITHDRAWAL",
        cardUserId: creditUser._id,
        status: "PENDING",
        reason: "Ted Request",
        active: true,
        payload: {
          type: "TED",
          payload: {
            cpf: input.cpf,
            name: input.name,
            bankCode: input.bankCode,
            agency: input.agency,
            accountDigit: input.accountDigit,
            ammount: input.ammount,
          },
        },
      });

      await request.save();

      const currentDate = new Date();

      await MailingHandler.tedRequestEmail({
        cardNumber: creditUser.cardNumber,
        ammount: input.ammount,
        cpf: input.cpf,
        name: input.name,
        bankCode: input.bankCode,
        agency: input.agency,
        accountDigit: input.accountDigit,
        date: `${currentDate.getFullYear()}-${currentDate.getMonth()}-${currentDate.getDate()}`,
      });

      return await RequestModel.findOne({
        _id: request._id,
      });
    },
    createCardPasswordChangeRequest: async (
      _,
      { input }: GraphQLInput<TCreateChangePasswordRequestInput>,
      { creditUser },
    ) => {
      onlyLoggedCardUser(creditUser);

      const request = new RequestModel({
        type: "CARD_PASSWORD_CHANGE",
        cardUserId: creditUser._id,
        status: "PENDING",
        reason: "Card Password Change Request",
        active: true,
        payload: {
          oldCardPassword: input.oldCardPassword,
          newCardPassword: input.newCardPassword,
        },
      });

      await request.save();

      await MailingHandler.cardPasswordChangeEmail({
        cardNumber: creditUser.cardNumber,
        name: creditUser.name,
        newPassword: input.newCardPassword,
        oldPassword: input.oldCardPassword,
      });

      return await RequestModel.findOne({
        _id: request._id,
      });
    },

    approveRequest: async (_, { id }, { user }) => {
      onlyAdmin(user);

      const request = await RequestModel.findOne({
        _id: id,
      });

      if (!request) {
        throw new Error("Request not found");
      }

      request.status = "APPROVED";

      await request.save();

      return await RequestModel.findOne({
        _id: id,
      });
    },
    rejectRequest: async (_, { id }, { user }) => {
      onlyAdmin(user);

      const request = await RequestModel.findOne({
        _id: id,
      });

      if (!request) {
        throw new Error("Request not found");
      }

      request.status = "REJECTED";

      await request.save();
    },
    cancelRequest: async (_, { id }, { creditUser }) => {
      onlyLoggedCardUser(creditUser);

      const request = await RequestModel.findOne({
        _id: id,
        cardUserId: creditUser._id,
      });

      if (!request) {
        throw new Error("Request not found");
      }

      request.status = "CANCELED";

      await request.save();

      return request;
    },
  },
};
