// ai/voiceProcessor.js
const { transcribeAudio, synthesizeSpeech } = require('../services/speechService.js');

const processAudioForTranscription = async (audioBuffer, languageCode = 'en-US') => {
  try {
    const transcription = await transcribeAudio(audioBuffer, languageCode);
    return transcription;
  } catch (error) {
    console.error('Error processing audio for transcription:', error);
    throw error;
  }
};

const convertTextToSpeech = async (text, languageCode = 'en-US') => {
  try {
    const audioContent = await synthesizeSpeech(text, languageCode);
    return audioContent;
  } catch (error) {
    console.error('Error converting text to speech:', error);
    throw error;
  }
};

module.exports = {
  processAudioForTranscription,
  convertTextToSpeech
};