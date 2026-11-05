import React, { useState } from 'react';
import { playSound, speakText } from '../utils/audio';

export const TVRemoteSimulator: React.FC<{ lang: 'kn' | 'en' }> = ({ lang }) => {
  // Device mode: 'tv' or 'mobile'
  const [deviceMode, setDeviceMode] = useState<'tv' | 'mobile'>('tv');

  // TV state
  const [isPluggedIn, setIsPluggedIn] = useState(false);
  const [isSwitchboardOn, setIsSwitchboardOn] = useState(false);
  const [isTVPowerOn, setIsTVPowerOn] = useState(false);
  const [tvChannel, setTvChannel] = useState<'cartoons' | 'rhymes' | 'science' | 'news'>('cartoons');
  const [tvVolume, setTvVolume] = useState(50);

  // Phone state
  const [isPhonePowerOn, setIsPhonePowerOn] = useState(false);
  const [phoneScreenLocked, setPhoneScreenLocked] = useState(true);
  const [activeApp, setActiveApp] = useState<'home' | 'camera' | 'music' | 'gallery' | 'games'>('home');
  const [pressHoldCount, setPressHoldCount] = useState(0);

  // TV actions
  const togglePlug = () => {
    playSound('pop');
    setIsPluggedIn(!isPluggedIn);
    if (!isPluggedIn) {
      speakText(lang === 'kn' ? 'ಪ್ಲಗ್ ಸೇರಿಸಲಾಗಿದೆ!' : 'Plug inserted into switchboard!', lang);
    }
  };

  const toggleSwitch = () => {
    if (!isPluggedIn) {
      playSound('wrong');
      speakText(lang === 'kn' ? 'ಮೊದಲು ಪ್ಲಗ್ ಸೇರಿಸಿ!' : 'First insert the plug!', lang);
      return;
    }
    playSound('click');
    setIsSwitchboardOn(!isSwitchboardOn);
    speakText(
      !isSwitchboardOn
        ? (lang === 'kn' ? 'ಸ್ವಿಚ್ ಆನ್ ಆಗಿದೆ. ಈಗ ರಿಮೋಟ್‌ನ ಕೆಂಪು ಬಟನ್ ಒತ್ತಿ!' : 'Switchboard ON. Now press the red button on remote!')
        : (lang === 'kn' ? 'ಸ್ವಿಚ್ ಆಫ್ ಆಗಿದೆ.' : 'Switch turned off.'),
      lang
    );
  };

  const toggleRemotePower = () => {
    if (!isSwitchboardOn) {
      playSound('wrong');
      speakText(
        lang === 'kn' ? 'ಸ್ವಿಚ್ ಬೋರ್ಡ್ ಆನ್ ಆಗಿಲ್ಲ! ಹಂತ 1 ಪಾಲಿಸಿ.' : 'Switchboard is not ON yet! Follow Step 1 first.',
        lang
      );
      return;
    }
    playSound('tv');
    setIsTVPowerOn(!isTVPowerOn);
    if (!isTVPowerOn) {
      speakText(lang === 'kn' ? 'ಟಿ.ವಿ ಆನ್ ಆಗಿದೆ! ನಿಮ್ಮ ಇಷ್ಟದ ಕಾರ್ಟೂನ್ ವೀಕ್ಷಿಸಿ!' : 'TV is ON! Enjoy your cartoons!', lang);
    }
  };

  // Mobile actions
  const handlePhonePowerHold = () => {
    playSound('pop');
    if (!isPhonePowerOn) {
      setPressHoldCount(c => c + 1);
      if (pressHoldCount >= 1) {
        setIsPhonePowerOn(true);
        playSound('fanfare');
        speakText(lang === 'kn' ? 'ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಆನ್ ಆಗಿದೆ!' : 'Smartphone turned ON!', lang);
      } else {
        speakText(lang === 'kn' ? 'ಪವರ್ ಬಟನ್ ಅನ್ನು ಸ್ವಲ್ಪ ಹೊತ್ತು ಒತ್ತಿ ಹಿಡಿಯಿರಿ!' : 'Press and hold the power button!', lang);
      }
    } else {
      setIsPhonePowerOn(false);
      setPhoneScreenLocked(true);
      setActiveApp('home');
      setPressHoldCount(0);
      playSound('whoosh');
    }
  };

  const handleUnlock = () => {
    if (!isPhonePowerOn) return;
    playSound('pop');
    setPhoneScreenLocked(false);
    speakText(lang === 'kn' ? 'ಪರದೆ ಅನ್‌ಲಾಕ್ ಆಗಿದೆ! ಆ್ಯಪ್ ಐಕಾನ್ ಮುಟ್ಟಿ.' : 'Screen unlocked! Tap any app icon.', lang);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-purple-200">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-purple-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-purple-500 to-pink-500 flex items-center justify-center text-white text-2xl shadow-md">
            📺
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಡಿಜಿಟಲ್ ಗೆಳೆಯರು - ಆನ್ / ಆಫ್ ಸಿಮ್ಯುಲೇಟರ್' : 'Digital Friends - ON / OFF Simulator'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === 'kn' ? 'ಟಿ.ವಿ ಮತ್ತು ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಪ್ರಾರಂಭಿಸುವ ಹಂತಗಳು (Class 1 & 2)' : 'Master Turning ON TV and Smartphone Step-by-Step'}
            </p>
          </div>
        </div>

        {/* Switch between TV and Mobile */}
        <div className="flex items-center gap-2 bg-purple-50 p-1.5 rounded-2xl border border-purple-200">
          <button
            onClick={() => { setDeviceMode('tv'); playSound('pop'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              deviceMode === 'tv' ? 'bg-purple-600 text-white shadow-md' : 'text-purple-800 hover:bg-purple-100'
            }`}
          >
            📺 {lang === 'kn' ? 'ಸ್ಮಾರ್ಟ್ ಟಿ.ವಿ' : 'Smart TV'}
          </button>
          <button
            onClick={() => { setDeviceMode('mobile'); playSound('pop'); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              deviceMode === 'mobile' ? 'bg-pink-600 text-white shadow-md' : 'text-pink-800 hover:bg-pink-100'
            }`}
          >
            📱 {lang === 'kn' ? 'ಸ್ಮಾರ್ಟ್‌ಫೋನ್' : 'Smartphone'}
          </button>
        </div>
      </div>

      {deviceMode === 'tv' ? (
        /* TV SIMULATION WITH SWITCHBOARD & REMOTE */
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left: TV Display */}
          <div className="lg:col-span-8 flex flex-col items-center">
            {/* TV Screen Container */}
            <div className="w-full bg-slate-900 rounded-3xl p-4 shadow-2xl border-4 border-slate-700 relative">
              <div className="w-full aspect-video bg-black rounded-2xl overflow-hidden relative flex items-center justify-center border-2 border-slate-800">
                {isTVPowerOn ? (
                  <div className="w-full h-full relative flex flex-col justify-between p-6 bg-gradient-to-b from-sky-400 via-indigo-500 to-purple-600 animate-fadeIn text-white">
                    {/* TV Channel Header */}
                    <div className="flex justify-between items-center text-xs font-bold drop-shadow">
                      <span className="bg-black/40 px-3 py-1 rounded-full uppercase tracking-wider">
                        CH: {tvChannel.toUpperCase()}
                      </span>
                      <span className="bg-black/40 px-3 py-1 rounded-full">
                        🔊 VOL: {tvVolume}%
                      </span>
                    </div>

                    {/* Animated Scene Content */}
                    <div className="flex flex-col items-center justify-center my-auto text-center">
                      {tvChannel === 'cartoons' && (
                        <>
                          <div className="text-7xl animate-bounce">🦁 🐘 🐒</div>
                          <h4 className="text-xl sm:text-2xl font-black mt-3 font-display drop-shadow-md">
                            {lang === 'kn' ? 'ಕಾಡಿನ ಪ್ರಾಣಿಗಳ ಮೋಜು!' : 'Jungle Animals TV Adventure!'}
                          </h4>
                          <p className="text-xs sm:text-sm opacity-90 font-kannada">
                            {lang === 'kn' ? 'ಪ್ರಾಣಿಗಳು ಒಟ್ಟಿಗೆ ಹಾಡುತ್ತಿವೆ!' : 'Singing happy jungle tunes!'}
                          </p>
                        </>
                      )}
                      {tvChannel === 'rhymes' && (
                        <>
                          <div className="text-7xl animate-pulse">🎵 🌟 🌈</div>
                          <h4 className="text-xl sm:text-2xl font-black mt-3 font-display drop-shadow-md">
                            {lang === 'kn' ? 'ಮಕ್ಕಳ ಗೀತೆಗಳ ಸಮಯ' : 'Melodious Nursery Rhymes'}
                          </h4>
                          <p className="text-xs sm:text-sm opacity-90 font-kannada">
                            {lang === 'kn' ? 'ಟ್ಯಾಪ್ ಟ್ಯಾಪ್ ಆನ್ ದ ಸ್ಕ್ರೀನ್...' : 'Tap, tap on the phone, music bright!'}
                          </p>
                        </>
                      )}
                      {tvChannel === 'science' && (
                        <>
                          <div className="text-7xl animate-spin">🪐 🚀 ☀️</div>
                          <h4 className="text-xl sm:text-2xl font-black mt-3 font-display drop-shadow-md">
                            {lang === 'kn' ? 'ಗ್ರಹಗಳ ಲೋಕ (ವಿಜ್ಞಾನ)' : 'Solar System & Space Exploration'}
                          </h4>
                          <p className="text-xs sm:text-sm opacity-90 font-kannada">
                            {lang === 'kn' ? 'ಭೂಮಿ ಮತ್ತು ಸೌರಮಂಡಲದ ಪಾಠ' : 'Learning planetary science for kids!'}
                          </p>
                        </>
                      )}
                      {tvChannel === 'news' && (
                        <>
                          <div className="text-7xl">📰 🎙️ 🌍</div>
                          <h4 className="text-xl sm:text-2xl font-black mt-3 font-display drop-shadow-md">
                            {lang === 'kn' ? 'ಶಾಲಾ ಮಕ್ಕಳ ಸಮಾಚಾರ' : 'Kids School News & Weather'}
                          </h4>
                          <p className="text-xs sm:text-sm opacity-90 font-kannada">
                            {lang === 'kn' ? 'ಇಂದಿನ ಹವಾಮಾನ: ಪ್ರಕಾಶಮಾನ ಬಿಸಿಲು 28°C' : 'Today Weather: Sunny 28°C'}
                          </p>
                        </>
                      )}
                    </div>

                    <div className="text-center text-[11px] opacity-75 font-kannada">
                      {lang === 'kn' ? 'ರಿಮೋಟ್ ಬಳಸಿ ಚಾನೆಲ್ ಹಾಗೂ ವಾಲ್ಯೂಮ್ ಬದಲಾಯಿಸಿ' : 'Use remote to switch channels & volume'}
                    </div>
                  </div>
                ) : (
                  <div className="text-center p-6 text-slate-500">
                    <div className="text-5xl mb-2 opacity-30">📺</div>
                    <div className="text-sm font-bold">
                      {isSwitchboardOn
                        ? (lang === 'kn' ? 'ಟಿ.ವಿ ಆಫ್ ಆಗಿದೆ. ರಿಮೋಟ್‌ನ ಕೆಂಪು ಬಟನ್ ಒತ್ತಿ!' : 'TV is on Standby. Press RED Power button on remote!')
                        : (lang === 'kn' ? 'ವಿದ್ಯುತ್ ಸಂಪರ್ಕವಿಲ್ಲ. ಸ್ವಿಚ್ ಆನ್ ಮಾಡಿ.' : 'No Power. Turn ON switchboard first.')}
                    </div>
                  </div>
                )}
              </div>

              {/* TV Stand Base */}
              <div className="w-24 h-4 bg-slate-800 mx-auto mt-2 rounded-b-md" />
              <div className="w-40 h-2 bg-slate-700 mx-auto rounded-full" />
            </div>

            {/* Switchboard Controller */}
            <div className="mt-5 w-full bg-amber-50 rounded-2xl p-4 border-2 border-amber-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="text-xs font-black uppercase text-amber-800">
                  {lang === 'kn' ? 'ಹಂತ 1: ಸ್ವಿಚ್ ಬೋರ್ಡ್ (Switchboard)' : 'Step 1: Wall Switchboard'}
                </div>
                <div className="text-xs text-slate-600 mt-0.5">
                  {lang === 'kn' ? 'ಪ್ಲಗ್ ಸೇರಿಸಿ ನಂತರ ಸ್ವಿಚ್ ಆನ್ ಮಾಡಿ' : 'Insert plug and flip the power switch'}
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={togglePlug}
                  className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                    isPluggedIn ? 'bg-emerald-600 text-white' : 'bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  🔌 {isPluggedIn ? (lang === 'kn' ? 'ಪ್ಲಗ್ ಸೇರಿಸಲಾಗಿದೆ' : 'Plugged IN') : (lang === 'kn' ? 'ಪ್ಲಗ್ ಸೇರಿಸಿ' : 'Plug IN')}
                </button>

                <button
                  onClick={toggleSwitch}
                  className={`px-4 py-2 rounded-xl text-xs font-black shadow transition-all ${
                    isSwitchboardOn ? 'bg-amber-500 text-white' : 'bg-slate-300 text-slate-700 hover:bg-slate-400'
                  }`}
                >
                  🔘 {isSwitchboardOn ? (lang === 'kn' ? 'ಸ್ವಿಚ್: ಆನ್ (ON)' : 'Switch: ON') : (lang === 'kn' ? 'ಸ್ವಿಚ್: ಆಫ್ (OFF)' : 'Switch: OFF')}
                </button>
              </div>
            </div>
          </div>

          {/* Right: Realistic Handheld Remote Control */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="w-56 bg-slate-800 text-white p-4 rounded-3xl shadow-2xl border-4 border-slate-600 flex flex-col items-center gap-3">
              <div className="text-[11px] font-black uppercase tracking-widest text-slate-400">
                DIGI REMOTE
              </div>

              {/* Power Button (Red) */}
              <button
                onClick={toggleRemotePower}
                className="w-12 h-12 rounded-full bg-rose-600 hover:bg-rose-500 active:scale-95 text-white flex items-center justify-center font-black text-xl shadow-lg ring-4 ring-rose-900 transition-transform"
                title="Red Power Button"
              >
                ⏻
              </button>
              <div className="text-[10px] text-rose-300 font-bold">
                {lang === 'kn' ? 'ಹಂತ 2: ಕೆಂಪು ಬಟನ್' : 'Step 2: Red Power'}
              </div>

              {/* Channel Selector */}
              <div className="w-full bg-slate-900/80 p-3 rounded-2xl flex flex-col gap-2 mt-2">
                <div className="text-[10px] font-bold text-center text-slate-400">
                  {lang === 'kn' ? 'ಚಾನೆಲ್ ಆಯ್ಕೆ (Channels):' : 'Channel Select:'}
                </div>
                <div className="grid grid-cols-2 gap-1.5 text-xs">
                  <button
                    disabled={!isTVPowerOn}
                    onClick={() => { setTvChannel('cartoons'); playSound('pop'); }}
                    className={`p-2 rounded-xl font-bold transition-all ${
                      tvChannel === 'cartoons' && isTVPowerOn ? 'bg-sky-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30'
                    }`}
                  >
                    🦁 Cartoons
                  </button>
                  <button
                    disabled={!isTVPowerOn}
                    onClick={() => { setTvChannel('rhymes'); playSound('pop'); }}
                    className={`p-2 rounded-xl font-bold transition-all ${
                      tvChannel === 'rhymes' && isTVPowerOn ? 'bg-pink-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30'
                    }`}
                  >
                    🎵 Rhymes
                  </button>
                  <button
                    disabled={!isTVPowerOn}
                    onClick={() => { setTvChannel('science'); playSound('pop'); }}
                    className={`p-2 rounded-xl font-bold transition-all ${
                      tvChannel === 'science' && isTVPowerOn ? 'bg-indigo-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30'
                    }`}
                  >
                    🚀 Science
                  </button>
                  <button
                    disabled={!isTVPowerOn}
                    onClick={() => { setTvChannel('news'); playSound('pop'); }}
                    className={`p-2 rounded-xl font-bold transition-all ${
                      tvChannel === 'news' && isTVPowerOn ? 'bg-emerald-500 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700 disabled:opacity-30'
                    }`}
                  >
                    📰 News
                  </button>
                </div>
              </div>

              {/* Volume Adjust */}
              <div className="w-full flex items-center justify-between px-2 pt-1">
                <button
                  disabled={!isTVPowerOn}
                  onClick={() => {
                    setTvVolume(v => Math.max(0, v - 10));
                    playSound('click');
                  }}
                  className="w-10 h-10 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-30 font-bold"
                >
                  VOL-
                </button>
                <span className="text-xs font-mono">{tvVolume}</span>
                <button
                  disabled={!isTVPowerOn}
                  onClick={() => {
                    setTvVolume(v => Math.min(100, v + 10));
                    playSound('click');
                  }}
                  className="w-10 h-10 rounded-xl bg-slate-700 hover:bg-slate-600 disabled:opacity-30 font-bold"
                >
                  VOL+
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* SMARTPHONE SIMULATION WITH POWER BUTTON & TOUCH APPS */
        <div className="mt-6 flex flex-col items-center max-w-sm mx-auto">
          {/* Smartphone Frame */}
          <div className="relative w-72 h-[520px] bg-slate-900 rounded-[44px] p-3 shadow-2xl border-4 border-slate-700 flex flex-col items-center">
            {/* Top Speaker & Camera Notch */}
            <div className="w-24 h-5 bg-black rounded-full flex items-center justify-center gap-2 mb-2 z-20">
              <div className="w-2.5 h-2.5 rounded-full bg-slate-800 border border-slate-700" />
              <div className="w-8 h-1 rounded-full bg-slate-800" />
            </div>

            {/* Side Power Button */}
            <button
              onClick={handlePhonePowerHold}
              className="absolute -right-3 top-24 w-3 h-14 bg-amber-500 hover:bg-amber-400 rounded-r-md cursor-pointer shadow-md transition-colors"
              title="Power Button (Click to Turn ON/OFF)"
            />

            {/* Side Volume Buttons */}
            <div className="absolute -left-3 top-20 w-3 h-10 bg-slate-600 rounded-l-md" />
            <div className="absolute -left-3 top-34 w-3 h-10 bg-slate-600 rounded-l-md" />

            {/* Screen Area */}
            <div className="w-full flex-1 bg-black rounded-[34px] overflow-hidden relative flex flex-col justify-between p-4">
              {isPhonePowerOn ? (
                phoneScreenLocked ? (
                  /* Lock Screen */
                  <div
                    onClick={handleUnlock}
                    className="w-full h-full flex flex-col items-center justify-between text-white cursor-pointer bg-gradient-to-b from-sky-600 via-indigo-700 to-slate-900 p-4"
                  >
                    <div className="text-center pt-8">
                      <div className="text-4xl font-light">10:30</div>
                      <div className="text-xs text-sky-200 mt-1">Monday, 28 April</div>
                    </div>

                    <div className="flex flex-col items-center gap-2 animate-bounce">
                      <span className="text-3xl">👆</span>
                      <div className="text-xs font-bold text-sky-100 font-kannada">
                        {lang === 'kn' ? 'ತೆರೆಯಲು ಪರದೆಯನ್ನು ಮುಟ್ಟಿ' : 'Swipe / Tap to Unlock'}
                      </div>
                    </div>

                    <div className="text-[10px] text-sky-300">Class 1 & 2 Learning Phone</div>
                  </div>
                ) : (
                  /* Home Screen with App Icons */
                  <div className="w-full h-full flex flex-col justify-between text-white bg-gradient-to-br from-violet-600 to-indigo-900 p-3 rounded-2xl">
                    {/* Status Bar */}
                    <div className="flex justify-between items-center text-[10px] text-white/80">
                      <span>10:30</span>
                      <span className="flex items-center gap-1">5G 📶 🔋 98%</span>
                    </div>

                    {/* Active App or App Grid */}
                    {activeApp === 'home' ? (
                      <div className="grid grid-cols-3 gap-3 my-auto">
                        <button
                          onClick={() => { setActiveApp('camera'); playSound('camera'); }}
                          className="flex flex-col items-center gap-1 p-2 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"
                        >
                          <span className="text-3xl">📷</span>
                          <span className="text-[10px] font-bold">{lang === 'kn' ? 'ಕ್ಯಾಮೆರಾ' : 'Camera'}</span>
                        </button>

                        <button
                          onClick={() => { setActiveApp('music'); playSound('pop'); }}
                          className="flex flex-col items-center gap-1 p-2 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"
                        >
                          <span className="text-3xl">🎵</span>
                          <span className="text-[10px] font-bold">{lang === 'kn' ? 'ಸಂಗೀತ' : 'Music'}</span>
                        </button>

                        <button
                          onClick={() => { setActiveApp('gallery'); playSound('pop'); }}
                          className="flex flex-col items-center gap-1 p-2 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"
                        >
                          <span className="text-3xl">🖼️</span>
                          <span className="text-[10px] font-bold">{lang === 'kn' ? 'ಗ್ಯಾಲರಿ' : 'Photos'}</span>
                        </button>

                        <button
                          onClick={() => { setActiveApp('games'); playSound('pop'); }}
                          className="flex flex-col items-center gap-1 p-2 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"
                        >
                          <span className="text-3xl">🎮</span>
                          <span className="text-[10px] font-bold">{lang === 'kn' ? 'ಆಟಗಳು' : 'Games'}</span>
                        </button>

                        <button
                          onClick={() => {
                            playSound('pop');
                            speakText(lang === 'kn' ? 'ಹೇ ಗೂಗಲ್! ನಮಸ್ಕಾರ!' : 'Hey Google! Voice search is ready!', lang);
                          }}
                          className="flex flex-col items-center gap-1 p-2 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"
                        >
                          <span className="text-3xl">🎙️</span>
                          <span className="text-[10px] font-bold">{lang === 'kn' ? 'ವಾಯ್ಸ್' : 'Voice'}</span>
                        </button>

                        <button
                          onClick={() => {
                            playSound('pop');
                            speakText(lang === 'kn' ? 'ಸಮಯ 10:30, ಬಿಸಿಲಿನ ವಾತಾವರಣ!' : 'Current time 10:30, Sunny weather!', lang);
                          }}
                          className="flex flex-col items-center gap-1 p-2 bg-white/10 hover:bg-white/20 rounded-2xl transition-all"
                        >
                          <span className="text-3xl">⏰</span>
                          <span className="text-[10px] font-bold">{lang === 'kn' ? 'ಗಡಿಯಾರ' : 'Clock'}</span>
                        </button>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center my-auto p-4 bg-white/10 rounded-2xl text-center">
                        <div className="text-5xl mb-2">
                          {activeApp === 'camera' && '📸'}
                          {activeApp === 'music' && '🎧'}
                          {activeApp === 'gallery' && '🌅'}
                          {activeApp === 'games' && '🕹️'}
                        </div>
                        <div className="text-sm font-bold uppercase">{activeApp} APP</div>
                        <p className="text-xs opacity-80 mt-1 font-kannada">
                          {lang === 'kn' ? 'ಅಪ್ಲಿಕೇಶನ್ ಯಶಸ್ವಿಯಾಗಿ ತೆರೆದಿದೆ!' : 'Application launched! Tap home button to return.'}
                        </p>
                      </div>
                    )}

                    {/* Bottom Nav bar */}
                    <div className="flex justify-center pt-2">
                      <button
                        onClick={() => { setActiveApp('home'); playSound('pop'); }}
                        className="w-10 h-10 rounded-full bg-white/20 hover:bg-white/40 flex items-center justify-center text-xs font-bold"
                        title="Home"
                      >
                        ●
                      </button>
                    </div>
                  </div>
                )
              ) : (
                /* Phone Power OFF Screen */
                <div className="w-full h-full flex flex-col items-center justify-center text-slate-600 p-4 text-center">
                  <div className="text-4xl mb-2 opacity-20">📱</div>
                  <div className="text-xs font-bold text-slate-400 font-kannada">
                    {lang === 'kn'
                      ? 'ಫೋನ್ ಆಫ್ ಆಗಿದೆ. ಬಲಭಾಗದಲ್ಲಿರುವ ಹಳದಿ ಪವರ್ ಬಟನ್ ಕ್ಲಿಕ್ ಮಾಡಿ!'
                      : 'Phone is OFF. Click the yellow Power button on the right edge!'}
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-4 text-xs font-bold text-purple-900 bg-purple-50 px-4 py-2 rounded-2xl border border-purple-200 text-center">
            {lang === 'kn'
              ? '💡 ಬಲಭಾಗದಲ್ಲಿರುವ ಹಳದಿ ಪವರ್ ಬಟನ್ ಒತ್ತಿ ಹಿಡಿದು ಫೋನ್ ಆನ್ ಮಾಡಿ!'
              : '💡 Click the golden power button on the right edge to turn ON!'}
          </div>
        </div>
      )}
    </div>
  );
};
