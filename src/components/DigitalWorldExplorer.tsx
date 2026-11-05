import React, { useState } from 'react';
import { playSound, speakText } from '../utils/audio';

interface DeviceItem {
  id: string;
  nameKn: string;
  nameEn: string;
  category: 'digital' | 'nondigital';
  icon: string;
  descKn: string;
  descEn: string;
  usesKn: string;
  usesEn: string;
  purpose: 'learning' | 'communication' | 'entertainment' | 'utility';
  place: 'home' | 'school' | 'shop' | 'bank' | 'road';
}

const ALL_DEVICES: DeviceItem[] = [
  // Digital Devices
  {
    id: 'phone',
    nameKn: 'ಸ್ಮಾರ್ಟ್‌ಫೋನ್ (Mobile Phone)',
    nameEn: 'Mobile Phone',
    category: 'digital',
    icon: '📱',
    descKn: 'ಮಾಹಿತಿ ಸಂಗ್ರಹಿಸುವ, ಪರದೆಯ ಮೇಲೆ ತೋರಿಸುವ ಬ್ಯಾಟರಿ ಚಾಲಿತ ಸಾಧನ.',
    descEn: 'A battery-powered digital device that stores information, talks to people, and displays on a screen.',
    usesKn: 'ದೂರದಲ್ಲಿರುವವರೊಂದಿಗೆ ಮಾತನಾಡಲು, ವೀಡಿಯೊ ಕರೆ ಹಾಗೂ ಆನ್‌ಲೈನ್ ಕಲಿಕೆಗೆ.',
    usesEn: 'Calling people far away, video calls, learning, and mobile games.',
    purpose: 'communication',
    place: 'home'
  },
  {
    id: 'computer',
    nameKn: 'ಕಂಪ್ಯೂಟರ್ / ಲ್ಯಾಪ್‌ಟಾಪ್ (Computer)',
    nameEn: 'Computer / Laptop',
    category: 'digital',
    icon: '💻',
    descKn: 'ಹೊಸ ವಿಷಯ ಕಲಿಯಲು, ಚಿತ್ರ ಬಿಡಿಸಲು ಮತ್ತು ಮಾಹಿತಿ ಸಂಗ್ರಹಿಸಲು ಬಳಸುವ ಯಂತ್ರ.',
    descEn: 'Used to learn new things, draw pictures, type words, and store files.',
    usesKn: 'ಶಾಲೆಯಲ್ಲಿ ಪಾಠ ಕಲಿಯಲು, ಟೈಪ್ ಮಾಡಲು ಮತ್ತು ಆಟವಾಡಲು.',
    usesEn: 'School lessons, typing practice, drawing in Tux Paint, and playing learning games.',
    purpose: 'learning',
    place: 'school'
  },
  {
    id: 'tv',
    nameKn: 'ಸ್ಮಾರ್ಟ್ ಟಿ.ವಿ (Smart TV)',
    nameEn: 'Smart TV',
    category: 'digital',
    icon: '📺',
    descKn: 'ದೊಡ್ಡ ಪರದೆಯ ಮೇಲೆ ಕಾರ್ಟೂನ್, ವಾರ್ತೆ ಹಾಗೂ ಶೈಕ್ಷಣಿಕ ಪಾಠಗಳನ್ನು ವೀಕ್ಷಿಸಬಹುದು.',
    descEn: 'Displays cartoons, news, and classroom educational videos on big screen.',
    usesKn: 'ಕಾರ್ಟೂನ್ ನೋಡಲು ಮತ್ತು ಶಾಲಾ ಪಾಠ ವೀಕ್ಷಿಸಲು.',
    usesEn: 'Watching cartoons, educational programs, and listening to rhymes.',
    purpose: 'entertainment',
    place: 'home'
  },
  {
    id: 'smartwatch',
    nameKn: 'ಸ್ಮಾರ್ಟ್ ವಾಚ್ (Smart Watch)',
    nameEn: 'Smart Watch',
    category: 'digital',
    icon: '⌚',
    descKn: 'ಸಮಯ, ದಿನಾಂಕ ನೋಡಲು, ಹವಾಮಾನ ತಿಳಿಯಲು ಮತ್ತು ಹೆಜ್ಜೆಗಳನ್ನು ಎಣಿಸಲು.',
    descEn: 'Worn on wrist to check time, count walking steps, and monitor health.',
    usesKn: 'ಸಮಯ ನೋಡಲು, ಹೆಜ್ಜೆಗಳನ್ನು ಎಣಿಸಲು.',
    usesEn: 'Telling time, counting footsteps, checking heartbeat.',
    purpose: 'learning',
    place: 'home'
  },
  {
    id: 'calculator',
    nameKn: 'ಕ್ಯಾಲ್ಕುಲೇಟರ್ (Calculator)',
    nameEn: 'Digital Calculator',
    category: 'digital',
    icon: '🔢',
    descKn: 'ಬೇಗ-ಬೇಗ ಲೆಕ್ಕಗಳನ್ನು (ಕೂಡುವುದು, ಕಳೆಯುವುದು) ಮಾಡಲು ಬಳಸುವ ಡಿಜಿಟಲ್ ಸಾಧನ.',
    descEn: 'Used to perform mathematics calculations fast and accurately.',
    usesKn: 'ಲೆಕ್ಕಗಳನ್ನು ವೇಗವಾಗಿ ಮಾಡಲು.',
    usesEn: 'Doing fast math addition, subtraction, and counting.',
    purpose: 'learning',
    place: 'shop'
  },
  {
    id: 'camera',
    nameKn: 'ಡಿಜಿಟಲ್ ಕ್ಯಾಮೆರಾ (Digital Camera)',
    nameEn: 'Digital Camera',
    category: 'digital',
    icon: '📸',
    descKn: 'ಸುಂದರ ಚಿತ್ರಗಳನ್ನು ಸೆರೆಹಿಡಿಯಲು ಮತ್ತು ವೀಡಿಯೊ ರೆಕಾರ್ಡ್ ಮಾಡಲು.',
    descEn: 'Captures and stores photos and videos digitally.',
    usesKn: 'ಭಾವಚಿತ್ರಗಳನ್ನು ಸೆರೆಹಿಡಿದು ಸಂಗ್ರಹಿಸಲು.',
    usesEn: 'Taking memories, photos of school events, and videos.',
    purpose: 'entertainment',
    place: 'home'
  },
  {
    id: 'atm',
    nameKn: 'ಬ್ಯಾಂಕ್ ಎಟಿಎಂ (ATM Machine)',
    nameEn: 'Bank ATM',
    category: 'digital',
    icon: '🏧',
    descKn: 'ಬ್ಯಾಂಕ್‌ನಲ್ಲಿ ಹಣ ಹಿಂಪಡೆಯಲು ಬಳಸುವ ಸ್ವಯಂಚಾಲಿತ ಡಿಜಿಟಲ್ ಯಂತ್ರ.',
    descEn: 'Automated teller machine in banks for safely withdrawing money.',
    usesKn: 'ಯಾವುದೇ ಸಮಯದಲ್ಲಿ ಸುಲಭವಾಗಿ ಹಣ ಪಡೆಯಲು.',
    usesEn: 'Withdrawing cash quickly using digital bank card.',
    purpose: 'utility',
    place: 'bank'
  },
  {
    id: 'qr',
    nameKn: 'ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನರ್ (Shop UPI)',
    nameEn: 'Shop QR Payment',
    category: 'digital',
    icon: '📲',
    descKn: 'ಅಂಗಡಿಗಳಲ್ಲಿ ನಗದು ಇಲ್ಲದೆ ಮೊಬೈಲ್ ಮೂಲಕ ಸುರಕ್ಷಿತವಾಗಿ ಹಣ ಪಾವತಿ ಮಾಡಲು.',
    descEn: 'Scanned using smartphone camera to make payments in grocery shops.',
    usesKn: 'ಅಂಗಡಿಯಲ್ಲಿ ಹಣ ಪಾವತಿ ಮಾಡಲು.',
    usesEn: 'Paying for groceries and books at shops.',
    purpose: 'utility',
    place: 'shop'
  },

  // Non-Digital Devices
  {
    id: 'book',
    nameKn: 'ಪುಸ್ತಕ (Book)',
    nameEn: 'Book',
    category: 'nondigital',
    icon: '📖',
    descKn: 'ಕಾಗದದಿಂದ ಮಾಡಿದ ಪುಟಗಳು. ಬ್ಯಾಟರಿ ಅಥವಾ ವಿದ್ಯುತ್ ಅಗತ್ಯವಿಲ್ಲ.',
    descEn: 'Made of paper sheets. Doesn\'t require battery or electricity to read.',
    usesKn: 'ಓದಲು ಹಾಗೂ ಕಥೆಗಳನ್ನು ತಿಳಿಯಲು.',
    usesEn: 'Reading stories and classroom lessons.',
    purpose: 'learning',
    place: 'school'
  },
  {
    id: 'fan',
    nameKn: 'ಕೈ ಬೀಸಣಿಗೆ (Hand Fan)',
    nameEn: 'Hand Fan',
    category: 'nondigital',
    icon: '🪭',
    descKn: 'ಕೈಯಿಂದ ಬೀಸಿ ಗಾಳಿ ಪಡೆಯುವ ಸಾಂಪ್ರದಾಯಿಕ ಸಾಧನ. ಸ್ಕ್ರೀನ್ ಇರುವುದಿಲ್ಲ.',
    descEn: 'Traditional hand-waved fan with no screen or chips.',
    usesKn: 'ಕೈಯಿಂದ ಬೀಸಿ ಗಾಳಿ ಪಡೆಯಲು.',
    usesEn: 'Providing breeze by waving with hand.',
    purpose: 'utility',
    place: 'home'
  },
  {
    id: 'clock',
    nameKn: 'ಗೋಡೆ ಗಡಿಯಾರ (Wall Clock)',
    nameEn: 'Analog Wall Clock',
    category: 'nondigital',
    icon: '⏰',
    descKn: 'ಮುಳ್ಳುಗಳಿರುವ ಗಡಿಯಾರ. ಡಿಜಿಟಲ್ ಸ್ಕ್ರೀನ್ ಇರುವುದಿಲ್ಲ.',
    descEn: 'Clock with rotating mechanical hands, not a digital touchscreen.',
    usesKn: 'ಮುಳ್ಳುಗಳನ್ನು ನೋಡಿ ಸಮಯ ತಿಳಿಯಲು.',
    usesEn: 'Seeing time using mechanical minute and hour hands.',
    purpose: 'utility',
    place: 'home'
  },
  {
    id: 'bicycle',
    nameKn: 'ಸೈಕಲ್ (Bicycle)',
    nameEn: 'Bicycle',
    category: 'nondigital',
    icon: '🚲',
    descKn: 'ಪೆಡಲ್ ತುಳಿದು ಚಲಿಸುವ ವಾಹನ. ಸ್ಮಾರ್ಟ್ ಸಾಫ್ಟ್‌ವೇರ್ ಇಲ್ಲ.',
    descEn: 'Pedal-driven two-wheeler vehicle with mechanical gears and chain.',
    usesKn: 'ಶಾಲೆಗೆ ಅಥವಾ ಅಂಗಡಿಗೆ ಸವಾರಿ ಮಾಡಲು.',
    usesEn: 'Riding to school, outdoor exercise, and eco-friendly travel.',
    purpose: 'utility',
    place: 'road'
  },
  {
    id: 'typewriter',
    nameKn: 'ಟೈಪ್‌ರೈಟರ್ (Typewriter)',
    nameEn: 'Mechanical Typewriter',
    category: 'nondigital',
    icon: '⌨️',
    descKn: 'ಯಾಂತ್ರಿಕ ಕೀಗಳು ಕಾಗದದ ಮೇಲೆ ಅಕ್ಷರಗಳನ್ನು ಮುದ್ರಿಸುತ್ತವೆ. ಕಂಪ್ಯೂಟರ್‌ನಂತೆ ಸ್ಕ್ರೀನ್ ಇಲ್ಲ.',
    descEn: 'Mechanical keyboard that stamps ink directly on paper, no screen.',
    usesKn: 'ಕಾಗದದ ಮೇಲೆ ನೇರವಾಗಿ ಅಕ್ಷರ ಮುದ್ರಿಸಲು.',
    usesEn: 'Typing letters directly onto paper using ink ribbon.',
    purpose: 'learning',
    place: 'school'
  },
  {
    id: 'hammer',
    nameKn: 'ಸುತ್ತಿಗೆ (Hammer)',
    nameEn: 'Hammer',
    category: 'nondigital',
    icon: '🔨',
    descKn: 'ಮೊಳೆ ಬಡಿಯಲು ಬಳಸುವ ಕಬ್ಬಿಣದ ಯಾಂತ್ರಿಕ ಸಾಧನ.',
    descEn: 'Manual tool used for pounding nails, made of iron and wood.',
    usesKn: 'ಮೊಳೆ ಹೊಡೆಯಲು.',
    usesEn: 'Fixing wooden frames and driving nails.',
    purpose: 'utility',
    place: 'home'
  }
];

export const DigitalWorldExplorer: React.FC<{ lang: 'kn' | 'en' }> = ({ lang }) => {
  const [filter, setFilter] = useState<'all' | 'digital' | 'nondigital'>('all');
  const [selectedDevice, setSelectedDevice] = useState<DeviceItem>(ALL_DEVICES[0]);
  const [activeTab, setActiveTab] = useState<'catalog' | 'sortingGame'>('catalog');

  // Sorting game state
  const [score, setScore] = useState(0);
  const [gameItems, setGameItems] = useState<DeviceItem[]>(() => [...ALL_DEVICES].sort(() => Math.random() - 0.5));
  const [currentIdx, setCurrentIdx] = useState(0);
  const [feedback, setFeedback] = useState<{ msgKn: string; msgEn: string; status: 'correct' | 'wrong' | null }>({
    msgKn: '',
    msgEn: '',
    status: null
  });

  const filteredDevices = filter === 'all'
    ? ALL_DEVICES
    : ALL_DEVICES.filter(d => d.category === filter);

  const handleSelectDevice = (dev: DeviceItem) => {
    setSelectedDevice(dev);
    playSound('pop');
    speakText(
      lang === 'kn' ? `${dev.nameKn}. ${dev.descKn}. ಉಪಯೋಗ: ${dev.usesKn}` : `${dev.nameEn}. ${dev.descEn}. Use: ${dev.usesEn}`,
      lang
    );
  };

  const handleSortAnswer = (chosenCategory: 'digital' | 'nondigital') => {
    const current = gameItems[currentIdx];
    if (!current) return;

    if (current.category === chosenCategory) {
      playSound('correct');
      setScore(s => s + 10);
      setFeedback({
        msgKn: `ಸರಿಯಾದ ಉತ್ತರ! 🎉 ${current.nameKn} ಒಂದು ${chosenCategory === 'digital' ? 'ಡಿಜಿಟಲ್ ಸಾಧನ' : 'ಡಿಜಿಟಲ್ ಅಲ್ಲದ ಸಾಧನ'}.`,
        msgEn: `Correct! 🎉 ${current.nameEn} is indeed a ${chosenCategory === 'digital' ? 'Digital Device' : 'Non-Digital Device'}.`,
        status: 'correct'
      });
      speakText(
        lang === 'kn' ? 'ಸರಿಯಾದ ಉತ್ತರ! ಭೇಷ್!' : 'Super! Correct answer!',
        lang
      );
    } else {
      playSound('wrong');
      setFeedback({
        msgKn: `ತಪ್ಪು! ${current.nameKn} ಒಂದು ${current.category === 'digital' ? 'ಡಿಜಿಟಲ್ ಸಾಧನ' : 'ಡಿಜಿಟಲ್ ಅಲ್ಲದ ಸಾಧನ'}.`,
        msgEn: `Oops! ${current.nameEn} is actually a ${current.category === 'digital' ? 'Digital Device' : 'Non-Digital Device'}.`,
        status: 'wrong'
      });
    }

    setTimeout(() => {
      setFeedback({ msgKn: '', msgEn: '', status: null });
      if (currentIdx + 1 < gameItems.length) {
        setCurrentIdx(i => i + 1);
      } else {
        // Shuffle & restart
        playSound('fanfare');
        setGameItems([...ALL_DEVICES].sort(() => Math.random() - 0.5));
        setCurrentIdx(0);
      }
    }, 1800);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border-4 border-amber-200">
      {/* Tab Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-4 pb-6 border-b border-amber-100">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-amber-400 to-orange-500 flex items-center justify-center text-white text-2xl shadow-md">
            🐝
          </div>
          <div>
            <h2 className="text-xl sm:text-2xl font-black text-slate-800 font-display">
              {lang === 'kn' ? 'ಚಿನ್ನು ಮತ್ತು ಜೇನು - ಡಿಜಿಟಲ್ ಪ್ರಪಂಚ' : 'Chinnu & Bee - Digital World'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500">
              {lang === 'kn' ? 'ಡಿಜಿಟಲ್ ಮತ್ತು ಡಿಜಿಟಲ್ ಅಲ್ಲದ ಸಾಧನಗಳನ್ನು ಗುರುತಿಸಿ' : 'Explore & Differentiate Digital vs Non-Digital Devices'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 bg-amber-50 p-1.5 rounded-2xl border border-amber-200">
          <button
            onClick={() => {
              setActiveTab('catalog');
              playSound('pop');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'catalog'
                ? 'bg-amber-500 text-white shadow-md'
                : 'text-amber-800 hover:bg-amber-100'
            }`}
          >
            {lang === 'kn' ? 'ಸಾಧನಗಳ ಕೋಷ್ಟಕ' : 'Device Explorer'}
          </button>
          <button
            onClick={() => {
              setActiveTab('sortingGame');
              playSound('pop');
            }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'sortingGame'
                ? 'bg-emerald-500 text-white shadow-md'
                : 'text-emerald-800 hover:bg-emerald-100'
            }`}
          >
            {lang === 'kn' ? '🎮 ವರ್ಗೀಕರಣ ಆಟ' : '🎮 Sorting Game'}
          </button>
        </div>
      </div>

      {activeTab === 'catalog' ? (
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Device Selection & Category Filter */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Filter buttons */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => { setFilter('all'); playSound('click'); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filter === 'all' ? 'bg-slate-800 text-white shadow' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {lang === 'kn' ? 'ಎಲ್ಲಾ ಸಾಧನಗಳು' : 'All Devices'} ({ALL_DEVICES.length})
              </button>
              <button
                onClick={() => { setFilter('digital'); playSound('click'); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filter === 'digital' ? 'bg-sky-600 text-white shadow' : 'bg-sky-50 text-sky-800 hover:bg-sky-100'
                }`}
              >
                📱 {lang === 'kn' ? 'ಡಿಜಿಟಲ್ ಸಾಧನಗಳು' : 'Digital Devices'}
              </button>
              <button
                onClick={() => { setFilter('nondigital'); playSound('click'); }}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  filter === 'nondigital' ? 'bg-amber-600 text-white shadow' : 'bg-amber-50 text-amber-800 hover:bg-amber-100'
                }`}
              >
                📖 {lang === 'kn' ? 'ಡಿಜಿಟಲ್ ಅಲ್ಲದ ಸಾಧನಗಳು' : 'Non-Digital'}
              </button>
            </div>

            {/* Grid of Devices */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[460px] overflow-y-auto pr-1">
              {filteredDevices.map(dev => {
                const isSelected = selectedDevice.id === dev.id;
                return (
                  <button
                    key={dev.id}
                    onClick={() => handleSelectDevice(dev)}
                    className={`p-3 rounded-2xl border-2 text-left transition-all flex flex-col items-center gap-2 ${
                      isSelected
                        ? 'border-sky-500 bg-sky-50/80 shadow-md ring-2 ring-sky-300 scale-102'
                        : 'border-slate-200 hover:border-slate-300 bg-slate-50/60 hover:bg-slate-50'
                    }`}
                  >
                    <span className="text-4xl">{dev.icon}</span>
                    <div className="text-center w-full">
                      <div className="text-xs font-extrabold text-slate-800 truncate">
                        {lang === 'kn' ? dev.nameKn.split(' ')[0] : dev.nameEn}
                      </div>
                      <span className={`inline-block mt-1 text-[10px] font-bold px-2 py-0.5 rounded-full ${
                        dev.category === 'digital' ? 'bg-sky-100 text-sky-700' : 'bg-amber-100 text-amber-800'
                      }`}>
                        {dev.category === 'digital' ? (lang === 'kn' ? 'ಡಿಜಿಟಲ್' : 'Digital') : (lang === 'kn' ? 'ಡಿಜಿಟಲ್ ಅಲ್ಲ' : 'Non-Digital')}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Detailed Card with Speech & Purpose */}
          <div className="lg:col-span-5 bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 border-2 border-amber-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between">
                <span className={`text-xs font-black uppercase px-3 py-1 rounded-full ${
                  selectedDevice.category === 'digital' ? 'bg-sky-500 text-white' : 'bg-amber-500 text-white'
                }`}>
                  {selectedDevice.category === 'digital'
                    ? (lang === 'kn' ? 'ಡಿಜಿಟಲ್ ಸಾಧನ' : 'Digital Device')
                    : (lang === 'kn' ? 'ಡಿಜಿಟಲ್ ಅಲ್ಲದ ಸಾಧನ' : 'Non-Digital Device')}
                </span>

                <button
                  onClick={() => {
                    speakText(
                      lang === 'kn'
                        ? `${selectedDevice.nameKn}. ${selectedDevice.descKn}. ಉಪಯೋಗ: ${selectedDevice.usesKn}`
                        : `${selectedDevice.nameEn}. ${selectedDevice.descEn}. Main use: ${selectedDevice.usesEn}`,
                      lang
                    );
                  }}
                  className="p-2 rounded-xl bg-white shadow hover:bg-amber-100 text-amber-800 transition-colors"
                  title="Voice Guide"
                >
                  🔊
                </button>
              </div>

              <div className="mt-4 flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-3xl bg-white shadow-inner flex items-center justify-center text-6xl border border-amber-100 mb-3">
                  {selectedDevice.icon}
                </div>
                <h3 className="text-xl font-black text-slate-800 font-display">
                  {lang === 'kn' ? selectedDevice.nameKn : selectedDevice.nameEn}
                </h3>
              </div>

              <div className="mt-4 flex flex-col gap-3">
                <div className="bg-white/80 p-3 rounded-2xl border border-amber-100">
                  <div className="text-xs font-bold text-amber-900 mb-1">
                    {lang === 'kn' ? '📖 ವಿವರಣೆ (Description):' : '📖 Description:'}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-kannada leading-relaxed">
                    {lang === 'kn' ? selectedDevice.descKn : selectedDevice.descEn}
                  </p>
                </div>

                <div className="bg-white/80 p-3 rounded-2xl border border-amber-100">
                  <div className="text-xs font-bold text-amber-900 mb-1">
                    {lang === 'kn' ? '🎯 ಮುಖ್ಯ ಉಪಯೋಗ (Use in daily life):' : '🎯 Daily Use:'}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-700 font-kannada leading-relaxed">
                    {lang === 'kn' ? selectedDevice.usesKn : selectedDevice.usesEn}
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between text-xs text-amber-900 font-bold">
              <span>{lang === 'kn' ? `ಬಳಕೆಯ ಸ್ಥಳ: ${selectedDevice.place}` : `Found at: ${selectedDevice.place}`}</span>
              <span>{lang === 'kn' ? `ಉದ್ದೇಶ: ${selectedDevice.purpose}` : `Purpose: ${selectedDevice.purpose}`}</span>
            </div>
          </div>
        </div>
      ) : (
        /* Interactive Sorting Game from Textbook (Class 1 Page 11 & Class 2 Page 2) */
        <div className="mt-6 flex flex-col items-center max-w-xl mx-auto">
          {/* Score & Progress */}
          <div className="w-full flex items-center justify-between mb-4 bg-emerald-50 px-4 py-2.5 rounded-2xl border border-emerald-200">
            <div className="text-xs sm:text-sm font-black text-emerald-800">
              {lang === 'kn' ? `ಪ್ರಶ್ನೆ ${currentIdx + 1} / ${gameItems.length}` : `Question ${currentIdx + 1} of ${gameItems.length}`}
            </div>
            <div className="text-sm font-black text-emerald-700 bg-white px-3 py-1 rounded-xl shadow-sm">
              ⭐ {lang === 'kn' ? `ಅಂಕ: ${score}` : `Score: ${score}`}
            </div>
          </div>

          {/* Current Flashcard */}
          {gameItems[currentIdx] && (
            <div className="w-full bg-gradient-to-b from-slate-50 to-amber-50/50 rounded-3xl p-6 border-4 border-amber-300 shadow-xl flex flex-col items-center text-center">
              <span className="text-7xl mb-3 animate-pulse">{gameItems[currentIdx].icon}</span>
              <h3 className="text-2xl font-black text-slate-900 font-display">
                {lang === 'kn' ? gameItems[currentIdx].nameKn : gameItems[currentIdx].nameEn}
              </h3>
              <p className="text-sm text-slate-600 mt-2 font-kannada">
                {lang === 'kn'
                  ? 'ಇದು ಡಿಜಿಟಲ್ ಸಾಧನವೋ ಅಥವಾ ಡಿಜಿಟಲ್ ಅಲ್ಲದ ಸಾಧನವೋ?'
                  : 'Is this a Digital Device or Non-Digital Item?'}
              </p>

              {/* Feedback toast */}
              {feedback.status && (
                <div className={`mt-4 p-3 rounded-2xl text-xs sm:text-sm font-bold w-full transition-all ${
                  feedback.status === 'correct' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
                }`}>
                  {lang === 'kn' ? feedback.msgKn : feedback.msgEn}
                </div>
              )}

              {/* Action Buttons */}
              <div className="grid grid-cols-2 gap-4 w-full mt-6">
                <button
                  disabled={feedback.status !== null}
                  onClick={() => handleSortAnswer('digital')}
                  className="p-4 rounded-2xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white font-black text-sm sm:text-base shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  <div className="text-2xl mb-1">🟢 📱</div>
                  <div>{lang === 'kn' ? 'ಡಿಜಿಟಲ್ ಸಾಧನ' : 'Digital Device'}</div>
                  <div className="text-[10px] font-normal opacity-90">{lang === 'kn' ? '(ಹಸಿರು ಬಣ್ಣ)' : '(Screen / Battery)'}</div>
                </button>

                <button
                  disabled={feedback.status !== null}
                  onClick={() => handleSortAnswer('nondigital')}
                  className="p-4 rounded-2xl bg-gradient-to-r from-amber-500 to-yellow-600 hover:from-amber-600 hover:to-yellow-700 text-white font-black text-sm sm:text-base shadow-lg transition-transform hover:scale-105 active:scale-95 disabled:opacity-50"
                >
                  <div className="text-2xl mb-1">🟡 📖</div>
                  <div>{lang === 'kn' ? 'ಡಿಜಿಟಲ್ ಅಲ್ಲದ ಸಾಧನ' : 'Non-Digital Device'}</div>
                  <div className="text-[10px] font-normal opacity-90">{lang === 'kn' ? '(ಹಳದಿ ಬಣ್ಣ)' : '(No screen/battery)'}</div>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
