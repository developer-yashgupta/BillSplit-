// Mock AI service for FREE version
// This avoids requiring OpenAI API keys

interface ParsedBillData {
  totalAmount: number;
  items?: Array<{ name: string; price: number }>;
  tax?: number;
  tip?: number;
  date?: string;
  rawText: string;
}

export async function parseBillWithAI(rawText: string): Promise<ParsedBillData> {
  // Mock AI parsing - returns structured data
  // In production, you could use free alternatives like:
  // - Hugging Face Transformers.js (client-side)
  // - Local LLM models
  // - Pattern matching/regex parsing
  
  // Try to extract total amount using regex as fallback
  const amountMatch = rawText.match(/total[:\s]*₹?\s*(\d+\.?\d*)/i);
  const totalAmount = amountMatch ? parseFloat(amountMatch[1]) : 0;

  return {
    totalAmount,
    items: [],
    tax: 0,
    tip: 0,
    rawText: rawText || 'Mock AI parsing disabled in free version',
  };
}
