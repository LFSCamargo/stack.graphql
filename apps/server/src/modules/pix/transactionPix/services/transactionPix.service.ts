import { asaasClient } from "../../../../utils/asaasClient.utils";
import { TransactionPixModel, DecodedPixModel } from "../../../../models";

class TransactionPixService {
  async createTransactionPix(input: {
    qrCode: { payload: string; changeValue?: number };
    value: number;
    description?: string;
    scheduleDate?: string;
  }) {
    try {
      const response = await asaasClient.post("/pix/qrCodes/pay", input);

      const transactionPix = new TransactionPixModel({
        id: response.data.id,
        endToEndIdentifier: response.data.endToEndIdentifier,
        finality: response.data.finality,
        value: response.data.value,
        changeValue: response.data.changeValue,
        refundedValue: response.data.refundedValue,
        effectiveDate: response.data.effectiveDate,
        scheduledDate: response.data.scheduledDate,
        status: response.data.status,
        type: response.data.type,
        originType: response.data.originType,
        description: response.data.description,
        transactionReceiptUrl: response.data.transactionReceiptUrl,
        refusalReason: response.data.refusalReason,
        canBeCanceled: response.data.canBeCanceled,
        originalTransaction: response.data.originalTransaction,
        externalAccount: response.data.externalAccount,
        qrCode: response.data.qrCode,
        payment: response.data.payment,
        canBeReunded: response.data.canBeReunded,
        refundDisabledReason: response.data.refundDisabledReason,
        chargedFeeValue: response.data.chargedFeeValue,
        dateCreated: response.data.dateCreated,
        addressKey: response.data.addressKey,
        addressKeyType: response.data.addressKeyType,
        transferId: response.data.transferId,
        externalReference: response.data.externalReference,
      });

      await transactionPix.save();

      return transactionPix;
    } catch (error) {
      console.error("Error creating PIX transaction in Asaas:", error);
      throw new Error("Failed to create PIX transaction in Asaas");
    }
  }

  async decodePix(input: { payload: string; changeValue?: number }) {
    try {
      const response = await asaasClient.post("/pix/qrCodes/decode", input);

      const decodedPix = new DecodedPixModel({
        payload: response.data.payload,
        type: response.data.type,
        transactionOriginType: response.data.transactionOriginType,
        pixKey: response.data.pixKey,
        conciliationIdentifier: response.data.conciliationIdentifier,
        endToEndIdentifier: response.data.endToEndIdentifier,
        dueDate: response.data.dueDate,
        expirationDate: response.data.expirationDate,
        finality: response.data.finality,
        value: response.data.value,
        changeValue: response.data.changeValue,
        interest: response.data.interest,
        fine: response.data.fine,
        discount: response.data.discount,
        totalValue: response.data.totalValue,
        canBePaidWithDifferentValue: response.data.canBePaidWithDifferentValue,
        canBeModifyChangeValue: response.data.canBeModifyChangeValue,
        receiver: response.data.receiver,
        payer: response.data.payer,
        description: response.data.description,
        canBePaid: response.data.canBePaid,
        cannotBePaidReason: response.data.cannotBePaidReason,
      });

      await decodedPix.save();

      return decodedPix;
    } catch (error) {
      console.error("Error decoding PIX QR code in Asaas:", error);
      throw new Error("Failed to decode PIX QR code in Asaas");
    }
  }

  async getTransactionPix(id: string) {
    try {
      const response = await asaasClient.get(`/pix/transactions/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error retrieving PIX transaction from Asaas:", error);
      throw new Error("Failed to retrieve PIX transaction from Asaas");
    }
  }
  async listTransactionPix(input: {
    status?: string;
    type?: string;
    endToEndIdentifier?: string;
    offset?: number;
    limit?: number;
  }) {
    try {
      const response = await asaasClient.get("/pix/transactions", {
        params: input,
      });
      return response.data;
    } catch (error) {
      console.error("Error listing PIX transactions from Asaas:", error);
      throw new Error("Failed to list PIX transactions from Asaas");
    }
  }
  async cancelTransactionPix(id: string) {
    try {
      const response = await asaasClient.post(`/pix/transactions/${id}/cancel`);
      return response.data;
    } catch (error) {
      console.error("Error canceling PIX transaction in Asaas:", error);
      throw new Error("Failed to cancel PIX transaction in Asaas");
    }
  }
  s;
}

export const transactionPixService = new TransactionPixService();
