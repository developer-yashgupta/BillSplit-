import OpenAI from 'openai';

// Initialize OpenAI (or use any other LLM)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

interface ParsedBillData {
  totalAmount: number;
  items?: Array<{ name: string; price: number }>;
  tax?: number;
  tip?: number;
  date?: string;
  rawText: string;
}

export async function parseBillWithAI(rawText: string): Promise<ParsedBillData> {
  const prompt = `You are a bill parser. Extract structured data from this bill text.

Bill Text:
${rawText}

Extract and return ONLY a JSON object with this structure:
{
  "totalAmount": <number>,
  "items": [{"name": "<string>", "price": <number>}],
  "tax": <number or null>,
  "tip": <number or null>,
  "date": "<ISO date string or null>"
}

Rules:
- totalAmount is required (the final total)
- items array is optional
- If you can't find a value, use null
- Return ONLY valid JSON, no explanation`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are a precise bill data extractor. Return only valid JSON.' },
        { role: 'user', content: prompt }
      ],
      temperature: 0.1,
      response_format: { type: 'json_object' },
    });

    const content = response.choices[0].message.content;
    if (!content) {
      throw new Error('No response from AI');
    }

    const parsed = JSON.parse(content);

    return {
      totalAmount: parsed.totalAmount || 0,
      items: parsed.items || [],
      tax: parsed.tax || undefined,
      tip: parsed.tip || undefined,
      date: parsed.date || undefined,
      rawText,
    };
  } catch (error: any) {
    console.error('AI parsing error:', error);
    
    // Fallback: try to extract total amount using regex
    const amountMatch = rawText.match(/total[:\s]*₹?\s*(\d+\.?\d*)/i);
    const totalAmount = amountMatch ? parseFloat(amountMatch[1]) : 0;

    return {
      totalAmount,
      rawText,
    };
  }
}
