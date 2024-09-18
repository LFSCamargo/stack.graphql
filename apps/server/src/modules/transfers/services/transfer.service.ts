import { CancelTransferResponse, ListTransfersRequest, ListTransfersResponse, RecoverTransfer, TransferRequest, TransferResponse, TransferToAsaasAccountRequest, TransferToAsaasAccountResponse } from '../types/transfer.types';
import { AccountUserModel } from '../../../models/account-user.model';
import { ErrorMessages } from '../../../utils/errorMessages.enum';
import { asaasClient } from '../../../utils/asaasClient.utils';
import { TransferModel } from '../../../models/transfers.model';
import { Types } from 'mongoose';

class TransferService {
  async createTransfer(asaasId: string, transferRequest: TransferRequest): Promise<TransferResponse> {
    const user = await AccountUserModel.findById(asaasId);
    if (!user) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    if (!user.asaasApiKey) {
      throw new Error("User does not have an ASAAS API key");
    }

    try {
      const response = await asaasClient.post<TransferResponse>('/transfers', transferRequest);

      await TransferModel.create({
        ...transferRequest,
        userId: user._id,
        transferId: response.data.id
      });

      return response.data;
    } catch (error) {
      throw new Error(`Error creating transfer: ${error.message}`);
    }
  }

  async createTransferToAsaasAccount(userId: Types.ObjectId, transferRequest: TransferToAsaasAccountRequest): Promise<TransferToAsaasAccountResponse> {
    const user = await AccountUserModel.findById(userId);
    if (!user) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    if (!user.asaasApiKey) {
      throw new Error("User does not have an ASAAS API key");
    }

    try {
      const response = await asaasClient.post<TransferToAsaasAccountResponse>('/transfers', transferRequest);

      // Save the transfer response in the database
      const transferData = response.data;
      await TransferModel.create({
        userId,
        object: transferData.object,
        transferId: transferData.id,
        type: transferData.type,
        dateCreated: new Date(transferData.dateCreated),
        value: transferData.value,
        netValue: transferData.netValue,
        status: transferData.status,
        transferFee: transferData.transferFee,
        effectiveDate: transferData.effectiveDate ? new Date(transferData.effectiveDate) : null,
        endToEndIdentifier: transferData.endToEndIdentifier,
        scheduleDate: new Date(transferData.scheduleDate),
        authorized: transferData.authorized,
        failReason: transferData.failReason,
        walletId: transferData.walletId,
        account: transferData.account,
        transactionReceiptUrl: transferData.transactionReceiptUrl,
        operationType: transferData.operationType,
        description: transferData.description,
      });

      return transferData;
    } catch (error) {
      throw new Error(`Error creating transfer to Asaas account: ${error.message}`);
    }
  }

  async listTransfers(userId: Types.ObjectId, filters: ListTransfersRequest): Promise<ListTransfersResponse> {
    const user = await AccountUserModel.findById(userId);
    if (!user) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    if (!user.asaasApiKey) {
      throw new Error("User does not have an ASAAS API key");
    }

    const params = this.buildQueryParams(filters);

    try {
      const response = await asaasClient.get<ListTransfersResponse>(`/transfers?${params}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error listing transfers: ${error.message}`);
    }
  }

  private buildQueryParams(filters: ListTransfersRequest): string {
    const params = new URLSearchParams();

    Object.entries(filters).forEach(([key, value]) => {
      if (value) {
        params.append(key, value);
      }
    });

    return params.toString();
  }

  async getTransferById(userId: Types.ObjectId, transferId: string): Promise<RecoverTransfer> {
    const user = await AccountUserModel.findById(userId);
    if (!user) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    if (!user.asaasApiKey) {
      throw new Error("User does not have an ASAAS API key");
    }



    try {
      const response = await asaasClient.get<RecoverTransfer>(`/transfers/${transferId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error retrieving transfer: ${error.message}`);
    }
  }


  async cancelTransfer(userId: Types.ObjectId, transferId: string): Promise<CancelTransferResponse> {
    const user = await AccountUserModel.findById(userId);
    if (!user) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    if (!user.asaasApiKey) {
      throw new Error("User does not have an ASAAS API key");
    }


    try {
      const response = await asaasClient.delete<CancelTransferResponse>(`/transfers/${transferId}/cancel`);
      return response.data;
    } catch (error) {
      throw new Error(`Error canceling transfer: ${error.message}`);
    }
  }
}

export const transferService = new TransferService();