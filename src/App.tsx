import React, { useState, useEffect } from 'react';
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
import { playSound, speakText, stopSpeech, setGlobalMute } from './utils/audio';

export default function App() {
  const [lang, setLang] = useState<'kn' | 'en' | 'bilingual'>('bilingual');
  const [selectedGrade, setSelectedGrade] = useState<1 | 2>(1);
  const [selectedLessonId, setSelectedLessonId] = useState<string>('g1-l1');
  const [activeTab, setActiveTab] = useState<'lessons' | '3dlab' | 'games' | 'quiz' | 'tutor'>('lessons');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    return localStorage.getItem('digi_theme') === 'dark';
  });
  const [isMuted, setIsMuted] = useState<boolean>(() => {
    return localStorage.getItem('digi_mute') === 'true';
  });

  // Effective speech language
  const speechLang: 'kn' | 'en' = lang === 'en' ? 'en' : 'kn';

  // Toggle dark mode class on html element
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('digi_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('digi_theme', 'light');
    }
  }, [darkMode]);

  // Sync global audio mute
  useEffect(() => {
    setGlobalMute(isMuted);
    localStorage.setItem('digi_mute', isMuted ? 'true' : 'false');
  }, [isMuted]);

  const toggleMute = () => {
    const nextState = !isMuted;
    setIsMuted(nextState);
    setGlobalMute(nextState);
    if (!nextState) {
      playSound('pop');
    }
  };

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
      speechLang === 'kn' ? `${grade} ನೇ ತರಗತಿ ಡಿಜಿ ಪ್ರವೇಶ ಪಠ್ಯಕ್ರಮ` : `Grade ${grade} Digi Pravesha Curriculum`,
      speechLang
    );
  };

  const handleLessonSelect = (lesson: LessonContent) => {
    playSound('pop');
    setSelectedLessonId(lesson.id);
    setActiveTab('lessons');
    speakText(
      speechLang === 'kn'
        ? `ಪಾಠ ${lesson.lessonNum}: ${lesson.titleKn}. ${lesson.descriptionKn}`
        : `Lesson ${lesson.lessonNum}: ${lesson.titleEn}. ${lesson.descriptionEn}`,
      speechLang
    );
  };

  const cycleLanguage = () => {
    playSound('pop');
    stopSpeech();
    if (lang === 'kn') setLang('bilingual');
    else if (lang === 'bilingual') setLang('en');
    else setLang('kn');
  };

  const toggleDarkMode = () => {
    playSound('click');
    setDarkMode(prev => !prev);
  };

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-300 ${
      darkMode ? 'bg-slate-950 text-slate-100 selection:bg-purple-900 selection:text-white' : 'bg-gradient-to-br from-amber-50/40 via-sky-50/30 to-purple-50/40 text-slate-800 selection:bg-amber-200'
    }`}>
      {/* Top School Banner (Prominent School identity) */}
      <div className={`${
        darkMode
          ? 'bg-gradient-to-r from-blue-950 via-indigo-900 to-purple-950 border-b border-indigo-800/60'
          : 'bg-gradient-to-r from-amber-500 via-orange-500 to-rose-500 text-white shadow-md'
      } text-white px-4 py-2.5 transition-colors`}>
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-black">
          <div className="flex items-center gap-2 sm:gap-3">
            <span className="text-xl sm:text-2xl animate-bounce">🏫</span>
            <div className="leading-tight">
              <span className="text-amber-200 uppercase tracking-wider text-[11px] sm:text-xs block">
                Official School Portal
              </span>
              <span className="text-sm sm:text-lg font-black tracking-wide drop-shadow-sm font-display">
                ಕರ್ನಾಟಕ ಪಬ್ಲಿಕ್ ಸ್ಕೂಲ್ ಮಾದನಗೇರಿ • KARNATAKA PUBLIC SCHOOL MADANAGERI
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-bold bg-white/15 px-3 py-1 rounded-xl backdrop-blur-sm border border-white/20">
            <span>✨ Developed by:</span>
            <span className="text-amber-300 font-black tracking-wider uppercase underline underline-offset-2">
              YOGESH NAIK
            </span>
          </div>
        </div>
      </div>

      {/* Primary Sticky Header */}
      <header className={`sticky top-0 z-50 backdrop-blur-md border-b-2 transition-colors duration-300 ${
        darkMode ? 'bg-slate-900/95 border-slate-800 shadow-xl' : 'bg-white/95 border-amber-200 shadow-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
          {/* Logo & Subject Info */}
          <div className="flex items-center gap-3">
            <div className="w-13 h-13 rounded-2xl bg-gradient-to-tr from-amber-400 via-pink-500 to-indigo-600 flex items-center justify-center text-white text-3xl shadow-lg border-2 border-white animate-pop">
              🖥️
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className={`text-2xl sm:text-3xl font-black font-display tracking-tight ${
                  darkMode ? 'text-amber-400' : 'text-slate-900'
                }`}>
                  {lang === 'kn' ? 'ಡಿಜಿ ಪ್ರವೇಶ' : lang === 'en' ? 'Digi Pravesha' : 'ಡಿಜಿ ಪ್ರವೇಶ • Digi Pravesha'}
                </span>
                <span className="px-3 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white font-black text-xs sm:text-sm shadow-sm">
                  {lang === 'kn' ? '೧ & ೨ ನೇ ತರಗತಿ' : 'Class 1 & 2'}
                </span>
              </div>
              <p className={`text-xs sm:text-sm font-kannada font-bold ${
                darkMode ? 'text-slate-400' : 'text-slate-600'
              }`}>
                {lang === 'kn'
                  ? 'ಶಾಲಾ ಶಿಕ್ಷಣ ಮತ್ತು ಸಾಕ್ಷರತಾ ಇಲಾಖೆ, ಕರ್ನಾಟಕ'
                  : lang === 'en'
                  ? 'Dept. of School Education & Literacy, Karnataka'
                  : 'ಕನ್ನಡ & English Bilingual Computer Learning'}
              </p>
            </div>
          </div>

          {/* Right Controls: Class 1/2, Language Toggle, and Dark Mode */}
          <div className="flex items-center flex-wrap gap-2 sm:gap-3">
            {/* Grade Switcher */}
            <div className={`flex items-center p-1 rounded-2xl border ${
              darkMode ? 'bg-slate-800 border-slate-700' : 'bg-slate-100 border-slate-200'
            }`}>
              <button
                onClick={() => handleGradeChange(1)}
                className={`px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-base font-black transition-all ${
                  selectedGrade === 1
                    ? 'bg-amber-500 text-white shadow-md scale-105'
                    : darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'kn' ? '೧ ನೇ ತರಗತಿ' : 'Class 1'}
              </button>
              <button
                onClick={() => handleGradeChange(2)}
                className={`px-3 sm:px-5 py-2 rounded-xl text-xs sm:text-base font-black transition-all ${
                  selectedGrade === 2
                    ? 'bg-indigo-600 text-white shadow-md scale-105'
                    : darkMode ? 'text-slate-300 hover:text-white' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {lang === 'kn' ? '೨ ನೇ ತರಗತಿ' : 'Class 2'}
              </button>
            </div>

            {/* Language Switcher Button (Kn / En / Bilingual) */}
            <button
              onClick={cycleLanguage}
              className={`px-3.5 py-2 rounded-2xl border-2 font-black text-xs sm:text-sm transition-transform active:scale-95 flex items-center gap-1.5 shadow-sm ${
                darkMode
                  ? 'bg-slate-800 border-indigo-500/50 text-indigo-300 hover:bg-slate-700'
                  : 'bg-amber-50 border-amber-300 text-amber-900 hover:bg-amber-100'
              }`}
              title="Change Language Mode"
            >
              <span className="text-base sm:text-lg">🌐</span>
              <span>
                {lang === 'kn' ? 'ಕನ್ನಡ (Kn)' : lang === 'en' ? 'English (En)' : 'ದ್ವಿಭಾಷೆ (Bilingual)'}
              </span>
            </button>

            {/* Mute / Unmute Audio Toggle Button */}
            <button
              onClick={toggleMute}
              className={`px-3 py-2 sm:px-3.5 sm:py-2 rounded-2xl border-2 font-black text-xs sm:text-sm transition-all active:scale-95 flex items-center gap-1.5 shadow-sm ${
                isMuted
                  ? 'bg-rose-500 text-white border-rose-600 shadow-rose-500/20'
                  : darkMode
                  ? 'bg-slate-800 border-slate-700 text-emerald-400 hover:bg-slate-700'
                  : 'bg-emerald-50 border-emerald-300 text-emerald-800 hover:bg-emerald-100'
              }`}
              title={isMuted ? 'Unmute Audio / ಧ್ವನಿ ಆನ್' : 'Mute Audio / ಧ್ವನಿ ಆಫ್'}
            >
              <span className="text-base sm:text-lg">{isMuted ? '🔇' : '🔊'}</span>
              <span className="hidden sm:inline">
                {isMuted
                  ? (speechLang === 'kn' ? 'ಮ್ಯೂಟ್ ಆಗಿದೆ' : 'Muted')
                  : (speechLang === 'kn' ? 'ಧ್ವನಿ ಆನ್' : 'Sound ON')}
              </span>
            </button>

            {/* Dark / Light Mode Toggle Button */}
            <button
              onClick={toggleDarkMode}
              className={`p-2 sm:p-2.5 rounded-2xl border-2 transition-all active:scale-95 flex items-center justify-center ${
                darkMode
                  ? 'bg-amber-400 text-slate-900 border-amber-300 shadow-md shadow-amber-400/20'
                  : 'bg-slate-800 text-amber-300 border-slate-700 shadow-md'
              }`}
              title={darkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              <span className="text-base sm:text-lg">{darkMode ? '☀️' : '🌙'}</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs Bar with big friendly buttons */}
        <div className={`max-w-7xl mx-auto px-4 overflow-x-auto flex items-center gap-2 py-2.5 border-t ${
          darkMode ? 'border-slate-800' : 'border-slate-100'
        }`}>
          <button
            onClick={() => { setActiveTab('lessons'); playSound('pop'); }}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-base font-black whitespace-nowrap transition-all flex items-center gap-2 shadow-sm ${
              activeTab === 'lessons'
                ? darkMode ? 'bg-indigo-600 text-white ring-2 ring-indigo-400' : 'bg-slate-900 text-white shadow-md'
                : darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="text-lg">📚</span>
            <span>
              {lang === 'kn' ? 'ಪಾಠಗಳು' : lang === 'en' ? 'Lessons' : 'ಪಾಠಗಳು • Lessons'}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('3dlab'); playSound('pop'); }}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-base font-black whitespace-nowrap transition-all flex items-center gap-2 shadow-sm ${
              activeTab === '3dlab'
                ? 'bg-sky-500 text-white ring-2 ring-sky-300'
                : darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="text-lg">🤖</span>
            <span>
              {lang === 'kn' ? '3D ಲ್ಯಾಬ್' : lang === 'en' ? '3D Lab' : '3D ಗಣಕ ಲ್ಯಾಬ್'}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('games'); playSound('pop'); }}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-base font-black whitespace-nowrap transition-all flex items-center gap-2 shadow-sm ${
              activeTab === 'games'
                ? 'bg-emerald-500 text-white ring-2 ring-emerald-300'
                : darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="text-lg">🎮</span>
            <span>
              {lang === 'kn' ? 'ಆಟಗಳು' : lang === 'en' ? 'Games & Labs' : 'ಆಟಗಳು & ಲ್ಯಾಬ್'}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('quiz'); playSound('pop'); }}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-base font-black whitespace-nowrap transition-all flex items-center gap-2 shadow-sm ${
              activeTab === 'quiz'
                ? 'bg-amber-500 text-white ring-2 ring-amber-300'
                : darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="text-lg">🏆</span>
            <span>
              {lang === 'kn' ? 'ರಸಪ್ರಶ್ನೆ' : lang === 'en' ? 'Quiz' : 'ರಸಪ್ರಶ್ನೆ • Quiz'}
            </span>
          </button>

          <button
            onClick={() => { setActiveTab('tutor'); playSound('pop'); }}
            className={`px-4 sm:px-5 py-2.5 rounded-2xl text-xs sm:text-base font-black whitespace-nowrap transition-all flex items-center gap-2 shadow-sm ${
              activeTab === 'tutor'
                ? 'bg-cyan-600 text-white ring-2 ring-cyan-300'
                : darkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            <span className="text-lg">🎙️</span>
            <span>
              {lang === 'kn' ? 'ಗಣು ಟ್ಯೂಟರ್' : lang === 'en' ? 'Voice Tutor' : 'ಗಣು ವಾಯ್ಸ್ ಟ್ಯೂಟರ್'}
            </span>
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-6">
        {/* VIEW 1: LESSONS & CURRICULUM */}
        {activeTab === 'lessons' && (
          <div className="flex flex-col gap-6">
            {/* Textbook Banner & Audio Voice Guide */}
            <div className={`p-6 sm:p-8 rounded-3xl bg-gradient-to-r ${currentLesson.themeColor} text-white shadow-2xl flex flex-wrap items-center justify-between gap-6 border-4 border-white/20 relative overflow-hidden`}>
              {/* Playful Floating Background Badges */}
              <div className="absolute -right-6 -bottom-6 text-9xl opacity-15 pointer-events-none select-none">
                🌟
              </div>

              <div className="flex-1 min-w-[280px] z-10">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-black uppercase tracking-wider bg-black/25 px-4 py-1.5 rounded-full w-fit backdrop-blur-sm">
                  <span>{lang === 'en' ? `Grade ${currentLesson.grade} • Lesson ${currentLesson.lessonNum}` : `ತರಗತಿ ${currentLesson.grade} • ಪಾಠ ${currentLesson.lessonNum}`}</span>
                  <span>•</span>
                  <span>{currentLesson.character}</span>
                </div>

                <h1 className="text-3xl sm:text-5xl font-black mt-3 font-display drop-shadow-md">
                  {lang === 'bilingual'
                    ? `${currentLesson.titleKn} (${currentLesson.titleEn})`
                    : lang === 'kn' ? currentLesson.titleKn : currentLesson.titleEn}
                </h1>
                <p className="text-base sm:text-xl font-bold opacity-95 font-kannada mt-2 max-w-2xl leading-relaxed">
                  {lang === 'bilingual'
                    ? `${currentLesson.subtitleKn} • ${currentLesson.subtitleEn}`
                    : lang === 'kn' ? currentLesson.subtitleKn : currentLesson.subtitleEn}
                </p>
                <p className="text-sm sm:text-base opacity-90 mt-3 italic font-kannada bg-black/15 p-3 rounded-2xl max-w-2xl border border-white/10">
                  "{lang === 'en' ? currentLesson.descriptionEn : currentLesson.descriptionKn}"
                </p>
              </div>

              {/* Read Aloud Voice Button */}
              <button
                onClick={() => {
                  speakText(
                    speechLang === 'kn'
                      ? `${currentLesson.titleKn}. ${currentLesson.subtitleKn}. ${currentLesson.descriptionKn}`
                      : `${currentLesson.titleEn}. ${currentLesson.subtitleEn}. ${currentLesson.descriptionEn}`,
                    speechLang
                  );
                }}
                className="z-10 px-6 py-4 rounded-2xl bg-white text-slate-900 hover:bg-amber-100 font-black text-base shadow-xl transition-transform hover:scale-105 active:scale-95 flex items-center gap-2.5"
              >
                <span className="text-2xl animate-pop">🔊</span>
                <span>{speechLang === 'kn' ? 'ಪಾಠವನ್ನು ಆಲಿಸಿ' : 'Listen to Lesson'}</span>
              </button>
            </div>

            {/* Horizontal Lesson Selector Cards */}
            <div>
              <div className={`text-xs sm:text-sm font-black uppercase tracking-wider mb-2.5 flex items-center justify-between ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                <span>{speechLang === 'kn' ? `${selectedGrade} ನೇ ತರಗತಿಯ ಎಲ್ಲಾ ಪಾಠಗಳು:` : `Grade ${selectedGrade} Lessons:`}</span>
                <span className="text-amber-500 font-bold">✨ Tap any lesson to start</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
                {gradeLessons.map(lesson => {
                  const isCurrent = lesson.id === currentLesson.id;
                  return (
                    <button
                      key={lesson.id}
                      onClick={() => handleLessonSelect(lesson)}
                      className={`p-3.5 sm:p-4 rounded-2xl border-3 text-left transition-all flex flex-col justify-between ${
                        isCurrent
                          ? 'border-amber-400 bg-amber-500/15 shadow-lg ring-3 ring-amber-400/50 scale-103'
                          : darkMode
                          ? 'border-slate-800 bg-slate-900 hover:bg-slate-800 text-slate-200'
                          : 'border-slate-200 hover:border-amber-300 bg-white hover:bg-amber-50/50'
                      }`}
                    >
                      <div className="text-[11px] font-black text-amber-500 uppercase">
                        {speechLang === 'kn' ? `ಪಾಠ ${lesson.lessonNum}` : `Lesson ${lesson.lessonNum}`}
                      </div>
                      <div className={`text-sm sm:text-base font-black mt-1 line-clamp-1 font-display ${
                        darkMode ? 'text-slate-100' : 'text-slate-900'
                      }`}>
                        {lang === 'en' ? lesson.titleEn : lesson.titleKn}
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-1">
                        {lesson.character}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Interactive Simulator for this lesson */}
            <div>
              <div className={`text-xs sm:text-sm font-black uppercase tracking-wider mb-2.5 ${
                darkMode ? 'text-slate-400' : 'text-slate-500'
              }`}>
                {speechLang === 'kn' ? 'ಈ ಪಾಠದ ಸಂವಾದಾತ್ಮಕ ಆಟ ಮತ್ತು ಚಟುವಟಿಕೆ:' : 'Interactive Activity for this Lesson:'}
              </div>

              {currentLesson.interactiveMode === 'devices' && (
                <DigitalWorldExplorer lang={speechLang} />
              )}
              {currentLesson.interactiveMode === 'safety' && (
                <SafetyHeroQuiz lang={speechLang} />
              )}
              {currentLesson.interactiveMode === 'stepbystep' && (
                <StepByStepThinker lang={speechLang} />
              )}
              {currentLesson.interactiveMode === 'tvremote' && (
                <TVRemoteSimulator lang={speechLang} />
              )}
              {currentLesson.interactiveMode === 'smartactions' && (
                <SmartActionsPlayground lang={speechLang} />
              )}
              {currentLesson.interactiveMode === '3dlab' && (
                <ComputerLab3D lang={speechLang} />
              )}
              {currentLesson.interactiveMode === 'mouse' && (
                <MousePracticeArena lang={speechLang} />
              )}
              {currentLesson.interactiveMode === 'tuxpaint' && (
                <TuxPaintStudio lang={speechLang} />
              )}
              {currentLesson.interactiveMode === 'keyboard' && (
                <KiboKeyboardTutor lang={speechLang} />
              )}
              {currentLesson.interactiveMode === 'patterns' && (
                <PatternSequencer lang={speechLang} />
              )}
            </div>

            {/* Learning Outcomes from Textbook */}
            <div className={`p-6 rounded-3xl border-2 shadow-sm ${
              darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
            }`}>
              <h3 className={`text-lg font-black font-display flex items-center gap-2 mb-3 ${
                darkMode ? 'text-amber-400' : 'text-slate-900'
              }`}>
                <span>🎯</span>
                <span>{speechLang === 'kn' ? 'ಕಲಿಕಾ ಫಲಗಳು (Learning Outcomes)' : 'Learning Outcomes'}</span>
              </h3>
              <ul className="space-y-2.5">
                {(speechLang === 'kn' ? currentLesson.learningOutcomesKn : currentLesson.learningOutcomesEn).map((lo, idx) => (
                  <li key={idx} className={`flex items-start gap-2.5 text-sm sm:text-base font-kannada ${
                    darkMode ? 'text-slate-300' : 'text-slate-700'
                  }`}>
                    <span className="text-emerald-500 font-black text-lg">✔</span>
                    <span className="leading-relaxed">{lo}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {/* VIEW 2: 3D COMPUTER LAB */}
        {activeTab === '3dlab' && (
          <div className="flex flex-col gap-4">
            <ComputerLab3D lang={speechLang} />
          </div>
        )}

        {/* VIEW 3: INTERACTIVE GAMES HUB */}
        {activeTab === 'games' && (
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <TuxPaintStudio lang={speechLang} />
              <KiboKeyboardTutor lang={speechLang} />
              <MousePracticeArena lang={speechLang} />
              <PatternSequencer lang={speechLang} />
            </div>
          </div>
        )}

        {/* VIEW 4: QUIZ MASTER */}
        {activeTab === 'quiz' && (
          <div className="flex flex-col gap-4">
            <QuizGameMaster lang={speechLang} gradeFilter={selectedGrade} />
          </div>
        )}

        {/* VIEW 5: GANU VOICE TUTOR */}
        {activeTab === 'tutor' && (
          <div className="flex flex-col gap-4">
            <VoiceTutorBot lang={speechLang} />
          </div>
        )}
      </main>

      {/* Footer with High Visibility School Name & Developer Credit */}
      <footer className={`mt-auto border-t py-8 px-4 transition-colors ${
        darkMode ? 'bg-slate-900 border-slate-800 text-slate-400' : 'bg-white border-slate-200 text-slate-600'
      }`}>
        <div className="max-w-7xl mx-auto flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="text-3xl">🏛️</span>
              <div>
                <div className={`text-base sm:text-lg font-black font-display ${
                  darkMode ? 'text-amber-400' : 'text-slate-900'
                }`}>
                  ಕರ್ನಾಟಕ ಪಬ್ಲಿಕ್ ಸ್ಕೂಲ್ ಮಾದನಗೇರಿ • Karnataka Public School Madanageri
                </div>
                <div className="text-xs sm:text-sm font-kannada text-slate-500">
                  {speechLang === 'kn'
                    ? 'ರಾಜ್ಯ ಶಿಕ್ಷಣ ಸಂಶೋಧನೆ ಮತ್ತು ತರಬೇತಿ ಇಲಾಖೆ (DSERT), ಬೆಂಗಳೂರು - 560085'
                    : 'State Educational Research & Training Department (DSERT), Bengaluru - 560085'}
                </div>
              </div>
            </div>

            {/* Developer Credit Tag */}
            <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-rose-500 text-white px-5 py-2.5 rounded-2xl shadow-md font-bold text-xs sm:text-sm">
              <span>🚀 Developed by:</span>
              <span className="font-black tracking-wider text-amber-200">
                YOGESH NAIK
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-200/50 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <span>© 2026 Karnataka Public School Madanageri. All rights reserved.</span>
            <span>Optimized for Mobile, Tablet, and Desktop (Vercel Ready)</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
