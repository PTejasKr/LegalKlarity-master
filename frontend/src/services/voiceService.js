// services/voiceService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const uploadAudioForTranscription = async (audioBlob) => {
  try {
    const formData = new FormData();
    formData.append('audio', audioBlob, 'recording.webm');
    
    const response = await axios.post(`${API_BASE_URL}/api/v1/transcribe`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data.transcript;
  } catch (error) {
    console.error('Error uploading audio for transcription:', error);
    throw error;
  }
};

export const textToSpeech = async (text, language = 'en') => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/tts`, {
      text,
      language
    }, {
      responseType: 'blob'
    });
    
    const audioUrl = URL.createObjectURL(response.data);
    return audioUrl;
  } catch (error) {
    console.error('Error converting text to speech:', error);
    throw error;
  }
};