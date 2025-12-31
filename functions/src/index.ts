// Mock Firebase Functions for FREE version
// These functions are disabled to avoid requiring paid services

import { logger } from 'firebase-functions';

// Mock function - not deployed in free version
export const parseBill = () => {
  logger.info('parseBill function disabled in free version');
  return { error: 'Function disabled in free version' };
};

// Mock function - not deployed in free version  
export const sendPaymentReminder = () => {
  logger.info('sendPaymentReminder function disabled in free version');
  return { error: 'Function disabled in free version' };
};

// Mock function - not deployed in free version
export const paymentCallback = () => {
  logger.info('paymentCallback function disabled in free version');
  return { error: 'Function disabled in free version' };
};
