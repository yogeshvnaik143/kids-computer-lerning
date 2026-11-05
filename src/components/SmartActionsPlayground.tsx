import React, { useState } from 'react';
import { playSound, speakText } from '../utils/audio';

export const SmartActionsPlayground: React.FC<{ lang: 'kn' | 'en' }> = ({ lang }) => {
  const [activeMode, setActiveMode] = useState<'touch' | 'voice' | 'face' | 'choice'>('touch');
  const [touchCounter, setTouchCounter] = useState(0);
  const [touchAction, setTouchAction] = useState<string>('tap');
  const [voiceQuery, setVoiceQuery] = useState<string>('');
  const [voiceResult, setVoiceResult] = useState<string>('');
  const [faceDetected, setFaceDetected] = useState<boolean>(false);
  const [selectedCartoon, setSelectedCartoon] = useState<string>('lion');

  // Handle Touch interactions
  const handleTouch = (action: 'tap' | 'double' | 'slide' | 'zoom') => {
    playSound('pop');
    setTouchAction(action);
    setTouchCounter(c => c + 1);

    if (action === 'tap') {
      speakText(lang === 'kn' ? 'ಸ್ಪರ್ಶ: ಆ್ಯಪ್ ತೆರೆಯಲು ಟ್ಯಾಪ್ ಮಾಡಿದ್ದೀರಿ!' : 'Touch: You tapped to open the app!', lang);
    } else if (action === 'double') {
      speakText(lang === 'kn' ? 'ಡಬಲ್ ಟ್ಯಾಪ್: ಝೂಮ್ ಮಾಡಲಾಗಿದೆ!' : 'Double tap: Zoomed in!', lang);
    } else if (action === 'slide') {
      speakText(lang === 'kn' ? 'ಸ್ಲೈಡ್: ಪುಟವನ್ನು ಮುಂದಕ್ಕೆ ಸರಿಸಲಾಗಿದೆ!' : 'Slide: Swiped to next photo!', lang);
    } else if (action === 'zoom') {
      speakText(lang === 'kn' ? 'ಪಿಂಚ್ ಜೂಮ್: ಚಿತ್ರ ದೊಡ್ಡದಾಗಿದೆ!' : 'Zoom: Picture enlarged!', lang);
    }
  };

  // Handle Voice Search
  const handleVoiceCommand = (cmd: string) => {
    playSound('pop');
    setVoiceQuery(cmd);

    if (cmd.includes('elephant') || cmd.includes('ಆನೆ')) {
      setVoiceResult('🐘 ' + (lang === 'kn' ? 'ಆನೆಯ ಹಾಡು ಪ್ಲೇ ಆಗುತ್ತಿದೆ! "ಆನೆ ಬಂತೊಂದಾನೆ..."' : 'Playing Elephant Song! "The big grey elephant goes like this..."'));
      speakText(lang === 'kn' ? 'ಆನೆಯ ಹಾಡು ಪ್ಲೇ ಆಗುತ್ತಿದೆ!' : 'Playing cute elephant rhyme!', lang);
    } else if (cmd.includes('peacock') || cmd.includes('ನವಿಲು')) {
      setVoiceResult('🦚 ' + (lang === 'kn' ? 'ಸುಂದರ ಗರಿಬಿಚ್ಚಿದ ನವಿಲಿನ ಚಿತ್ರ ಹುಡುಕಲಾಗಿದೆ!' : 'Found dancing peacock photo!'));
      speakText(lang === 'kn' ? 'ನವಿಲಿನ ಚಿತ್ರ ಇಲ್ಲಿದೆ!' : 'Here is the beautiful peacock photo!', lang);
    } else if (cmd.includes('sun') || cmd.includes('ಸೂರ್ಯ')) {
      setVoiceResult('☀️ ' + (lang === 'kn' ? 'ಇಂದಿನ ಹವಾಮಾನ: ಪ್ರಕಾಶಮಾನ ಬಿಸಿಲು 29°C' : 'Today Weather: Bright sunny 29°C!'));
      speakText(lang === 'kn' ? 'ಇಂದು ಬಿಸಿಲಿನ ವಾತಾವರಣ!' : 'Today is sunny weather!', lang);
    } else {
      setVoiceResult('✨ ' + (lang === 'kn' ? `ಮಾಹಿತಿ ಹುಡುಕಲಾಗಿದೆ: "${cmd}"` : `Found information for: "${cmd}"`));
    }
  };

  // Handle Face Unlock
  const handleSimulateFace = () => {
    playSound('camera');
    setFaceDetected(true);
    speakText(
      lang === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ಕ್ಯಾಮೆರಾ ಮುಖವನ್ನು ಗುರುತಿಸಿದೆ! ಪರದೆ ತೆರೆದಿದೆ!' : 'Smart camera recognized your smiling face! Unlocked!',
      lang
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-rose-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-rose-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-amber-500 flex items-center justify-center text-white text-2xl shadow-md">
            ✨
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಸ್ಪರ್ಶ – ಧ್ವನಿ – ಮುಖ – ಆಯ್ಕೆ' : 'Touch – Sound – Face – Choice'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ಸಾಧನಗಳು ನಮಗೆ ಹೇಗೆ ಸ್ಪಂದಿಸುತ್ತವೆ? (How Smart Devices Respond)' : 'Interactive Playground for Sensor & Input Responses'}
            </p>
          </div>
        </div>

        {/* 4 Mode Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          <button
            onClick={() => { setActiveMode('touch'); playSound('pop'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              activeMode === 'touch' ? 'bg-rose-500 text-white shadow-md' : 'bg-rose-50 text-rose-900 hover:bg-rose-100'
            }`}
          >
            <span>👆</span>
            <span>{lang === 'kn' ? 'ಸ್ಪರ್ಶ (Touch)' : 'Touch'}</span>
          </button>

          <button
            onClick={() => { setActiveMode('voice'); playSound('pop'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              activeMode === 'voice' ? 'bg-amber-500 text-white shadow-md' : 'bg-amber-50 text-amber-900 hover:bg-amber-100'
            }`}
          >
            <span>🎙️</span>
            <span>{lang === 'kn' ? 'ಧ್ವನಿ (Sound)' : 'Sound'}</span>
          </button>

          <button
            onClick={() => { setActiveMode('face'); playSound('pop'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              activeMode === 'face' ? 'bg-emerald-500 text-white shadow-md' : 'bg-emerald-50 text-emerald-900 hover:bg-emerald-100'
            }`}
          >
            <span>🙂</span>
            <span>{lang === 'kn' ? 'ಮುಖ (Face)' : 'Face'}</span>
          </button>

          <button
            onClick={() => { setActiveMode('choice'); playSound('pop'); }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 ${
              activeMode === 'choice' ? 'bg-indigo-500 text-white shadow-md' : 'bg-indigo-50 text-indigo-900 hover:bg-indigo-100'
            }`}
          >
            <span>🎨</span>
            <span>{lang === 'kn' ? 'ಆಯ್ಕೆ (Choice)' : 'Choice'}</span>
          </button>
        </div>
      </div>

      {/* Mode 1: TOUCH SIMULATOR */}
      {activeMode === 'touch' && (
        <div className="mt-6 flex flex-col items-center max-w-xl mx-auto">
          <div className="text-center mb-4">
            <h3 className="text-lg font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಪರದೆಯ ಮೇಲೆ ಬೆರಳಿನ ಸ್ಪರ್ಶ (Touch Gestures)' : 'Screen Touch Gestures'}
            </h3>
            <p className="text-xs text-slate-500 font-kannada">
              {lang === 'kn' ? 'ಬೆರಳಿನಿಂದ ಮುಟ್ಟಿದ ತಕ್ಷಣ ಸಾಧನ ಹೇಗೆ ಕೆಲಸ ಮಾಡುತ್ತದೆ ನೋಡಿ!' : 'See how tablet/phone responds to different finger touches!'}
            </p>
          </div>

          {/* Interactive Pad */}
          <div className="w-full h-56 bg-gradient-to-br from-rose-50 to-pink-50 rounded-3xl border-4 border-dashed border-rose-300 p-6 flex flex-col items-center justify-center relative overflow-hidden shadow-inner">
            <div className={`transition-all duration-300 text-center ${
              touchAction === 'zoom' ? 'scale-150' : touchAction === 'slide' ? 'translate-x-12' : 'scale-100'
            }`}>
              <span className="text-6xl">🎈</span>
              <div className="text-sm font-bold text-slate-700 mt-2">
                {touchAction === 'tap' && (lang === 'kn' ? 'ಟ್ಯಾಪ್ ಮಾಡಲಾಗಿದೆ!' : 'Single Tapped!')}
                {touchAction === 'double' && (lang === 'kn' ? 'ಡಬಲ್ ಟ್ಯಾಪ್!' : 'Double Tapped!')}
                {touchAction === 'slide' && (lang === 'kn' ? 'ಸ್ಲೈಡ್ / ಸ್ವೈಪ್!' : 'Slide / Swiped!')}
                {touchAction === 'zoom' && (lang === 'kn' ? 'ಝೂಮ್ ಮಾಡಲಾಗಿದೆ!' : 'Zoomed in!')}
              </div>
            </div>

            <div className="absolute bottom-3 right-4 text-xs font-bold text-rose-800">
              {lang === 'kn' ? `ಸ್ಪರ್ಶಗಳ ಸಂಖ್ಯೆ: ${touchCounter}` : `Touches: ${touchCounter}`}
            </div>
          </div>

          {/* Touch Action Buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full mt-4">
            <button
              onClick={() => handleTouch('tap')}
              className="p-3 bg-white hover:bg-rose-50 rounded-2xl border-2 border-rose-200 text-xs font-bold text-slate-800 shadow-sm transition-transform active:scale-95 flex flex-col items-center gap-1"
            >
              <span className="text-2xl">👆</span>
              <span>{lang === 'kn' ? 'ಟ್ಯಾಪ್ (Tap)' : 'Tap'}</span>
            </button>
            <button
              onClick={() => handleTouch('double')}
              className="p-3 bg-white hover:bg-rose-50 rounded-2xl border-2 border-rose-200 text-xs font-bold text-slate-800 shadow-sm transition-transform active:scale-95 flex flex-col items-center gap-1"
            >
              <span className="text-2xl">✌️</span>
              <span>{lang === 'kn' ? 'ಡಬಲ್ ಟ್ಯಾಪ್' : 'Double Tap'}</span>
            </button>
            <button
              onClick={() => handleTouch('slide')}
              className="p-3 bg-white hover:bg-rose-50 rounded-2xl border-2 border-rose-200 text-xs font-bold text-slate-800 shadow-sm transition-transform active:scale-95 flex flex-col items-center gap-1"
            >
              <span className="text-2xl">👉</span>
              <span>{lang === 'kn' ? 'ಸ್ಲೈಡ್ (Swipe)' : 'Swipe / Slide'}</span>
            </button>
            <button
              onClick={() => handleTouch('zoom')}
              className="p-3 bg-white hover:bg-rose-50 rounded-2xl border-2 border-rose-200 text-xs font-bold text-slate-800 shadow-sm transition-transform active:scale-95 flex flex-col items-center gap-1"
            >
              <span className="text-2xl">🔍</span>
              <span>{lang === 'kn' ? 'ಜೂಮ್ (Zoom)' : 'Zoom in'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Mode 2: VOICE SIMULATOR */}
      {activeMode === 'voice' && (
        <div className="mt-6 flex flex-col items-center max-w-xl mx-auto">
          <div className="text-center mb-4">
            <h3 className="text-lg font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಧ್ವನಿ ಸೂಚನೆ (Voice Commands & Smart Speakers)' : 'Voice Search & Smart Speakers'}
            </h3>
            <p className="text-xs text-slate-500 font-kannada">
              {lang === 'kn' ? 'ಟೈಪ್ ಮಾಡಲು ಬರದಿದ್ದಾಗ ಧ್ವನಿ ಮೂಲಕ ಹಾಡು ಅಥವಾ ಮಾಹಿತಿ ಹುಡುಕಿ!' : 'No need to type! Ask with your voice like Google Assistant or Alexa.'}
            </p>
          </div>

          <div className="w-full bg-slate-900 rounded-3xl p-6 text-white flex flex-col items-center text-center shadow-lg border-2 border-slate-700">
            {/* Smart Speaker Illustration */}
            <div className="w-20 h-20 rounded-full bg-gradient-to-t from-slate-700 to-slate-500 shadow-2xl flex items-center justify-center relative mb-4">
              <div className="w-14 h-14 rounded-full bg-slate-800 flex items-center justify-center border-2 border-cyan-400 animate-pulse">
                <span className="text-2xl">🎙️</span>
              </div>
            </div>

            <div className="text-sm font-extrabold text-cyan-400">
              {voiceQuery ? `"${voiceQuery}"` : (lang === 'kn' ? 'ಧ್ವನಿಗಾಗಿ ಕಾಯುತ್ತಿದೆ...' : 'Listening for voice...')}
            </div>

            {voiceResult && (
              <div className="mt-4 p-3 bg-white/10 rounded-2xl text-xs sm:text-sm font-bold text-emerald-300 border border-emerald-400/30 animate-fadeIn">
                {voiceResult}
              </div>
            )}
          </div>

          {/* Quick Voice Prompt Buttons */}
          <div className="mt-4 flex flex-wrap justify-center gap-2 w-full">
            <button
              onClick={() => handleVoiceCommand(lang === 'kn' ? 'ಆನೆಯ ಹಾಡು ಪ್ಲೇ ಮಾಡು' : 'Play elephant rhyme')}
              className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all shadow-sm"
            >
              🐘 {lang === 'kn' ? '"ಆನೆಯ ಹಾಡು ಪ್ಲೇ ಮಾಡು"' : '"Play elephant song"'}
            </button>
            <button
              onClick={() => handleVoiceCommand(lang === 'kn' ? 'ನವಿಲಿನ ಚಿತ್ರ ತೋರಿಸು' : 'Show peacock picture')}
              className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all shadow-sm"
            >
              🦚 {lang === 'kn' ? '"ನವಿಲಿನ ಚಿತ್ರ ತೋರಿಸು"' : '"Show peacock picture"'}
            </button>
            <button
              onClick={() => handleVoiceCommand(lang === 'kn' ? 'ಇಂದಿನ ಹವಾಮಾನ ತಿಳಿಸು' : 'Tell today weather')}
              className="px-3.5 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 text-xs font-bold transition-all shadow-sm"
            >
              ☀️ {lang === 'kn' ? '"ಇಂದಿನ ಹವಾಮಾನ ತಿಳಿಸು"' : '"What is the weather?"'}
            </button>
          </div>
        </div>
      )}

      {/* Mode 3: FACE DETECTION */}
      {activeMode === 'face' && (
        <div className="mt-6 flex flex-col items-center max-w-xl mx-auto">
          <div className="text-center mb-4">
            <h3 className="text-lg font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಮುಖ ಗುರುತಿಸುವಿಕೆ (Face Recognition)' : 'Smart Camera Face Detection'}
            </h3>
            <p className="text-xs text-slate-500 font-kannada">
              {lang === 'kn' ? 'ಕ್ಯಾಮೆರಾ ನಿಮ್ಮ ಮುಖ ನೋಡಿ ಸ್ವಯಂಚಾಲಿತವಾಗಿ ಅನ್‌ಲಾಕ್ ಮಾಡುತ್ತದೆ!' : 'Smart cameras detect human faces to capture pictures or unlock!'}
            </p>
          </div>

          <div className="w-full bg-slate-900 rounded-3xl p-6 text-white flex flex-col items-center text-center shadow-lg border-2 border-emerald-400">
            <div className="relative w-48 h-48 rounded-2xl border-4 border-dashed border-emerald-400 flex items-center justify-center overflow-hidden bg-slate-800">
              <span className={`text-7xl transition-all duration-300 ${faceDetected ? 'scale-110' : 'opacity-40'}`}>
                🧑‍🦱
              </span>

              {faceDetected && (
                <div className="absolute inset-0 border-4 border-emerald-400 rounded-2xl flex items-end justify-center pb-2 bg-emerald-500/10">
                  <span className="text-[10px] font-black uppercase bg-emerald-600 px-2.5 py-0.5 rounded-full">
                    Face Detected ✓
                  </span>
                </div>
              )}
            </div>

            <button
              onClick={handleSimulateFace}
              className="mt-5 px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-md transition-transform hover:scale-105"
            >
              📸 {lang === 'kn' ? 'ಮುಖವನ್ನು ಸ್ಕ್ಯಾನ್ ಮಾಡಿ' : 'Scan Smile / Detect Face'}
            </button>
          </div>
        </div>
      )}

      {/* Mode 4: CHOICE (SELECTION) */}
      {activeMode === 'choice' && (
        <div className="mt-6 flex flex-col items-center max-w-xl mx-auto">
          <div className="text-center mb-4">
            <h3 className="text-lg font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಆಯ್ಕೆ (Choice & Preferences)' : 'Choice & Selection'}
            </h3>
            <p className="text-xs text-slate-500 font-kannada">
              {lang === 'kn' ? 'ನಾವು ಆಯ್ಕೆ ಮಾಡಿದ ಬಣ್ಣ ಅಥವಾ ಕಾರ್ಟೂನ್ ಅನ್ನು ಕಂಪ್ಯೂಟರ್ ತೋರಿಸುತ್ತದೆ!' : 'The device does what YOU choose! Pick your favorite cartoon character.'}
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3 w-full">
            {[
              { id: 'lion', labelKn: 'ಸಿಂಹ ರಾಜ', labelEn: 'King Lion', icon: '🦁', color: 'from-amber-400 to-orange-500' },
              { id: 'parrot', labelKn: 'ಗಿಳಿ ರಾಮ', labelEn: 'Green Parrot', icon: '🦜', color: 'from-emerald-400 to-green-600' },
              { id: 'robot', labelKn: 'ರೋಬೋ ಗಣು', labelEn: 'Robo Ganu', icon: '🤖', color: 'from-sky-400 to-indigo-600' }
            ].map(c => {
              const isSelected = selectedCartoon === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => {
                    setSelectedCartoon(c.id);
                    playSound('pop');
                    speakText(
                      lang === 'kn' ? `ನೀವು ${c.labelKn} ಆಯ್ಕೆ ಮಾಡಿದ್ದೀರಿ!` : `You selected ${c.labelEn}!`,
                      lang
                    );
                  }}
                  className={`p-4 rounded-3xl border-3 flex flex-col items-center transition-all ${
                    isSelected
                      ? 'border-indigo-600 bg-indigo-50 shadow-lg scale-105 ring-2 ring-indigo-300'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${c.color} flex items-center justify-center text-4xl shadow-md mb-2`}>
                    {c.icon}
                  </div>
                  <div className="text-xs font-black text-slate-800 font-display">
                    {lang === 'kn' ? c.labelKn : c.labelEn}
                  </div>
                  {isSelected && (
                    <span className="text-[10px] font-bold text-indigo-600 mt-1">✓ {lang === 'kn' ? 'ಆಯ್ಕೆ ಆಗಿದೆ' : 'Selected'}</span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
