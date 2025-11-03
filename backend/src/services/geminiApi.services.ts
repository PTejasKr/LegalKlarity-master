import axios from 'axios';
import { ApiError } from '../utility/ApiError';
import { Translate } from '@google-cloud/translate/build/src/v2';

const geminiApiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent';
const geminiAPIKey = process.env.GEMINI_API_KEY;
const generativelanguageApiKey = process.env.GENERATIVE_LANGUAGE_API_KEY;

// Only throw error if we're not using mock mode
if (!geminiAPIKey && process.env.USE_MOCK_API !== 'true') {
  console.warn('Missing Gemini API key - AI features will not work');
}

export async function summarizeAgreementWithGemini(prompt: string): Promise<any> {
    // If we don't have an API key and not using mock mode, throw an error
    if (!geminiAPIKey && process.env.USE_MOCK_API !== 'true') {
        throw new ApiError(500, 'Missing Gemini API key');
    }
    
    // If we're using mock mode, return a mock response
    if (process.env.USE_MOCK_API === 'true') {
        return {
            title: "Mock Agreement Summary",
            about: "This is a mock agreement summary for testing purposes.",
            benefits: ["Benefit 1", "Benefit 2"],
            risks: ["Risk 1", "Risk 2"],
            clarity: {
                score: 8,
                comment: "This is a mock clarity score"
            },
            fairness: {
                score: 7,
                comment: "This is a mock fairness score"
            },
            analogy: "This agreement is like a contract between two parties."
        };
    }

    // Ensure prompt is plain text (not JSON or stringified object)
    // The controller should pass only plain agreement text in the prompt
    const requestBody = {
        contents: [{ parts: [{ text: String(prompt) }]}]
    };

    try {
        // Send plain text prompt to Gemini API
        const response = await axios.post(
            `${geminiApiUrl}?key=${geminiAPIKey}`,
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        let modelText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (!modelText) {
            throw new ApiError(500, 'No response from Gemini model');
        }
        // If the modelText is wrapped in a markdown code block, strip it
        const codeBlockMatch = modelText.match(/```(?:json)?\n([\s\S]*?)\n```/i);
        if (codeBlockMatch) modelText = codeBlockMatch[1];

        // 2. Extract JSON substring if mixed with text
        const jsonMatch = modelText.match(/\{[\s\S]*\}/);
        if (jsonMatch) modelText = jsonMatch[0];
        
        // Try to parse JSON if model returns JSON, else return raw text
        try {
            return JSON.parse(modelText);
        } catch {
            return modelText;
        }
    } catch (error: any) {
        // Handle quota exceeded error specifically
        if (error.response?.status === 429 || (error.message && error.message.includes('quota'))) {
            throw new ApiError(429, 'Our AI service is currently overloaded. Please try again later.');
        }
        throw new ApiError(500, error.response?.data?.error?.message || error.message);
    }
}

// Optimized: user provides only the process/task name (e.g., 'rental agreement'), not a full prompt
export async function processWithGemini(task: string): Promise<any> {
    // If we don't have an API key and not using mock mode, throw an error
    if (!geminiAPIKey && process.env.USE_MOCK_API !== 'true') {
        throw new ApiError(500, 'Missing Gemini API key');
    }
    
    // If we're using mock mode, return a mock response
    if (process.env.USE_MOCK_API === 'true') {
        return {
            processSteps: ["Step 1", "Step 2", "Step 3"],
            requiredDocuments: ["Document 1", "Document 2"],
            creationLinks: [{ name: "Link 1", url: "https://example.com", disclaimer: "Disclaimer" }],
            priceInfo: "₹1000-₹5000",
            needExpert: "For complex cases, consult a lawyer"
        };
    }
    
    const prompt = "Given the following task, answer these questions in JSON format with keys: processSteps, requiredDocuments, creationLinks, priceInfo, needExpert.\n\n    Important formatting rules:\n    - Provide plain text only (no markdown, no bold, no numbering like 1., 2., etc).\n    - Each item should be a clean string.\n    - creationLinks must be an array of objects with keys: name, url, disclaimer.\n    - Do not invent or assume links. If no reliable link exists, set \"url\": \"N/A\".\n    - If a disclaimer is needed, write it in plain text without symbols like * or **.\n    - Prices must be given in Indian Rupees (₹), with approximate ranges.\n\n    Questions:\n    1. List the process steps as an array of plain text items (no numbering, just the description).\n    2. What are the documents required for this task?\n    3. From where can we create documents (websites/links)?\n    4. What are the prices of the document?\n    5. When do we need a lawyer or CA?\n\n    Task: " + task;

    const requestBody = {
        contents: [
            {
                parts: [
                    { text: prompt }
                ]
            }
        ]
    };

    try {
        const response = await axios.post(
            `${geminiApiUrl}?key=${geminiAPIKey}`,
            requestBody,
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        let modelText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
        if (!modelText) {
            throw new ApiError(500, 'No response from Gemini model');
        }
        // If the modelText is wrapped in a markdown code block, strip it
        const codeBlockMatch = modelText.match(/```(?:json)?\n([\s\S]*?)\n```/i);
        if (codeBlockMatch) {
            modelText = codeBlockMatch[1];
        }
        try {
            return JSON.parse(modelText);
        } catch {
            return { raw: modelText };
        }
    } catch (error: any) {
        // Handle quota exceeded error specifically
        if (error.response?.status === 429 || (error.message && error.message.includes('quota'))) {
            throw new ApiError(429, 'Our AI service is currently overloaded. Please try again later.');
        }
        throw new ApiError(500, error.response?.data?.error?.message || error.message);
    }
}

// Instantiates a client
const translate = new Translate();

/**
 * Translates text to the target language using Google Cloud Translate API.
 * @param text The text to translate
 * @param targetLanguage The target language code (e.g., 'hi' for Hindi, 'fr' for French)
 * @returns The translated text
 */
export async function translateText(text: string, targetLanguage: string): Promise<string> {
  try {
    const [translation] = await translate.translate(text, targetLanguage);
    return translation;
  } catch (error: any) {
    throw new ApiError(500, error.message || 'Translation failed');
  }
}