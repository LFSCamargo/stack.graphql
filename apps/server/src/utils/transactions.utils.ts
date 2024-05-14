import { CardUserTransactionsModel } from "../models";

export const TransactionsUtility = {
  /**
   * @name getBalanceFromTransactions
   * @description Get the balance of the card user from the transactions aggregation
   * @param cardUserId - The card user id
   * @returns The balance of the card user ex: 1000
   */
  async getBalanceFromTransactions(cardUserId: string) {
    const lastUserTransaction = await CardUserTransactionsModel.findOne({
      cardUserId,
    }).sort({ createdAt: -1 });

    return lastUserTransaction?.balanceUpdated || 0;
  },

  async getChangeFromTransactions(cardUserId: string) {
    // get the last transaction
    const lastUserTransaction = await CardUserTransactionsModel.findOne({
      cardUserId,
    }).sort({ date: -1 });

    // get the first transaction
    const firstUserTransaction = await CardUserTransactionsModel.findOne({
      cardUserId,
    }).sort({ date: 1 });

    const lastMonthTimestamp = new Date(
      new Date().setMonth(new Date().getMonth() - 1),
    ).getTime();

    if (
      lastUserTransaction &&
      firstUserTransaction &&
      firstUserTransaction.createdAt.getTime() > lastMonthTimestamp
    ) {
      return (
        ((lastUserTransaction?.balanceUpdated || 0) -
          (firstUserTransaction?.balanceUpdated || 0)) /
        (firstUserTransaction?.balanceUpdated || 0)
      );
    }

    const lastMonthTransaction = await CardUserTransactionsModel.findOne({
      cardUserId,
      createdAt: {
        $lt: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      },
    }).sort({ createdAt: -1 });

    if (lastUserTransaction && lastMonthTransaction) {
      return (
        ((lastUserTransaction?.balanceUpdated || 0) -
          (lastMonthTransaction?.balanceUpdated || 0)) /
        (lastMonthTransaction?.balanceUpdated || 0)
      );
    }

    return 0;
  },
};
