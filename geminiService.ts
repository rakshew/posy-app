
import { GoogleGenAI } from "@google/genai";
import { MoodType } from "./types";

/**
 * Fetches an AI-powered affirmation based on the user's mood and note.
 * Note: The API_KEY is injected by Vercel at build time via process.env.API_KEY.
 */
export async function getAffirmation(mood: MoodType, note: string): Promise<string> {
  // Always initialize right before the call to ensure the latest key is used
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `You are Posy, the quiet soul of an ancient, empathetic garden. 
      A human is feeling ${mood} and shares this reflection: "${note || 'A silent moment in the shade.'}"

      Write a single, short sentence of artistic reassurance that feels like a handwritten note left on a garden bench.
      
      CRITICAL GUIDELINES:
      - Resonance: Directly acknowledge the emotion or specific context in their note without parroting them.
      - Style: Poetic, sensory, and grounded. Use botanical imagery like moss, trellis, deep roots, dew, or wild brambles.
      - Tone: Deeply human and assuring. Avoid toxic positivity or "AI-speak".
      - Constraint: Under 16 words. 
      - No emojis. Pure, evocative text.`,
      config: {
        temperature: 1,
        topP: 0.95,
      },
    });

    // Directly access .text property as per SDK guidelines
    return response.text?.trim() || "The earth remembers your strength even when the frost feels permanent.";
  } catch (error) {
    console.error("Gemini API Error. Check your Vercel Environment Variables:", error);
    // Fallback poetic message if the API call fails or key is missing
    return "Soft moss gathers where you rest; your growth is quiet, steady, and true.";
  }
}
