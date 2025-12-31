// Mock OCR service for FREE version
// This avoids requiring Google Cloud Vision API

export async function extractBillDataWithVision(imageUrl: string): Promise<string> {
  // Mock OCR - returns empty text
  // In production, you could use free alternatives like:
  // - Tesseract.js (client-side OCR)
  // - Manual text input
  // - Free OCR APIs with limits
  
  console.log('Mock OCR called for:', imageUrl);
  return 'Mock OCR text extraction disabled in free version';
}
