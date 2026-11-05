import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { playSound, speakText } from '../utils/audio';

export const MousePracticeArena: React.FC<{ lang: 'kn' | 'en' }> = ({ lang }) => {
  const [clickCount, setClickCount] = useState(0);
  const [doubleClickSuccess, setDoubleClickSuccess] = useState(false);
  const [lastClickTime, setLastClickTime] = useState(0);
  const [contextMenuOpen, setContextMenuOpen] = useState(false);
  const [contextPos, setContextPos] = useState({ x: 0, y: 0 });

  // Drag and drop target state (Moving picture from left to right as in textbook Page 82)
  const [isDropped, setIsDropped] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Left click handler
  const handleSingleClick = () => {
    playSound('pop');
    setClickCount(c => c + 1);
    speakText(lang === 'kn' ? 'ಎಡ ಬಟನ್ ಕ್ಲಿಕ್ ಆಗಿದೆ!' : 'Left button clicked!', lang);
  };

  // Double click handler
  const handleDoubleClickArea = () => {
    const now = Date.now();
    if (now - lastClickTime < 450) {
      playSound('correct');
      setDoubleClickSuccess(true);
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
      speakText(lang === 'kn' ? 'ಡಬಲ್ ಕ್ಲಿಕ್ ಯಶಸ್ವಿ! ಫೋಲ್ಡರ್ ತೆರೆದಿದೆ!' : 'Double click success! Folder opened!', lang);
    } else {
      playSound('click');
      setLastClickTime(now);
    }
  };

  // Right click handler
  const handleContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    playSound('pop');
    setContextMenuOpen(true);
    setContextPos({ x: e.nativeEvent.offsetX, y: e.nativeEvent.offsetY });
    speakText(lang === 'kn' ? 'ಬಲ ಬಟನ್ ಆಯ್ಕೆಗಳ ಪಟ್ಟಿ ತೆರೆದಿದೆ!' : 'Right click opened list of options!', lang);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-rose-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-rose-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-rose-500 to-pink-600 flex items-center justify-center text-white text-3xl shadow-md">
            🖱️
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಕ್ಲಿಕ್ ಕ್ಲಿಕ್ ಮೌಸ್ - ಕೌಶಲ ಕಣ' : 'Click Click Mouse Practice Arena'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === 'kn' ? 'ಎಡ ಕ್ಲಿಕ್, ಡಬಲ್ ಕ್ಲಿಕ್, ಬಲ ಕ್ಲಿಕ್ ಮತ್ತು ಡ್ರ್ಯಾಗ್ & ಡ್ರಾಪ್ (Class 1 & 2)' : 'Master Left Click, Double Click, Right Click & Drag-Drop'}
            </p>
          </div>
        </div>

        <button
          onClick={() => {
            setClickCount(0);
            setDoubleClickSuccess(false);
            setContextMenuOpen(false);
            setIsDropped(false);
            playSound('whoosh');
          }}
          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
        >
          🔄 {lang === 'kn' ? 'ಮತ್ತೆ ಅಭ್ಯಾಸ ಮಾಡಿ' : 'Reset Arena'}
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Practice 1: Single Left Click */}
        <div className="bg-gradient-to-br from-rose-50 to-pink-50/50 p-5 rounded-3xl border-2 border-rose-200 flex flex-col items-center text-center justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-rose-500 text-white font-black text-sm flex items-center justify-center mb-3 mx-auto">
              1
            </div>
            <h3 className="text-base font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಎಡ ಬಟನ್ (Left Click)' : 'Single Left Click'}
            </h3>
            <p className="text-xs text-slate-600 font-kannada mt-1">
              {lang === 'kn' ? 'ಫೈಲ್ ಅಥವಾ ಐಕಾನ್ ಆಯ್ಕೆ ಮಾಡಲು ಒಂದೇ ಬಾರಿ ಕ್ಲಿಕ್ ಮಾಡಿ.' : 'Used to select an icon or file on screen.'}
            </p>
          </div>

          <button
            onClick={handleSingleClick}
            className="my-5 w-24 h-24 rounded-full bg-white shadow-lg border-4 border-rose-300 hover:border-rose-500 hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
          >
            <span className="text-3xl">🐭</span>
            <span className="text-[10px] font-black text-rose-600 uppercase">CLICK ME!</span>
          </button>

          <div className="text-xs font-bold text-rose-900 bg-white/80 px-3 py-1 rounded-full border border-rose-200">
            {lang === 'kn' ? `ಕ್ಲಿಕ್ ಸಂಖ್ಯೆ: ${clickCount}` : `Total Clicks: ${clickCount}`}
          </div>
        </div>

        {/* Practice 2: Double Click */}
        <div className="bg-gradient-to-br from-sky-50 to-indigo-50/50 p-5 rounded-3xl border-2 border-sky-200 flex flex-col items-center text-center justify-between">
          <div>
            <div className="w-10 h-10 rounded-xl bg-sky-500 text-white font-black text-sm flex items-center justify-center mb-3 mx-auto">
              2
            </div>
            <h3 className="text-base font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಡಬಲ್ ಕ್ಲಿಕ್ (Double Click)' : 'Double Click'}
            </h3>
            <p className="text-xs text-slate-600 font-kannada mt-1">
              {lang === 'kn' ? 'ಫೋಲ್ಡರ್ ತೆರೆಯಲು ವೇಗವಾಗಿ 2 ಬಾರಿ ಎಡ ಬಟನ್ ಒತ್ತಿ.' : 'Quickly click twice with left button to open the folder.'}
            </p>
          </div>

          <div
            onClick={handleDoubleClickArea}
            className="my-5 w-24 h-24 rounded-3xl bg-white shadow-lg border-4 border-sky-300 hover:border-sky-500 hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 cursor-pointer"
          >
            <span className="text-4xl">{doubleClickSuccess ? '📂' : '📁'}</span>
            <span className="text-[10px] font-black text-sky-600">
              {doubleClickSuccess ? 'OPENED!' : 'CLICK 2X'}
            </span>
          </div>

          <div className="text-xs font-bold text-sky-900 bg-white/80 px-3 py-1 rounded-full border border-sky-200">
            {doubleClickSuccess
              ? (lang === 'kn' ? 'ತೆರೆದಿದೆ! 🎉' : 'Opened! 🎉')
              : (lang === 'kn' ? 'ವೇಗವಾಗಿ 2 ಬಾರಿ ಒತ್ತಿ' : 'Double click fast!')}
          </div>
        </div>

        {/* Practice 3: Right Click (Menu) */}
        <div
          onContextMenu={handleContextMenu}
          className="bg-gradient-to-br from-amber-50 to-yellow-50/50 p-5 rounded-3xl border-2 border-amber-200 flex flex-col items-center text-center justify-between relative overflow-hidden"
        >
          <div>
            <div className="w-10 h-10 rounded-xl bg-amber-500 text-white font-black text-sm flex items-center justify-center mb-3 mx-auto">
              3
            </div>
            <h3 className="text-base font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಬಲ ಬಟನ್ (Right Click)' : 'Right Click Menu'}
            </h3>
            <p className="text-xs text-slate-600 font-kannada mt-1">
              {lang === 'kn' ? 'ಆಯ್ಕೆಗಳ ಪಟ್ಟಿ ತೆರೆಯಲು ಬಲ ಬಟನ್ ಒತ್ತಿ.' : 'Click right button to open list of actions.'}
            </p>
          </div>

          <div className="my-5 w-24 h-24 rounded-3xl bg-white shadow-lg border-4 border-amber-300 hover:border-amber-500 hover:scale-105 active:scale-95 transition-all flex flex-col items-center justify-center gap-1 cursor-context-menu">
            <span className="text-3xl">📋</span>
            <span className="text-[10px] font-black text-amber-600">RIGHT CLICK</span>
          </div>

          <div className="text-xs font-bold text-amber-900 bg-white/80 px-3 py-1 rounded-full border border-amber-200">
            {contextMenuOpen
              ? (lang === 'kn' ? 'ಪಟ್ಟಿ ತೆರೆದಿದೆ! ✓' : 'Menu Opened! ✓')
              : (lang === 'kn' ? 'ಇಲ್ಲಿ ಬಲ ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Right-click here')}
          </div>

          {/* Simulated Context Menu Popup */}
          {contextMenuOpen && (
            <div
              className="absolute z-20 bg-white rounded-xl shadow-2xl border border-slate-200 py-1 text-left text-xs min-w-28 animate-fadeIn"
              style={{ top: Math.min(contextPos.y, 120), left: Math.min(contextPos.x, 80) }}
            >
              <div className="px-3 py-1.5 hover:bg-sky-50 font-bold text-slate-800 cursor-pointer">
                📄 Open (ತೆರೆ)
              </div>
              <div className="px-3 py-1.5 hover:bg-sky-50 text-slate-700 cursor-pointer">
                📋 Copy (ಕಾಪಿ)
              </div>
              <div className="px-3 py-1.5 hover:bg-sky-50 text-slate-700 cursor-pointer">
                🗑️ Delete (ಅಳಿಸು)
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Drag & Drop Simulation (Textbook Class 1 Page 82 & Class 2 Page 22) */}
      <div className="mt-6 p-5 bg-slate-50 rounded-3xl border-2 border-slate-200">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಡ್ರ್ಯಾಗ್ ಮತ್ತು ಡ್ರಾಪ್ (Drag and Drop)' : 'Drag and Drop Challenge'}
            </h3>
            <p className="text-xs text-slate-500 font-kannada">
              {lang === 'kn'
                ? 'ಚಿತ್ರವನ್ನು ಎಡ ಬಟನ್ ಒತ್ತಿ ಹಿಡಿದು ಮತ್ತೊಂದು ಕಡೆಗೆ ಸಾಗಿಸಿ ಕೈ ಬಿಡಿ!'
                : 'Click and drag the animal into the green sanctuary box!'}
            </p>
          </div>
          <button
            onClick={() => { setIsDropped(false); playSound('whoosh'); }}
            className="text-xs font-bold text-sky-600 hover:underline"
          >
            {lang === 'kn' ? 'ಮರುಹೊಂದಿಸಿ' : 'Reset Box'}
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 h-36">
          {/* Source Box */}
          <div className="rounded-2xl border-2 border-dashed border-slate-300 bg-white p-3 flex flex-col items-center justify-center">
            {!isDropped ? (
              <div
                draggable
                onDragStart={() => { setIsDragging(true); playSound('pop'); }}
                onDragEnd={() => setIsDragging(false)}
                onClick={() => {
                  // Fallback for touch devices: click to drop
                  setIsDropped(true);
                  playSound('correct');
                  confetti({ particleCount: 30, spread: 40 });
                  speakText(lang === 'kn' ? 'ಯಶಸ್ವಿಯಾಗಿ ಡ್ರಾಪ್ ಮಾಡಲಾಗಿದೆ!' : 'Successfully dropped!', lang);
                }}
                className="p-3 rounded-2xl bg-amber-100 border-2 border-amber-300 shadow cursor-grab active:cursor-grabbing flex flex-col items-center gap-1 hover:scale-105 transition-transform"
              >
                <span className="text-4xl">🐘</span>
                <span className="text-[10px] font-black text-amber-900">{lang === 'kn' ? 'ಡ್ರ್ಯಾಗ್ ಮಾಡಿ ➔' : 'Drag me ➔'}</span>
              </div>
            ) : (
              <span className="text-xs text-slate-400 font-bold">{lang === 'kn' ? 'ಖಾಲಿ ಇದೆ' : 'Empty Box'}</span>
            )}
          </div>

          {/* Destination Drop Target */}
          <div
            onDragOver={e => e.preventDefault()}
            onDrop={e => {
              e.preventDefault();
              setIsDropped(true);
              setIsDragging(false);
              playSound('correct');
              confetti({ particleCount: 40, spread: 50 });
              speakText(lang === 'kn' ? 'ಯಶಸ್ವಿಯಾಗಿ ಡ್ರಾಪ್ ಮಾಡಲಾಗಿದೆ!' : 'Successfully dropped!', lang);
            }}
            className={`rounded-2xl border-3 border-dashed flex flex-col items-center justify-center transition-all ${
              isDropped
                ? 'bg-emerald-50 border-emerald-400'
                : isDragging
                ? 'bg-sky-50 border-sky-400 animate-pulse'
                : 'bg-slate-100 border-slate-300'
            }`}
          >
            {isDropped ? (
              <div className="flex flex-col items-center animate-fadeIn">
                <span className="text-4xl">🐘</span>
                <span className="text-xs font-black text-emerald-800 mt-1">
                  {lang === 'kn' ? 'ಡ್ರಾಪ್ ಆಗಿದೆ! ✓' : 'Dropped Safely! ✓'}
                </span>
              </div>
            ) : (
              <div className="text-center p-2 text-slate-400">
                <div className="text-2xl mb-1">📥</div>
                <div className="text-xs font-bold">
                  {lang === 'kn' ? 'ಇಲ್ಲಿಗೆ ಡ್ರಾಪ್ ಮಾಡಿ (Drop Here)' : 'Drop Here'}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
