import React, { useState } from 'react';
import { playSound, speakText } from '../utils/audio';

interface SafetyScenario {
  id: string;
  titleKn: string;
  titleEn: string;
  actionTextKn: string;
  actionTextEn: string;
  isSafe: boolean;
  icon: string;
  illustration: string;
  elderRuleKn: string;
  elderRuleEn: string;
}

const SAFETY_SCENARIOS: SafetyScenario[] = [
  {
    id: 's1',
    titleKn: 'ಒದ್ದೆ ಕೈಗಳಿಂದ ಸ್ವಿಚ್ ಮುಟ್ಟುವುದು',
    titleEn: 'Touching switches with wet hands',
    actionTextKn: 'ಕೈ ಒದ್ದೆಯಾಗಿದ್ದಾಗ ಕಂಪ್ಯೂಟರ್ ಅಥವಾ ಸ್ವಿಚ್ ಆನ್ ಮಾಡುವುದು',
    actionTextEn: 'Turning on computer or switches right after washing hands while wet',
    isSafe: false,
    icon: '💧⚡',
    illustration: '⚠️🙅‍♂️',
    elderRuleKn: 'ಅಪಾಯ! ನೀರು ವಿದ್ಯುತ್ ಹರಿಯುವಂತೆ ಮಾಡುತ್ತದೆ. ಮೊದಲು ಕೈ ಒಣಗಿಸಿ!',
    elderRuleEn: 'Danger! Water conducts electricity and can shock you. Dry hands first with a clean towel!'
  },
  {
    id: 's2',
    titleKn: 'ಕೈಗಳನ್ನು ಚೆನ್ನಾಗಿ ಒಣಗಿಸಿ ಬಳಸುವುದು',
    titleEn: 'Drying hands thoroughly before use',
    actionTextKn: 'ಕೈ ಒಣಗಿಸಿಕೊಂಡು ನಂತರ ಸ್ವಿಚ್ ಆನ್ ಮಾಡುವುದು',
    actionTextEn: 'Drying hands with a clean cloth before touching any switch',
    isSafe: true,
    icon: '🧼✨',
    illustration: '✅👦',
    elderRuleKn: 'ತುಂಬಾ ಒಳ್ಳೆಯ ಅಭ್ಯಾಸ! ಒಣಗಿದ ಕೈಗಳಿಂದ ಸಾಧನ ಮುಟ್ಟುವುದು ಸುರಕ್ಷಿತ.',
    elderRuleEn: 'Excellent habit! Always keep your hands dry before handling electrical plugs and devices.'
  },
  {
    id: 's3',
    titleKn: 'ಕಂಪ್ಯೂಟರ್ ಪಕ್ಕ ನೀರಿನ ಬಾಟಲ್ ಅಥವಾ ಆಹಾರ ಇಡುವುದು',
    titleEn: 'Keeping water bottles or food near computer',
    actionTextKn: 'ಕಂಪ್ಯೂಟರ್ ಅಥವಾ ಲ್ಯಾಪ್‌ಟಾಪ್ ಪಕ್ಕ ತಿಂಡಿ ಮತ್ತು ನೀರು ಇಡುವುದು',
    actionTextEn: 'Placing open water cups or biscuits directly beside the keyboard',
    isSafe: false,
    icon: '🥤💻',
    illustration: '⚠️🚫',
    elderRuleKn: 'ಅಪಾಯ! ಒಂದು ಹನಿ ನೀರು ಬಿದ್ದರೂ ಕಂಪ್ಯೂಟರ್ ಹಾಳಾಗುತ್ತದೆ!',
    elderRuleEn: 'Danger! Computer Grandpa says: even a drop of water can destroy delicate electronic parts!'
  },
  {
    id: 's4',
    titleKn: 'ನೇರವಾಗಿ ಕುಳಿತುಕೊಂಡು ಸುರಕ್ಷಿತ ಅಂತರದಿಂದ ವೀಕ್ಷಿಸುವುದು',
    titleEn: 'Sitting straight with good distance from screen',
    actionTextKn: 'ಬೆನ್ನು ನೇರವಾಗಿಟ್ಟುಕೊಂಡು, ಕಣ್ಣಿಗೆ ತಕ್ಕ ದೂರದಲ್ಲಿ ಕುಳಿತುಕೊಳ್ಳುವುದು',
    actionTextEn: 'Sitting upright with straight back at arm-length distance from monitor',
    isSafe: true,
    icon: '🪑👀',
    illustration: '✅👍',
    elderRuleKn: 'ಸರಿಯಾದ ಭಂಗಿ! ಕಣ್ಣುಗಳು ಮತ್ತು ಬೆನ್ನಿಗೆ ಯಾವುದೇ ನೋವಾಗುವುದಿಲ್ಲ.',
    elderRuleEn: 'Proper ergonomic posture! Protects your eyes and keeps your backbone healthy.'
  },
  {
    id: 's5',
    titleKn: 'ಮೊಬೈಲ್ ಚಾರ್ಜ್ ಆಗುವಾಗ ಮಾತನಾಡುವುದು / ಬಳಸುವುದು',
    titleEn: 'Using phone while it is plugged into charger',
    actionTextKn: 'ಚಾರ್ಜಿಂಗ್ ವೈರ್ ಹಾಕಿಕೊಂಡೇ ಗೇಮ್ ಆಡುವುದು ಅಥವಾ ಮಾತನಾಡುವುದು',
    actionTextEn: 'Playing games or talking on phone while connected to wall charger',
    isSafe: false,
    icon: '🔌📱',
    illustration: '⚠️🚫',
    elderRuleKn: 'ಅಪಾಯ! ಚಾರ್ಜಿಂಗ್ ವೇಳೆ ಫೋನ್ ಬಿಸಿಯಾಗುತ್ತದೆ. ಚಾರ್ಜರ್ ತೆಗೆದು ಬಳಸಿ!',
    elderRuleEn: 'Not safe! Devices heat up during charging. Always unplug the phone before use!'
  },
  {
    id: 's6',
    titleKn: 'ಹೊಸ ಗೇಮ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಸಂದೇಶ ಬಂದಾಗ ಪೋಷಕರನ್ನು ಕೇಳುವುದು',
    titleEn: 'Asking parents before downloading new games',
    actionTextKn: 'ಯಾವುದೇ ಹೊಸ ಆ್ಯಪ್ ಅಥವಾ ಲಿಂಕ್ ಕ್ಲಿಕ್ ಮಾಡುವ ಮುನ್ನ ಅಮ್ಮ/ಅಪ್ಪನಿಗೆ ತಿಳಿಸುವುದು',
    actionTextEn: 'Showing screen to parents or teachers before clicking any pop-up link',
    isSafe: true,
    icon: '👨‍👩‍👧🛡️',
    illustration: '✅⭐',
    elderRuleKn: 'ಬುದ್ಧಿವಂತ ಮಗು! ಅಪರಿಚಿತ ಲಿಂಕ್ ಮುಟ್ಟಬಾರದು. ಹಿರಿಯರ ಅನುಮತಿ ಮುಖ್ಯ.',
    elderRuleEn: 'Smart move! Safe Sham rule: Always Ask First, then Use!'
  },
  {
    id: 's7',
    titleKn: 'ಕತ್ತಲಿನಲ್ಲಿ ಅಥವಾ ಮಲಗಿಕೊಂಡು ತುಂಬಾ ಹತ್ತಿರದಿಂದ ಸ್ಕ್ರೀನ್ ನೋಡುವುದು',
    titleEn: 'Watching screen in dark while lying down close',
    actionTextKn: 'ಮಲಗಿಕೊಂಡು ಕಣ್ಣಿನ ಹತ್ತಿರ ಮೊಬೈಲ್ ಇಟ್ಟುಕೊಂಡು ನೋಡುವುದು',
    actionTextEn: 'Bending over bed in darkness with phone inches from face',
    isSafe: false,
    icon: '🌙😵',
    illustration: '⚠️🙅',
    elderRuleKn: 'ಕಣ್ಣುಗಳಿಗೆ ಹಾನಿಕಾರಕ! ಬೆಳಕಿನಲ್ಲಿ ಮಾತ್ರ, ಸರಿಯಾದ ದೂರದಿಂದ ನೋಡಿ.',
    elderRuleEn: 'Harmful to eyes! Rest your eyes and never use phones in dark rooms while sleeping.'
  }
];

export const SafetyHeroQuiz: React.FC<{ lang: 'kn' | 'en' }> = ({ lang }) => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userChoice, setUserChoice] = useState<boolean | null>(null);
  const [stars, setStars] = useState(0);

  const scenario = SAFETY_SCENARIOS[currentIdx];

  const handleVote = (choice: boolean) => {
    setUserChoice(choice);
    const correct = choice === scenario.isSafe;

    if (correct) {
      playSound('correct');
      setStars(s => s + 1);
      speakText(
        lang === 'kn' ? `ಸರಿಯಾದ ನಿರ್ಧಾರ! ${scenario.elderRuleKn}` : `Correct choice! ${scenario.elderRuleEn}`,
        lang
      );
    } else {
      playSound('wrong');
      speakText(
        lang === 'kn' ? `ಎಚ್ಚರ! ${scenario.elderRuleKn}` : `Careful! ${scenario.elderRuleEn}`,
        lang
      );
    }
  };

  const handleNext = () => {
    playSound('whoosh');
    setUserChoice(null);
    if (currentIdx + 1 < SAFETY_SCENARIOS.length) {
      setCurrentIdx(i => i + 1);
    } else {
      playSound('fanfare');
      setCurrentIdx(0);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-emerald-300">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-emerald-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-emerald-400 to-teal-600 flex items-center justify-center text-white text-2xl shadow-md">
            🛡️
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಸೇಫ್ ಶಾಮ್ ಮತ್ತು ಕಂಪ್ಯೂಟರ್ ಅಜ್ಜ' : 'Safe Sham & Computer Grandpa'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === 'kn' ? 'ವಿದ್ಯುತ್ ಮತ್ತು ಡಿಜಿಟಲ್ ಸಾಧನಗಳ ಸುರಕ್ಷತಾ ನಿಯಮಗಳು' : 'Electrical & Digital Safety Playground'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-emerald-50 px-4 py-2 rounded-2xl border border-emerald-200">
          <span className="text-2xl">⭐</span>
          <div>
            <div className="text-[10px] font-bold text-emerald-700 uppercase">{lang === 'kn' ? 'ಸ್ಟಾರ್‌ಗಳು' : 'Safety Stars'}</div>
            <div className="text-lg font-black text-emerald-900">{stars}</div>
          </div>
        </div>
      </div>

      {/* Main Interactive Card */}
      <div className="mt-6 max-w-xl mx-auto flex flex-col items-center">
        {/* Progress Tracker */}
        <div className="w-full flex justify-between items-center text-xs font-bold text-slate-400 mb-2">
          <span>{lang === 'kn' ? `ಸನ್ನಿವೇಶ ${currentIdx + 1} / ${SAFETY_SCENARIOS.length}` : `Scenario ${currentIdx + 1} of ${SAFETY_SCENARIOS.length}`}</span>
          <span>{scenario.isSafe ? (lang === 'kn' ? 'ಸುರಕ್ಷಿತವೇ?' : 'Is it Safe?') : (lang === 'kn' ? 'ಅಸುರಕ್ಷಿತವೇ?' : 'Is it Unsafe?')}</span>
        </div>

        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden mb-6">
          <div
            className="bg-emerald-500 h-full transition-all duration-300"
            style={{ width: `${((currentIdx + 1) / SAFETY_SCENARIOS.length) * 100}%` }}
          />
        </div>

        {/* Question Card */}
        <div className="w-full bg-gradient-to-br from-emerald-50/60 to-teal-50/40 rounded-3xl p-6 border-2 border-emerald-200 shadow-md flex flex-col items-center text-center">
          <div className="text-6xl mb-4">{scenario.icon}</div>

          <h3 className="text-xl sm:text-2xl font-black text-slate-900 mb-2 font-display">
            {lang === 'kn' ? scenario.titleKn : scenario.titleEn}
          </h3>

          <p className="text-sm text-slate-600 font-kannada leading-relaxed mb-6">
            {lang === 'kn' ? scenario.actionTextKn : scenario.actionTextEn}
          </p>

          {/* Voting Buttons */}
          {userChoice === null ? (
            <div className="grid grid-cols-2 gap-4 w-full">
              <button
                onClick={() => handleVote(true)}
                className="p-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-600 hover:to-green-700 text-white font-black text-base shadow-lg transition-transform hover:scale-105 active:scale-95 flex flex-col items-center gap-1"
              >
                <span className="text-3xl">✅</span>
                <span>{lang === 'kn' ? 'ಸುರಕ್ಷಿತ (SAFE)' : 'SAFE'}</span>
              </button>

              <button
                onClick={() => handleVote(false)}
                className="p-4 rounded-2xl bg-gradient-to-r from-rose-500 to-red-600 hover:from-rose-600 hover:to-red-700 text-white font-black text-base shadow-lg transition-transform hover:scale-105 active:scale-95 flex flex-col items-center gap-1"
              >
                <span className="text-3xl">❌</span>
                <span>{lang === 'kn' ? 'ಅಸುರಕ್ಷಿತ (NOT SAFE)' : 'NOT SAFE'}</span>
              </button>
            </div>
          ) : (
            /* Result and Explanation */
            <div className="w-full flex flex-col items-center">
              <div className={`p-4 rounded-2xl w-full text-center border-2 ${
                userChoice === scenario.isSafe
                  ? 'bg-emerald-100/90 border-emerald-300 text-emerald-950'
                  : 'bg-rose-100/90 border-rose-300 text-rose-950'
              }`}>
                <div className="text-3xl mb-1">
                  {userChoice === scenario.isSafe ? '🎉 ಬಲಿಸ್ಟ್! Correct!' : '⚠️ ಗಮನಿಸಿ! Caution!'}
                </div>
                <div className="text-sm font-extrabold font-kannada mt-2">
                  {lang === 'kn' ? scenario.elderRuleKn : scenario.elderRuleEn}
                </div>
              </div>

              <button
                onClick={handleNext}
                className="mt-6 px-8 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm shadow-md transition-transform hover:scale-105"
              >
                {currentIdx + 1 < SAFETY_SCENARIOS.length
                  ? (lang === 'kn' ? 'ಮುಂದಿನ ಸನ್ನಿವೇಶ ➔' : 'Next Scenario ➔')
                  : (lang === 'kn' ? 'ಮತ್ತೆ ಆಟವಾಡಿ 🔄' : 'Play Again 🔄')}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
