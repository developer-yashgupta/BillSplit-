import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import { extractBillDataWithVision } from './ocr';
import { parseBillWithAI } from './ai';

admin.initializeApp();

// Parse bill using Google Cloud Vision + AI
export const parseBill = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { imageUrl } = data;

  if (!imageUrl) {
    throw new functions.https.HttpsError('invalid-argument', 'imageUrl is required');
  }

  try {
    // Step 1: Extract text using Vision API
    const rawText = await extractBillDataWithVision(imageUrl);

    // Step 2: Parse structured data using AI
    const parsedData = await parseBillWithAI(rawText);

    return parsedData;
  } catch (error: any) {
    console.error('Error parsing bill:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// Send payment reminder
export const sendPaymentReminder = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError('unauthenticated', 'User must be authenticated');
  }

  const { participantId, billId } = data;

  try {
    // TODO: Implement SMS/Email reminder
    // For now, just update the reminderSent flag
    await admin.firestore()
      .collection('billParticipants')
      .doc(participantId)
      .update({
        reminderSent: true,
        lastReminderAt: admin.firestore.FieldValue.serverTimestamp(),
      });

    return { success: true };
  } catch (error: any) {
    console.error('Error sending reminder:', error);
    throw new functions.https.HttpsError('internal', error.message);
  }
});

// Webhook for payment confirmation (Razorpay)
export const paymentCallback = functions.https.onRequest(async (req, res) => {
  // TODO: Verify Razorpay signature
  const { participantId, status } = req.body;

  try {
    if (status === 'success') {
      await admin.firestore()
        .collection('billParticipants')
        .doc(participantId)
        .update({
          status: 'paid',
          paidAt: admin.firestore.FieldValue.serverTimestamp(),
        });
    }

    res.status(200).json({ success: true });
  } catch (error: any) {
    console.error('Payment callback error:', error);
    res.status(500).json({ error: error.message });
  }
});
