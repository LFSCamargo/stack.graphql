import { AccountUserModel, DocumentEventModel } from '../../../models';
import { AccountStatus } from '../../../modules/accountUser/enums/accountStatus.enum';

export interface IAccountDocumentStrategy {
  handle(event): Promise<void>;
}

export class AccountStatusBankAccountInfoApprovedStrategy implements IAccountDocumentStrategy {
  async handle(event): Promise<void> {
    console.log('Account status bank account info approved:', event);
      await DocumentEventModel.create({
      eventId: event.id,
      eventType: event.event,
      dateCreated: new Date(event.dateCreated),
      accountStatus: event.accountStatus,
    });
  }
}

export class AccountStatusBankAccountInfoAwaitingApprovalStrategy implements IAccountDocumentStrategy {
  async handle(event): Promise<void> {
    console.log('Account status bank account info awaiting approval:', event);
      await DocumentEventModel.create({
      eventId: event.id,
      eventType: event.event,
      dateCreated: new Date(event.dateCreated),
      accountStatus: event.accountStatus,
    });
  }
}

export class AccountStatusBankAccountInfoPendingStrategy implements IAccountDocumentStrategy {
  async handle(event): Promise<void> {
    console.log('Account status bank account info pending:', event);
      await DocumentEventModel.create({
      eventId: event.id,
      eventType: event.event,
      dateCreated: new Date(event.dateCreated),
      accountStatus: event.accountStatus,
    });
  }
}

export class AccountStatusBankAccountInfoRejectedStrategy implements IAccountDocumentStrategy {
  async handle(event): Promise<void> {
    console.log('Account status bank account info rejected:', event);
      await DocumentEventModel.create({
      eventId: event.id,
      eventType: event.event,
      dateCreated: new Date(event.dateCreated),
      accountStatus: event.accountStatus,
    });
  }
}

export class AccountStatusCommercialInfoApprovedStrategy implements IAccountDocumentStrategy {
  async handle(event): Promise<void> {
    console.log('Account status commercial info approved:', event);
      await DocumentEventModel.create({
      eventId: event.id,
      eventType: event.event,
      dateCreated: new Date(event.dateCreated),
      accountStatus: event.accountStatus,
    });
  }
}

export class AccountStatusCommercialInfoAwaitingApprovalStrategy implements IAccountDocumentStrategy {
  async handle(event): Promise<void> {
    console.log('Account status commercial info awaiting approval:', event);
      await DocumentEventModel.create({
      eventId: event.id,
      eventType: event.event,
      dateCreated: new Date(event.dateCreated),
      accountStatus: event.accountStatus,
    });
  }
}

export class AccountStatusCommercialInfoPendingStrategy implements IAccountDocumentStrategy {
  async handle(event): Promise<void> {
    console.log('Account status commercial info pending:', event);
      await DocumentEventModel.create({
      eventId: event.id,
      eventType: event.event,
      dateCreated: new Date(event.dateCreated),
      accountStatus: event.accountStatus,
    });
  }
}

export class AccountStatusCommercialInfoRejectedStrategy implements IAccountDocumentStrategy {
  async handle(event): Promise<void> {
    console.log('Account status commercial info rejected:', event);
      await DocumentEventModel.create({
      eventId: event.id,
      eventType: event.event,
      dateCreated: new Date(event.dateCreated),
      accountStatus: event.accountStatus,
    });
  }
}

export class AccountStatusDocumentApprovedStrategy implements IAccountDocumentStrategy {
  async handle(event): Promise<void> {
    console.log('Account status document approved:', event);
    await DocumentEventModel.create({
      eventId: event.id,
      eventType: event.event,
      dateCreated: new Date(event.dateCreated),
      accountStatus: event.accountStatus,
    });

    const accountId = event.accountStatus.id;
    const documentationStatus = event.accountStatus.documentation;

    if (documentationStatus === "APPROVED") {
      const user = await AccountUserModel.findById(accountId);
      if (user) {
        user.accountStatus = AccountStatus.ACTIVE;
        await user.save();
      } else {
        console.warn(`User with ID ${accountId} not found`);
      }
    }
  }
}

export class AccountStatusDocumentAwaitingApprovalStrategy implements IAccountDocumentStrategy {
  async handle(event): Promise<void> {
    console.log('Account status document awaiting approval:', event);
      await DocumentEventModel.create({
      eventId: event.id,
      eventType: event.event,
      dateCreated: new Date(event.dateCreated),
      accountStatus: event.accountStatus,
    });
  }
}

export class AccountStatusDocumentPendingStrategy implements IAccountDocumentStrategy {
  async handle(event): Promise<void> {
    console.log('Account status document pending:', event);
      await DocumentEventModel.create({
      eventId: event.id,
      eventType: event.event,
      dateCreated: new Date(event.dateCreated),
      accountStatus: event.accountStatus,
    });
  }
}

export class AccountStatusDocumentRejectedStrategy implements IAccountDocumentStrategy {
  async handle(event): Promise<void> {
    console.log('Account status document rejected:', event);
      await DocumentEventModel.create({
      eventId: event.id,
      eventType: event.event,
      dateCreated: new Date(event.dateCreated),
      accountStatus: event.accountStatus,
    });
  }
}

export class AccountStatusGeneralApprovalApprovedStrategy implements IAccountDocumentStrategy {
  async handle(event): Promise<void> {
    console.log('Account status general approval approved:', event);
      await DocumentEventModel.create({
      eventId: event.id,
      eventType: event.event,
      dateCreated: new Date(event.dateCreated),
      accountStatus: event.accountStatus,
    });
  }
}

export class AccountStatusGeneralApprovalAwaitingApprovalStrategy implements IAccountDocumentStrategy {
  async handle(event): Promise<void> {
    console.log('Account status general approval awaiting approval:', event);
      await DocumentEventModel.create({
      eventId: event.id,
      eventType: event.event,
      dateCreated: new Date(event.dateCreated),
      accountStatus: event.accountStatus,
    });
  }
}

export class AccountStatusGeneralApprovalPendingStrategy implements IAccountDocumentStrategy {
  async handle(event): Promise<void> {
    console.log('Account status general approval pending:', event);
      await DocumentEventModel.create({
      eventId: event.id,
      eventType: event.event,
      dateCreated: new Date(event.dateCreated),
      accountStatus: event.accountStatus,
    });
  }
}

export class AccountStatusGeneralApprovalRejectedStrategy implements IAccountDocumentStrategy {
  async handle(event): Promise<void> {
    console.log('Account status general approval rejected:', event);
      await DocumentEventModel.create({
      eventId: event.id,
      eventType: event.event,
      dateCreated: new Date(event.dateCreated),
      accountStatus: event.accountStatus,
    });
  }
}