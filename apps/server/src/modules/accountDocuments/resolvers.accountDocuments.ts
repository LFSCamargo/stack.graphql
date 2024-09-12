import { accountDocumentsService } from "./services/accountDocuments.service";
import { Types } from "mongoose";

export const accountDocumentsResolvers = {
  Query: {
    getPendingDocuments: async (_, __, { userId }: { userId: string }) => {
      const objectId = new Types.ObjectId(userId);
      return await accountDocumentsService.getPendingDocuments(objectId);
    },
  },
  Mutation: {
    sendPendingDocumentsToEmail: async (_, __, { userId }: { userId: string }) => {
      const objectId = new Types.ObjectId(userId);
      await accountDocumentsService.sendPendingDocumentsToEmail(objectId);
      return true;
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    submitDocument: async (_, __, { userId, documentId, documentBody }: { userId: string, documentId: string, documentBody: any }) => {
      const objectId = new Types.ObjectId(userId);
      return await accountDocumentsService.submitDocument(objectId, documentId, documentBody);
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateDocument: async (_, __, { userId, documentId, documentBody }: { userId: string, documentId: string, documentBody: any }) => {
      const objectId = new Types.ObjectId(userId);
      return await accountDocumentsService.updateDocument(objectId, documentId, documentBody.documentFile);
    },

    removeDocument: async (_, __, { userId, documentId }: { userId: string, documentId: string }) => {
      const objectId = new Types.ObjectId(userId);
      return await accountDocumentsService.removeDocument(objectId, documentId);
    },
  },
};