
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";

let ai: GoogleGenAI | null = null;
let chat: Chat | null = null;

const getAI = (): GoogleGenAI => {
    if (!ai) {
        if (!process.env.API_KEY) {
            throw new Error("API_KEY environment variable not set");
        }
        ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    }
    return ai;
};

export const startChat = (resumeContext: string): void => {
    if (!chat) {
        const aiInstance = getAI();
        chat = aiInstance.chats.create({
            model: 'gemini-2.5-flash',
            config: {
                systemInstruction: `You are a helpful and friendly AI assistant for Ratna Srikar Duriseti's portfolio. Your knowledge is based EXCLUSIVELY on the provided resume data. Do not invent information or discuss topics outside of this data. If asked something not in the resume, politely state that the information is not available in the resume. Your goal is to answer questions about Srikar's skills, experience, and projects professionally and concisely. Here is the resume data in JSON format: ${resumeContext}`,
            },
        });
    }
};

export const streamChatResponse = async (message: string): Promise<AsyncGenerator<GenerateContentResponse>> => {
    if (!chat) {
        throw new Error("Chat not initialized. Call startChat first.");
    }
    try {
        const result = await chat.sendMessageStream({ message });
        return result;
    } catch (error) {
        console.error("Error sending message to Gemini:", error);
        throw new Error("Failed to get response from AI assistant.");
    }
};
