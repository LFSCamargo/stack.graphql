import { asaasClientWithUserApiKey } from "../../../utils/asaasClient.utils";
import { AccountUserModel } from "../../../models/account-user.model";
import { ErrorMessages } from "../../../utils/errorMessages.enum";
import { Types } from 'mongoose';
import { DocumentResponse, SendedDocument } from "../types/accountDocumments.types";
import { MailingHandler } from "../../../mailing/handlers.mailing";

class AccountDocumentsService {
  private async fetchUserAndDocuments(userId: Types.ObjectId): Promise<{ user: any, documents: DocumentResponse }> {
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
      return { user, documents: response.data };
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

    await MailingHandler.sendDocumentsEmail(user.email, documentsToSend);
  }
}

export const accountDocumentsService = new AccountDocumentsService();