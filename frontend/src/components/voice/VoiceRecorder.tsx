import { useState, useRef, useEffect } from 'react';
import Button from '../common/Button';
import { Mic, Square, Play, Pause, Download } from 'lucide-react';

interface VoiceRecorderProps {
  onTranscript: (transcript: string) => void;
}

export default function VoiceRecorder({ onTranscript }: VoiceRecorderProps) {
  const [isRecording, setIsRecording] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [transcript, setTranscript] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];

      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };

      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);

        // Simulate transcription
        setIsLoading(true);
        // In a real application, you would send the audioBlob to your backend for transcription
        setTimeout(() => {
          const simulatedTranscript = "This is a simulated transcript of the recorded audio. In a real application, this would be the result of speech-to-text processing.";
          setTranscript(simulatedTranscript);
          onTranscript(simulatedTranscript);
          setIsLoading(false);
        }, 2000);
      };

      mediaRecorderRef.current.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing microphone:', error);
      alert('Could not access the microphone. Please check your permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }
  };

  const togglePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const downloadAudio = () => {
    if (audioUrl) {
      const a = document.createElement('a');
      a.href = audioUrl;
      a.download = 'recorded-audio.webm';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setIsPlaying(false);
    }
  }, []);

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-2xl dark:bg-slate-800 dark:shadow-slate-800/50">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 dark:text-white">Voice Recorder</h2>
      <p className="text-gray-600 mb-6 dark:text-slate-400">Record audio to transcribe legal discussions or document content.</p>
      
      <div className="flex flex-col items-center gap-4 mb-6">
        {isRecording ? (
          <Button
            onClick={stopRecording}
            variant="danger"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-lg"
          >
            <Square size={24} />
            Stop Recording
          </Button>
        ) : (
          <Button
            onClick={startRecording}
            variant="primary"
            className="flex items-center gap-2 px-6 py-3 rounded-full text-lg"
            disabled={isLoading}
          >
            <Mic size={24} />
            Start Recording
          </Button>
        )}
        
        {isLoading && (
          <div className="flex items-center gap-2 text-gray-600 dark:text-slate-400">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-gray-600 dark:border-slate-400"></div>
            Transcribing...
          </div>
        )}
      </div>

      {audioUrl && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 dark:text-white">Recording</h3>
          <div className="flex items-center gap-4">
            <Button
              onClick={togglePlayPause}
              variant="secondary"
              className="flex items-center gap-2"
            >
              {isPlaying ? <Pause size={20} /> : <Play size={20} />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button
              onClick={downloadAudio}
              variant="secondary"
              className="flex items-center gap-2"
            >
              <Download size={20} />
              Download
            </Button>
          </div>
          <audio ref={audioRef} src={audioUrl} className="mt-4 w-full" />
        </div>
      )}

      {transcript && (
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-3 dark:text-white">Transcript</h3>
          <div className="bg-gray-50 rounded-lg p-4 max-h-40 overflow-y-auto dark:bg-slate-700">
            <p className="text-gray-700 dark:text-slate-300">{transcript}</p>
          </div>
        </div>
      )}
    </div>
  );
}