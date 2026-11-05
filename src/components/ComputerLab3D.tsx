import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { playSound, speakText } from '../utils/audio';

interface ComputerLab3DProps {
  lang: 'kn' | 'en';
  onPartSelected?: (partName: string) => void;
}

interface ComputerPartMeta {
  id: string;
  nameKn: string;
  nameEn: string;
  descKn: string;
  descEn: string;
  typeKn: string;
  typeEn: string;
  color: string;
}

export const COMPUTER_PARTS: Record<string, ComputerPartMeta> = {
  monitor: {
    id: 'monitor',
    nameKn: 'ಮಾನಿಟರ್ (Monitor)',
    nameEn: 'Monitor',
    descKn: 'ನೀವು ಮಾಡುವ ಪ್ರತಿಯೊಂದು ಕೆಲಸವನ್ನು ಇಲ್ಲಿ ನೋಡಬಹುದು. ಇದು ಚಿತ್ರ ಮತ್ತು ವೀಡಿಯೊಗಳನ್ನು ತೋರಿಸುತ್ತದೆ (ಔಟ್‌ಪುಟ್).',
    descEn: 'You can see every work you do here! It displays texts, pictures and cartoons (Output device).',
    typeKn: 'ಔಟ್‌ಪುಟ್ ಸಾಧನ',
    typeEn: 'Output Device',
    color: '#0284c7'
  },
  cpu: {
    id: 'cpu',
    nameKn: 'ಸಿ.ಪಿ.ಯು (CPU)',
    nameEn: 'CPU (Brain of Computer)',
    descKn: 'ಇದು ಕಂಪ್ಯೂಟರ್‌ನ ಮೆದುಳು! ನೀವು ಮಾಡುವ ಕೆಲಸವನ್ನು ಸಂಗ್ರಹಿಸುತ್ತದೆ ಮತ್ತು ಲೆಕ್ಕಾಚಾರ ಮಾಡುತ್ತದೆ (ಪ್ರಕ್ರಿಯೆ - Process).',
    descEn: 'The brain of the computer! All work is processed and stored here (Processing unit).',
    typeKn: 'ಪ್ರಕ್ರಿಯೆ ಸಾಧನ',
    typeEn: 'Processing Unit',
    color: '#475569'
  },
  keyboard: {
    id: 'keyboard',
    nameKn: 'ಕೀಬೋರ್ಡ್ (Keyboard)',
    nameEn: 'Keyboard',
    descKn: 'ಅಕ್ಷರಗಳು ಮತ್ತು ಸಂಖ್ಯೆಗಳನ್ನು ಟೈಪ್ ಮಾಡಲು ನಾನು ಬೇಕು. ಇದು ಕಂಪ್ಯೂಟರ್‌ಗೆ ಪೆನ್ಸಿಲ್ ಇದ್ದಂತೆ (ಇನ್‌ಪುಟ್).',
    descEn: 'Like a pencil for the computer! Used to type letters, numbers and words into computer (Input device).',
    typeKn: 'ಇನ್‌ಪುಟ್ ಸಾಧನ',
    typeEn: 'Input Device',
    color: '#334155'
  },
  mouse: {
    id: 'mouse',
    nameKn: 'ಮೌಸ್ (Mouse)',
    nameEn: 'Mouse',
    descKn: 'ಪರದೆಯ ಮೇಲೆ ಪಾಯಿಂಟರ್ ಚಲಿಸಲು ಮತ್ತು ಚಿತ್ರಗಳನ್ನು ಕ್ಲಿಕ್ ಮಾಡಲು ಸಹಾಯ ಮಾಡುತ್ತದೆ (ಇನ್‌ಪುಟ್).',
    descEn: 'Controls the pointer on screen, used for clicking and dragging pictures (Input device).',
    typeKn: 'ಇನ್‌ಪುಟ್ ಸಾಧನ',
    typeEn: 'Input Device',
    color: '#e11d48'
  },
  speaker: {
    id: 'speaker',
    nameKn: 'ಸ್ಪೀಕರ್ (Speaker)',
    nameEn: 'Speakers',
    descKn: 'ಸಂಗೀತ, ಹಾಡು ಮತ್ತು ಶಬ್ದವನ್ನು ಸ್ಪಷ್ಟವಾಗಿ ಕೇಳಲು ನಾನು ಬೇಕು (ಔಟ್‌ಪುಟ್).',
    descEn: 'Used for listening to cheerful rhymes, music and computer sounds (Output device).',
    typeKn: 'ಔಟ್‌ಪುಟ್ ಸಾಧನ',
    typeEn: 'Output Device',
    color: '#059669'
  },
  printer: {
    id: 'printer',
    nameKn: 'ಪ್ರಿಂಟರ್ (Printer)',
    nameEn: 'Printer',
    descKn: 'ನೀವು ಬಿಡಿಸಿದ ಚಿತ್ರಗಳು ಅಥವಾ ಮಾಹಿತಿಯನ್ನು ಕಾಗದದ ಮೇಲೆ ಮುದ್ರಿಸಲು ನಾನು ಬೇಕು (ಔಟ್‌ಪುಟ್).',
    descEn: 'Prints your drawings and text onto real paper sheets (Output device).',
    typeKn: 'ಔಟ್‌ಪುಟ್ ಸಾಧನ',
    typeEn: 'Output Device',
    color: '#d97706'
  },
  ups: {
    id: 'ups',
    nameKn: 'ಯು.ಪಿ.ಎಸ್ (UPS)',
    nameEn: 'UPS (Battery Backup)',
    descKn: 'ವಿದ್ಯುತ್ ಕಡಿತವಾದಾಗ ಕಂಪ್ಯೂಟರ್ ಆಫ್ ಆಗದಂತೆ ತುರ್ತು ಬ್ಯಾಟರಿ ಶಕ್ತಿ ಒದಗಿಸುತ್ತದೆ.',
    descEn: 'Provides emergency battery backup power when electric current goes off.',
    typeKn: 'ಶಕ್ತಿ ಸಂರಕ್ಷಕ',
    typeEn: 'Power Backup Unit',
    color: '#7c3aed'
  }
};

export const ComputerLab3D: React.FC<ComputerLab3DProps> = ({ lang, onPartSelected }) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [selectedPart, setSelectedPart] = useState<string>('monitor');
  const [explodedView, setExplodedView] = useState<number>(0);
  const [isPowerOn, setIsPowerOn] = useState<boolean>(true);
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isCinemaMode, setIsCinemaMode] = useState<boolean>(false);

  // References for 3D objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const partsGroupRef = useRef<Map<string, THREE.Group>>(new Map());
  const screenMeshRef = useRef<THREE.Mesh | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // Detect software GL
    const isSoftwareGl = (() => {
      const gl = document.createElement('canvas').getContext('webgl2');
      if (!gl) return true;
      const ext = gl.getExtension('WEBGL_debug_renderer_info');
      const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
      const gpu = String(gl.getParameter(param));
      gl.getExtension('WEBGL_lose_context')?.loseContext();
      return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
    })();

    const width = mountRef.current.clientWidth || 800;
    const height = mountRef.current.clientHeight || 500;

    // Scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0xf1f5f9);
    scene.fog = new THREE.FogExp2(0xf1f5f9, 0.04);

    // Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 50);
    camera.position.set(0, 3.2, 5.5);
    camera.lookAt(0, 0.6, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({
      antialias: !isSoftwareGl,
      powerPreference: 'high-performance',
      alpha: false
    });
    rendererRef.current = renderer;
    renderer.setSize(width, height);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    mountRef.current.innerHTML = '';
    mountRef.current.appendChild(renderer.domElement);

    // Environment Lighting
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // Lights
    const hemiLight = new THREE.HemisphereLight(0xdbeafe, 0xf1f5f9, 0.85);
    scene.add(hemiLight);

    const dirLight = new THREE.DirectionalLight(0xfff7ed, 1.4);
    dirLight.position.set(4, 7, 5);
    dirLight.castShadow = !isSoftwareGl;
    if (dirLight.shadow) {
      dirLight.shadow.mapSize.width = 1024;
      dirLight.shadow.mapSize.height = 1024;
      dirLight.shadow.camera.near = 0.5;
      dirLight.shadow.camera.far = 15;
      dirLight.shadow.camera.left = -4;
      dirLight.shadow.camera.right = 4;
      dirLight.shadow.camera.top = 4;
      dirLight.shadow.camera.bottom = -4;
      dirLight.shadow.bias = -0.0005;
    }
    scene.add(dirLight);

    // Warm Rim Fill Light
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    rimLight.position.set(-5, 4, -4);
    scene.add(rimLight);

    // Desk / Table
    const tableGroup = new THREE.Group();
    const tableTopGeo = new THREE.BoxGeometry(4.8, 0.12, 2.6);
    const tableMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      roughness: 0.35,
      metalness: 0.05
    });
    const tableTop = new THREE.Mesh(tableTopGeo, tableMat);
    tableTop.position.set(0, -0.06, 0);
    tableTop.receiveShadow = !isSoftwareGl;
    tableGroup.add(tableTop);

    // Soft Radial Contact Shadow
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const shadowCtx = shadowCanvas.getContext('2d')!;
    const gradient = shadowCtx.createRadialGradient(64, 64, 0, 64, 64, 64);
    gradient.addColorStop(0, 'rgba(15, 23, 42, 0.35)');
    gradient.addColorStop(0.7, 'rgba(15, 23, 42, 0.08)');
    gradient.addColorStop(1, 'rgba(15, 23, 42, 0)');
    shadowCtx.fillStyle = gradient;
    shadowCtx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false,
      opacity: 0.6
    });
    const shadowPlane = new THREE.Mesh(new THREE.PlaneGeometry(4.5, 2.4), shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.005;
    tableGroup.add(shadowPlane);
    scene.add(tableGroup);

    // Composite 3-12 Part Procedural Models for Each Computer Part
    const partsMap = partsGroupRef.current;
    partsMap.clear();

    // 1. MONITOR (Base, Stem, Frame, Screen, LED, Ganu Face Badge)
    const monitorGroup = new THREE.Group();
    monitorGroup.name = 'monitor';
    const monBase = new THREE.Mesh(
      new THREE.CylinderGeometry(0.38, 0.42, 0.04, 32),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.7 })
    );
    monBase.position.set(0, 0.02, -0.2);
    monBase.castShadow = true;
    monitorGroup.add(monBase);

    const monStem = new THREE.Mesh(
      new THREE.BoxGeometry(0.1, 0.45, 0.1),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.3, metalness: 0.8 })
    );
    monStem.position.set(0, 0.25, -0.22);
    monStem.castShadow = true;
    monitorGroup.add(monStem);

    const monFrame = new THREE.Mesh(
      new THREE.BoxGeometry(1.7, 1.1, 0.08),
      new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.2, metalness: 0.5 })
    );
    monFrame.position.set(0, 0.85, -0.2);
    monFrame.castShadow = true;
    monitorGroup.add(monFrame);

    // Screen (With procedural cute smiling face like Ganu)
    const screenCanvas = document.createElement('canvas');
    screenCanvas.width = 512;
    screenCanvas.height = 320;
    const sCtx = screenCanvas.getContext('2d')!;

    const renderScreenTexture = (power: boolean) => {
      sCtx.fillStyle = power ? '#38bdf8' : '#020617';
      sCtx.fillRect(0, 0, 512, 320);

      if (power) {
        // Soft clouds & vibrant sky
        sCtx.fillStyle = '#bae6fd';
        sCtx.beginPath();
        sCtx.arc(100, 80, 50, 0, Math.PI * 2);
        sCtx.arc(150, 80, 70, 0, Math.PI * 2);
        sCtx.arc(200, 80, 50, 0, Math.PI * 2);
        sCtx.fill();

        // Ganu Smiling Computer Face
        // Left Eye
        sCtx.fillStyle = '#ffffff';
        sCtx.beginPath();
        sCtx.ellipse(190, 140, 28, 42, 0, 0, Math.PI * 2);
        sCtx.fill();
        sCtx.fillStyle = '#0f172a';
        sCtx.beginPath();
        sCtx.arc(195, 145, 16, 0, Math.PI * 2);
        sCtx.fill();
        sCtx.fillStyle = '#ffffff';
        sCtx.beginPath();
        sCtx.arc(200, 138, 6, 0, Math.PI * 2);
        sCtx.fill();

        // Right Eye
        sCtx.fillStyle = '#ffffff';
        sCtx.beginPath();
        sCtx.ellipse(322, 140, 28, 42, 0, 0, Math.PI * 2);
        sCtx.fill();
        sCtx.fillStyle = '#0f172a';
        sCtx.beginPath();
        sCtx.arc(317, 145, 16, 0, Math.PI * 2);
        sCtx.fill();
        sCtx.fillStyle = '#ffffff';
        sCtx.beginPath();
        sCtx.arc(322, 138, 6, 0, Math.PI * 2);
        sCtx.fill();

        // Cheerful Smile
        sCtx.strokeStyle = '#0f172a';
        sCtx.lineWidth = 9;
        sCtx.beginPath();
        sCtx.arc(256, 180, 48, 0.15 * Math.PI, 0.85 * Math.PI);
        sCtx.stroke();

        // Rosy cheeks
        sCtx.fillStyle = 'rgba(244, 63, 94, 0.4)';
        sCtx.beginPath();
        sCtx.arc(140, 185, 22, 0, Math.PI * 2);
        sCtx.arc(372, 185, 22, 0, Math.PI * 2);
        sCtx.fill();

        // Title text at bottom
        sCtx.fillStyle = '#0f172a';
        sCtx.font = 'bold 20px Fredoka, sans-serif';
        sCtx.textAlign = 'center';
        sCtx.fillText('ನಾನು ಗಣು! I am Ganu 💻', 256, 285);
      }
    };
    renderScreenTexture(true);

    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    const screenMat = new THREE.MeshBasicMaterial({ map: screenTexture });
    const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(1.56, 0.96), screenMat);
    screenMesh.position.set(0, 0.85, -0.155);
    monitorGroup.add(screenMesh);
    screenMeshRef.current = screenMesh;

    // Power LED indicator
    const ledMesh = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.01, 16),
      new THREE.MeshBasicMaterial({ color: 0x22c55e })
    );
    ledMesh.rotation.x = Math.PI / 2;
    ledMesh.position.set(0.7, 0.35, -0.155);
    monitorGroup.add(ledMesh);

    scene.add(monitorGroup);
    partsMap.set('monitor', monitorGroup);

    // 2. CPU TOWER (Case, CD Drive, Power Button, USB slots, Grill)
    const cpuGroup = new THREE.Group();
    cpuGroup.name = 'cpu';
    cpuGroup.position.set(1.45, 0, -0.2);

    const cpuCase = new THREE.Mesh(
      new THREE.BoxGeometry(0.55, 1.25, 1.1),
      new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.35, metalness: 0.65 })
    );
    cpuCase.position.set(0, 0.625, 0);
    cpuCase.castShadow = true;
    cpuGroup.add(cpuCase);

    // Front bezel
    const frontBezel = new THREE.Mesh(
      new THREE.BoxGeometry(0.53, 1.23, 0.04),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.5 })
    );
    frontBezel.position.set(0, 0.625, 0.56);
    cpuGroup.add(frontBezel);

    // Big Power Button
    const pwrBtn = new THREE.Mesh(
      new THREE.CylinderGeometry(0.06, 0.06, 0.02, 32),
      new THREE.MeshStandardMaterial({ color: 0x38bdf8, roughness: 0.2, metalness: 0.8 })
    );
    pwrBtn.rotation.x = Math.PI / 2;
    pwrBtn.position.set(0, 0.95, 0.58);
    cpuGroup.add(pwrBtn);

    // CD/DVD Slot
    const driveSlot = new THREE.Mesh(
      new THREE.BoxGeometry(0.38, 0.08, 0.01),
      new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.5 })
    );
    driveSlot.position.set(0, 1.1, 0.58);
    cpuGroup.add(driveSlot);

    scene.add(cpuGroup);
    partsMap.set('cpu', cpuGroup);

    // 3. KEYBOARD (Base tray, Angled key surface, Spacebar, Cable)
    const kbGroup = new THREE.Group();
    kbGroup.name = 'keyboard';
    kbGroup.position.set(-0.1, 0.01, 0.45);

    const kbBase = new THREE.Mesh(
      new THREE.BoxGeometry(1.3, 0.035, 0.48),
      new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.45, metalness: 0.2 })
    );
    kbBase.position.set(0, 0.017, 0);
    kbBase.castShadow = true;
    kbGroup.add(kbBase);

    // Colored Key Clusters (letter keys in blue, spacebar in green, enter in yellow)
    const keyPlate = new THREE.Mesh(
      new THREE.BoxGeometry(1.22, 0.02, 0.4),
      new THREE.MeshStandardMaterial({ color: 0x3b82f6, roughness: 0.5 })
    );
    keyPlate.position.set(0, 0.04, 0);
    kbGroup.add(keyPlate);

    // Big Green Space Bar
    const spaceBar = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.025, 0.06),
      new THREE.MeshStandardMaterial({ color: 0x22c55e, roughness: 0.4 })
    );
    spaceBar.position.set(0, 0.055, 0.13);
    kbGroup.add(spaceBar);

    scene.add(kbGroup);
    partsMap.set('keyboard', kbGroup);

    // 4. MOUSE & MOUSE PAD (Ergonomic shell, Left/Right buttons, Scroll wheel, Pad, Wire)
    const mouseGroup = new THREE.Group();
    mouseGroup.name = 'mouse';
    mouseGroup.position.set(0.85, 0.01, 0.48);

    // Mouse Pad
    const pad = new THREE.Mesh(
      new THREE.BoxGeometry(0.48, 0.005, 0.55),
      new THREE.MeshStandardMaterial({ color: 0xf43f5e, roughness: 0.9 })
    );
    pad.position.set(0, 0.003, 0);
    pad.receiveShadow = true;
    mouseGroup.add(pad);

    // Mouse Body
    const mouseBody = new THREE.Mesh(
      new THREE.SphereGeometry(0.1, 32, 16),
      new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.2, metalness: 0.3 })
    );
    mouseBody.scale.set(1.2, 0.65, 1.8);
    mouseBody.position.set(0, 0.065, 0);
    mouseBody.castShadow = true;
    mouseGroup.add(mouseBody);

    // Scroll Wheel (Cyan)
    const scrollWheel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.018, 0.018, 0.025, 16),
      new THREE.MeshStandardMaterial({ color: 0x06b6d4, roughness: 0.2 })
    );
    scrollWheel.rotation.z = Math.PI / 2;
    scrollWheel.position.set(0, 0.11, -0.06);
    mouseGroup.add(scrollWheel);

    scene.add(mouseGroup);
    partsMap.set('mouse', mouseGroup);

    // 5. SPEAKERS (Left and Right)
    const speakerGroup = new THREE.Group();
    speakerGroup.name = 'speaker';

    const createSpeaker = (xPos: number) => {
      const spk = new THREE.Group();
      spk.position.set(xPos, 0, -0.2);

      const cabinet = new THREE.Mesh(
        new THREE.BoxGeometry(0.24, 0.55, 0.22),
        new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.5 })
      );
      cabinet.position.set(0, 0.275, 0);
      cabinet.castShadow = true;
      spk.add(cabinet);

      // Cones
      const cone1 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.07, 0.07, 0.01, 24),
        new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3 })
      );
      cone1.rotation.x = Math.PI / 2;
      cone1.position.set(0, 0.36, 0.115);
      spk.add(cone1);

      const cone2 = new THREE.Mesh(
        new THREE.CylinderGeometry(0.05, 0.05, 0.01, 24),
        new THREE.MeshStandardMaterial({ color: 0x34d399, roughness: 0.3 })
      );
      cone2.rotation.x = Math.PI / 2;
      cone2.position.set(0, 0.18, 0.115);
      spk.add(cone2);

      return spk;
    };

    const spkLeft = createSpeaker(-1.18);
    const spkRight = createSpeaker(1.02);
    speakerGroup.add(spkLeft);
    speakerGroup.add(spkRight);

    scene.add(speakerGroup);
    partsMap.set('speaker', speakerGroup);

    // 6. PRINTER (Paper tray, Output sheet, Body, Buttons)
    const printerGroup = new THREE.Group();
    printerGroup.name = 'printer';
    printerGroup.position.set(-1.8, 0, 0.15);

    const prtBase = new THREE.Mesh(
      new THREE.BoxGeometry(0.65, 0.28, 0.55),
      new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3, metalness: 0.2 })
    );
    prtBase.position.set(0, 0.14, 0);
    prtBase.castShadow = true;
    printerGroup.add(prtBase);

    // Output paper
    const paper = new THREE.Mesh(
      new THREE.PlaneGeometry(0.32, 0.22),
      new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    );
    paper.rotation.x = -Math.PI / 2.3;
    paper.position.set(0, 0.12, 0.24);
    printerGroup.add(paper);

    scene.add(printerGroup);
    partsMap.set('printer', printerGroup);

    // 7. UPS (Power unit behind or next to CPU)
    const upsGroup = new THREE.Group();
    upsGroup.name = 'ups';
    upsGroup.position.set(1.95, 0, 0.35);

    const upsCase = new THREE.Mesh(
      new THREE.BoxGeometry(0.28, 0.42, 0.52),
      new THREE.MeshStandardMaterial({ color: 0x475569, roughness: 0.4, metalness: 0.4 })
    );
    upsCase.position.set(0, 0.21, 0);
    upsCase.castShadow = true;
    upsGroup.add(upsCase);

    // Green Status LED
    const upsLed = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.01, 16),
      new THREE.MeshBasicMaterial({ color: 0x22c55e })
    );
    upsLed.rotation.x = Math.PI / 2;
    upsLed.position.set(0, 0.32, 0.265);
    upsGroup.add(upsLed);

    scene.add(upsGroup);
    partsMap.set('ups', upsGroup);

    // Pre-warm shaders
    if (!isSoftwareGl) {
      renderer.compile(scene, camera);
    }

    // High performance Raycasting for clicks
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const onPointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects(scene.children, true);

      if (intersects.length > 0) {
        let obj: THREE.Object3D | null = intersects[0].object;
        while (obj && obj !== scene) {
          if (obj.name && partsMap.has(obj.name)) {
            const partId = obj.name;
            setSelectedPart(partId);
            playSound('pop');
            if (onPartSelected) onPartSelected(partId);
            const partInfo = COMPUTER_PARTS[partId];
            if (partInfo) {
              speakText(
                lang === 'kn' ? `${partInfo.nameKn}. ${partInfo.descKn}` : `${partInfo.nameEn}. ${partInfo.descEn}`,
                lang
              );
            }
            break;
          }
          obj = obj.parent;
        }
      }
    };

    renderer.domElement.addEventListener('pointerdown', onPointerDown);

    // Animation Loop with smooth damping
    let animId = 0;
    const clock = new THREE.Clock();

    const renderLoop = () => {
      const dt = clock.getDelta();
      const time = clock.getElapsedTime();

      // Gentle floating/breathing animation for selected part
      partsMap.forEach((grp, id) => {
        if (id === selectedPart) {
          grp.position.y = Math.sin(time * 3) * 0.035;
        } else {
          grp.position.y = THREE.MathUtils.damp(grp.position.y, 0, 8, dt);
        }
      });

      // Subtle slow turntable rotation
      scene.rotation.y = Math.sin(time * 0.15) * 0.12;

      renderer.render(scene, camera);
      animId = requestAnimationFrame(renderLoop);
    };

    animId = requestAnimationFrame(renderLoop);

    // Resize handler
    const handleResize = () => {
      if (!mountRef.current || !rendererRef.current) return;
      const w = mountRef.current.clientWidth;
      const h = mountRef.current.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animId);
      renderer.domElement.removeEventListener('pointerdown', onPointerDown);
      renderer.dispose();
    };
  }, []);

  // Handle Exploded View separation
  useEffect(() => {
    const partsMap = partsGroupRef.current;
    if (!partsMap) return;

    const factor = explodedView; // 0 to 1
    const offsets: Record<string, [number, number, number]> = {
      monitor: [0, factor * 0.4, -factor * 0.3],
      cpu: [factor * 0.6, factor * 0.2, 0],
      keyboard: [0, 0, factor * 0.5],
      mouse: [factor * 0.4, 0, factor * 0.4],
      speaker: [-factor * 0.3, factor * 0.2, -factor * 0.2],
      printer: [-factor * 0.6, 0, factor * 0.2],
      ups: [factor * 0.6, 0, factor * 0.5]
    };

    Object.entries(offsets).forEach(([id, [ox, oy, oz]]) => {
      const grp = partsMap.get(id);
      if (grp) {
        // Base positions:
        const basePos: Record<string, [number, number, number]> = {
          monitor: [0, 0, 0],
          cpu: [1.45, 0, -0.2],
          keyboard: [-0.1, 0.01, 0.45],
          mouse: [0.85, 0.01, 0.48],
          speaker: [0, 0, 0],
          printer: [-1.8, 0, 0.15],
          ups: [1.95, 0, 0.35]
        };
        const [bx, by, bz] = basePos[id] || [0, 0, 0];
        grp.position.set(bx + ox, by + oy, bz + oz);
      }
    });
  }, [explodedView]);

  const selectAndSpeak = (partKey: string) => {
    setSelectedPart(partKey);
    playSound('pop');
    if (onPartSelected) onPartSelected(partKey);
    const info = COMPUTER_PARTS[partKey];
    if (info) {
      setIsSpeaking(true);
      speakText(
        lang === 'kn' ? `${info.nameKn}. ${info.descKn}` : `${info.nameEn}. ${info.descEn}`,
        lang,
        () => setIsSpeaking(false)
      );
    }
  };

  const currentPart = COMPUTER_PARTS[selectedPart] || COMPUTER_PARTS.monitor;

  return (
    <div className="relative w-full h-[620px] rounded-3xl overflow-hidden bg-slate-900 border-4 border-sky-400 shadow-2xl flex flex-col">
      {/* Top Banner / HUD */}
      <div className="absolute top-4 left-4 z-10 flex items-center gap-3 bg-white/95 text-slate-800 px-4 py-2 rounded-2xl shadow-lg border border-sky-200">
        <span className="text-2xl animate-bounce">🤖</span>
        <div>
          <div className="text-xs font-bold text-sky-600 uppercase tracking-wider">
            {lang === 'kn' ? '3D ಗಣಕ ಪ್ರಯೋಗಾಲಯ' : '3D Computer Lab Explorer'}
          </div>
          <div className="text-sm font-extrabold text-slate-800">
            {lang === 'kn' ? 'ಭಾಗವನ್ನು ಮುಟ್ಟಿ ಕಲಿಯಿರಿ!' : 'Tap any part to explore!'}
          </div>
        </div>
      </div>

      {/* Top Right Quick Controls */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
        <button
          onClick={() => {
            playSound('camera');
            setIsPowerOn(!isPowerOn);
          }}
          className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow transition-all ${
            isPowerOn ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
          }`}
        >
          <span>⚡</span>
          <span>{isPowerOn ? (lang === 'kn' ? 'ಆನ್ ಆಗಿದೆ (ON)' : 'Power ON') : (lang === 'kn' ? 'ಆಫ್ ಆಗಿದೆ (OFF)' : 'Power OFF')}</span>
        </button>

        <button
          onClick={() => setIsCinemaMode(!isCinemaMode)}
          className="bg-white/90 text-slate-700 hover:bg-white px-3 py-2 rounded-xl text-xs font-bold shadow border border-slate-200"
          title="Toggle Full 3D View"
        >
          {isCinemaMode ? '▴ View Details' : '▾ Full View'}
        </button>
      </div>

      {/* Active Selected Part Info Card (Non-intrusive Top Center) */}
      {!isCinemaMode && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 z-10 w-[92%] max-w-lg bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-xl border-2 border-sky-300 transition-all">
          <div className="flex items-start justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold text-white shadow-sm" style={{ backgroundColor: currentPart.color }}>
                  {lang === 'kn' ? currentPart.typeKn : currentPart.typeEn}
                </span>
                <h3 className="text-lg font-black text-slate-900 font-display">
                  {lang === 'kn' ? currentPart.nameKn : currentPart.nameEn}
                </h3>
              </div>
              <p className="mt-1.5 text-xs sm:text-sm text-slate-700 leading-relaxed font-kannada">
                {lang === 'kn' ? currentPart.descKn : currentPart.descEn}
              </p>
            </div>
            <button
              onClick={() => selectAndSpeak(selectedPart)}
              className="p-2.5 rounded-xl bg-sky-100 hover:bg-sky-200 text-sky-700 transition-colors flex-shrink-0"
              title="Speak description"
            >
              <span className="text-xl">{isSpeaking ? '🔊' : '🗣️'}</span>
            </button>
          </div>
        </div>
      )}

      {/* 3D WebGL Canvas Container */}
      <div ref={mountRef} className="w-full h-full cursor-grab active:cursor-grabbing" />

      {/* Collapsible Bottom Control Dock (Follows Three.js Ergonomic Dock standard) */}
      <div
        className={`absolute bottom-3 left-1/2 -translate-x-1/2 z-10 w-[95%] max-w-3xl transition-transform duration-300 ${
          isCinemaMode ? 'translate-y-24 opacity-0 pointer-events-none' : 'translate-y-0 opacity-100'
        }`}
      >
        <div className="bg-white/95 rounded-2xl p-3 shadow-2xl border-2 border-sky-200 flex flex-col gap-2.5">
          {/* Part Selection Buttons */}
          <div className="flex items-center justify-between overflow-x-auto gap-1.5 pb-1 no-scrollbar">
            {Object.keys(COMPUTER_PARTS).map((key) => {
              const part = COMPUTER_PARTS[key];
              const isSelected = selectedPart === key;
              return (
                <button
                  key={key}
                  onClick={() => selectAndSpeak(key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-sky-500 text-white shadow-md scale-105 ring-2 ring-sky-300'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: part.color }} />
                  <span>{lang === 'kn' ? part.nameKn.split(' ')[0] : part.nameEn.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>

          {/* Exploded View Slider & Actions */}
          <div className="flex items-center justify-between gap-4 pt-1 border-t border-slate-100 text-xs text-slate-600">
            <div className="flex items-center gap-2 flex-1">
              <span className="font-bold whitespace-nowrap">
                {lang === 'kn' ? 'ಭಾಗಗಳ ವಿಸ್ತರಣೆ (Exploded View):' : 'Spread Parts:'}
              </span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={explodedView}
                onChange={(e) => setExplodedView(parseFloat(e.target.value))}
                className="w-full accent-sky-500 h-2 bg-slate-200 rounded-lg cursor-pointer"
              />
              <span className="font-mono text-slate-500 w-10 text-right">
                {Math.round(explodedView * 100)}%
              </span>
            </div>

            <button
              onClick={() => {
                playSound('pop');
                speakText(
                  lang === 'kn'
                    ? 'ಗಣಕಯಂತ್ರವು ಮಾನಿಟರ್, ಸಿಪಿಯು, ಕೀಬೋರ್ಡ್, ಮೌಸ್ ಮತ್ತು ಯುಪಿಎಸ್ ಗಳಿಂದ ಕೂಡಿದೆ. ಎಲ್ಲ ಭಾಗಗಳು ಒಟ್ಟಿಗೆ ಕೆಲಸ ಮಾಡುತ್ತವೆ!'
                    : 'The computer consists of Monitor, CPU, Keyboard, Mouse, and UPS. All parts work happily together!',
                  lang
                );
              }}
              className="bg-amber-100 hover:bg-amber-200 text-amber-900 px-3 py-1.5 rounded-xl font-bold transition-colors flex items-center gap-1"
            >
              <span>⭐</span>
              <span>{lang === 'kn' ? 'ಎಲ್ಲವನ್ನೂ ವಿವರಿಸು' : 'Explain All'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
