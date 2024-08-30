import { GraphQLError } from "graphql";
import { TResolvers } from "../../types";
import { onlyLoggedAccountUser } from "../../guards/onlyLoggedAccountUser.guard";
import { accountTransactionService } from "./services/accountTransaction.service";
import { AccountUserModel } from "../../models/account-user.model";

export const AccountTransactionResolvers: TResolvers = {
  Query: {},

  Mutation: {
    createTransaction: async (_, { input }, { accountUser }) => {
      onlyLoggedAccountUser(accountUser);

      try {
        const user = await AccountUserModel.findById(accountUser._id);
        if (!user) {
          throw new GraphQLError("Account user not found");
        }

        const transactionData = {
          ...input,
          accountUserId: user._id,
          asaasId: user.asaasId,
        };

        const transaction =
          await accountTransactionService.createTransaction(transactionData);
        return transaction;
      } catch (error) {
        throw new GraphQLError(error.message);
      }
    },
  },
};
