import { AccountUserModel } from '../../../models';
import { AccountStatus } from '../../../modules/accountUser/enums/accountStatus.enum';
import { accountUserService } from '../../../modules/accountUser/services/accountUser.service';
import { Types } from 'mongoose';
import { asaasCustomersService } from '../../../modules/customer/services/customer.service';

export interface IPaymentStrategy {
  handle(event: string, data?): Promise<void>;
}

export class PaymentConfirmedStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string, data): Promise<void> {
    console.log('Payment confirmed:', receivedEvent);
  }
}
export class PaymentReceivedStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string, data): Promise<void> {
    console.log('Payment received:', receivedEvent);
    if(data.payment.paymentLink === null) {
      console.log('Payment is not related to account creation, skipping...')
      return
    }

    const customerId = data.payment.customer;
    console.log('aqui o customerId', customerId)
    try {
      const user = await AccountUserModel.findOne({ customerId: customerId });
      if(user && user.accountStatus === AccountStatus.WAITING_PAYMENT) {
        await accountUserService.handleAccountUserPaymentReceived(user._id as Types.ObjectId);
        user.accountStatus = AccountStatus.WAITING_DOCUMENTS;
        await user.save();
        console.log('User account status updated to WAITING_DOCUMENTS');
        //await asaasCustomersService.createCustomerDB(user);
        return
      } 
    } catch (error) {
      console.error('User not found with customerId:', customerId);
    }
  }
}
export class PaymentCreatedStrategy implements IPaymentStrategy {
  async handle(event: string, data): Promise<void> {
    console.log('Payment created:', event);

    const customerId = data.payment.customer;
    console.log('aqui o que veio', data)
    try {
      const customer = await asaasCustomersService.getCustomerById(customerId);
      console.log('aqui o customer', customer)
      const user = await AccountUserModel.findOne({ name: customer.name, cpfCnpj: customer.cpfCnpj });

      console.log('aqui cara', user)
      if(user) {
        user.customerId = customerId;
        await user.save();
        console.log('User updated:', user);
      }
    } catch (error) {
      console.error('User not found with customerId:', customerId);
    }
  }
}

export class PaymentAwaitingRiskAnalysisStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment awaiting risk analysis:', receivedEvent);
  }
}

export class PaymentApprovedByRiskAnalysisStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment approved by risk analysis:', receivedEvent);
  }
}

export class PaymentReprovedByRiskAnalysisStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment reproved by risk analysis:', receivedEvent);
  }
}

export class PaymentAuthorizedStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment authorized:', receivedEvent);
  }
}

export class PaymentUpdatedStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment updated:', receivedEvent);
  }
}

export class PaymentCreditCardCaptureRefusedStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment credit card capture refused:', receivedEvent);
  }
}

export class PaymentAnticipatedStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment anticipated:', receivedEvent);
  }
}

export class PaymentOverdueStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment overdue:', receivedEvent);
  }
}

export class PaymentDeletedStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment deleted:', receivedEvent);
  }
}

export class PaymentRestoredStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment restored:', receivedEvent);
  }
}

export class PaymentRefundedStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment refunded:', receivedEvent);
  }
}

export class PaymentPartiallyRefundedStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment partially refunded:', receivedEvent);
  }
}

export class PaymentRefundInProgressStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment refund in progress:', receivedEvent);
  }
}

export class PaymentReceivedInCashUndoneStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment received in cash undone:', receivedEvent);
  }
}

export class PaymentChargebackRequestedStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment chargeback requested:', receivedEvent);
  }
}

export class PaymentChargebackDisputeStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment chargeback dispute:', receivedEvent);
  }
}

export class PaymentAwaitingChargebackReversalStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment awaiting chargeback reversal:', receivedEvent);
  }
}

export class PaymentDunningReceivedStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment dunning received:', receivedEvent);
  }
}

export class PaymentDunningRequestedStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment dunning requested:', receivedEvent);
  }
}

export class PaymentBankSlipViewedStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment bank slip viewed:', receivedEvent);
  }
}

export class PaymentCheckoutViewedStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment checkout viewed:', receivedEvent);
  }
}