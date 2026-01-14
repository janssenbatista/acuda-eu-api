import express, { Request, Response } from "express";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const router = express.Router();
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || "",
});

router.post("/test", async (req: Request, res: Response) => {
  const { query, professions } = req.body;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: `Encontre a profissão mais adequada para a seguinte query: ${query} baseado nas seguitens profissões: ${
      professions ?? ["Encanador", "Pintor", "Eletricista", "Marceneiro"]
    }. Retorne somente o nome da profissão. Caso nenhuma das profissões seja compatível, retorne ""`,
  });

  if (response) res.send(response.text);

  res.status(500);
});

export default router;
