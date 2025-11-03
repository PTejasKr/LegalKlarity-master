import { Translate } from '@google-cloud/translate/build/src/v2';
import { ApiError } from '../utility/ApiError';

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


