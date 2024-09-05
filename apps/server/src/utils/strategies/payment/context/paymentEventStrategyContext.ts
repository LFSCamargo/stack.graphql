import { PaymentEvents } from '../../../../modules/webhooks/enums/payment-events.enum';
import { paymentStrategies } from '../index';
import { IPaymentStrategy } from '../paymentStrategy';

export class PaymentEventStrategyContext {
  private strategies: { [key: string]: IPaymentStrategy } = {};

  constructor() {
    this.strategies[PaymentEvents.PAYMENT_CONFIRMED] = new paymentStrategies.PaymentConfirmedStrategy();
    this.strategies[PaymentEvents.PAYMENT_CREATED] = new paymentStrategies.PaymentCreatedStrategy();
    this.strategies[PaymentEvents.PAYMENT_AUTHORIZED] = new paymentStrategies.PaymentAuthorizedStrategy();
    this.strategies[PaymentEvents.PAYMENT_RECEIVED] = new paymentStrategies.PaymentReceivedStrategy();
    
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