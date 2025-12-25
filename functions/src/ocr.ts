import vision from '@google-cloud/vision';

const client = new vision.ImageAnnotatorClient();

export async function extractBillDataWithVision(imageUrl: string): Promise<string> {
  try {
    const [result] = await client.textDetection(imageUrl);
    const detections = result.textAnnotations;

    if (!detections || detections.length === 0) {
      throw new Error('No text detected in image');
    }

    // First annotation contains all text
    const fullText = detections[0].description || '';
    
    return fullText;
  } catch (error: any) {
    console.error('Vision API error:', error);
    throw new Error(`OCR failed: ${error.message}`);
  }
}
