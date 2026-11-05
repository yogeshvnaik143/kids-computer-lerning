// Textbook Curriculum content for Grade 1 and Grade 2 (Kannada & English)
// Directly structured from the Karnataka School Education Department "Digi Pravesha" Textbooks

export interface LessonContent {
  id: string;
  grade: 1 | 2;
  lessonNum: number;
  titleKn: string;
  titleEn: string;
  subtitleKn: string;
  subtitleEn: string;
  character: string; // 'Ganu' | 'Chinnu & Jenu' | 'Putti & Robot' | 'Kittu' | 'Safe Sham' | 'Robo Raju'
  themeColor: string;
  descriptionKn: string;
  descriptionEn: string;
  learningOutcomesKn: string[];
  learningOutcomesEn: string[];
  interactiveMode: 'devices' | 'safety' | 'stepbystep' | 'tvremote' | 'smartactions' | '3dlab' | 'mouse' | 'tuxpaint' | 'keyboard' | 'patterns';
}

export const LESSONS: LessonContent[] = [
  // GRADE 1
  {
    id: 'g1-l1',
    grade: 1,
    lessonNum: 1,
    titleKn: 'ಡಿಜಿಟಲ್ ಪ್ರಪಂಚ',
    titleEn: 'Digital World',
    subtitleKn: 'ಸಾಮಾನ್ಯ ಡಿಜಿಟಲ್ ಸಾಧನಗಳು ಹಾಗೂ ಯಂತ್ರಗಳ ಪರಿಚಯ',
    subtitleEn: 'Introduction to Machines & Digital Devices',
    character: 'ಚಿನ್ನು ಮತ್ತು ಜೇನು (Chinnu & Bee)',
    themeColor: 'from-amber-400 to-orange-500',
    descriptionKn: 'ಕೆಲಸವನ್ನು ಸುಲಭ ಹಾಗೂ ಕಡಿಮೆ ಸಮಯದಲ್ಲಿ ಪೂರ್ಣಗೊಳಿಸುವ ಸಾಧನಗಳಿಗೆ ಯಂತ್ರಗಳು ಎನ್ನುವರು.',
    descriptionEn: 'Devices that take less effort and time are called machines. Mobile, TV and computers are digital devices.',
    learningOutcomesKn: [
      'ಮನೆ ಮತ್ತು ಶಾಲೆಯಲ್ಲಿ ಬಳಸಬಹುದಾದ ಡಿಜಿಟಲ್ ಸಾಧನಗಳ ಗುರುತಿಸುವಿಕೆ (ಮೊಬೈಲ್, ಟಿ.ವಿ, ಕಂಪ್ಯೂಟರ್)',
      'ದೈನಂದಿನ ಜೀವನದಲ್ಲಿ ಸಾಧನಗಳ ಮೂಲ ಉಪಯೋಗಗಳು (ಕರೆ, ವೀಕ್ಷಣೆ, ಕಲಿಕೆ)',
      'ಡಿಜಿಟಲ್ ಮತ್ತು ಡಿಜಿಟಲ್ ಅಲ್ಲದ ಸಾಧನಗಳ ನಡುವಿನ ವ್ಯತ್ಯಾಸ'
    ],
    learningOutcomesEn: [
      'Recognise common digital devices at home & school (mobile phones, TVs, computers)',
      'Match digital devices to daily uses (calling, watching, learning)',
      'Differentiate between digital and non-digital items'
    ],
    interactiveMode: 'devices'
  },
  {
    id: 'g1-l2',
    grade: 1,
    lessonNum: 2,
    titleKn: 'ನನ್ನ ಸುರಕ್ಷತೆ - ನನ್ನ ಜವಾಬ್ದಾರಿ',
    titleEn: 'My Safety - My Responsibility',
    subtitleKn: 'ಕಂಪ್ಯೂಟರ್ ಅಜ್ಜ ಮತ್ತು ಲ್ಯಾಪ್‌ಟಾಪ್ ಅಣ್ಣನ ಸುರಕ್ಷತಾ ನಿಯಮಗಳು',
    subtitleEn: 'Computer Grandpa & Laptop Brother Safety Rules',
    character: 'ಕಂಪ್ಯೂಟರ್ ಅಜ್ಜ (Computer Grandpa)',
    themeColor: 'from-emerald-400 to-teal-600',
    descriptionKn: 'ಒದ್ದೆ ಕೈಗಳಿಂದ ಸಾಧನ ಮುಟ್ಟಬೇಡಿ! ನೀರು ಹಾಗೂ ಆಹಾರದಿಂದ ದೂರವಿಡಿ. ನೇರವಾಗಿ ಕುಳಿತುಕೊಳ್ಳಿ.',
    descriptionEn: 'Never touch switches with wet hands! Keep water away. Sit with back straight and safe distance.',
    learningOutcomesKn: [
      'ಡಿಜಿಟಲ್ ಸಾಧನ ಬಳಸುವಾಗ ಮೂಲ ಸುರಕ್ಷತಾ ನಿಯಮಗಳು',
      'ಕುಳಿತುಕೊಳ್ಳುವ ಸರಿಯಾದ ದೈಹಿಕ ಭಂಗಿ (Posture)',
      'ಅಪಾಯಕಾರಿ ಸನ್ನಿವೇಶಗಳನ್ನು ಗುರುತಿಸಿ ಹಿರಿಯರಿಗೆ ತಿಳಿಸುವುದು'
    ],
    learningOutcomesEn: [
      'Follow basic electrical and digital safety rules',
      'Understand proper sitting postures and safe viewing distance',
      'Recognize hazards and inform elders immediately'
    ],
    interactiveMode: 'safety'
  },
  {
    id: 'g1-l3',
    grade: 1,
    lessonNum: 3,
    titleKn: 'ಪುಟ್ಟಿ ಮತ್ತು ರೋಬೋಟ್',
    titleEn: 'Putti and Robot',
    subtitleKn: 'ಹಂತ ಹಂತವಾಗಿ ಯೋಚಿಸುವುದು (ಗಣನಾತ್ಮಕ ಆಲೋಚನೆ)',
    subtitleEn: 'Thinking Step by Step (Algorithmic Thinking)',
    character: 'ಪುಟ್ಟಿ ಮತ್ತು ರೋಬೋಟ್ (Putti & Robot)',
    themeColor: 'from-blue-400 to-indigo-600',
    descriptionKn: 'ರೋಬೋಟ್ ಮತ್ತು ಡಿಜಿಟಲ್ ಸಾಧನಗಳು ನಾವು ನೀಡುವ ಸರಿಯಾದ ಹಂತ-ಹಂತದ ಸೂಚನೆಗಳನ್ನು ಮಾತ್ರ ಪಾಲಿಸುತ್ತವೆ!',
    descriptionEn: 'Digital devices follow the exact step-by-step instructions given by us!',
    learningOutcomesKn: [
      'ದಿನನಿತ್ಯದ ಕೆಲಸಗಳಲ್ಲಿ ಹಂತ ಹಂತದ ಕ್ರಮ ಅನುಸರಿಸುವುದು (ಕೈ ತೊಳೆಯುವುದು, ಸಸಿ ನೆಡುವುದು, ಬ್ಯಾಗ್ ಜೋಡಿಸುವುದು)',
      'ಆಕಾರಗಳಿಂದ ಮನೆ ಬಿಡಿಸುವ ಹಂತಗಳು',
      'ಡಿಜಿಟಲ್ ಸಾಧನಗಳು ಸೂಚನೆಗಳ ಪ್ರಕಾರ ಕೆಲಸ ಮಾಡುತ್ತವೆ ಎಂದು ಅರಿಯುವುದು'
    ],
    learningOutcomesEn: [
      'Follow relevant step-by-step instructions for everyday tasks',
      'Create step-by-step drawings with shapes (House drawing)',
      'Recognize that computers follow instructions in sequence'
    ],
    interactiveMode: 'stepbystep'
  },
  {
    id: 'g1-l4',
    grade: 1,
    lessonNum: 4,
    titleKn: 'ಡಿಜಿಟಲ್ ಗೆಳೆಯರು',
    titleEn: 'Digital Friends',
    subtitleKn: 'ಟಿ.ವಿ ಹಾಗೂ ಮೊಬೈಲ್ ಫೋನ್ ಆನ್ ಮಾಡುವ ಹಂತಗಳು',
    subtitleEn: 'Turning ON TV & Smartphone Steps',
    character: 'ಕಿಟ್ಟು ಮತ್ತು ಅಕ್ಕ (Kittu & Sister)',
    themeColor: 'from-purple-400 to-pink-500',
    descriptionKn: 'ಸ್ವಿಚ್ ಬೋರ್ಡ್, ರಿಮೋಟ್ ಕೆಂಪು ಬಟನ್, ಮೊಬೈಲ್ ಪವರ್ ಬಟನ್ ಹಾಗೂ ಆ್ಯಪ್ ಐಕಾನ್ ಪರಿಚಯ.',
    descriptionEn: 'Learn to turn ON the TV and smartphone properly using power button and remote control.',
    learningOutcomesKn: [
      'ಟಿ.ವಿ ಆನ್ ಮಾಡಲು ಸ್ವಿಚ್ ಹಾಗೂ ರಿಮೋಟ್ ಕೆಂಪು ಬಟನ್ ಒತ್ತುವುದು',
      'ಸ್ಮಾರ್ಟ್‌ಫೋನ್ ಪವರ್ ಬಟನ್ ಹಾಗೂ ವಾಲ್ಯೂಮ್ ಬಟನ್ ಗುರುತಿಸುವುದು',
      'ಹೋಮ್ ಸ್ಕ್ರೀನ್ ಹಾಗೂ ಅಪ್ಲಿಕೇಶನ್ ಐಕಾನ್‌ಗಳ ಬಳಕೆ'
    ],
    learningOutcomesEn: [
      'Turn on TV using switchboard and remote control red button',
      'Locate smartphone power button, volume keys, and screen',
      'Open applications using touch icons'
    ],
    interactiveMode: 'tvremote'
  },
  {
    id: 'g1-l5',
    grade: 1,
    lessonNum: 5,
    titleKn: 'ಸ್ಪರ್ಶ – ಧ್ವನಿ – ಆಯ್ಕೆ',
    titleEn: 'Touch – Sound – Choice',
    subtitleKn: 'ಸ್ಮಾರ್ಟ್ ಸಾಧನಗಳು ಹೇಗೆ ಪ್ರತಿಕ್ರಿಯಿಸುತ್ತವೆ?',
    subtitleEn: 'How Smart Devices Respond to Us',
    character: 'ಜೇನು ನೊಣ (Jenu Bee)',
    themeColor: 'from-amber-500 to-red-500',
    descriptionKn: 'ಟಚ್ ಮಾಡಿದಾಗ ಸ್ಕ್ರೀನ್ ತೆರೆಯುತ್ತದೆ, ಧ್ವನಿ ನೀಡಿದಾಗ ಹಾಡು ಪ್ಲೇ ಮಾಡುತ್ತದೆ, ಆಯ್ಕೆ ಮಾಡಿದಾಗ ಚಾನೆಲ್ ಬದಲಾಯಿಸುತ್ತದೆ.',
    descriptionEn: 'Smart devices respond to Touch (finger tap), Voice (speech), and Choice (selection)!',
    learningOutcomesKn: [
      'ಸ್ಪರ್ಶ (Touch): ಪರದೆಯನ್ನು ಮುಟ್ಟಿ ಆ್ಯಪ್ ತೆರೆಯುವುದು, ಜೂಮ್ ಮಾಡುವುದು',
      'ಧ್ವನಿ (Sound): ವಾಯ್ಸ್ ಕಮಾಂಡ್ ಮೂಲಕ ಹಾಡು, ಮಾಹಿತಿ ಹುಡುಕುವುದು (ಗೂಗಲ್ ವಾಯ್ಸ್, ಸ್ಮಾರ್ಟ್ ಸ್ಪೀಕರ್)',
      'ಆಯ್ಕೆ (Choice): ರಿಮೋಟ್ ಅಥವಾ ಪರದೆಯಲ್ಲಿ ಬೇಕಾದ ಚಿತ್ರ/ಹಾಡು ಆರಿಸುವುದು'
    ],
    learningOutcomesEn: [
      'Touch: Tap to open apps, scroll, and draw',
      'Sound: Use voice search and voice commands on smart speakers',
      'Choice: Select favorite video, game, or color'
    ],
    interactiveMode: 'smartactions'
  },
  {
    id: 'g1-l6',
    grade: 1,
    lessonNum: 6,
    titleKn: 'ನಮ್ಮ ಗೆಳೆಯ ಗಣಕ',
    titleEn: 'Our Friend Ganaka (Computer)',
    subtitleKn: 'ಕಂಪ್ಯೂಟರ್ ಭಾಗಗಳು ಹಾಗೂ ಆನ್-ಆಫ್ ಮಾಡುವ ಹಂತಗಳು',
    subtitleEn: 'Parts of Computer & Safe Start/Shut Down',
    character: 'ಗಣು (Ganu the Computer)',
    themeColor: 'from-cyan-500 to-blue-600',
    descriptionKn: 'ಮಾನಿಟರ್, ಸಿಪಿಯು, ಕೀಬೋರ್ಡ್, ಮೌಸ್, ಸ್ಪೀಕರ್, ಪ್ರಿಂಟರ್, ಯುಪಿಎಸ್ ಹಾಗೂ ಲ್ಯಾಪ್ಟಾಪ್ ಪರಿಚಯ.',
    descriptionEn: 'Meet Monitor, CPU, Keyboard, Mouse, Speaker, Printer, UPS, and Laptop!',
    learningOutcomesKn: [
      'ಕಂಪ್ಯೂಟರ್‌ನ ಮುಖ್ಯ ಭಾಗಗಳು ಮತ್ತು ಅವುಗಳ ಕಾರ್ಯಗಳು (ಮಾನಿಟರ್, ಸಿಪಿಯು, ಕೀಬೋರ್ಡ್, ಮೌಸ್, ಯುಪಿಎಸ್)',
      'ಡೆಸ್ಕ್‌ಟಾಪ್ ಹಾಗೂ ಲ್ಯಾಪ್ಟಾಪ್ ನಡುವಿನ ವ್ಯತ್ಯಾಸ',
      'ಕಂಪ್ಯೂಟರ್ ಆನ್ ಹಾಗೂ ಸರಿಯಾಗಿ ಶಟ್ ಡೌನ್ (Shut Down) ಮಾಡುವ ಹಂತಗಳು'
    ],
    learningOutcomesEn: [
      'Identify computer parts (Monitor, CPU, Keyboard, Mouse, Speaker, UPS, Printer)',
      'Understand how a Laptop has all parts built-in',
      'Master turning ON and safely Shutting Down the computer step-by-step'
    ],
    interactiveMode: '3dlab'
  },
  {
    id: 'g1-l7',
    grade: 1,
    lessonNum: 7,
    titleKn: 'ಕ್ಲಿಕ್ ಕ್ಲಿಕ್ ಮೌಸ್',
    titleEn: 'Click Click Mouse',
    subtitleKn: 'ಮೌಸ್ ಹಿಡಿಯುವುದು, ಲೆಫ್ಟ್ ಕ್ಲಿಕ್, ರೈಟ್ ಕ್ಲಿಕ್ ಹಾಗೂ ಡ್ರ್ಯಾಗ್ & ಡ್ರಾಪ್',
    subtitleEn: 'Holding Mouse, Left Click, Right Click & Drag-Drop',
    character: 'ಕಿಟ್ಟಿ ಮೌಸ್ (Kitty Mouse)',
    themeColor: 'from-pink-500 to-rose-600',
    descriptionKn: 'ಮೌಸ್ ಪ್ಯಾಡ್ ಮೇಲೆ ಮೌಸ್ ಓಡಿಸಿದರೆ ಮಾನಿಟರ್ ಮೇಲೆ ಪಾಯಿಂಟರ್ ಓಡುತ್ತದೆ! ಕ್ಲಿಕ್, ಡಬಲ್ ಕ್ಲಿಕ್, ಡ್ರ್ಯಾಗ್ & ಡ್ರಾಪ್ ಕಲಿಯಿರಿ.',
    descriptionEn: 'Move mouse on the pad and the pointer runs on screen! Learn single click, double click, and drag & drop.',
    learningOutcomesKn: [
      'ಮೌಸ್ ಸರಿಯಾಗಿ ಹಿಡಿಯುವ ವಿಧಾನ (ಬಲಗೈ ಅಂಗೈ, ಮೊದಲ ಬೆರಳು ಎಡ ಬಟನ್)',
      'ಎಡ ಬಟನ್ (ಆಯ್ಕೆ & ಡಬಲ್ ಕ್ಲಿಕ್), ಬಲ ಬಟನ್ (ಆಯ್ಕೆ ಪಟ್ಟಿ), ಸ್ಕ್ರೋಲ್ ಚಕ್ರ',
      'ಡ್ರ್ಯಾಗ್ & ಡ್ರಾಪ್ ಮೂಲಕ ವಸ್ತುಗಳನ್ನು ಸರಿಯಾದ ಜಾಗಕ್ಕೆ ಸಾಗಿಸುವುದು'
    ],
    learningOutcomesEn: [
      'Proper way to hold the mouse with gentle fingers',
      'Left button (select/open), Right button (menu), Scroll wheel',
      'Drag and Drop technique to move objects across the screen'
    ],
    interactiveMode: 'mouse'
  },

  // GRADE 2
  {
    id: 'g2-l1',
    grade: 2,
    lessonNum: 1,
    titleKn: 'ನನ್ನ ಗ್ಯಾಜೆಟ್ ಗೆಳೆಯರು',
    titleEn: 'My Gadget Friends',
    subtitleKn: 'ಕಲಿಕೆ, ಸಂವಹನ ಮತ್ತು ಮನರಂಜನೆ - ವಿವಿಧ ಸ್ಥಳಗಳಲ್ಲಿ ಡಿಜಿಟಲ್ ಸಾಧನಗಳು',
    subtitleEn: 'Learning, Communication & Entertainment Everywhere',
    character: 'ಅಮೃತ ಮತ್ತು ಶ್ಯಾಮ್ (Amrutha & Sham)',
    themeColor: 'from-indigo-500 to-purple-600',
    descriptionKn: 'ಬ್ಯಾಂಕ್‌ನಲ್ಲಿ ಎಟಿಎಂ, ಅಂಗಡಿಯಲ್ಲಿ ಕ್ಯೂಆರ್ ಕೋಡ್, ಟೋಲ್ ಪ್ಲಾಜಾದಲ್ಲಿ ಫಾಸ್ಟ್ಯಾಗ್, ಪಂಚಾಯತ್‌ನಲ್ಲಿ ಕಂಪ್ಯೂಟರ್.',
    descriptionEn: 'Digital devices in daily life: Bank ATM, Shop QR code payment, Toll FASTag, Gram Panchayat!',
    learningOutcomesKn: [
      'ಡಿಜಿಟಲ್ ಸಾಧನಗಳ ಮೂರು ಮುಖ್ಯ ಉಪಯೋಗಗಳು: ಕಲಿಕೆ, ಸಂವಹನ, ಮನರಂಜನೆ',
      'ವಿವಿಧ ಸ್ಥಳಗಳಲ್ಲಿ ಸಾಧನಗಳ ಬಳಕೆ: ಅಂಗಡಿ (UPI), ಬ್ಯಾಂಕ್ (ATM), ಟೋಲ್ (FASTag)',
      'ಡಿಜಿಟಲ್ ಸಾಧನಗಳು ಚಿತ್ರ, ಹಾಡು, ವೀಡಿಯೊ ಹಾಗೂ ದಾಖಲೆಗಳನ್ನು ಸಂಗ್ರಹಿಸುತ್ತವೆ (Store Information)'
    ],
    learningOutcomesEn: [
      'Three main uses: Learning, Communication, and Entertainment',
      'Real world digital devices: ATM in Bank, QR Code in Shop, FASTag at Toll',
      'Devices store information: Photos, Songs, Videos, and Files'
    ],
    interactiveMode: 'devices'
  },
  {
    id: 'g2-l2',
    grade: 2,
    lessonNum: 2,
    titleKn: 'ಸಾಧನಗಳೊಂದಿಗೆ ಸುರಕ್ಷಿತವಾಗಿರಿ!',
    titleEn: 'Be Safe with Devices!',
    subtitleKn: 'ಸೇಫ್ ಶಾಮ್ ಜೊತೆ ಒಂದು ದಿನ - ವಿದ್ಯುತ್ ಹಾಗೂ ಆನ್‌ಲೈನ್ ಸುರಕ್ಷತೆ',
    subtitleEn: 'A Day with Safe Sham - Electrical & Online Safety',
    character: 'ಸೇಫ್ ಶಾಮ್ (Safe Sham)',
    themeColor: 'from-teal-500 to-emerald-600',
    descriptionKn: 'ಚಾರ್ಜಿಂಗ್ ಹಾಕಿಕೊಂಡು ಫೋನ್ ಬಳಸಬೇಡಿ! ಕತ್ತಲೆಯಲ್ಲಿ ನೋಡಬೇಡಿ. ಹಿರಿಯರ ಅನುಮತಿಯಿಲ್ಲದೆ ಡೌನ್‌ಲೋಡ್ ಅಥವಾ ಪಾವತಿ ಮಾಡಬೇಡಿ.',
    descriptionEn: 'Never use phone while charging! Ask parents before downloading games or clicking unknown links.',
    learningOutcomesKn: [
      'ಒಣಗಿದ ಕೈಗಳಿಂದ ಸ್ವಿಚ್ ಹಾಕುವುದು, ಚಾರ್ಜಿಂಗ್ ವೇಳೆ ಫೋನ್ ಬಳಸದಿರುವುದು',
      'ಟಿವಿಯಿಂದ ದೂರ ಕುಳಿತುಕೊಳ್ಳುವುದು, ಕತ್ತಲಿನಲ್ಲಿ ಹೆಚ್ಚು ಹೊತ್ತು ಸ್ಕ್ರೀನ್ ನೋಡದಿರುವುದು',
      'ಹಿರಿಯರ ಅನುಮತಿಯಿಲ್ಲದೆ ಆನ್‌ಲೈನ್ ಪಾವತಿ (Online Payment) ಅಥವಾ ಡೌನ್‌ಲೋಡ್ ಮಾಡದಿರುವುದು'
    ],
    learningOutcomesEn: [
      'Electrical safety: use dry hands, unplug charger properly',
      'Screen health: do not watch very close or in the dark',
      'Online safety: never make online payments or download games without parents'
    ],
    interactiveMode: 'safety'
  },
  {
    id: 'g2-l3',
    grade: 2,
    lessonNum: 3,
    titleKn: 'ಡಿಜಿಟಲ್ ಸಂವಹನ (ಕೊಡು - ಪಡೆ)',
    titleEn: 'Digital Communication (Give - Get / IPO)',
    subtitleKn: 'ಇನ್‌ಪುಟ್ - ಪ್ರಕ್ರಿಯೆ - ಔಟ್‌ಪುಟ್ (Input - Process - Output)',
    subtitleEn: 'Input - Process - Output (The IPO Cycle)',
    character: 'ಮೆದುಳು ಮತ್ತು ಯಂತ್ರ (Brain & Machine)',
    themeColor: 'from-amber-500 to-yellow-600',
    descriptionKn: 'ಗೋಧಿ (ಇನ್‌ಪುಟ್) → ಯಂತ್ರ (ಪ್ರಕ್ರಿಯೆ) → ಹಿಟ್ಟು (ಔಟ್‌ಪುಟ್)! ಕಂಪ್ಯೂಟರ್ ಕೂಡ ಹೀಗೆಯೇ ಕೆಲಸ ಮಾಡುತ್ತದೆ.',
    descriptionEn: 'Wheat (Input) → Grinding (Process) → Flour (Output)! Understand the computer IPO cycle.',
    learningOutcomesKn: [
      'ಇನ್‌ಪುಟ್ ಸಾಧನಗಳು: ಕೀಬೋರ್ಡ್, ಮೌಸ್, ಮೈಕ್ರೋಫೋನ್, ಸ್ಕ್ಯಾನರ್ (ಕಂಪ್ಯೂಟರ್‌ಗೆ ಮಾಹಿತಿ ನೀಡುತ್ತವೆ)',
      'ಪ್ರಕ್ರಿಯೆ (Process): ಸಿ.ಪಿ.ಯು (CPU) ಮಾಹಿತಿ ಸಂಸ್ಕರಿಸುತ್ತದೆ',
      'ಔಟ್‌ಪುಟ್ ಸಾಧನಗಳು: ಮಾನಿಟರ್, ಪ್ರಿಂಟರ್, ಸ್ಪೀಕರ್, ಪ್ರೊಜೆಕ್ಟರ್ (ಫಲಿತಾಂಶ ತೋರಿಸುತ್ತವೆ)'
    ],
    learningOutcomesEn: [
      'Input devices give information: Keyboard, Mouse, Microphone, Scanner',
      'Processing: CPU acts as the brain and works on the data',
      'Output devices show results: Monitor, Printer, Speaker, Projector'
    ],
    interactiveMode: 'stepbystep'
  },
  {
    id: 'g2-l4',
    grade: 2,
    lessonNum: 4,
    titleKn: 'ಕ್ಲಿಕ್ ಕ್ಲಿಕ್, ಟೈಪ್ ಮತ್ತು ಚಿತ್ರ',
    titleEn: 'Click Click, Type and Draw',
    subtitleKn: 'ಟಕ್ಸ್ ಪೇಂಟ್ (Tux Paint) ಮತ್ತು ಕೀಬೋ ಆಟ (Kibo the Keyboard)',
    subtitleEn: 'Tux Paint Art Studio & Kibo Keyboard Adventure',
    character: 'ಕೀಬೋ (Kibo the Keyboard & Tux Penguin)',
    themeColor: 'from-sky-500 to-blue-700',
    descriptionKn: 'ಕೀಬೋರ್ಡ್ ಕಂಪ್ಯೂಟರ್‌ಗೆ ಪೆನ್ಸಿಲ್ ಇದ್ದಂತೆ! ಟಕ್ಸ್ ಪೇಂಟ್‌ನಲ್ಲಿ ಬಣ್ಣ ತುಂಬಿ, ಕೀಬೋರ್ಡ್‌ನಲ್ಲಿ ಅಕ್ಷರ ಟೈಪ್ ಮಾಡಿ.',
    descriptionEn: 'The keyboard is like a pencil for computer! Draw in Tux Paint and type simple words with Kibo.',
    learningOutcomesKn: [
      'ಕೀಬೋರ್ಡ್ ಕೀಗಳು: ವರ್ಣಮಾಲೆ ಕೀ (A-Z), ಸಂಖ್ಯೆ ಕೀ (0-9), ಸ್ಪೇಸ್ ಬಾರ್, ಎಂಟರ್, ಬ್ಯಾಕ್‌ಸ್ಪೇಸ್',
      'ಟಕ್ಸ್ ಪೇಂಟ್ ಹಂತಗಳು: ಪೇಂಟ್ ಬ್ರಷ್, ಬಣ್ಣ ಆಯ್ಕೆ, ರೇಖೆ ಬಿಡಿಸುವುದು, ಸೇವ್ (Save), ಕ್ಲೋಸ್',
      'ಸರಳ ಪದಗಳನ್ನು ಟೈಪ್ ಮಾಡುವುದು (CAT, DOG, SUN, BUS, BAT)'
    ],
    learningOutcomesEn: [
      'Keyboard keys: Alphabet keys (A-Z), Number keys (0-9), Spacebar, Enter, Backspace',
      'Tux Paint tools: Brush, color palette, canvas drawing, Save, and Quit',
      'Type short vocabulary words and press Enter'
    ],
    interactiveMode: 'tuxpaint'
  },
  {
    id: 'g2-l5',
    grade: 2,
    lessonNum: 5,
    titleKn: 'ಹಲೋ ಸ್ಮಾರ್ಟ್ ಜಗತ್ತು!',
    titleEn: 'Hello Smart World!',
    subtitleKn: 'ಸ್ಪರ್ಶ, ಧ್ವನಿ, ಮುಖ ಮತ್ತು ಆಯ್ಕೆಗೆ ಸಾಧನಗಳ ಪ್ರತಿಕ್ರಿಯೆ',
    subtitleEn: 'How Devices Respond to Touch, Voice, Face & Choice',
    character: 'ರಾಜು ರೋಬೋಟ್ (Raju the Robot)',
    themeColor: 'from-violet-500 to-purple-700',
    descriptionKn: 'ಸ್ಮಾರ್ಟ್ ಕ್ಯಾಮೆರಾ ಮುಖ ನೋಡಿ ಅನ್‌ಲಾಕ್ ಮಾಡುತ್ತದೆ, ವಾಚ್ ಹೆಜ್ಜೆಗಳನ್ನು ಎಣಿಸುತ್ತದೆ, ಗೂಗಲ್ ಧ್ವನಿಗೆ ಹಾಡು ಪ್ಲೇ ಮಾಡುತ್ತದೆ.',
    descriptionEn: 'Smart camera recognizes faces, smart watch counts your steps, and voice assistant plays music on voice command.',
    learningOutcomesKn: [
      'ಸ್ಪರ್ಶ (Touch): ಟ್ಯಾಬ್ಲೆಟ್, ಮೊಬೈಲ್ ಪರದೆ',
      'ಧ್ವನಿ (Voice): ವಾಯ್ಸ್ ಅಸಿಸ್ಟೆಂಟ್ (Hey Google, play a song)',
      'ಮುಖ (Face Detection): ಕ್ಯಾಮೆರಾ ಮುಖ ಗುರುತಿಸುವಿಕೆ',
      'ಆಯ್ಕೆ (Choice): ಸ್ಮಾರ್ಟ್ ಟಿವಿಯಲ್ಲಿ ಇಷ್ಟದ ಕಾರ್ಟೂನ್ ಆರಿಸುವುದು'
    ],
    learningOutcomesEn: [
      'Touch interaction: Mobile & tablet gestures',
      'Voice recognition: Smart speakers & voice commands',
      'Face recognition: Smart cameras opening or unlocking',
      'Choice selection: Remote or screen selection'
    ],
    interactiveMode: 'smartactions'
  },
  {
    id: 'g2-l6',
    grade: 2,
    lessonNum: 6,
    titleKn: 'ಕ್ಲ್ಯಾಪ್... ಟ್ಯಾಪ್... ವಿನ್ಯಾಸ ಮತ್ತು ಹಂತ',
    titleEn: 'Clap... Tap... Patterns & Sequences',
    subtitleKn: 'ಕ್ರಮ ಬದಲಾದರೆ ಫಲಿತಾಂಶ ಬದಲಾಗುತ್ತದೆ!',
    subtitleEn: 'Patterns, Sequences & Algorithmic Order',
    character: 'ರೋಬೋ ರಾಜು (Robo Raju)',
    themeColor: 'from-orange-500 to-amber-600',
    descriptionKn: 'ವಸ್ತು, ಚಿತ್ರ ಅಥವಾ ಆಕಾರ ಪುನರಾವರ್ತನೆಯಾಗುವುದೇ ವಿನಾಾಸ (Pattern). ಕ್ರಮ ತಪ್ಪಿದರೆ ಕೆಲಸ ತಪ್ಪಾಗುತ್ತದೆ!',
    descriptionEn: 'Repetition of shape, color, or sound is a Pattern. If the order changes, the result changes!',
    learningOutcomesKn: [
      'ವಿನಾಾಸ (Patterns): ಬಣ್ಣದ ಚೆಂಡು, ಆಕಾರಗಳು (ತ್ರಿಕೋನ, ಚೌಕ, ವೃತ್ತ), ಶಬ್ದಗಳ ಪುನರಾವರ್ತನೆ',
      'ಅನುಕ್ರಮ (Sequences): ದಿನನಿತ್ಯದ ಕೆಲಸಗಳಲ್ಲಿ ಕ್ರಮ (ಬ್ರಷ್ ಮಾಡುವುದು, ಶಾಲೆಗೆ ಸಿದ್ಧವಾಗುವುದು)',
      'ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲಿ ಸರಿಯಾದ ಕ್ರಮ: ಕಂಪ್ಯೂಟರ್ ಆನ್ → ಆ್ಯಪ್ ಕ್ಲಿಕ್ → ಚಿತ್ರ ಬಿಡಿಸುವುದು → ಸೇವ್ ಮಾಡುವುದು'
    ],
    learningOutcomesEn: [
      'Patterns: Repeating sequences of colors, shapes, and sounds',
      'Sequences: Daily habits step-by-step (teeth brushing, lunch eating)',
      'Correct order for computer tasks: Turn ON -> Open App -> Draw -> Save'
    ],
    interactiveMode: 'patterns'
  }
];

// Interactive Quiz items for Class 1 & 2
export interface QuizItem {
  id: string;
  grade: 1 | 2;
  questionKn: string;
  questionEn: string;
  imagePrompt?: string;
  options: {
    labelKn: string;
    labelEn: string;
    icon: string;
    isCorrect: boolean;
  }[];
  explanationKn: string;
  explanationEn: string;
}

export const QUIZ_ITEMS: QuizItem[] = [
  {
    id: 'q1',
    grade: 1,
    questionKn: 'ಇವುಗಳಲ್ಲಿ ಯಾವುದು ಡಿಜಿಟಲ್ ಸಾಧನ?',
    questionEn: 'Which of the following is a DIGITAL device?',
    options: [
      { labelKn: 'ಪುಸ್ತಕ', labelEn: 'Book', icon: '📖', isCorrect: false },
      { labelKn: 'ಸ್ಮಾರ್ಟ್‌ಫೋನ್', labelEn: 'Smartphone', icon: '📱', isCorrect: true },
      { labelKn: 'ಛತ್ರಿ', labelEn: 'Umbrella', icon: '☂️', isCorrect: false },
      { labelKn: 'ಸೈಕಲ್', labelEn: 'Bicycle', icon: '🚲', isCorrect: false }
    ],
    explanationKn: 'ಮೊಬೈಲ್ ಫೋನ್ ವಿದ್ಯುತ್ ಅಥವಾ ಬ್ಯಾಟರಿಯಿಂದ ಕೆಲಸ ಮಾಡುವ ಡಿಜಿಟಲ್ ಸಾಧನ!',
    explanationEn: 'Smartphone runs on battery and electricity, storing digital info!'
  },
  {
    id: 'q2',
    grade: 1,
    questionKn: 'ಒದ್ದೆ ಕೈಗಳಿಂದ ಕಂಪ್ಯೂಟರ್ ಅಥವಾ ಸ್ವಿಚ್ ಮುಟ್ಟಬಹುದೇ?',
    questionEn: 'Should we touch a computer or switch with WET hands?',
    options: [
      { labelKn: 'ಹೌದು, ಮುಟ್ಟಬಹುದು', labelEn: 'Yes, we can touch', icon: '💧', isCorrect: false },
      { labelKn: 'ಇಲ್ಲ! ಎಂದಿಗೂ ಮುಟ್ಟಬಾರದು (ಅಪಾಯ)', labelEn: 'No! Never touch (Danger)', icon: '⚠️', isCorrect: true }
    ],
    explanationKn: 'ಒದ್ದೆ ಕೈಗಳಿಂದ ಮುಟ್ಟಿದರೆ ವಿದ್ಯುತ್ ಆಘಾತ (Electric Shock) ಸಂಭವಿಸಬಹುದು. ಕೈ ಒಣಗಿಸಿ ಮುಟ್ಟಬೇಕು.',
    explanationEn: 'Wet hands conduct electricity and can cause shock. Always dry your hands first!'
  },
  {
    id: 'q3',
    grade: 1,
    questionKn: 'ಕಂಪ್ಯೂಟರ್‌ನಲ್ಲಿ ಅಕ್ಷರ ಮತ್ತು ಸಂಖ್ಯೆಗಳನ್ನು ಟೈಪ್ ಮಾಡಲು ಯಾವುದು ಬೇಕು?',
    questionEn: 'What do we need to TYPE letters and numbers into the computer?',
    options: [
      { labelKn: 'ಮಾನಿಟರ್', labelEn: 'Monitor', icon: '🖥️', isCorrect: false },
      { labelKn: 'ಕೀಬೋರ್ಡ್', labelEn: 'Keyboard', icon: '⌨️', isCorrect: true },
      { labelKn: 'ಸ್ಪೀಕರ್', labelEn: 'Speaker', icon: '🔊', isCorrect: false }
    ],
    explanationKn: 'ಕೀಬೋರ್ಡ್‌ನಲ್ಲಿ ಅಕ್ಷರಗಳು ಮತ್ತು ಸಂಖ್ಯೆಗಳ ಕೀಗಳು ಇರುತ್ತವೆ.',
    explanationEn: 'The Keyboard is like a pencil for the computer to type letters & numbers.'
  },
  {
    id: 'q4',
    grade: 2,
    questionKn: 'ಅಂಗಡಿಯಲ್ಲಿ ಹಣ ಪಾವತಿ ಮಾಡಲು ಯಾವ ಸಾಧನ/ವಿಧಾನ ಬಳಸಲಾಗುತ್ತದೆ?',
    questionEn: 'Which device is used for digital payment in a shop?',
    options: [
      { labelKn: 'ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನರ್ / ಮೊಬೈಲ್', labelEn: 'QR Code Scanner / Mobile', icon: '📲', isCorrect: true },
      { labelKn: 'ಫ್ಯಾನ್', labelEn: 'Ceiling Fan', icon: '🌀', isCorrect: false },
      { labelKn: 'ಕತ್ತರಿ', labelEn: 'Scissors', icon: '✂️', isCorrect: false }
    ],
    explanationKn: 'ಅಂಗಡಿಗಳಲ್ಲಿ ಮೊಬೈಲ್ ಮೂಲಕ ಕ್ಯೂಆರ್ ಕೋಡ್ ಸ್ಕ್ಯಾನ್ ಮಾಡಿ ಹಣ ಪಾವತಿ ಮಾಡುತ್ತಾರೆ.',
    explanationEn: 'Shops use QR codes and smartphones for digital UPI payments.'
  },
  {
    id: 'q5',
    grade: 2,
    questionKn: 'ಇವುಗಳಲ್ಲಿ ಯಾವುದು ಇನ್‌ಪುಟ್ (Input) ಸಾಧನ?',
    questionEn: 'Which of these is an INPUT device?',
    options: [
      { labelKn: 'ಪ್ರಿಂಟರ್ (Printer)', labelEn: 'Printer', icon: '🖨️', isCorrect: false },
      { labelKn: 'ಸ್ಪೀಕರ್ (Speaker)', labelEn: 'Speaker', icon: '🔊', isCorrect: false },
      { labelKn: 'ಮೌಸ್ (Mouse)', labelEn: 'Mouse', icon: '🖱️', isCorrect: true }
    ],
    explanationKn: 'ಮೌಸ್ ಮೂಲಕ ನಾವು ಕಂಪ್ಯೂಟರ್‌ಗೆ ಕ್ಲಿಕ್ ಮಾಡಿ ಸೂಚನೆ ನೀಡುತ್ತೇವೆ (ಇನ್‌ಪುಟ್).',
    explanationEn: 'Mouse sends our clicks and commands INTO the computer (Input).'
  },
  {
    id: 'q6',
    grade: 2,
    questionKn: 'ಮೊಬೈಲ್‌ನಲ್ಲಿ ಹೊಸ ಗೇಮ್ ಡೌನ್‌ಲೋಡ್ ಮಾಡಲು ಸಂದೇಶ ಬಂದರೆ ಏನು ಮಾಡಬೇಕು?',
    questionEn: 'If a message says "Download a new game!", what should you do first?',
    options: [
      { labelKn: 'ತಕ್ಷಣ ಕ್ಲಿಕ್ ಮಾಡುವುದು', labelEn: 'Click immediately alone', icon: '⚡', isCorrect: false },
      { labelKn: 'ಪೋಷಕರು ಅಥವಾ ಶಿಕ್ಷಕರನ್ನು ಕೇಳುವುದು', labelEn: 'Ask parents or teacher first', icon: '👨‍👩‍👧', isCorrect: true }
    ],
    explanationKn: 'ಯಾವಾಗಲೂ ಹಿರಿಯರ ಅನುಮತಿ ಪಡೆದ ನಂತರವೇ ಡೌನ್‌ಲೋಡ್ ಮಾಡಬೇಕು (Safe Sham Rule).',
    explanationEn: 'Always ask parents before downloading anything online to stay safe!'
  }
];
