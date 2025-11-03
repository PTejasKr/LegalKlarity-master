// services/speechService.js
const speech = require('@google-cloud/speech');
const textToSpeech = require('@google-cloud/text-to-speech');
const fs = require('fs');
const util = require('util');

// Initialize Google Cloud clients
const speechClient = new speech.SpeechClient();
const ttsClient = new textToSpeech.TextToSpeechClient();

const transcribeAudio = async (audioBuffer, languageCode = 'en-US') => {
  try {
    const audio = {
      content: audioBuffer.toString('base64'),
    };
    
    const config = {
      encoding: 'WEBM_OPUS',
      sampleRateHertz: 48000,
      languageCode: languageCode,
    };
    
    const request = {
      audio: audio,
      config: config,
    };
    
    const [response] = await speechClient.recognize(request);
    const transcription = response.results
      .map(result => result.alternatives[0].transcript)
      .join('\n');
      
    return transcription;
  } catch (error) {
    console.error('Error transcribing audio:', error);
    throw error;
  }
};

const synthesizeSpeech = async (text, languageCode = 'en-US') => {
  try {
    const request = {
      input: { text: text },
      voice: { languageCode: languageCode, ssmlGender: 'NEUTRAL' },
      audioConfig: { audioEncoding: 'MP3' },
    };
    
    const [response] = await ttsClient.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    
    // In a real application, you would stream this or save to a database
    // For now, we'll return the audio data
    return response.audioContent;
  } catch (error) {
    console.error('Error synthesizing speech:', error);
    throw error;
  }
};

module.exports = {
  transcribeAudio,
  synthesizeSpeech
};