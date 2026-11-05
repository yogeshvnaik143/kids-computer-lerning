import React, { useRef, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { playSound, speakText } from '../utils/audio';

export const TuxPaintStudio: React.FC<{ lang: 'kn' | 'en' }> = ({ lang }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeTool, setActiveTool] = useState<'brush' | 'eraser' | 'stamp' | 'line'>('brush');
  const [activeColor, setActiveColor] = useState<string>('#ef4444');
  const [brushSize, setBrushSize] = useState<number>(10);
  const [isDrawing, setIsDrawing] = useState<boolean>(false);
  const [selectedStamp, setSelectedStamp] = useState<string>('🐧');
  const [checkList, setCheckList] = useState({
    opened: true,
    drewLine: false,
    usedStamp: false,
    usedColor: false,
    saved: false
  });

  const colors = [
    { name: 'Red', hex: '#ef4444' },
    { name: 'Blue', hex: '#3b82f6' },
    { name: 'Green', hex: '#10b981' },
    { name: 'Yellow', hex: '#eab308' },
    { name: 'Purple', hex: '#a855f7' },
    { name: 'Orange', hex: '#f97316' },
    { name: 'Pink', hex: '#ec4899' },
    { name: 'Black', hex: '#0f172a' }
  ];

  const stamps = ['🐧', '⭐', '🌸', '🚗', '☀️', '🍎', '🐱', '🚀'];

  // Initialize canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Fill white
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDraw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    if (activeTool === 'stamp') {
      ctx.font = `${brushSize * 3.5}px sans-serif`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(selectedStamp, x, y);
      playSound('pop');
      setCheckList(c => ({ ...c, usedStamp: true }));
      return;
    }

    setIsDrawing(true);
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.strokeStyle = activeTool === 'eraser' ? '#ffffff' : activeColor;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    setCheckList(c => ({ ...c, drewLine: true, usedColor: true }));
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing || activeTool === 'stamp') return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const rect = canvas.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const endDraw = () => {
    setIsDrawing(false);
  };

  const handleClear = () => {
    playSound('whoosh');
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    playSound('fanfare');
    setCheckList(c => ({ ...c, saved: true }));
    confetti({ particleCount: 60, spread: 60, origin: { y: 0.6 } });
    speakText(
      lang === 'kn' ? 'ಚಿತ್ರ ಸೇವ್ ಆಗಿದೆ! ತುಂಬಾ ಸುಂದರವಾಗಿದೆ!' : 'Drawing saved! Great artistic work!',
      lang
    );
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-sky-300">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-sky-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-sky-400 to-blue-600 flex items-center justify-center text-white text-3xl shadow-md">
            🐧
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಟಕ್ಸ್ ಪೇಂಟ್ ಆರ್ಟ್ ಸ್ಟುಡಿಯೋ' : 'Tux Paint Art Studio'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === 'kn' ? 'ಬಣ್ಣ ತುಂಬಿ, ಮುದ್ರೆ (Stamp) ಒತ್ತಿ, ಚಿತ್ರ ಬಿಡಿಸಿ (Class 2 Lesson 4)' : 'Paint with Tux the Penguin, stamp icons, and save drawings'}
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleClear}
            className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs shadow-sm transition-all"
          >
            🗑️ {lang === 'kn' ? 'ಹೊಸ ಹಾಳೆ' : 'New Paper'}
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-xs sm:text-sm shadow-md transition-transform hover:scale-105 flex items-center gap-1.5"
          >
            💾 {lang === 'kn' ? 'ಸೇವ್ ಮಾಡಿ (Save)' : 'Save Drawing'}
          </button>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Tools (Tux Paint Left Toolbar) */}
        <div className="lg:col-span-2 flex lg:flex-col gap-2 overflow-x-auto pb-1 lg:pb-0">
          <div className="text-[11px] font-black uppercase text-slate-400 hidden lg:block">
            {lang === 'kn' ? 'ಉಪಕರಣಗಳು' : 'Tools'}
          </div>

          <button
            onClick={() => { setActiveTool('brush'); playSound('pop'); }}
            className={`p-3 rounded-2xl border-2 flex items-center lg:justify-start gap-2 text-xs font-bold transition-all ${
              activeTool === 'brush' ? 'bg-sky-500 text-white border-sky-600 shadow-md' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <span className="text-xl">🖌️</span>
            <span>{lang === 'kn' ? 'ಬ್ರಷ್' : 'Paint Brush'}</span>
          </button>

          <button
            onClick={() => { setActiveTool('stamp'); playSound('pop'); }}
            className={`p-3 rounded-2xl border-2 flex items-center lg:justify-start gap-2 text-xs font-bold transition-all ${
              activeTool === 'stamp' ? 'bg-sky-500 text-white border-sky-600 shadow-md' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <span className="text-xl">⭐</span>
            <span>{lang === 'kn' ? 'ಸ್ಟ್ಯಾಂಪ್' : 'Stamp'}</span>
          </button>

          <button
            onClick={() => { setActiveTool('eraser'); playSound('pop'); }}
            className={`p-3 rounded-2xl border-2 flex items-center lg:justify-start gap-2 text-xs font-bold transition-all ${
              activeTool === 'eraser' ? 'bg-sky-500 text-white border-sky-600 shadow-md' : 'bg-slate-50 text-slate-700 hover:bg-slate-100 border-slate-200'
            }`}
          >
            <span className="text-xl">🧼</span>
            <span>{lang === 'kn' ? 'ಎರೇಸರ್' : 'Eraser'}</span>
          </button>
        </div>

        {/* Center: Canvas Drawing Board */}
        <div className="lg:col-span-7 flex flex-col items-center">
          <div className="w-full bg-slate-100 p-2 rounded-3xl border-4 border-sky-200 shadow-inner overflow-hidden flex items-center justify-center">
            <canvas
              ref={canvasRef}
              width={540}
              height={360}
              onMouseDown={startDraw}
              onMouseMove={draw}
              onMouseUp={endDraw}
              onMouseLeave={endDraw}
              onTouchStart={startDraw}
              onTouchMove={draw}
              onTouchEnd={endDraw}
              className="w-full max-w-full aspect-[3/2] bg-white rounded-2xl shadow-sm cursor-crosshair touch-none"
            />
          </div>

          {/* Bottom Color Palette (Tux Paint Bottom Strip) */}
          <div className="mt-3 w-full flex items-center justify-between gap-1 overflow-x-auto p-2 bg-slate-50 rounded-2xl border border-slate-200">
            {colors.map(c => (
              <button
                key={c.hex}
                onClick={() => {
                  setActiveColor(c.hex);
                  playSound('pop');
                  setCheckList(chk => ({ ...chk, usedColor: true }));
                }}
                className={`w-9 h-9 rounded-xl flex-shrink-0 transition-transform ${
                  activeColor === c.hex ? 'scale-115 ring-3 ring-sky-400 shadow-md' : 'hover:scale-105'
                }`}
                style={{ backgroundColor: c.hex }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        {/* Right: Stamps, Size & Textbook Checklist */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          {/* Stamps Panel */}
          {activeTool === 'stamp' && (
            <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
              <div className="text-xs font-black text-amber-900 mb-2">
                {lang === 'kn' ? 'ಸ್ಟ್ಯಾಂಪ್ ಆಯ್ಕೆ ಮಾಡಿ:' : 'Choose Stamp:'}
              </div>
              <div className="grid grid-cols-4 gap-2">
                {stamps.map(s => (
                  <button
                    key={s}
                    onClick={() => { setSelectedStamp(s); playSound('pop'); }}
                    className={`h-11 rounded-xl text-2xl flex items-center justify-center transition-all ${
                      selectedStamp === s ? 'bg-amber-400 text-white shadow-md scale-110' : 'bg-white hover:bg-amber-100'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Brush Size Slider */}
          <div className="p-3 bg-slate-50 rounded-2xl border border-slate-200">
            <div className="flex justify-between items-center text-xs font-bold text-slate-700 mb-1">
              <span>{lang === 'kn' ? 'ಗಾತ್ರ (Size):' : 'Brush Size:'}</span>
              <span className="font-mono">{brushSize}px</span>
            </div>
            <input
              type="range"
              min="3"
              max="35"
              value={brushSize}
              onChange={e => setBrushSize(parseInt(e.target.value))}
              className="w-full accent-sky-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
            />
          </div>

          {/* Textbook Checklist (Class 2 Page 27 & 28) */}
          <div className="p-4 bg-sky-50 rounded-2xl border-2 border-sky-200">
            <div className="text-xs font-black uppercase tracking-wider text-sky-900 mb-2.5">
              📋 {lang === 'kn' ? 'ಪರಿಶೀಲನಾ ಪಟ್ಟಿ (Tux Check List):' : 'Tux Paint Checklist:'}
            </div>
            <div className="flex flex-col gap-1.5 text-xs">
              <div className="flex items-center gap-2 text-slate-700">
                <span className={checkList.opened ? 'text-emerald-600 font-black' : 'text-slate-400'}>
                  {checkList.opened ? '✅' : '⬜'}
                </span>
                <span>{lang === 'kn' ? 'ಟಕ್ಸ್ ಪೇಂಟ್ ತೆರೆದಿದೆ' : 'Opened Tux Paint'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className={checkList.drewLine ? 'text-emerald-600 font-black' : 'text-slate-400'}>
                  {checkList.drewLine ? '✅' : '⬜'}
                </span>
                <span>{lang === 'kn' ? 'ಗೆರೆಯನ್ನು ಎಳೆದಿದೆ' : 'Drew a line / shape'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className={checkList.usedColor ? 'text-emerald-600 font-black' : 'text-slate-400'}>
                  {checkList.usedColor ? '✅' : '⬜'}
                </span>
                <span>{lang === 'kn' ? 'ಬಣ್ಣವನ್ನು ಬಳಸಿದೆ' : 'Used bright colors'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className={checkList.usedStamp ? 'text-emerald-600 font-black' : 'text-slate-400'}>
                  {checkList.usedStamp ? '✅' : '⬜'}
                </span>
                <span>{lang === 'kn' ? 'ಸ್ಟ್ಯಾಂಪ್ ಬಳಸಿದೆ' : 'Used a stamp'}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-700">
                <span className={checkList.saved ? 'text-emerald-600 font-black' : 'text-slate-400'}>
                  {checkList.saved ? '✅' : '⬜'}
                </span>
                <span>{lang === 'kn' ? 'ಚಿತ್ರ ಸೇವ್ ಮಾಡಿದೆ' : 'Saved the drawing'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
