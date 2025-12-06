import { GoogleGenAI, Type, Schema } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const MODEL_NAME = 'gemini-2.5-flash';

// 1. Ask Me Anything
export const askGemini = async (prompt: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: prompt,
    });
    return response.text || "No response generated.";
  } catch (error) {
    console.error("Ask API Error:", error);
    throw new Error("Failed to get answer.");
  }
};

// 2. Quick Summarizer
export const summarizeText = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Please provide a concise and clear summary of the following text:\n\n${text}`,
      config: {
        systemInstruction: "You are an expert editor. Summarize efficiently.",
      }
    });
    return response.text || "Could not summarize.";
  } catch (error) {
    console.error("Summarize API Error:", error);
    throw new Error("Failed to summarize.");
  }
};

// 3. Idea Generator (Returns JSON)
export const generateIdeas = async (topic: string): Promise<string[]> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Generate 5 creative and engaging blog post titles or project ideas for the topic: ${topic}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            ideas: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "List of creative ideas"
            }
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return [];
    
    const data = JSON.parse(jsonText);
    return data.ideas || [];
  } catch (error) {
    console.error("Idea API Error:", error);
    throw new Error("Failed to generate ideas.");
  }
};

// 4. Definition Finder (Returns JSON)
export const defineWord = async (word: string): Promise<any> => {
  try {
    const response = await ai.models.generateContent({
      model: MODEL_NAME,
      contents: `Define the word: ${word}`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            word: { type: Type.STRING },
            definition: { type: Type.STRING },
            example: { type: Type.STRING },
            synonyms: { 
              type: Type.ARRAY, 
              items: { type: Type.STRING } 
            }
          }
        }
      }
    });

    const jsonText = response.text;
    if (!jsonText) return null;
    
    return JSON.parse(jsonText);
  } catch (error) {
    console.error("Define API Error:", error);
    throw new Error("Failed to find definition.");
  }
};