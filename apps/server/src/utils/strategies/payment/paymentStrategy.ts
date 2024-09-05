import { accountUserService } from '../../../modules/accountUser/services/accountUser.service';

export interface IPaymentStrategy {
  handle(event: string): Promise<void>;
}

export class PaymentConfirmedStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment confirmed:', receivedEvent);
    await accountUserService.handlePaymentConfirmed(receivedEvent);
  }
}

export class PaymentCreatedStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment created:', receivedEvent);
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

export class PaymentReceivedStrategy implements IPaymentStrategy {
  async handle(receivedEvent: string): Promise<void> {
    console.log('Payment received:', receivedEvent);
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