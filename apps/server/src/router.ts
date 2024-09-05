import { Router } from "express";

import { handleDocumentStatusEvent, handlePaymentEvent } from './modules/webhooks/eventHandler';

const router = Router();

router.post('/webhook/payment', async (req, res) => {
  const data = req.body;
  console.log('Received event:', data.event);
  try {
    await handlePaymentEvent(data)
    res.status(200).send('Event received');
  } catch (error) {
    console.error('Error handling payment event:', error);
    res.status(500).send('Error handling payment event');
  }
});

router.post('/webhook/document-status', async (req, res) => {
  const data = req.body;
  console.log('Received document status event:', data);
  try {
    await handleDocumentStatusEvent(data);
    res.status(200).send('Document status event received');
  } catch (error) {
    console.error('Error handling document status event:', error);
    res.status(500).send('Error handling document status event');
  }
});

export { router };
