
import { GoogleGenAI } from "@google/genai";

// Ensure the API key is available in the environment variables
const apiKey = process.env.API_KEY;
if (!apiKey) {
    console.error("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: apiKey || '' });

export const explainPolicy = async (manifestoText: string, userQuestion: string): Promise<string> => {
    if (!apiKey) {
        return "API Key is not configured. Please contact the administrator.";
    }

    const model = 'gemini-2.5-flash';

    const prompt = `
        You are a helpful AI assistant for the 'Solidarity Youth Movement Karnataka'. 
        Your task is to explain parts of the 'Youth Manifesto 2023' to members in simple, clear, and encouraging language.
        Do not go outside the provided text. If the answer is not in the text, state that the manifesto does not cover that specific topic.
        
        Here is the full text of the Youth Manifesto:
        ---
        ${manifestoText}
        ---
        
        Now, please answer the following user's question based ONLY on the manifesto text provided above.

        User Question: "${userQuestion}"
    `;

    try {
        const response = await ai.models.generateContent({
            model: model,
            contents: prompt,
        });
        return response.text;
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        return 'Sorry, I encountered an error trying to get an explanation. Please try again later.';
    }
};
