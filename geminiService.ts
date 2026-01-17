
import { GoogleGenAI } from "@google/genai";
import { MoodType } from "./types";

export async function getAffirmation(mood: MoodType, note: string): Promise<string> {
  // Use process.env.API_KEY directly as per SDK guidelines
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

    return response.text?.trim() || "The earth remembers your strength even when the frost feels permanent.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Soft moss gathers where you rest; your growth is quiet, steady, and true.";
  }
}
