import { accountDocumentStrategies } from '..';
import { AccountDocumentsStatus } from '../../../../modules/webhooks/enums/account-documents.enum';
import { IAccountDocumentStrategy } from '../accountDocumentStrategy';

export class DocumentEventStrategyContext {
  private strategies: { [key: string]: IAccountDocumentStrategy } = {};

  constructor() {
    this.strategies[AccountDocumentsStatus.ACCOUNT_STATUS_BANK_ACCOUNT_INFO_APPROVED] = new accountDocumentStrategies.AccountStatusBankAccountInfoApprovedStrategy();
    this.strategies[AccountDocumentsStatus.ACCOUNT_STATUS_BANK_ACCOUNT_INFO_AWAITING_APPROVAL] = new accountDocumentStrategies.AccountStatusBankAccountInfoAwaitingApprovalStrategy();
    this.strategies[AccountDocumentsStatus.ACCOUNT_STATUS_BANK_ACCOUNT_INFO_PENDING] = new accountDocumentStrategies.AccountStatusBankAccountInfoPendingStrategy();
    this.strategies[AccountDocumentsStatus.ACCOUNT_STATUS_BANK_ACCOUNT_INFO_REJECTED] = new accountDocumentStrategies.AccountStatusBankAccountInfoRejectedStrategy();
    this.strategies[AccountDocumentsStatus.ACCOUNT_STATUS_COMMERCIAL_INFO_APPROVED] = new accountDocumentStrategies.AccountStatusCommercialInfoApprovedStrategy();
    this.strategies[AccountDocumentsStatus.ACCOUNT_STATUS_COMMERCIAL_INFO_AWAITING_APPROVAL] = new accountDocumentStrategies.AccountStatusCommercialInfoAwaitingApprovalStrategy();
    this.strategies[AccountDocumentsStatus.ACCOUNT_STATUS_COMMERCIAL_INFO_PENDING] = new accountDocumentStrategies.AccountStatusCommercialInfoPendingStrategy();
    this.strategies[AccountDocumentsStatus.ACCOUNT_STATUS_COMMERCIAL_INFO_REJECTED] = new accountDocumentStrategies.AccountStatusCommercialInfoRejectedStrategy();
    this.strategies[AccountDocumentsStatus.ACCOUNT_STATUS_DOCUMENT_APPROVED] = new accountDocumentStrategies.AccountStatusDocumentApprovedStrategy();
    this.strategies[AccountDocumentsStatus.ACCOUNT_STATUS_DOCUMENT_AWAITING_APPROVAL] = new accountDocumentStrategies.AccountStatusDocumentAwaitingApprovalStrategy();
    this.strategies[AccountDocumentsStatus.ACCOUNT_STATUS_DOCUMENT_PENDING] = new accountDocumentStrategies.AccountStatusDocumentPendingStrategy();
    this.strategies[AccountDocumentsStatus.ACCOUNT_STATUS_DOCUMENT_REJECTED] = new accountDocumentStrategies.AccountStatusDocumentRejectedStrategy();
    this.strategies[AccountDocumentsStatus.ACCOUNT_STATUS_GENERAL_APPROVAL_APPROVED] = new accountDocumentStrategies.AccountStatusGeneralApprovalApprovedStrategy();
    this.strategies[AccountDocumentsStatus.ACCOUNT_STATUS_GENERAL_APPROVAL_AWAITING_APPROVAL] = new accountDocumentStrategies.AccountStatusGeneralApprovalAwaitingApprovalStrategy();
    this.strategies[AccountDocumentsStatus.ACCOUNT_STATUS_GENERAL_APPROVAL_PENDING] = new accountDocumentStrategies.AccountStatusGeneralApprovalPendingStrategy();
    this.strategies[AccountDocumentsStatus.ACCOUNT_STATUS_GENERAL_APPROVAL_REJECTED] = new accountDocumentStrategies.AccountStatusGeneralApprovalRejectedStrategy();
    this.strategies[AccountDocumentsStatus.ACCOUNT_STATUS_DOCUMENT_REJECTED] = new accountDocumentStrategies.AccountStatusDocumentRejectedStrategy();
    
  }

  async executeStrategy(event: string): Promise<void> {
    const strategy = this.strategies[event];
    if (strategy) {
      await strategy.handle(event);
    } else {
      console.log(`Unhandled event type: ${event}`);
    }
  }
}