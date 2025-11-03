import axios from 'axios';
import { ApiError } from '../utility/ApiError';

const geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
const geminiAPIKey = process.env.GEMINI_API_KEY;

export async function chatWithGemini(userText: string): Promise<{ text: string; groundingAttributions: any[] }>{
    if (!geminiAPIKey && process.env.USE_MOCK_API !== 'true') {
        throw new ApiError(500, 'Missing Gemini API key');
    }

    if (process.env.USE_MOCK_API === 'true') {
        return {
            text: "This is a mock response for testing purposes.",
            groundingAttributions: []
        };
    }

    const systemPrompt = "You are an expert legal assistant. Provide concise, factual, and well-sourced answers for legal queries. If you cannot find reliable sources, do not invent answers and indicate that the query is out-of-scope and recommend contacting a legal advisor.";

    const requestBody = {
        contents: [{ parts: [{ text: userText }] }],
        tools: [{ "google_search": {} }],
        systemInstruction: { parts: [{ text: systemPrompt }] }
    };

    try {
        const response = await axios.post(
            `${geminiApiUrl}?key=${geminiAPIKey}`,
            requestBody,
            { headers: { 'Content-Type': 'application/json' } }
        );

        const candidate = response.data?.candidates?.[0];
        let modelText = candidate?.content?.parts?.[0]?.text || '';
        const groundingMetadata = candidate?.groundingMetadata;

        // Extract simple grounding attributions if available
        let sources: { uri?: string; title?: string }[] = [];
        if (groundingMetadata && groundingMetadata.groundingAttributions) {
            sources = groundingMetadata.groundingAttributions
                .map((a: any) => ({ uri: a.web?.uri, title: a.web?.title }))
                .filter((s: any) => s.uri || s.title);
        }

        return { text: modelText, groundingAttributions: sources };
    } catch (error: any) {
        if (error.response?.status === 429 || (error.message && error.message.includes('quota'))) {
            throw new ApiError(429, 'Our AI service is currently overloaded. Please try again later.');
        }
        throw new ApiError(500, error.response?.data?.error?.message || error.message);
    }
}
