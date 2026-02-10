import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const apiKey = process.env.GEMINI_API_KEY;
        if (!apiKey) {
            return NextResponse.json(
                { error: "Gemini API key not configured" },
                { status: 500 }
            );
        }

        const body = await req.json();
        const { messages } = body;

        if (!messages || !Array.isArray(messages)) {
            return NextResponse.json(
                { error: "Invalid request body" },
                { status: 400 }
            );
        }

        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: "gemini-2.0-flash",
            systemInstruction: "You are a helpful assistant. When the user asks for a list, table, or data report, you MUST provide the data strictly as a JSON array of objects wrapped in a ```json code block.\n\nRULES:\n1. Do NOT write Python code to generate the data.\n2. Do NOT provide code examples for how to use the data.\n3. Do NOT provide any code unless the user EXPLICITLY asks for 'code', 'script', or 'implementation'.\n4. Just provide the JSON data directly. \n\nExample:\n```json\n[\n  {\"name\": \"Item 1\", \"price\": 1000}\n]\n```\nIMPORTANT: Do not use commas as thousands separators for numbers."
        });

        // Convert chat history to Gemini format
        // Gemini expects roles to be 'user' or 'model'
        const history = messages.slice(0, -1).map((msg: any) => ({
            role: msg.sender === 'user' ? 'user' : 'model',
            parts: [{ text: msg.text }],
        }));

        const lastMessage = messages[messages.length - 1];
        const chat = model.startChat({
            history: history,
        });

        const result = await chat.sendMessage(lastMessage.text);
        const response = await result.response;
        const text = response.text();

        return NextResponse.json({ text });
    } catch (error) {
        console.error("Error generating content:", error);
        return NextResponse.json(
            { error: "Failed to generate content" },
            { status: 500 }
        );
    }
}
