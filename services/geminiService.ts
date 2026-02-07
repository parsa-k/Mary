import { GoogleGenAI } from "@google/genai";

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    console.warn("API Key is missing. The app will simulate the AI response if no key is found, but for full functionality, please provide a valid API_KEY env var.");
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

export const generateLovePoem = async (name: string): Promise<string> => {
  const client = getClient();
  
  // Fallback for demo purposes if no API key is present (allows UI to function)
  if (!client) {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(`My dearest ${name},\n\nYou shine brighter than the stars above,\nA sparkling gem, my endless love.\nWith every smile, you light my way,\nWill you be mine, this Valentine's Day?\n\n(Note: Add API_KEY to see a unique Gemini-generated poem!)`);
      }, 1500);
    });
  }

  try {
    const response = await client.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Write a short, romantic, and rhyming Valentine's Day poem for a girl named "${name}". 
      She loves sparkling things, glitter, and elegance. 
      Make the tone sweet, charming, and slightly magical. 
      Keep it under 6 lines.`,
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // Disable thinking for faster creative response
        temperature: 0.8,
      }
    });

    return response.text || "You are the sparkle in my life, Mar Beth!";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return `You shine brighter than any diamond, ${name}. Happy Valentine's Day!`;
  }
};