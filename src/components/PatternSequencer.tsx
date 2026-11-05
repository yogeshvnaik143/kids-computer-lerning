import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playSound, speakText } from '../utils/audio';

interface PatternChallenge {
  id: string;
  type: 'shapes' | 'fruits' | 'colors' | 'sounds';
  titleKn: string;
  titleEn: string;
  sequence: { icon: string; label: string }[];
  options: { icon: string; label: string; isCorrect: boolean }[];
  ruleKn: string;
  ruleEn: string;
}

const PATTERNS: PatternChallenge[] = [
  // Textbook Grade 2 Page 37 & 38: Balls, Fruits and Shapes
  {
    id: 'p1',
    type: 'fruits',
    titleKn: 'ಹಣ್ಣುಗಳ ವಿನಾಾಸ (Fruit Pattern)',
    titleEn: 'Fruit Repeating Sequence',
    sequence: [
      { icon: '🍎', label: 'Apple' },
      { icon: '🍇', label: 'Grapes' },
      { icon: '🍎', label: 'Apple' },
      { icon: '🍇', label: 'Grapes' },
      { icon: '🍎', label: 'Apple' }
    ],
    options: [
      { icon: '🍇', label: 'Grapes', isCorrect: true },
      { icon: '🍎', label: 'Apple', isCorrect: false },
      { icon: '🍌', label: 'Banana', isCorrect: false }
    ],
    ruleKn: 'ಸೇಬು, ದ್ರಾಕ್ಷಿ, ಸೇಬು, ದ್ರಾಕ್ಷಿ... ಮುಂದಿನ ಹಣ್ಣು ದ್ರಾಕ್ಷಿ!',
    ruleEn: 'Apple, Grapes, Apple, Grapes... Next comes Grapes!'
  },
  {
    id: 'p2',
    type: 'shapes',
    titleKn: 'ಆಕಾರಗಳ ವಿನಾಾಸ (Geometric Shapes)',
    titleEn: 'Shapes Pattern: Triangle & Square',
    sequence: [
      { icon: '🔺', label: 'Triangle' },
      { icon: '🟧', label: 'Square' },
      { icon: '🔺', label: 'Triangle' },
      { icon: '🟧', label: 'Square' },
      { icon: '🔺', label: 'Triangle' }
    ],
    options: [
      { icon: '🟧', label: 'Square', isCorrect: true },
      { icon: '🔺', label: 'Triangle', isCorrect: false },
      { icon: '🔵', label: 'Circle', isCorrect: false }
    ],
    ruleKn: 'ತ್ರಿಕೋನ, ಚೌಕ, ತ್ರಿಕೋನ, ಚೌಕ... ಮುಂದಿನ ಆಕಾರ ಚೌಕ!',
    ruleEn: 'Triangle, Square, Triangle, Square... Next is Square!'
  },
  {
    id: 'p3',
    type: 'colors',
    titleKn: 'ಬಣ್ಣದ ಚೆಂಡುಗಳ ವಿನಾಾಸ (Color Balls)',
    titleEn: 'Color Balls Repeating Sequence',
    sequence: [
      { icon: '🔴', label: 'Red' },
      { icon: '🔵', label: 'Blue' },
      { icon: '🔴', label: 'Red' },
      { icon: '🔵', label: 'Blue' }
    ],
    options: [
      { icon: '🔴', label: 'Red Ball', isCorrect: true },
      { icon: '🟢', label: 'Green Ball', isCorrect: false },
      { icon: '🟡', label: 'Yellow Ball', isCorrect: false }
    ],
    ruleKn: 'ಕೆಂಪು, ನೀಲಿ, ಕೆಂಪು, ನೀಲಿ... ಮುಂದಿನದು ಕೆಂಪು ಚೆಂಡು!',
    ruleEn: 'Red, Blue, Red, Blue... Next is Red Ball!'
  },
  {
    id: 'p4',
    type: 'sounds',
    titleKn: 'ಕ್ಲ್ಯಾಪ್ & ಟ್ಯಾಪ್ ವಿನಾಾಸ (Action Song)',
    titleEn: 'Clap... Tap... Clap... Tap!... Rhythm',
    sequence: [
      { icon: '👏', label: 'Clap' },
      { icon: '🦶', label: 'Tap' },
      { icon: '👏', label: 'Clap' },
      { icon: '🦶', label: 'Tap' }
    ],
    options: [
      { icon: '👏', label: 'Clap Hands', isCorrect: true },
      { icon: '🦶', label: 'Tap Foot', isCorrect: false },
      { icon: '💤', label: 'Sleep', isCorrect: false }
    ],
    ruleKn: 'ಚಪ್ಪಾಳೆ, ಟ್ಯಾಪ್, ಚಪ್ಪಾಳೆ, ಟ್ಯಾಪ್... ನಂತರ ಬರುವುದು ಚಪ್ಪಾಳೆ!',
    ruleEn: 'Clap, Tap, Clap, Tap... Next is Clap!'
  }
];

export const PatternSequencer: React.FC<{ lang: 'kn' | 'en' }> = ({ lang }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userAnswer, setUserAnswer] = useState<string | null>(null);
  const [score, setScore] = useState(0);

  const pattern = PATTERNS[currentIdx];

  const handleSelectOption = (opt: { icon: string; label: string; isCorrect: boolean }) => {
    setUserAnswer(opt.icon);

    if (opt.isCorrect) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.7 } });
      speakText(
        lang === 'kn' ? `ಸರಿಯಾದ ವಿನಾಾಸ! ${pattern.ruleKn}` : `Correct pattern! ${pattern.ruleEn}`,
        lang
      );
    } else {
      playSound('wrong');
      speakText(
        lang === 'kn' ? `ತಪ್ಪಾಗಿದೆ. ${pattern.ruleKn}` : `Not quite. ${pattern.ruleEn}`,
        lang
      );
    }
  };

  const nextPattern = () => {
    playSound('whoosh');
    setUserAnswer(null);
    if (currentIdx + 1 < PATTERNS.length) {
      setCurrentIdx(i => i + 1);
    } else {
      playSound('fanfare');
      setCurrentIdx(0);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-amber-300">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl shadow-md">
            🧩
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ರೋಬೋ ರಾಜು - ವಿನಾಾಸಗಳು ಮತ್ತು ಅನುಕ್ರಮ' : 'Robo Raju - Patterns & Sequences'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === 'kn' ? 'ವಿನಾಾಸ ಗುರುತಿಸಿ - ಮುಂದೆ ಏನು ಬರುತ್ತದೆ ಹೇಳಿ! (Class 2 Lesson 6)' : 'Identify repeating patterns and find what comes next'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200">
          <span className="text-xl">⭐</span>
          <span className="text-sm font-black text-amber-900">{score} {lang === 'kn' ? 'ಅಂಕಗಳು' : 'pts'}</span>
        </div>
      </div>

      {/* Main Pattern Area */}
      <div className="mt-6 max-w-xl mx-auto flex flex-col items-center">
        <h3 className="text-lg font-black text-slate-900 mb-1 font-display">
          {lang === 'kn' ? pattern.titleKn : pattern.titleEn}
        </h3>
        <p className="text-xs text-slate-500 mb-6 font-kannada text-center">
          {lang === 'kn' ? 'ವಿನಾಾಸವನ್ನು ಗಮನಿಸಿ, ಪ್ರಶ್ನಾರ್ಥಕ ಚಿಹ್ನೆಯ ಜಾಗದಲ್ಲಿ ಯಾವುದು ಬರುತ್ತದೆ ಆರಿಸಿ!' : 'Look at the pattern and choose what fills the mystery question mark!'}
        </p>

        {/* The Sequence Train */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap p-5 bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl border-2 border-amber-200 shadow-inner w-full">
          {pattern.sequence.map((item, idx) => (
            <div
              key={idx}
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-white shadow-md border-2 border-amber-100 flex items-center justify-center text-3xl sm:text-4xl animate-fadeIn"
            >
              {item.icon}
            </div>
          ))}

          {/* Missing Box */}
          <div className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl border-3 border-dashed flex items-center justify-center text-3xl sm:text-4xl transition-all ${
            userAnswer
              ? 'bg-amber-400 text-white border-amber-500 scale-105 shadow-md'
              : 'border-amber-400 bg-white/60 text-amber-500 animate-pulse'
          }`}>
            {userAnswer || '?'}
          </div>
        </div>

        {/* Result Message */}
        {userAnswer && (
          <div className="mt-4 p-3 bg-amber-100 border border-amber-300 rounded-2xl text-xs sm:text-sm font-bold text-amber-950 font-kannada text-center w-full">
            {lang === 'kn' ? pattern.ruleKn : pattern.ruleEn}
          </div>
        )}

        {/* Options */}
        <div className="mt-6 w-full">
          <div className="text-xs font-black uppercase text-slate-400 mb-3 text-center">
            {lang === 'kn' ? 'ಮುಂದೆ ಏನು ಬರುತ್ತದೆ? (ಆಯ್ಕೆ ಮಾಡಿ):' : 'What comes next? (Choose one):'}
          </div>

          <div className="grid grid-cols-3 gap-3">
            {pattern.options.map((opt, i) => {
              const isChosen = userAnswer === opt.icon;
              return (
                <button
                  key={i}
                  disabled={userAnswer !== null}
                  onClick={() => handleSelectOption(opt)}
                  className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-center gap-1 ${
                    isChosen
                      ? opt.isCorrect
                        ? 'bg-emerald-500 text-white border-emerald-600 shadow-lg scale-105'
                        : 'bg-rose-500 text-white border-rose-600 shadow-lg scale-105'
                      : 'bg-white hover:bg-amber-50 border-amber-200 hover:border-amber-400 shadow-sm hover:scale-105'
                  }`}
                >
                  <span className="text-4xl">{opt.icon}</span>
                  <span className="text-xs font-extrabold mt-1">{opt.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {userAnswer && (
          <button
            onClick={nextPattern}
            className="mt-6 px-8 py-3 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md transition-transform hover:scale-105"
          >
            {currentIdx + 1 < PATTERNS.length
              ? (lang === 'kn' ? 'ಮುಂದಿನ ವಿನಾಾಸ ➔' : 'Next Pattern ➔')
              : (lang === 'kn' ? 'ಮತ್ತೆ ಆಟವಾಡಿ 🔄' : 'Play Again 🔄')}
          </button>
        )}
      </div>
    </div>
  );
};
