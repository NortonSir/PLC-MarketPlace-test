import { GoogleGenAI } from "@google/genai";

// Assume API_KEY is set in the environment
const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.warn("Gemini API key not found. AI features will be disabled. Please set process.env.API_KEY.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY! });

export const suggestCategory = async (modelName: string, categories: {key: string, name: string}[]): Promise<string> => {
  if (!API_KEY) {
    throw new Error("API key is not configured.");
  }
  
  const categoryNames = categories.map(c => c.name);

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `Given the PLC module model name "${modelName}", which of the following categories does it best fit into?
    
    Categories:
    - ${categoryNames.join('\n- ')}
    
    Respond with only the single, most appropriate category name from the list. Do not add any extra text or explanation.`;

    const response = await ai.models.generateContent({
        model: model,
        contents: prompt
    });
    
    const suggestedName = response.text.trim();
    
    const suggestedCategory = categories.find(c => c.name === suggestedName);

    // Validate if the suggested category is one of the provided options
    if (suggestedCategory) {
      return suggestedCategory.key; // Return the key of the matched category
    } else {
      // Fallback or error if the model returns an invalid category
      console.warn(`Gemini suggested an invalid category: "${suggestedName}". Falling back.`);
      return categories[categories.length - 1]?.key || ''; // Fallback to the last category's key
    }
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to get category suggestion from AI.");
  }
};