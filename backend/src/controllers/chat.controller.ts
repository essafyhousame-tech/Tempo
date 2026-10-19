import { Request, Response } from "express";
import { aiService } from "../ai/ai.service";

export const handleChat = async (req: Request, res: Response): Promise<void> => {
  try {
    const { message } = req.body;
    
    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const result = await aiService.processChat(message);
    
    res.json(result);
  } catch (error: any) {
    console.error("Chat Controller Error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
};
