import { onlyLoggedAccountUser } from '../../guards';
import { transferService } from './services/transfer.service';
import { Types } from 'mongoose';
import { ListTransfersRequest, TransferToAsaasAccountRequest } from './types/transfer.types';

export const transferResolvers = {
  Query: {
    listTransfers: async (_, { userId, filters }: { userId: string, filters: ListTransfersRequest }) => {
      const objectId = new Types.ObjectId(userId);
      return await transferService.listTransfers(objectId, filters);
    },
    getTransferById: async (_, { userId, transferId }: { userId: string, transferId: string }) => {
      const objectId = new Types.ObjectId(userId);
      return await transferService.getTransferById(objectId, transferId);
    },
  },
  Mutation: {
    createTransfer: async (_,__, { user, transferRequest }: { user, transferRequest }) => {
      onlyLoggedAccountUser(user);
      return await transferService.createTransfer(user.asaasId as string, transferRequest);
    },
    createTransferToAsaasAccount: async (_, { userId, transferRequest }: { userId: string, transferRequest: TransferToAsaasAccountRequest }) => {
      const objectId = new Types.ObjectId(userId);
      return await transferService.createTransferToAsaasAccount(objectId, transferRequest);
    },
    cancelTransfer: async (_, { userId, transferId }: { userId: string, transferId: string }) => {
      const objectId = new Types.ObjectId(userId);
      return await transferService.cancelTransfer(objectId, transferId);
    },
  },
};