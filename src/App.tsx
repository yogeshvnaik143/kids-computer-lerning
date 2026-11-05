import React, { useState } from 'react';
import { LESSONS, LessonContent } from './data/curriculum';
import { ComputerLab3D } from './components/ComputerLab3D';
import { DigitalWorldExplorer } from './components/DigitalWorldExplorer';
import { SafetyHeroQuiz } from './components/SafetyHeroQuiz';
import { StepByStepThinker } from './components/StepByStepThinker';
import { TVRemoteSimulator } from './components/TVRemoteSimulator';
import { SmartActionsPlayground } from './components/SmartActionsPlayground';
import { PatternSequencer } from './components/PatternSequencer';
import { TuxPaintStudio } from './components/TuxPaintStudio';
import { KiboKeyboardTutor } from './components/KiboKeyboardTutor';
import { MousePracticeArena } from './components/MousePracticeArena';
import { QuizGameMaster } from './components/QuizGameMaster';
import { VoiceTutorBot } from './components/VoiceTutorBot';
import { playSound, speakText, stopSpeech } from './utils/audio';

export default function App() {
  const [lang, setLang] = useState<'kn' | 'en'>('kn');
  const [selectedGrade, setSelectedGrade] = useState<1 | 2>(1);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('g1-l1');
  const [activeTab, setActiveTab] = useState<'lessons' | '3dlab' | 'games' | 'quiz' | 'tutor'>('lessons');

  const currentLesson: LessonContent = LESSONS.find(l => l.id === selectedLessonId) || LESSONS[0];
  const gradeLessons = LESSONS.filter(l => l.grade === selectedGrade);

  const handleGradeChange = (grade: 1 | 2) => {
    playSound('pop');
    setSelectedGrade(grade);
    const firstOfGrade = LESSONS.find(l => l.grade === grade);
    if (firstOfGrade) {
      setSelectedLessonId(firstOfGrade.id);
    }
    speakText(
      lang === 'kn' ? `${grade} ನೇ ತರಗತಿ ಡಿಜಿ ಪ್ರವೇಶ ಪಠ್ಯಕ್ರಮ` : `Grade ${grade} Digi Pravesha Curriculum`,
      lang
    );
  };

  const handleLessonSelect = (lesson: LessonContent) => {
    playSound('pop');
    setSelectedLessonId(lesson.id);
    setActiveTab('lessons');
    speakText(
      lang === 'kn' ? `ಪಾಠ ${lesson.lessonNum}: ${lesson.titleKn}. ${lesson.descriptionKn}` : `Lesson ${lesson.lessonNum}: ${lesson.titleEn}. ${lesson.descriptionEn}`,
      lang
    );
  };

  const handleLangToggle = () => {
    playSound('pop');
    stopSpeech();
    const nextLang = lang === 'kn' ? 'en' : 'kn';
    setLang(nextLang);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans selection:bg-sky-200">
      {/* Top Header / Brand Bar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b-2 border-slate-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & School Dept Badge */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 via-orange-500 to-rose-500 flex items-center justify-center text-white text-2xl shadow-md border-2 border-white">
              🖥️
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xl sm:text-2xl font-black text-slate-900 font-display tracking-tight">
                  {lang === 'kn' ? 'ಡಿಜಿ ಪ್ರವೇಶ' : 'Digi Pravesha'}
                </span>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 font-extrabold text-[11px] border border-amber-300">
                  {lang === 'kn' ? 'ತರಗತಿ 1 & 2' : 'Grade 1 & 2'}
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-kannada font-medium">
                {lang === 'kn' ? 'ಶಾಲಾ ಶಿಕ್ಷಣ ಮತ್ತು ಸಾಕ್ಷರತಾ ಇಲಾಖೆ, ಕರ್ನಾಟಕ ಸರಕಾರ' : 'Dept. of School Education & Literacy, Govt. of Karnataka'}
              </p>
            </div>
          </div>

          {/* Right Controls: Grade Switcher & Bilingual Toggle */}
          <div className="flex items-center gap-3">
            {/* Grade Selector Pills */}
            <div className="flex items-center p-1 bg-slate-100 rounded-2xl border border-slate-200">
              <button
                onClick={() => handleGradeChange(1)}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  selectedGrade === 1
                    ? 'bg-amber-500 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'kn' ? '೧ ನೇ ತರಗತಿ' : 'Class 1'}
              </button>
              <button
                onClick={() => handleGradeChange(2)}
                className={`px-3 sm:px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all ${
                  selectedGrade === 2
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'kn' ? '೨ ನೇ ತರಗತಿ' : 'Class 2'}
              </button>
            </div>

            {/* Language Switcher */}
            <button
              onClick={handleLangToggle}
              className="px-3.5 py-2 rounded-2xl bg-sky-50 hover:bg-sky-100 border-2 border-sky-300 text-sky-800 font-black text-xs sm:text-sm transition-transform active:scale-95 flex items-center gap-1.5"
            >
              <span>🌐</span>
              <span>{lang === 'kn' ? 'English ಗೆ ಬದಲಿಸಿ' : 'ಕನ್ನಡದಲ್ಲಿ ಕಲಿಯಿರಿ'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="max-w-7xl mx-auto px-4 overflow-x-auto flex items-center gap-2 py-2 border-t border-slate-100">
          <button
            onClick={() => { setActiveTab('lessons'); playSound('pop'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'lessons'
                ? 'bg-slate-900 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>📚</span>
            <span>{lang === 'kn' ? 'ಪಾಠಗಳು (Lessons)' : 'Lessons'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('3dlab'); playSound('pop'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === '3dlab'
                ? 'bg-sky-500 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>🤖</span>
            <span>{lang === 'kn' ? '3D ಕಂಪ್ಯೂಟರ್ ಲ್ಯಾಬ್' : '3D Computer Lab'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('games'); playSound('pop'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'games'
                ? 'bg-emerald-500 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>🎮</span>
            <span>{lang === 'kn' ? 'ಆಟಗಳು ಮತ್ತು ಚಟುವಟಿಕೆಗಳು' : 'Games & Labs'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('quiz'); playSound('pop'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'quiz'
                ? 'bg-amber-500 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>🏆</span>
            <span>{lang === 'kn' ? 'ರಸಪ್ರಶ್ನೆ (Quiz Master)' : 'Textbook Quiz'}</span>
          </button>

          <button
            onClick={() => { setActiveTab('tutor'); playSound('pop'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 ${
              activeTab === 'tutor'
                ? 'bg-cyan-600 text-white shadow'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span>🎙️</span>
            <span>{lang === 'kn' ? 'ಗಣು ವಾಯ್ಸ್ ಟ್ಯೂಟರ್' : 'Ganu Voice Tutor'}</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {/* VIEW 1: LESSONS & CURRICULUM */}
        {activeTab === 'lessons' && (
          <div className="flex flex-col gap-6">
            {/* Textbook Banner & Audio Voice Guide */}
            <div className={`p-6 rounded-3xl bg-gradient-to-r ${currentLesson.themeColor} text-white shadow-xl flex flex-wrap items-center justify-between gap-4`}>
              <div className="flex-1 min-w-[280px]">
                <div className="flex items-center gap-2 text-xs font-black uppercase tracking-wider bg-black/20 px-3 py-1 rounded-full w-fit">
                  <span>{lang === 'kn' ? `ತರಗತಿ ${currentLesson.grade} • ಪಾಠ ${currentLesson.lessonNum}` : `Grade ${currentLesson.grade} • Lesson ${currentLesson.lessonNum}`}</span>
                  <span>•</span>
                  <span>{currentLesson.character}</span>
                </div>

                <h1 className="text-2xl sm:text-4xl font-black mt-2 font-display">
                  {lang === 'kn' ? currentLesson.titleKn : currentLesson.titleEn}
                </h1>
                <p className="text-sm sm:text-base opacity-95 font-kannada mt-1 max-w-2xl">
                  {lang === 'kn' ? currentLesson.subtitleKn : currentLesson.subtitleEn}
                </p>
                <p className="text-xs sm:text-sm opacity-90 mt-2 italic font-kannada">
                  "{lang === 'kn' ? currentLesson.descriptionKn : currentLesson.descriptionEn}"
                </p>
              </div>

              {/* Read Aloud Voice Button */}
              <button
                onClick={() => {
                  speakText(
                    lang === 'kn'
                      ? `${currentLesson.titleKn}. ${currentLesson.subtitleKn}. ${currentLesson.descriptionKn}`
                      : `${currentLesson.titleEn}. ${currentLesson.subtitleEn}. ${currentLesson.descriptionEn}`,
                    lang
                  );
                }}
                className="px-5 py-3 rounded-2xl bg-white text-slate-900 hover:bg-amber-100 font-black text-sm shadow-lg transition-transform hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                <span className="text-xl">🔊</span>
                <span>{lang === 'kn' ? 'ಪಾಠವನ್ನು ಆಲಿಸಿ' : 'Listen to Lesson'}</span>
              </button>
            </div>

            {/* Horizontal Lesson Selector Carousel */}
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                {lang === 'kn' ? `${selectedGrade} ನೇ ತರಗತಿಯ ಎಲ್ಲಾ ಪಾಠಗಳು:` : `Grade ${selectedGrade} Lessons:`}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2.5">
                {gradeLessons.map(lesson => {
                  const isCurrent = lesson.id === currentLesson.id;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonSelect(lesson)}
                      className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col justify-between ${
                        isCurrent
                          ? 'border-sky-500 bg-sky-50 shadow-md ring-2 ring-sky-300 scale-102'
                          : 'border-slate-200 hover:border-slate-300 bg-white hover:bg-slate-50'
                      }`}
                    >
                      <div className="text-[10px] font-black text-slate-400 uppercase">
                        {lang === 'kn' ? `ಪಾಠ ${lesson.lessonNum}` : `Lesson ${lesson.lessonNum}`}
                      </div>
                      <div className="text-xs font-black text-slate-900 mt-1 line-clamp-1 font-display">
                        {lang === 'kn' ? lesson.titleKn : lesson.titleEn}
                      </div>
                      <div className="text-[10px] text-slate-500 truncate mt-1">
                        {lesson.character}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Embedded Dedicated Interactive Playground for this specific lesson */}
            <div>
              <div className="text-xs font-black uppercase tracking-wider text-slate-400 mb-2">
                {lang === 'kn' ? 'ಈ ಪಾಠದ ಸಂವಾದಾತ್ಮಕ ಆಟ ಮತ್ತು ಚಟುವಟಿಕೆ:' : 'Interactive Activity for this Lesson:'}
              </div>

              {currentLesson.interactiveMode === 'devices' && (
                <DigitalWorldExplorer lang={lang} />
              )}
              {currentLesson.interactiveMode === 'safety' && (
                <SafetyHeroQuiz lang={lang} />
              )}
              {currentLesson.interactiveMode === 'stepbystep' && (
                <StepByStepThinker lang={lang} />
              )}
              {currentLesson.interactiveMode === 'tvremote' && (
                <TVRemoteSimulator lang={lang} />
              )}
              {currentLesson.interactiveMode === 'smartactions' && (
                <SmartActionsPlayground lang={lang} />
              )}
              {currentLesson.interactiveMode === '3dlab' && (
                <ComputerLab3D lang={lang} />
              )}
              {currentLesson.interactiveMode === 'mouse' && (
                <MousePracticeArena lang={lang} />
              )}
              {currentLesson.interactiveMode === 'tuxpaint' && (
                <TuxPaintStudio lang={lang} />
              )}
              {currentLesson.interactiveMode === 'keyboard' && (
                <KiboKeyboardTutor lang={lang} />
              )}
              {currentLesson.interactiveMode === 'patterns' && (
                <PatternSequencer lang={lang} />
              )}
            </div>

            {/* Learning Outcomes from Textbook */}
            <div className="bg-white p-6 rounded-3xl border-2 border-slate-200 shadow-sm">
              <h3 className="text-base font-black text-slate-900 font-display flex items-center gap-2 mb-3">
                <span>🎯</span>
                <span>{lang === 'kn' ? 'ಕಲಿಕಾ ಫಲಗಳು (Learning Outcomes)' : 'Learning Outcomes'}</span>
              </h3>
              <ul className="space-y-2">
                {(lang === 'kn' ? currentLesson.learningOutcomesKn : currentLesson.learningOutcomesEn).map((lo, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700 font-kannada">
                    <span className="text-sky-500 font-bold">✔</span>
                    <span>{lo}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* VIEW 2: 3D COMPUTER LAB */}
        {activeTab === '3dlab' && (
          <div className="flex flex-col gap-4">
            <ComputerLab3D lang={lang} />
          </div>
        )}

        {/* VIEW 3: INTERACTIVE GAMES HUB */}
        {activeTab === 'games' && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TuxPaintStudio lang={lang} />
              <KiboKeyboardTutor lang={lang} />
              <MousePracticeArena lang={lang} />
              <PatternSequencer lang={lang} />
            </div>
          </div>
        )}

        {/* VIEW 4: QUIZ MASTER */}
        {activeTab === 'quiz' && (
          <div className="flex flex-col gap-4">
            <QuizGameMaster lang={lang} gradeFilter={selectedGrade} />
          </div>
        )}

        {/* VIEW 5: GANU VOICE TUTOR */}
        {activeTab === 'tutor' && (
          <div className="flex flex-col gap-4">
            <VoiceTutorBot lang={lang} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-white border-t border-slate-200 py-6 px-4">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>🏛️</span>
            <span>
              {lang === 'kn'
                ? 'ರಾಜ್ಯ ಶಿಕ್ಷಣ ಸಂಶೋಧನೆ ಮತ್ತು ತರಬೇತಿ ಇಲಾಖೆ (DSERT), ಬೆಂಗಳೂರು - 560085'
                : 'State Educational Research & Training Department (DSERT), Bengaluru - 560085'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span>{lang === 'kn' ? 'ಡಿಜಿ ಪ್ರವೇಶ 1 & 2 ನೇ ತರಗತಿ' : 'Digi Pravesha Grade 1 & 2'}</span>
            <span>•</span>
            <span>{lang === 'kn' ? 'ಕನ್ನಡ & ಇಂಗ್ಲಿಷ್' : 'Kannada & English'}</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
