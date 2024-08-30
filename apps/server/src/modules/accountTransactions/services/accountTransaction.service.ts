import { asaasClient } from "../../../utils/asaasClient.utils";
import { AccountTransactionModel } from "../../../models";

class AccountTransactionService {
  async createTransaction(transactionData: {
    value: number;
    bankAccount?: {
      bank: {
        accountName: string;
        ownerName: string;
        ownerBirthDate?: string;
        cpfCnpj: string;
        agency: string;
        account: string;
        accountDigit: string;
        bankAccountType?: string;
        ispb?: string;
      };
    };
    operationType?: string;
    pixAddressKey?: string;
    pixAddressKeyType?: string;
    description?: string;
    scheduleDate?: string;
    accountUserId: string;
    asaasId: string;
  }) {
    try {
      const response = await asaasClient.post("/transfers", transactionData);

      const transaction = new AccountTransactionModel({
        object: response.data.object,
        id: response.data.id,
        type: response.data.type,
        dateCreated: new Date(response.data.dateCreated),
        value: response.data.value,
        netValue: response.data.netValue,
        status: response.data.status,
        transferFee: response.data.transferFee,
        effectiveDate: response.data.effectiveDate
          ? new Date(response.data.effectiveDate)
          : null,
        endToEndIdentifier: response.data.endToEndIdentifier,
        scheduleDate: new Date(response.data.scheduleDate),
        authorized: response.data.authorized,
        failReason: response.data.failReason,
        bankAccount: response.data.bankAccount,
        transactionReceiptUrl: response.data.transactionReceiptUrl,
        operationType: response.data.operationType,
        description: response.data.description,
        asaasId: transactionData.asaasId,
        accountUserId: transactionData.accountUserId,
      });

      await transaction.save();

      return transaction;
    } catch (error) {
      console.error(
        "Error creating transaction:",
        error.response?.data || error.message,
      );
      throw new Error("Failed to create transaction in Asaas");
    }
  }

  async getTransactionById(id: string) {
    try {
      const transaction = await AccountTransactionModel.findOne({ id });
      if (!transaction) {
        throw new Error("Transaction not found.");
      }
      return transaction;
    } catch (error) {
      console.error("Error retrieving transaction from database:", error);
      throw new Error("Failed to retrieve transaction from database");
    }
  }
}

export const accountTransactionService = new AccountTransactionService();
