import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playSound, speakText } from '../utils/audio';

const WORDS_TO_TYPE = [
  { word: 'CAT', icon: '🐱', hintKn: 'ಬೆಕ್ಕು (C-A-T)', hintEn: 'Find C, then A, then T' },
  { word: 'DOG', icon: '🐶', hintKn: 'ನಾಯಿ (D-O-G)', hintEn: 'Find D, then O, then G' },
  { word: 'SUN', icon: '☀️', hintKn: 'ಸೂರ್ಯ (S-U-N)', hintEn: 'Find S, then U, then N' },
  { word: 'BUS', icon: '🚌', hintKn: 'ಬಸ್ಸು (B-U-S)', hintEn: 'Find B, then U, then S' },
  { word: 'BAT', icon: '🏏', hintKn: 'ಬ್ಯಾಟ್ (B-A-T)', hintEn: 'Find B, then A, then T' },
  { word: 'RAT', icon: '🐭', hintKn: 'ಇಲಿ (R-A-T)', hintEn: 'Find R, then A, then T' },
  { word: 'PEN', icon: '🖊️', hintKn: 'ಪೆನ್ನು (P-E-N)', hintEn: 'Find P, then E, then N' }
];

export const KiboKeyboardTutor: React.FC<{ lang: 'kn' | 'en' }> = ({ lang }) => {
  const [targetIdx, setTargetIdx] = useState(0);
  const [typedText, setTypedText] = useState('');
  const [activeKeyColor, setActiveKeyColor] = useState<string | null>(null);
  const [keyCategory, setKeyCategory] = useState<'all' | 'letters' | 'numbers' | 'space' | 'enter' | 'backspace'>('all');

  const currentItem = WORDS_TO_TYPE[targetIdx];

  const handleKeyPress = (char: string) => {
    playSound('pop');

    if (char === 'BACKSPACE') {
      setTypedText(t => t.slice(0, -1));
      return;
    }

    if (char === 'SPACE') {
      setTypedText(t => t + ' ');
      return;
    }

    if (char === 'ENTER') {
      if (typedText.trim() === currentItem.word) {
        playSound('correct');
        confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
        speakText(
          lang === 'kn' ? `ಅದ್ಭುತ! ನೀವು ${currentItem.word} ಟೈಪ್ ಮಾಡಿದ್ದೀರಿ!` : `Super! You typed ${currentItem.word}!`,
          lang
        );
        setTimeout(() => {
          setTypedText('');
          setTargetIdx(i => (i + 1) % WORDS_TO_TYPE.length);
        }, 1200);
      } else {
        playSound('wrong');
        speakText(
          lang === 'kn' ? `ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ! ${currentItem.hintKn}` : `Try again! ${currentItem.hintEn}`,
          lang
        );
      }
      return;
    }

    const nextText = typedText + char;
    setTypedText(nextText);

    // Speak single letter phonetically
    speakText(char, 'en');

    if (nextText === currentItem.word) {
      playSound('fanfare');
      speakText(
        lang === 'kn' ? `ಈಗ Enter ಕೀ ಒತ್ತಿ!` : `Now press the yellow Enter key!`,
        lang
      );
    }
  };

  const keyboardRows = [
    ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', 'BACKSPACE'],
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'ENTER'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M']
  ];

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-indigo-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-indigo-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-500 to-sky-500 flex items-center justify-center text-white text-3xl shadow-md">
            ⌨️
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಕೀಬೋ - ಕೀಬೋರ್ಡ್ ಪೆನ್ಸಿಲ್ ಆಟ' : 'Kibo the Keyboard Tutor'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === 'kn' ? 'ಕೀಬೋರ್ಡ್ ಕಂಪ್ಯೂಟರ್‌ಗೆ ಪೆನ್ಸಿಲ್ ಇದ್ದಂತೆ! (Class 2 Lesson 4)' : 'The Keyboard is like a pencil for the computer!'}
            </p>
          </div>
        </div>

        {/* Textbook Key Detective Color Filter */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full text-xs font-bold">
          <span className="text-slate-400 mr-1">{lang === 'kn' ? 'ಕೀ ಪತ್ತೇದಾರಿ:' : 'Key Detective:'}</span>
          <button
            onClick={() => { setKeyCategory('letters'); playSound('pop'); }}
            className={`px-3 py-1 rounded-xl transition-all ${
              keyCategory === 'letters' ? 'bg-blue-600 text-white shadow' : 'bg-blue-50 text-blue-900'
            }`}
          >
            {lang === 'kn' ? 'ನೀಲಿ (A-Z)' : 'Blue (A-Z)'}
          </button>
          <button
            onClick={() => { setKeyCategory('numbers'); playSound('pop'); }}
            className={`px-3 py-1 rounded-xl transition-all ${
              keyCategory === 'numbers' ? 'bg-orange-500 text-white shadow' : 'bg-orange-50 text-orange-900'
            }`}
          >
            {lang === 'kn' ? 'ಕಿತ್ತಳೆ (0-9)' : 'Orange (0-9)'}
          </button>
          <button
            onClick={() => { setKeyCategory('space'); playSound('pop'); }}
            className={`px-3 py-1 rounded-xl transition-all ${
              keyCategory === 'space' ? 'bg-emerald-600 text-white shadow' : 'bg-emerald-50 text-emerald-900'
            }`}
          >
            {lang === 'kn' ? 'ಹಸಿರು (Space)' : 'Green (Space)'}
          </button>
          <button
            onClick={() => { setKeyCategory('all'); playSound('pop'); }}
            className="px-2.5 py-1 rounded-xl bg-slate-100 text-slate-700 hover:bg-slate-200"
          >
            {lang === 'kn' ? 'ಎಲ್ಲಾ' : 'All'}
          </button>
        </div>
      </div>

      {/* Target Word Flashcard */}
      <div className="mt-6 flex flex-col items-center">
        <div className="w-full max-w-md bg-gradient-to-r from-indigo-50 to-sky-50 rounded-3xl p-6 border-2 border-indigo-200 shadow-md flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-6xl animate-bounce">{currentItem.icon}</span>
            <div>
              <div className="text-xs font-bold text-indigo-700 uppercase">
                {lang === 'kn' ? 'ಈ ಪದವನ್ನು ಟೈಪ್ ಮಾಡಿ:' : 'Type this word:'}
              </div>
              <h3 className="text-3xl font-black text-slate-900 tracking-wider font-mono">
                {currentItem.word}
              </h3>
              <p className="text-xs text-slate-600 mt-1 font-kannada">
                {lang === 'kn' ? currentItem.hintKn : currentItem.hintEn}
              </p>
            </div>
          </div>

          {/* Typing Display Box */}
          <div className="w-28 h-16 bg-white rounded-2xl border-3 border-indigo-400 flex items-center justify-center text-2xl font-black tracking-widest font-mono text-indigo-900 shadow-inner">
            {typedText}
            <span className="animate-pulse text-indigo-400">|</span>
          </div>
        </div>
      </div>

      {/* Interactive Realistic On-Screen Keyboard */}
      <div className="mt-6 max-w-2xl mx-auto bg-slate-800 p-4 rounded-3xl shadow-2xl border-4 border-slate-700 flex flex-col gap-2">
        {keyboardRows.map((row, rIdx) => (
          <div key={rIdx} className="flex justify-center gap-1.5">
            {row.map(k => {
              const isLetter = /^[A-Z]$/.test(k);
              const isNum = /^[0-9]$/.test(k);
              const isNextLetter = currentItem.word[typedText.length] === k;

              // Color based on textbook: Letters Blue, Numbers Orange, Backspace Red, Enter Yellow
              let keyBg = 'bg-slate-700 text-white';
              if (isLetter) {
                keyBg = isNextLetter ? 'bg-blue-500 text-white animate-pulse ring-2 ring-white' : 'bg-blue-600 text-white';
              } else if (isNum) {
                keyBg = 'bg-orange-500 text-white';
              } else if (k === 'ENTER') {
                keyBg = 'bg-amber-400 text-slate-900 font-black';
              } else if (k === 'BACKSPACE') {
                keyBg = 'bg-rose-500 text-white';
              }

              return (
                <button
                  key={k}
                  onClick={() => handleKeyPress(k)}
                  className={`h-11 px-2.5 rounded-xl font-bold text-xs sm:text-sm shadow-md transition-all active:scale-90 flex items-center justify-center ${
                    k === 'ENTER' ? 'w-20' : k === 'BACKSPACE' ? 'w-24' : 'w-10 sm:w-12'
                  } ${keyBg}`}
                >
                  {k === 'BACKSPACE' ? '⌫ Erase' : k === 'ENTER' ? '⏎ Enter' : k}
                </button>
              );
            })}
          </div>
        ))}

        {/* Space Bar Row */}
        <div className="flex justify-center gap-2 mt-1">
          <button
            onClick={() => handleKeyPress('SPACE')}
            className="w-72 h-10 rounded-xl bg-emerald-500 hover:bg-emerald-600 active:scale-95 text-white font-extrabold text-xs shadow-md transition-all flex items-center justify-center tracking-wider"
          >
            ␣ {lang === 'kn' ? 'ಸ್ಪೇಸ್ ಬಾರ್ (Space Bar)' : 'SPACE BAR'}
          </button>
        </div>
      </div>
    </div>
  );
};
