import React, { useState } from 'react';
import { playSound, speakText } from '../utils/audio';

export const VoiceTutorBot: React.FC<{ lang: 'kn' | 'en' }> = ({ lang }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [botReply, setBotReply] = useState('');
  const [isAnswering, setIsAnswering] = useState(false);

  // Common quick question buttons for grade 1 & 2 kids
  const sampleQuestions = [
    {
      kn: 'ಕಂಪ್ಯೂಟರ್ ಎಂದರೇನು?',
      en: 'What is a computer?',
      replyKn: 'ಕಂಪ್ಯೂಟರ್ ಒಂದು ಡಿಜಿಟಲ್ ಯಂತ್ರ! ಇದು ಮಾಹಿತಿ ಸಂಗ್ರಹಿಸುತ್ತದೆ, ಚಿತ್ರಗಳನ್ನು ತೋರಿಸುತ್ತದೆ, ಮತ್ತು ನಮಗೆ ಕಲಿಯಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ.',
      replyEn: 'A computer is a smart digital machine! It stores information, shows pictures, and helps us learn!'
    },
    {
      kn: 'ಕಂಪ್ಯೂಟರ್‌ನ ಮೆದುಳು ಯಾವುದು?',
      en: 'What is the brain of a computer?',
      replyKn: 'ಸಿ.ಪಿ.ಯು (CPU) ಕಂಪ್ಯೂಟರ್‌ನ ಮೆದುಳು! ಇದು ಎಲ್ಲಾ ಕೆಲಸಗಳನ್ನು ಯೋಚಿಸಿ ಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತದೆ.',
      replyEn: 'The CPU is the brain of the computer! It processes all calculations and memory.'
    },
    {
      kn: 'ಒದ್ದೆ ಕೈಗಳಿಂದ ಕಂಪ್ಯೂಟರ್ ಮುಟ್ಟಬಹುದೇ?',
      en: 'Can we touch computer with wet hands?',
      replyKn: 'ಎಂದಿಗೂ ಮುಟ್ಟಬಾರದು! ಒದ್ದೆ ಕೈಗಳಿಂದ ಮುಟ್ಟಿದರೆ ಕರೆಂಟ್ ಶಾಕ್ ಹೊಡೆಯುವ ಅಪಾಯವಿದೆ. ಮೊದಲು ಕೈ ಒಣಗಿಸಿ!',
      replyEn: 'Never! Wet hands conduct electricity and can give a shock. Always dry your hands first!'
    },
    {
      kn: 'ಮೌಸ್‌ನ ಉಪಯೋಗವೇನು?',
      en: 'What is the use of a mouse?',
      replyKn: 'ಮೌಸ್ ಮೂಲಕ ಪರದೆಯ ಮೇಲೆ ಪಾಯಿಂಟರ್ ಚಲಿಸಬಹುದು ಮತ್ತು ಇಷ್ಟವಾದ ಚಿತ್ರವನ್ನು ಕ್ಲಿಕ್ ಮಾಡಿ ತೆರೆಯಬಹುದು!',
      replyEn: 'The mouse moves the arrow pointer on the screen, letting you click and open pictures!'
    }
  ];

  // Speech Recognition using Web Speech API
  const handleStartListening = () => {
    const SpeechRecognition = (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).SpeechRecognition ||
                              (window as unknown as { SpeechRecognition?: any; webkitSpeechRecognition?: any }).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      // Fallback
      handleAskSample(sampleQuestions[0]);
      return;
    }

    try {
      const recognition = new SpeechRecognition();
      recognition.lang = lang === 'kn' ? 'kn-IN' : 'en-IN';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsRecording(true);
      playSound('pop');

      recognition.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setTranscript(text);
        setIsRecording(false);
        respondToKid(text);
      };

      recognition.onerror = () => {
        setIsRecording(false);
        handleAskSample(sampleQuestions[0]);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      setIsRecording(false);
      handleAskSample(sampleQuestions[0]);
    }
  };

  const respondToKid = (text: string) => {
    setIsAnswering(true);
    const lower = text.toLowerCase();
    let answerKn = 'ಕಂಪ್ಯೂಟರ್ ನಮಗೆ ಅತ್ಯುತ್ತಮ ಗೆಳೆಯ! ಇದು ಕೀಬೋರ್ಡ್, ಮಾನಿಟರ್, ಸಿಪಿಯು ಮತ್ತು ಮೌಸ್ ಹೊಂದಿರುತ್ತದೆ.';
    let answerEn = 'A computer is our wonderful friend! It has a monitor, CPU, keyboard, and mouse!';

    if (lower.includes('brain') || lower.includes('ಮೆದುಳು') || lower.includes('cpu')) {
      answerKn = 'ಸಿ.ಪಿ.ಯು (CPU) ಕಂಪ್ಯೂಟರ್‌ನ ಮೆದುಳು! ಇದು ಎಲ್ಲಾ ಲೆಕ್ಕಾಚಾರ ಮತ್ತು ನೆನಪಿನ ಶಕ್ತಿಯನ್ನು ಹೊಂದಿರುತ್ತದೆ.';
      answerEn = 'The CPU is the central brain of the computer that processes all data!';
    } else if (lower.includes('water') || lower.includes('ನೀರು') || lower.includes('wet') || lower.includes('ಒದ್ದೆ')) {
      answerKn = 'ಎಚ್ಚರ! ನೀರು ಕಂಪ್ಯೂಟರ್ ಗೆಳೆಯನಿಗೆ ಶತ್ರು. ಎಂದಿಗೂ ಒದ್ದೆ ಕೈಗಳಿಂದ ಮುಟ್ಟಬೇಡಿ!';
      answerEn = 'Danger! Keep water far away from electronic devices, and never use wet hands!';
    } else if (lower.includes('mouse') || lower.includes('ಮೌಸ್')) {
      answerKn = 'ಮೌಸ್ ಒಂದು ಇನ್‌ಪುಟ್ ಸಾಧನ! ಎಡ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಲು ಮತ್ತು ಬಲ ಬಟನ್ ಆಯ್ಕೆ ಪಟ್ಟಿಗೆ ಬಳಸಲಾಗುತ್ತದೆ.';
      answerEn = 'The mouse is an input device used to point, click, and drag items!';
    }

    setBotReply(lang === 'kn' ? answerKn : answerEn);
    setIsAnswering(false);
    playSound('fanfare');
    speakText(lang === 'kn' ? answerKn : answerEn, lang);
  };

  const handleAskSample = (sample: typeof sampleQuestions[0]) => {
    playSound('pop');
    setTranscript(lang === 'kn' ? sample.kn : sample.en);
    const reply = lang === 'kn' ? sample.replyKn : sample.replyEn;
    setBotReply(reply);
    speakText(reply, lang);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-cyan-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-cyan-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-400 to-blue-600 flex items-center justify-center text-white text-3xl shadow-md">
            🎙️
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಗಣು ವಾಯ್ಸ್ ಟ್ಯೂಟರ್ (Voice Tutor)' : 'Ganu Voice Tutor for Kids'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === 'kn' ? 'ಧ್ವನಿ ಮೂಲಕ ಕಂಪ್ಯೂಟರ್ ಬಗ್ಗೆ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ!' : 'Ask any computer question using your voice in Kannada or English'}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 max-w-xl mx-auto flex flex-col items-center">
        {/* Animated Friendly Computer Character */}
        <div className="w-32 h-32 rounded-3xl bg-gradient-to-tr from-sky-400 to-cyan-500 shadow-xl border-4 border-white flex flex-col items-center justify-center relative mb-4">
          <div className="w-24 h-16 bg-slate-900 rounded-2xl flex items-center justify-center border-2 border-cyan-200 overflow-hidden">
            <span className="text-3xl animate-bounce">
              {isRecording ? '👂' : isAnswering ? '🤔' : '😊'}
            </span>
          </div>
          <div className="text-[11px] font-black text-white mt-1">GANU 💻</div>
        </div>

        {/* Microphone Button */}
        <button
          onClick={handleStartListening}
          className={`px-8 py-4 rounded-3xl font-black text-base shadow-xl transition-transform hover:scale-105 active:scale-95 flex items-center gap-3 ${
            isRecording
              ? 'bg-rose-500 text-white animate-pulse'
              : 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white'
          }`}
        >
          <span className="text-2xl">{isRecording ? '⏹️' : '🎙️'}</span>
          <span>
            {isRecording
              ? (lang === 'kn' ? 'ಕಿವಿಗೊಟ್ಟು ಕೇಳುತ್ತಿದ್ದೇನೆ...' : 'Listening to your voice...')
              : (lang === 'kn' ? 'ಮಾತನಾಡಿ ಪ್ರಶ್ನೆ ಕೇಳಿ!' : 'Tap & Speak to Ganu!')}
          </span>
        </button>

        {/* Transcript & Response Area */}
        {transcript && (
          <div className="mt-6 w-full flex flex-col gap-3 animate-fadeIn">
            {/* User Question */}
            <div className="bg-slate-100 p-4 rounded-2xl border border-slate-200 flex items-start gap-3">
              <span className="text-xl">🗣️</span>
              <div>
                <div className="text-[10px] font-bold text-slate-400 uppercase">
                  {lang === 'kn' ? 'ನಿಮ್ಮ ಪ್ರಶ್ನೆ' : 'Your Question'}
                </div>
                <div className="text-sm font-extrabold text-slate-800 font-kannada">
                  "{transcript}"
                </div>
              </div>
            </div>

            {/* Ganu Reply */}
            {botReply && (
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 p-4 rounded-2xl border-2 border-cyan-300 flex items-start gap-3 shadow-sm">
                <span className="text-2xl">🤖</span>
                <div className="flex-1">
                  <div className="text-[10px] font-black text-cyan-800 uppercase">
                    {lang === 'kn' ? 'ಗಣು ಉತ್ತರ' : 'Ganu Answer'}
                  </div>
                  <div className="text-sm font-extrabold text-slate-900 font-kannada leading-relaxed mt-1">
                    {botReply}
                  </div>
                </div>
                <button
                  onClick={() => speakText(botReply, lang)}
                  className="p-2 rounded-xl bg-white shadow text-cyan-700 hover:bg-cyan-100"
                  title="Speak again"
                >
                  🔊
                </button>
              </div>
            )}
          </div>
        )}

        {/* Quick Sample Questions */}
        <div className="mt-6 w-full">
          <div className="text-xs font-black uppercase text-slate-400 mb-2.5 text-center">
            {lang === 'kn' ? 'ಅಥವಾ ಈ ಸರಳ ಪ್ರಶ್ನೆಗಳ ಮೇಲೆ ಕ್ಲಿಕ್ ಮಾಡಿ:' : 'Or tap a question below to hear Ganu explain:'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {sampleQuestions.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleAskSample(q)}
                className="p-3 bg-white hover:bg-cyan-50 border-2 border-cyan-100 hover:border-cyan-300 rounded-2xl text-left text-xs font-bold text-slate-800 transition-all shadow-sm flex items-center gap-2"
              >
                <span className="text-cyan-500 font-mono">Q:</span>
                <span className="font-kannada flex-1 truncate">{lang === 'kn' ? q.kn : q.en}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
