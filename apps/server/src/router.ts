import { Router } from "express";
import { WebhookEvents } from './modules/webhooks/enums/payment-events.enum';

const router = Router();

router.post('/webhook/payment', (req, res) => {
  const event = req.body;

  console.log('Received event:', event);
  switch (event.event) {
    case WebhookEvents.PAYMENT_CREATED:
      console.log('Payment created:', event);
      break;
    case WebhookEvents.PAYMENT_CONFIRMED:
      console.log('Payment confirmed:', event);
      break;
    case WebhookEvents.PAYMENT_RECEIVED:
      console.log('Payment received:', event);
      break;
    default:
      console.log(`Unhandled event type: ${event.event}`);
  }

  res.status(200).send('Event received');
});

export { router };
