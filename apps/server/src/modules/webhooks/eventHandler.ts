import { PaymentEventModel, DocumentEventModel, IPaymentEventSchema, IDocumentEventSchema } from '../../models';
import { PaymentEventStrategyContext } from '../../utils/strategies/payment/context/paymentEventStrategyContext';

const paymentEventStrategyContext = new PaymentEventStrategyContext();

export const handlePaymentEvent = async (data: IPaymentEventSchema) => {
  // Save the event data to the database
  try {
    PaymentEventModel.create(data);
    console.log('Event saved to database');
  } catch (error) {
    console.error('Error saving event to database:', error);
    throw new Error('Error saving event to database');
  }

  await paymentEventStrategyContext.executeStrategy(data.event);
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