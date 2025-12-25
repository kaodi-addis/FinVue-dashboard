
import { GoogleGenAI } from "@google/genai";

export const getFinancialAdvice = async (userPrompt: string, dashboardContext: any) => {
  /* Initializing client with direct process.env.API_KEY usage as per guidelines */
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  /* Using gemini-3-flash-preview for general text tasks as per guidelines */
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
    /* Correct call to ai.models.generateContent with model name and contents */
    const response = await ai.models.generateContent({
      model: model,
      contents: userPrompt,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    /* Accessing response.text as a property */
    return response.text || "I'm sorry, I couldn't generate a response at this moment.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Error connecting to FinVue AI. Please try again later.";
  }
};
