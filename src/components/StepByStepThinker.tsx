import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playSound, speakText } from '../utils/audio';

interface StepTask {
  id: string;
  titleKn: string;
  titleEn: string;
  subtitleKn: string;
  subtitleEn: string;
  icon: string;
  steps: {
    id: number;
    textKn: string;
    textEn: string;
    icon: string;
    detailKn: string;
    detailEn: string;
  }[];
}

const STEP_TASKS: StepTask[] = [
  // Task 1: Washing Hands (Class 1 Textbook Page 31)
  {
    id: 'handwash',
    titleKn: 'ಕೈ ತೊಳೆಯುವ ಕೌಶಲ (ಶುಚಿತ್ವದ ಮೊದಲ ಹೆಜ್ಜೆ)',
    titleEn: 'Handwashing Skill (Putti & Rohan)',
    subtitleKn: 'ರೋಹನ್‌ನ ಧೂಳಾದ ಕೈಗಳನ್ನು ಸ್ವಚ್ಛಗೊಳಿಸುವ ಸರಿಯಾದ 5 ಹಂತಗಳು',
    subtitleEn: 'The 5 essential steps to clean hands properly',
    icon: '🧼',
    steps: [
      {
        id: 1,
        textKn: 'ಕೈಗಳನ್ನು ನೀರಿನಲ್ಲಿ ಒದ್ದೆ ಮಾಡು',
        textEn: 'Wet your hands with clean water',
        icon: '💧',
        detailKn: 'ಹಂತ-1: ನಲ್ಲಿ ತಿರುಗಿಸಿ ಕೈಗಳನ್ನು ನೀರಿನಲ್ಲಿ ಒದ್ದೆ ಮಾಡು.',
        detailEn: 'Step 1: Wet your hands thoroughly with water.'
      },
      {
        id: 2,
        textKn: 'ಕೈಗಳಿಗೆ ಸ್ವಲ್ಪ ಸೋಪನ್ನು ಹಚ್ಚಿಕೊ',
        textEn: 'Apply some soap to your hands',
        icon: '🫧',
        detailKn: 'ಹಂತ-2: ಸೋಪು ಅಥವಾ ಹ್ಯಾಂಡ್‌ವಾಶ್ ತೆಗೆದುಕೊ.',
        detailEn: 'Step 2: Take gentle soap in your palm.'
      },
      {
        id: 3,
        textKn: 'ಬೆರಳುಗಳ ನಡುವೆ ನೊರೆ ಬರುವಂತೆ ಉಜ್ಜು',
        textEn: 'Rub front, back & between fingers',
        icon: '🖐️',
        detailKn: 'ಹಂತ-3: ಕೈಗಳ ಮುಂಭಾಗ, ಹಿಂಭಾಗ ಮತ್ತು ಬೆರಳುಗಳ ನಡುವೆ ಚೆನ್ನಾಗಿ ನೊರೆ ಬರುವಂತೆ 20 ಸೆಕೆಂಡ್ ಉಜ್ಜು.',
        detailEn: 'Step 3: Rub front, backside of hands and between fingers till foam forms.'
      },
      {
        id: 4,
        textKn: 'ಕೈಗಳನ್ನು ಸ್ವಚ್ಛವಾಗಿ ನೀರಿನಿಂದ ತೊಳೆ',
        textEn: 'Wash hands thoroughly with water',
        icon: '🚿',
        detailKn: 'ಹಂತ-4: ನೀರಿನಲ್ಲಿ ಎಲ್ಲಾ ಸೋಪಿನ ನೊರೆ ಹೋಗುವವರೆಗೆ ತೊಳೆಯಿರಿ.',
        detailEn: 'Step 4: Rinse off all soap lather with water.'
      },
      {
        id: 5,
        textKn: 'ಶುಭ್ರವಾದ ಬಟ್ಟೆಯಿಂದ ಕೈಗಳನ್ನು ಒರೆಸಿಕೊ',
        textEn: 'Wipe hands with a clean dry towel',
        icon: '🧣',
        detailKn: 'ಹಂತ-5: ಕೊನೆಯದಾಗಿ ಒಣಗಿದ ಶುಭ್ರ ಬಟ್ಟೆಯಿಂದ ಒರೆಸಿಕೊ.',
        detailEn: 'Step 5: Finally dry your hands with a clean cloth.'
      }
    ]
  },
  // Task 2: Drawing House with Shapes (Class 1 Textbook Page 32)
  {
    id: 'shapes',
    titleKn: 'ಆಕಾರಗಳನ್ನು ಬಳಸಿ ಚಿತ್ರ ರಚಿಸು (ಮನೆ)',
    titleEn: 'Create Picture Using Shapes (House)',
    subtitleKn: 'ರೋಬೋಟ್‌ಗೆ ಆಕಾರಗಳ ಮೂಲಕ ಮನೆ ಬಿಡಿಸಲು ಕಲಿಸುವುದು',
    subtitleEn: 'Teaching Robot to draw a house step-by-step',
    icon: '🏠',
    steps: [
      {
        id: 1,
        textKn: 'ಒಂದು ದೊಡ್ಡ ತ್ರಿಕೋನ ಬಿಡಿಸು (ಛಾವಣಿ)',
        textEn: 'Draw a big triangle (Roof)',
        icon: '🔺',
        detailKn: 'ಹಂತ-1: ಇದು ಮನೆಯ ಮೇಲ್ಛಾವಣಿ (Triangle).',
        detailEn: 'Step 1: Draw a big triangle for the roof.'
      },
      {
        id: 2,
        textKn: 'ತ್ರಿಕೋನದ ಕೆಳಗೆ ಚೌಕ ಸೇರಿಸು (ಗೋಡೆ)',
        textEn: 'Draw a square below (Wall)',
        icon: '🟧',
        detailKn: 'ಹಂತ-2: ಇದು ಮನೆಯ ಭದ್ರವಾದ ಗೋಡೆ (Square).',
        detailEn: 'Step 2: Below triangle, draw a square for walls.'
      },
      {
        id: 3,
        textKn: 'ಚೌಕದ ಒಳಗೆ ಸಣ್ಣ ಆಯತ ಬಿಡಿಸು (ಬಾಗಿಲು)',
        textEn: 'Draw a small rectangle inside (Door)',
        icon: '🚪',
        detailKn: 'ಹಂತ-3: ಇದು ಮನೆಯ ಪ್ರವೇಶ ಬಾಗಿಲು (Rectangle).',
        detailEn: 'Step 3: Draw a door inside using rectangle.'
      },
      {
        id: 4,
        textKn: 'ಬಾಗಿಲಿನ ಪಕ್ಕದಲ್ಲಿ ಪುಟ್ಟ ಚೌಕ ಬಿಡಿಸು (ಕಿಟಕಿ)',
        textEn: 'Draw a small square next to door (Window)',
        icon: '🪟',
        detailKn: 'ಹಂತ-4: ಇದು ಗಾಳಿ-ಬೆಳಕು ಬರಲು ಕಿಟಕಿ (Window).',
        detailEn: 'Step 4: Draw a cute window on the wall.'
      },
      {
        id: 5,
        textKn: 'ಇಷ್ಟವಾದ ಬಣ್ಣಗಳನ್ನು ತುಂಬು',
        textEn: 'Fill with vibrant cheerful colors',
        icon: '🎨',
        detailKn: 'ಹಂತ-5: ಮನೆಯ ಚಿತ್ರಕ್ಕೆ ಸುಂದರ ಬಣ್ಣಗಳನ್ನು ತುಂಬು.',
        detailEn: 'Step 5: Fill picture with red, yellow, and blue colors!'
      }
    ]
  },
  // Task 3: Planting a Sapling (Class 1 Textbook Page 33)
  {
    id: 'planting',
    titleKn: 'ಸಸಿ ನೆಡುವ ಸಂಭ್ರಮ (ಭೂಮಿಗೆ ನಮ್ಮ ಕೊಡುಗೆ)',
    titleEn: 'Joy of Planting a Sapling',
    subtitleKn: 'ಪುಟ್ಟಿ ಮತ್ತು ರೋಬೋಟ್ ಜಂಟಿಯಾಗಿ ಸಸಿ ನೆಡುವುದು',
    subtitleEn: 'Step-by-step nature care instructions',
    icon: '🌱',
    steps: [
      {
        id: 1,
        textKn: 'ಒಂದು ಸಣ್ಣ ಕುಂಡವನ್ನು ತೆಗೆದುಕೊ',
        textEn: 'Take a small flower pot',
        icon: '🪴',
        detailKn: 'ಹಂತ-1: ಸಸಿ ನೆಡಲು ಸ್ವಚ್ಛವಾದ ಕುಂಡ ಸಿದ್ಧಪಡಿಸು.',
        detailEn: 'Step 1: Choose a good sturdy small pot.'
      },
      {
        id: 2,
        textKn: 'ಕುಂಡದ ಅರ್ಧದವರೆಗೆ ಮಣ್ಣನ್ನು ತುಂಬಿಸು',
        textEn: 'Fill the pot halfway with rich soil',
        icon: '🪴',
        detailKn: 'ಹಂತ-2: ಫಲವತ್ತಾದ ಮಣ್ಣನ್ನು ಕುಂಡದಲ್ಲಿ ಹಾಕು.',
        detailEn: 'Step 2: Put soft potting soil halfway.'
      },
      {
        id: 3,
        textKn: 'ಸಣ್ಣ ಗುಂಡಿ ಮಾಡಿ ಬೀಜವನ್ನು ಇಡು',
        textEn: 'Make a small hole and place a seed',
        icon: '🌰',
        detailKn: 'ಹಂತ-3: ಬೆರಳಿನಿಂದ ಗುಂಡಿ ಮಾಡಿ ಬೀಜ ಇಡು.',
        detailEn: 'Step 3: Gently place the seed in the hole.'
      },
      {
        id: 4,
        textKn: 'ಬೀಜದ ಮೇಲೆ ಸ್ವಲ್ಪ ಮಣ್ಣು ಹಾಕಿ ಮುಚ್ಚು',
        textEn: 'Cover the seed with a little more soil',
        icon: '🟤',
        detailKn: 'ಹಂತ-4: ಬೀಜ ರಕ್ಷಿಸಲು ಮೃದುವಾಗಿ ಮಣ್ಣು ಹರಡು.',
        detailEn: 'Step 4: Lightly cover the seed with soil.'
      },
      {
        id: 5,
        textKn: 'ಸ್ವಲ್ಪವೇ ನೀರು ಚಿಮುಕಿಸಿ ಬಿಸಿಲಿನಲ್ಲಿ ಇಡು',
        textEn: 'Sprinkle water & keep in sunlight',
        icon: '☀️💧',
        detailKn: 'ಹಂತ-5: ನೀರು ಚಿಮುಕಿಸಿ ಸೂರ್ಯನ ಬೆಳಕು ಬೀಳುವ ಜಾಗದಲ್ಲಿ ಇಡು.',
        detailEn: 'Step 5: Sprinkle water and place under warm sunlight!'
      }
    ]
  },
  // Task 4: Starting Computer & Shutting Down (Class 1 Page 72 & 86)
  {
    id: 'computersteps',
    titleKn: 'ಕಂಪ್ಯೂಟರ್ ಆನ್ ಮಾಡುವ ಸರಿಯಾದ ಕ್ರಮ',
    titleEn: 'Steps to Turn ON Computer Correctly',
    subtitleKn: 'ಗಣು ಹೇಳಿಕೊಡುವ 3 ಹಂತಗಳು',
    subtitleEn: 'Ganu instructions: Switchboard -> UPS -> CPU',
    icon: '💻',
    steps: [
      {
        id: 1,
        textKn: 'ಪ್ಲಗ್ ಪಕ್ಕ ಇರುವ ಸ್ವಿಚ್ ಬಟನ್ ಆನ್ ಮಾಡು',
        textEn: 'Turn ON main switchboard plug',
        icon: '🔌',
        detailKn: 'ಹಂತ-1: ಪೋಷಕರ ನೆರವಿನಿಂದ ಮುಖ್ಯ ಸ್ವಿಚ್ ಆನ್ ಮಾಡಿ.',
        detailEn: 'Step 1: Press the switch next to the plug key.'
      },
      {
        id: 2,
        textKn: 'ಯು.ಪಿ.ಎಸ್ (UPS) ಗುಂಡನೆಯ ಬಟನ್ ಒತ್ತು',
        textEn: 'Press round button on UPS',
        icon: '🔋',
        detailKn: 'ಹಂತ-2: ಬ್ಯಾಟರಿ ಬ್ಯಾಕಪ್ ಯುಪಿಎಸ್ ಆನ್ ಮಾಡಿ.',
        detailEn: 'Step 2: Press the round power button on UPS.'
      },
      {
        id: 3,
        textKn: 'ಸಿ.ಪಿ.ಯು (CPU) ಮೇಲಿನ ದೊಡ್ಡ ಗುಂಡನೆಯ ಬಟನ್ ಒತ್ತು',
        textEn: 'Press big round button on CPU',
        icon: '🔘',
        detailKn: 'ಹಂತ-3: ಸಿಪಿಯು ಬಟನ್ ಒತ್ತಿದಾಗ ಮಾನಿಟರ್ ಬೆಳಗುತ್ತದೆ!',
        detailEn: 'Step 3: Press the big CPU button and screen turns on!'
      }
    ]
  }
];

export const StepByStepThinker: React.FC<{ lang: 'kn' | 'en' }> = ({ lang }) => {
  const [selectedTaskId, setSelectedTaskId] = useState<string>('handwash');
  const task = STEP_TASKS.find(t => t.id === selectedTaskId) || STEP_TASKS[0];

  // Jumbled sequence state
  const [userOrder, setUserOrder] = useState<number[]>([]);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  const resetTask = (newTaskId: string) => {
    setSelectedTaskId(newTaskId);
    setUserOrder([]);
    setIsSuccess(false);
    setErrorMsg('');
    playSound('pop');
  };

  const handlePickStep = (stepId: number) => {
    if (userOrder.includes(stepId)) return;

    const nextExpected = userOrder.length + 1;
    if (stepId === nextExpected) {
      playSound('correct');
      const updated = [...userOrder, stepId];
      setUserOrder(updated);
      setErrorMsg('');

      const currStepObj = task.steps.find(s => s.id === stepId);
      if (currStepObj) {
        speakText(lang === 'kn' ? currStepObj.detailKn : currStepObj.detailEn, lang);
      }

      if (updated.length === task.steps.length) {
        playSound('fanfare');
        setIsSuccess(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        speakText(
          lang === 'kn'
            ? 'ಅದ್ಭುತ! ನೀವು ಎಲ್ಲಾ ಹಂತಗಳನ್ನು ಸರಿಯಾದ ಕ್ರಮದಲ್ಲಿ ಪೂರ್ಣಗೊಳಿಸಿದ್ದೀರಿ!'
            : 'Awesome! You arranged all steps in perfect order!',
          lang
        );
      }
    } else {
      playSound('wrong');
      setErrorMsg(
        lang === 'kn'
          ? `ಕ್ರಮ ತಪ್ಪಿದೆ! ಮೊದಲು ಹಂತ ${nextExpected} ಮಾಡಬೇಕು. (ಕ್ರಮ ಬದಲಾದರೆ ಫಲಿತಾಂಶ ಬದಲಾಗುತ್ತದೆ!)`
          : `Wrong order! Step ${nextExpected} comes first. Remember: order changes the result!`
      );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-blue-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-blue-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-600 flex items-center justify-center text-white text-2xl shadow-md">
            🤖
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಪುಟ್ಟಿ ಮತ್ತು ರೋಬೋಟ್ - ಹಂತ ಹಂತದ ಆಲೋಚನೆ' : 'Putti & Robot - Step-by-Step Thinking'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === 'kn' ? 'ಗಣನಾತ್ಮಕ ಆಲೋಚನೆ (Algorithmic Sequential Steps)' : 'Sequencing & Algorithmic Order Playground'}
            </p>
          </div>
        </div>

        {/* Task Switcher Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 max-w-full">
          {STEP_TASKS.map(t => (
            <button
              key={t.id}
              onClick={() => resetTask(t.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                selectedTaskId === t.id
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-blue-50 text-blue-900 hover:bg-blue-100'
              }`}
            >
              <span>{t.icon}</span>
              <span>{lang === 'kn' ? t.titleKn.split(' ')[0] : t.titleEn.split(' ')[0]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Task Description Card */}
      <div className="mt-5 bg-gradient-to-r from-blue-50 to-indigo-50 p-4 rounded-2xl border border-blue-200 flex items-center justify-between">
        <div>
          <h3 className="text-base sm:text-lg font-black text-blue-950 font-display">
            {lang === 'kn' ? task.titleKn : task.titleEn}
          </h3>
          <p className="text-xs sm:text-sm text-blue-700 font-kannada mt-0.5">
            {lang === 'kn' ? task.subtitleKn : task.subtitleEn}
          </p>
        </div>
        <button
          onClick={() => {
            setUserOrder([]);
            setIsSuccess(false);
            setErrorMsg('');
            playSound('whoosh');
          }}
          className="px-3 py-1.5 rounded-xl bg-white text-blue-700 hover:bg-blue-100 text-xs font-bold shadow-sm border border-blue-200"
        >
          🔄 {lang === 'kn' ? 'ಮತ್ತೆ ಜೋಡಿಸಿ' : 'Reset'}
        </button>
      </div>

      {/* Error alert if wrong step chosen */}
      {errorMsg && (
        <div className="mt-4 p-3 rounded-2xl bg-amber-100 text-amber-900 border border-amber-300 text-xs sm:text-sm font-bold flex items-center gap-2 animate-bounce">
          <span>⚠️</span>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Main Assembly Area: Steps Completed in Sequence */}
      <div className="mt-6">
        <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
          {lang === 'kn' ? 'ಸರಿಯಾದ ಹಂತಗಳ ಪಟ್ಟಿ (Completed Order):' : 'Arranged Sequence:'}
        </div>

        <div className="flex flex-col gap-2 min-h-[140px] p-4 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200">
          {userOrder.length === 0 ? (
            <div className="m-auto text-xs sm:text-sm text-slate-400 font-bold text-center">
              {lang === 'kn'
                ? '👈 ಕೆಳಗಿರುವ ಹಂತಗಳನ್ನು ಸರಿಯಾದ ಕ್ರಮದಲ್ಲಿ ಒಂದೊಂದಾಗಿ ಕ್ಲಿಕ್ ಮಾಡಿ!'
                : '👈 Tap the cards below in their natural 1st, 2nd, 3rd chronological order!'}
            </div>
          ) : (
            userOrder.map((stepId, orderIdx) => {
              const stepObj = task.steps.find(s => s.id === stepId)!;
              return (
                <div
                  key={stepId}
                  className="flex items-center gap-3 p-3 bg-white rounded-xl shadow-sm border border-blue-200 animate-fadeIn"
                >
                  <div className="w-7 h-7 rounded-full bg-blue-600 text-white font-black text-xs flex items-center justify-center">
                    {orderIdx + 1}
                  </div>
                  <span className="text-2xl">{stepObj.icon}</span>
                  <div className="flex-1">
                    <div className="text-xs sm:text-sm font-extrabold text-slate-900 font-kannada">
                      {lang === 'kn' ? stepObj.textKn : stepObj.textEn}
                    </div>
                  </div>
                  <span className="text-emerald-500 font-black text-sm">✓</span>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Success Banner */}
      {isSuccess ? (
        <div className="mt-6 p-6 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-600 text-white text-center shadow-lg">
          <div className="text-4xl mb-2">🎉 🏆</div>
          <h4 className="text-xl font-black font-display">
            {lang === 'kn' ? 'ಅಭಿನಂದನೆಗಳು! ರೋಬೋಟ್ ಕೆಲಸ ಕಲಿತಿದೆ!' : 'Congratulations! The Robot learned the steps!'}
          </h4>
          <p className="text-xs sm:text-sm opacity-90 mt-1 font-kannada">
            {lang === 'kn'
              ? 'ಕಂಪ್ಯೂಟರ್ ಮತ್ತು ರೋಬೋಟ್‌ಗಳು ಸರಿಯಾದ ಹಂತ-ಹಂತದ ಸೂಚನೆಗಳನ್ನು ಮಾತ್ರ ಅನುಸರಿಸುತ್ತವೆ!'
              : 'Digital devices follow the exact sequential instructions given by humans!'}
          </p>
        </div>
      ) : (
        /* Jumbled Options to choose from */
        <div className="mt-6">
          <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
            {lang === 'kn' ? 'ಯಾವ ಹಂತ ಮೊದಲು ಬರಬೇಕು? (ಕ್ಲಿಕ್ ಮಾಡಿ):' : 'Which step comes next? (Click to order):'}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {task.steps.map(step => {
              const isAlreadyPlaced = userOrder.includes(step.id);
              return (
                <button
                  key={step.id}
                  disabled={isAlreadyPlaced}
                  onClick={() => handlePickStep(step.id)}
                  className={`p-4 rounded-2xl border-2 text-left transition-all flex items-start gap-3 ${
                    isAlreadyPlaced
                      ? 'opacity-40 bg-slate-100 border-slate-200 cursor-not-allowed'
                      : 'bg-white hover:bg-blue-50/50 border-blue-200 hover:border-blue-400 shadow-sm hover:scale-102 cursor-pointer'
                  }`}
                >
                  <span className="text-3xl flex-shrink-0">{step.icon}</span>
                  <div>
                    <div className="text-xs font-extrabold text-slate-800 font-kannada leading-snug">
                      {lang === 'kn' ? step.textKn : step.textEn}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
