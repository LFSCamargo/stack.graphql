import { CardUserTransactionsModel } from "../models";

export const TransactionsUtility = {
  /**
   * @name getBalanceFromTransactions
   * @description Get the balance of the card user from the transactions aggregation
   * @param cardUserId - The card user id
   * @returns The balance of the card user ex: 1000
   */
  async getBalanceFromTransactions(cardUserId: string) {
    return await CardUserTransactionsModel.aggregate([
      {
        $match: {
          cardUserId,
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);
  },
};
