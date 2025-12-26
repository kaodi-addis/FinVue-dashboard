
import { GoogleGenAI } from "@google/genai";

/**
 * Handles potential API key errors and requests user to select a key if needed.
 */
const handleAIError = async (error: any) => {
  const errorMsg = error?.message || "";
  // Check for 404/Not Found which usually indicates a missing/invalid project key in this context
  if (errorMsg.includes("Requested entity was not found") || errorMsg.includes("404")) {
    if (window.aistudio) {
      await window.aistudio.openSelectKey();
      return true; // Key selection triggered
    }
  }
  return false;
};

export const getFinancialAdvice = async (userPrompt: string, dashboardContext: any) => {
  // Guidelines: Create a new instance right before making an API call to ensure latest key
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = "gemini-3-flash-preview";

  const systemInstruction = `
    You are a world-class financial analyst AI named FinVue Assistant. 
    Context:
    - Revenue: ${dashboardContext.revenue}
    - Expenses: ${dashboardContext.expenses}
    - Balance: ${dashboardContext.balance}
    - Transactions: ${dashboardContext.transactions}

    Provide concise, professional, and actionable financial advice in markdown.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response.";
  } catch (error: any) {
    console.error("Gemini Error:", error);
    const reselecting = await handleAIError(error);
    if (reselecting) {
      return "API authentication required. Please select a valid API key from a paid project in the dialog that appeared.";
    }
    return "Error connecting to FinVue AI. Please check your connection or API key.";
  }
};
