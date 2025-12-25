
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY || "";

export const getFinancialAdvice = async (userPrompt: string, dashboardContext: any) => {
  if (!API_KEY) return "API Key not configured. Please check environment variables.";

  const ai = new GoogleGenAI({ apiKey: API_KEY });
  const model = "gemini-3-flash-preview";

  const systemInstruction = `
    You are a world-class financial analyst AI named FinVue Assistant. 
    You have access to the user's current dashboard data:
    - Revenue: ${dashboardContext.revenue}
    - Expenses: ${dashboardContext.expenses}
    - Balance: ${dashboardContext.balance}
    - Transactions: ${dashboardContext.transactions}

    Your goal is to provide concise, professional, and actionable financial advice. 
    Use markdown formatting for clarity. Be encouraging but direct about financial health.
    If the user asks for things outside finance, gently redirect them back to their business growth.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    return response.text || "I'm sorry, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to FinVue AI. Please try again later.";
  }
};
