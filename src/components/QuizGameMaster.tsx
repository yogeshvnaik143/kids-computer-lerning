import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUIZ_ITEMS, QuizItem } from '../data/curriculum';
import { playSound, speakText } from '../utils/audio';

export const QuizGameMaster: React.FC<{ lang: 'kn' | 'en'; gradeFilter: 1 | 2 | 'all' }> = ({ lang, gradeFilter }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [showCelebration, setShowCelebration] = useState(false);

  const filteredQuestions = gradeFilter === 'all'
    ? QUIZ_ITEMS
    : QUIZ_ITEMS.filter(q => q.grade === gradeFilter);

  const question: QuizItem = filteredQuestions[currentIdx] || QUIZ_ITEMS[0];

  const handleSelect = (idx: number) => {
    if (selectedOption !== null) return;
    setSelectedOption(idx);

    const isCorrect = question.options[idx].isCorrect;
    if (isCorrect) {
      playSound('correct');
      setScore(s => s + 10);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
      speakText(
        lang === 'kn' ? `ಸರಿಯಾದ ಉತ್ತರ! ${question.explanationKn}` : `Correct! ${question.explanationEn}`,
        lang
      );
    } else {
      playSound('wrong');
      speakText(
        lang === 'kn' ? `ತಪ್ಪಾಗಿದೆ. ${question.explanationKn}` : `Oops. ${question.explanationEn}`,
        lang
      );
    }
  };

  const handleNext = () => {
    playSound('whoosh');
    setSelectedOption(null);
    if (currentIdx + 1 < filteredQuestions.length) {
      setCurrentIdx(i => i + 1);
    } else {
      playSound('fanfare');
      setShowCelebration(true);
      confetti({ particleCount: 100, spread: 80, origin: { y: 0.5 } });
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setScore(0);
    setShowCelebration(false);
    playSound('pop');
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-amber-300">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-yellow-500 flex items-center justify-center text-white text-3xl shadow-md">
            🏆
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಮೌಲ್ಯಾಂಕನ ರಸಪ್ರಶ್ನೆ (Quiz Master)' : 'Textbook Quiz Master'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === 'kn' ? '1 & 2 ನೇ ತರಗತಿ ಪಠ್ಯಪುಸ್ತಕದ ಅಧಿಕೃತ ಪ್ರಶ್ನೆಗಳು' : 'Official Class 1 & 2 Textbook Assessment Questions'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 px-4 py-2 rounded-2xl border border-amber-200">
          <span className="text-2xl">⭐</span>
          <div>
            <div className="text-[10px] font-bold text-amber-700 uppercase">{lang === 'kn' ? 'ಅಂಕಗಳು' : 'Score'}</div>
            <div className="text-lg font-black text-amber-900">{score}</div>
          </div>
        </div>
      </div>

      {showCelebration ? (
        /* Final Score & Trophy Card */
        <div className="mt-8 p-8 bg-gradient-to-br from-amber-100 via-orange-50 to-yellow-100 rounded-3xl text-center flex flex-col items-center border-4 border-amber-300 shadow-xl">
          <div className="text-7xl mb-3 animate-bounce">🥇 🌟</div>
          <h3 className="text-3xl font-black text-slate-900 font-display">
            {lang === 'kn' ? 'ಅಭಿನಂದನೆಗಳು! ನೀನು ಕಂಪ್ಯೂಟರ್ ಸ್ಟಾರ್!' : 'Congratulations! You are a Computer Star!'}
          </h3>
          <p className="text-base text-slate-700 mt-2 font-kannada max-w-md">
            {lang === 'kn'
              ? `ನೀವು ಒಟ್ಟು ${filteredQuestions.length * 10} ಅಂಕಗಳಲ್ಲಿ ${score} ಅಂಕಗಳನ್ನು ಗಳಿಸಿದ್ದೀರಿ!`
              : `You scored ${score} points out of ${filteredQuestions.length * 10}!`}
          </p>

          <button
            onClick={handleRestart}
            className="mt-6 px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-base shadow-lg transition-transform hover:scale-105"
          >
            🔄 {lang === 'kn' ? 'ಮತ್ತೊಮ್ಮೆ ಆಟವಾಡಿ' : 'Play Quiz Again'}
          </button>
        </div>
      ) : (
        /* Quiz Question & Options */
        <div className="mt-6 max-w-xl mx-auto flex flex-col items-center">
          {/* Progress */}
          <div className="w-full flex justify-between items-center text-xs font-bold text-slate-400 mb-2">
            <span>{lang === 'kn' ? `ಪ್ರಶ್ನೆ ${currentIdx + 1} / ${filteredQuestions.length}` : `Question ${currentIdx + 1} of ${filteredQuestions.length}`}</span>
            <span className="bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full font-bold">
              Grade {question.grade}
            </span>
          </div>

          <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
            <div
              className="bg-amber-500 h-full transition-all duration-300"
              style={{ width: `${((currentIdx + 1) / filteredQuestions.length) * 100}%` }}
            />
          </div>

          {/* Question Card */}
          <div className="w-full bg-gradient-to-r from-amber-50/60 to-yellow-50/40 rounded-3xl p-6 border-2 border-amber-200 shadow-md text-center">
            <h3 className="text-xl sm:text-2xl font-black text-slate-900 font-display">
              {lang === 'kn' ? question.questionKn : question.questionEn}
            </h3>

            {/* Read question audio button */}
            <button
              onClick={() => {
                speakText(lang === 'kn' ? question.questionKn : question.questionEn, lang);
              }}
              className="mt-3 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white text-xs font-bold text-amber-800 shadow-sm border border-amber-200 hover:bg-amber-100"
            >
              <span>🔊</span>
              <span>{lang === 'kn' ? 'ಪ್ರಶ್ನೆ ಕೇಳಿ' : 'Listen Question'}</span>
            </button>
          </div>

          {/* Options Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mt-6">
            {question.options.map((opt, i) => {
              const isSelected = selectedOption === i;
              let style = 'bg-white border-amber-200 hover:border-amber-400 hover:bg-amber-50/40 text-slate-800';

              if (selectedOption !== null) {
                if (opt.isCorrect) {
                  style = 'bg-emerald-500 text-white border-emerald-600 shadow-lg scale-102';
                } else if (isSelected && !opt.isCorrect) {
                  style = 'bg-rose-500 text-white border-rose-600 shadow-lg';
                } else {
                  style = 'opacity-40 bg-slate-100 border-slate-200 text-slate-400';
                }
              }

              return (
                <button
                  key={i}
                  disabled={selectedOption !== null}
                  onClick={() => handleSelect(i)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex items-center gap-3 ${style}`}
                >
                  <span className="text-3xl">{opt.icon}</span>
                  <div className="flex-1">
                    <div className="text-sm font-black font-kannada">
                      {lang === 'kn' ? opt.labelKn : opt.labelEn}
                    </div>
                  </div>
                  {selectedOption !== null && opt.isCorrect && (
                    <span className="text-white font-black text-lg">✓</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation Toast & Next Button */}
          {selectedOption !== null && (
            <div className="w-full mt-6 flex flex-col items-center animate-fadeIn">
              <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-slate-800 text-xs sm:text-sm font-kannada font-bold text-center w-full mb-4">
                💡 {lang === 'kn' ? question.explanationKn : question.explanationEn}
              </div>

              <button
                onClick={handleNext}
                className="px-8 py-3.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-white font-black text-sm shadow-md transition-transform hover:scale-105"
              >
                {currentIdx + 1 < filteredQuestions.length
                  ? (lang === 'kn' ? 'ಮುಂದಿನ ಪ್ರಶ್ನೆ ➔' : 'Next Question ➔')
                  : (lang === 'kn' ? 'ಫಲಿತಾಂಶ ನೋಡಿ 🏆' : 'See Results 🏆')}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
