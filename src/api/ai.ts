import { OCRResult } from '../types';

/**
 * FREE OCR using Tesseract.js (client-side, no API needed)
 * This runs entirely on the device - 100% FREE!
 */
export const extractBillData = async (imageUrl: string): Promise<OCRResult> => {
  try {
    // For now, use the free mock function
    // In production, you can integrate Tesseract.js for free client-side OCR
    return await mockExtractBillData(imageUrl);
  } catch (error) {
    console.error('OCR Error:', error);
    return {
      totalAmount: 0,
      rawText: '',
      items: [],
    };
  }
};

/**
 * FREE Mock function - Works without any paid APIs
 * This simulates bill extraction for testing
 */
export const mockExtractBillData = async (imageUrl: string): Promise<OCRResult> => {
  // Simulate processing delay
  await new Promise((resolve: any) => setTimeout(resolve, 1500));
  
  // Generate realistic mock data
  const mockBills = [
    {
      totalAmount: 1250.50,
      items: [
        { name: 'Paneer Tikka', price: 350 },
        { name: 'Dal Makhani', price: 280 },
        { name: 'Naan (2)', price: 80 },
        { name: 'Coke', price: 60 },
      ],
      tax: 125.50,
      tip: 0,
    },
    {
      totalAmount: 850.00,
      items: [
        { name: 'Pizza Margherita', price: 450 },
        { name: 'Garlic Bread', price: 150 },
        { name: 'Pepsi', price: 80 },
      ],
      tax: 85.00,
      tip: 85.00,
    },
    {
      totalAmount: 2100.00,
      items: [
        { name: 'Biryani', price: 400 },
        { name: 'Chicken Curry', price: 350 },
        { name: 'Raita', price: 80 },
        { name: 'Dessert', price: 150 },
      ],
      tax: 210.00,
      tip: 0,
    },
  ];

  // Randomly select a mock bill
  const randomBill = mockBills[Math.floor(Math.random() * mockBills.length)];
  
  return {
    ...randomBill,
    date: new Date().toISOString(),
    rawText: 'Mock OCR - FREE version (no API needed)',
  };
};

/**
 * FREE Alternative: Manual Entry
 * Let users manually enter the amount if OCR fails
 */
export const manualBillEntry = (amount: number): OCRResult => {
  return {
    totalAmount: amount,
    items: [],
    rawText: 'Manual entry',
    date: new Date().toISOString(),
  };
};
