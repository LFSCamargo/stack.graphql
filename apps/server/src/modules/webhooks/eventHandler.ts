import { PaymentEventModel, DocumentEventModel, IPaymentEventSchema, IDocumentEventSchema } from '../../models';
import { PaymentEventStrategyContext } from '../../utils/strategies/payment/context/paymentEventStrategyContext';

const paymentEventStrategyContext = new PaymentEventStrategyContext();

export const handlePaymentEvent = async (data: IPaymentEventSchema) => {
  const paymentData = {
    id: data.id,
    event: data.event,
    dateCreated: data.dateCreated,
    payment: {
      object: data.payment.object,
      id: data.payment.id,
      dateCreated: data.payment.dateCreated,
      customer: data.payment.customer,
      paymentLink: data.payment.paymentLink,
      value: data.payment.value,
      netValue: data.payment.netValue,
      originalValue: data.payment.originalValue,
      interestValue: data.payment.interestValue,
      description: data.payment.description,
      billingType: data.payment.billingType,
      canBePaidAfterDueDate: data.payment.canBePaidAfterDueDate,
      pixTransaction: data.payment.pixTransaction ?? null,
      status: data.payment.status,
      dueDate: data.payment.dueDate,
      originalDueDate: data.payment.originalDueDate,
      paymentDate: data.payment.paymentDate,
      clientPaymentDate: data.payment.clientPaymentDate,
      installmentNumber: data.payment.installmentNumber,
      invoiceUrl: data.payment.invoiceUrl,
      invoiceNumber: data.payment.invoiceNumber,
      externalReference: data.payment.externalReference,
      deleted: data.payment.deleted,
      anticipated: data.payment.anticipated,
      anticipable: data.payment.anticipable,
      creditDate: data.payment.creditDate,
      estimatedCreditDate: data.payment.estimatedCreditDate,
      transactionReceiptUrl: data.payment.transactionReceiptUrl,
      nossoNumero: data.payment.nossoNumero,
      bankSlipUrl: data.payment.bankSlipUrl,
      lastInvoiceViewedDate: data.payment.lastInvoiceViewedDate,
      lastBankSlipViewedDate: data.payment.lastBankSlipViewedDate,
      discount: data.payment.discount,
      fine: data.payment.fine,
      interest: data.payment.interest,
      postalService: data.payment.postalService,
      custody: data.payment.custody,
      refunds: data.payment.refunds,
      subscription: data.payment.subscription,
      installment: data.payment.installment,
    }
  }
  try {
    PaymentEventModel.create(paymentData);
    console.log('Event saved to database');
    await paymentEventStrategyContext.executeStrategy(data.event, data);
  } catch (error) {
    console.error('Error saving event to database:', error);
    throw new Error('Error saving event to database');
  }
};


export const handleDocumentStatusEvent = async (event: IDocumentEventSchema) => {
  try {
    await DocumentEventModel.create(event);
    console.log('Document status event saved to database');
  } catch (error) {
    console.error('Error saving document status event to database:', error);
    throw new Error('Error saving document status event to database');
  }

  // Handle specific document status events
  // You can create a similar strategy context for document status events if needed
  console.log(`Unhandled document status type: ${event.accountStatus}`);
};