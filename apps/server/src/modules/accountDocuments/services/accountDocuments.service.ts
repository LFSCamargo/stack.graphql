import { asaasClientWithUserApiKey } from "../../../utils/asaasClient.utils";
import { AccountUserModel } from "../../../models/account-user.model";
import { ErrorMessages } from "../../../utils/errorMessages.enum";
import { Types } from 'mongoose';
import { DocumentResponse, SendedDocument, SubmitDocumentBody, SubmitDocumentResponse } from "../types/accountDocumments.types";
import { MailingHandler } from "../../../mailing/handlers.mailing";
import axios from 'axios';
import { AccountDocumentModel } from '../../../models';

class AccountDocumentsService {
  private async fetchUserAndDocuments(userId: Types.ObjectId): Promise<{ user, documents: DocumentResponse }> {
    const user = await AccountUserModel.findById(userId);
    if (!user) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    if (!user.asaasApiKey) {
      throw new Error("User does not have an ASAAS API key");
    }

    const client = asaasClientWithUserApiKey(user.asaasApiKey);

    // Asaas Rule: Wait for 15 seconds before making the request
    await new Promise(resolve => setTimeout(resolve, 15000));

    try {
      const response = await client.get<DocumentResponse>("/myAccount/documents");
      
      const documents = response.data;
      const documentRecords = documents.data.map(doc => ({
        userId,
        documentId: doc.id,
        status: doc.status,
        type: doc.type,
        title: doc.title,
        description: doc.description,
        responsible: doc.responsible,
        onboardingUrl: doc.onboardingUrl,
        documents: doc.documents,
      }));
      await AccountDocumentModel.insertMany(documentRecords);
      return { user, documents };
    } catch (error) {
      throw new Error(`Error retrieving documents: ${error.message}`);
    }
  }

  async getPendingDocuments(userId: Types.ObjectId): Promise<DocumentResponse> {
    const { documents } = await this.fetchUserAndDocuments(userId);
    return documents;
  }

  async sendPendingDocumentsToEmail(userId: Types.ObjectId): Promise<void> {
    const { user, documents } = await this.fetchUserAndDocuments(userId);

    const documentsToSend = documents.data.map((doc: SendedDocument) => ({
      type: doc.type,
      onboardingUrl: doc.onboardingUrl,
    }));

    await MailingHandler.accountDocumentsEmail({
      documents: documentsToSend,
      userEmail: user.email,
    });
  }

  async submitDocument(userId: Types.ObjectId, documentId: string, documentBody: SubmitDocumentBody): Promise<SubmitDocumentResponse> {
    const user = await AccountUserModel.findById(userId);
    if (!user) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    if (!user.asaasApiKey) {
      throw new Error("User does not have an ASAAS API key");
    }

    const formData = new FormData();
    formData.append('documentFile', documentBody.documentFile);
    formData.append('type', documentBody.type);

    const url = `${process.env.ASAAS_API_SANDBOX_URL}/myAccount/documents/${documentId}`;

    try {
      const response = await axios.post<SubmitDocumentResponse>(url, formData, {
        headers: {
          'accept': 'application/json',
          'access_token': user.asaasApiKey,
          //...Object.fromEntries(formData.entries()
          ...formData.getHeaders()
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error submitting document: ${error.message}`);
    }
  }

  async updateDocument(userId: Types.ObjectId, documentId: string, documentFile: File): Promise<SubmitDocumentResponse> {
    const user = await AccountUserModel.findById(userId);
    if (!user) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    if (!user.asaasApiKey) {
      throw new Error("User does not have an ASAAS API key");
    }

    const formData = new FormData();
    formData.append('documentFile', documentFile);

    const url = `${process.env.ASAAS_API_SANDBOX_URL}/myAccount/documents/files/${documentId}`;

    try {
      const response = await axios.post<SubmitDocumentResponse>(url, formData, {
        headers: {
          'accept': 'application/json',
          'access_token': user.asaasApiKey,
          ...formData.getHeaders()
        }
      });
      return response.data;
    } catch (error) {
      throw new Error(`Error updating document: ${error.message}`);
    }
  }

  async removeDocument(userId: Types.ObjectId, documentId: string): Promise<{ deleted: boolean, id: string }> {
    const user = await AccountUserModel.findById(userId);
    if (!user) {
      throw new Error(ErrorMessages.USER_NOT_FOUND);
    }

    if (!user.asaasApiKey) {
      throw new Error("User does not have an ASAAS API key");
    }
    try {
      const response = await asaasClientWithUserApiKey(user.asaasApiKey).delete(`/myAccount/documents/files/${documentId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error removing document: ${error.message}`);
    }
  }
}

export const accountDocumentsService = new AccountDocumentsService();