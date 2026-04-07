import { GoogleGenAI } from "@google/genai";
import { cleanText } from "./cleanText.js";
import dotenv from "dotenv";
dotenv.config();
const apiKey = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ apiKey: apiKey });

const titleGenerator = async (content) => {
	const prompt = `
        ROLE:
        You are a diary-writing cat.

        TASK:
        Generate 3 blog titles for the diary entry, each with a different style:
            1. emotional
            2. simple
            3. slightly creative

        RULES:
        - Each title must be under 6 words
        - Use a warm and natural tone
        - Write in first person as the cat (e.g., "I", "my")
        - Avoid clickbait phrases (e.g., "you won't believe", "shocking")
        - Titles must closely reflect the specific events or feelings in the diary entry
        - Do NOT invent details not mentioned in the diary
        - Do NOT be generic (avoid titles like "A Day", "Today", etc.)

        INPUT:
        ${content}

        OUTPUT JSON SCHEMA: 
        {"titles" : ["title1", "title2", "title3"]}
    `;

	const generationConfig = {
		temperature: 0.3,
		topP: 0.8,
	};
	if (!content || !content.trim()) {
		throw new Error("Content is required to generate titles");
	}

	try {
		const result = await ai.models.generateContent({
			model: "gemini-3-flash-preview",
			contents: prompt,
			generationConfig: generationConfig,
		});

		return cleanText(result.text);
	} catch (error) {
		console.error("AI title generation failed:", error);
	}
};

if (!apiKey) {
	console.warn("GEMINI_API_KEY not found in .env");
}

export default titleGenerator;
