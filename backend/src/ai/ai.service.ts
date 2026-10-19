import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY || "";
const genAI = new GoogleGenerativeAI(apiKey);

export class AiService {
  async processChat(message: string): Promise<{ reply: string, tasksToCreate?: any[] }> {
    if (!apiKey) {
      throw new Error("GEMINI_API_KEY is missing in backend .env");
    }

    try {
      const model = genAI.getGenerativeModel({
        model: "gemini-3.8-flash",
        systemInstruction: "You are Tempo, a smart AI assistant for a task management app. Users will chat with you in various languages including Arabic and Moroccan Darija. When the user asks you to add, create, or schedule tasks, use the create_tasks tool. Otherwise, just converse naturally. Keep your answers concise, friendly, and helpful.",
        tools: [{
          functionDeclarations: [{
            name: "create_tasks",
            description: "Create one or more tasks based on the user's request.",
            parameters: {
              type: "object",
              properties: {
                tasks: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string", description: "The task title" },
                      category: { type: "string", description: "Category: Work, Study, Health, Personal, or Shopping" },
                      time: { type: "string", description: "Time of the task in HH:MM format (e.g. 06:00, 14:30)" },
                      priority: { type: "string", description: "Priority: LOW, MEDIUM, or HIGH" }
                    },
                    required: ["title", "category", "time", "priority"]
                  }
                }
              },
              required: ["tasks"]
            }
          }]
        }]
      });

      const result = await model.generateContent(message);
      const response = await result.response;
      
      let tasksToCreate;
      
      const functionCall = response.functionCalls()?.[0];
      if (functionCall && functionCall.name === "create_tasks") {
        const args = functionCall.args as any;
        tasksToCreate = args.tasks;
      }
      
      return { 
        reply: response.text() || "I have processed your tasks!", 
        tasksToCreate 
      };
    } catch (error: any) {
      console.error("AI Error:", error);
      throw new Error("Failed to process AI chat: " + error.message);
    }
  }
}

export const aiService = new AiService();
