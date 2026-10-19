"use client";

import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { 
  Sun, 
  Moon, 
  Sunset, 
  Layers, 
  Camera, 
  Compass, 
  Eye, 
  Maximize2, 
  Minimize2, 
  ChevronDown, 
  ChevronUp,
  RotateCcw,
  Sparkles
} from 'lucide-react';

export type LightingPreset = 'golden-hour' | 'crisp-daylight' | 'twilight';
export type CameraPreset = 'pool' | 'balcony' | 'garden' | 'aerial';

interface VillaViewerProps {
  initialLighting?: LightingPreset;
  initialCamera?: CameraPreset;
  className?: string;
  isHero?: boolean;
}

// Procedural texture generator for travertine stone
function createTravertineTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  // Warm ivory travertine base
  ctx.fillStyle = '#E9E2D8';
  ctx.fillRect(0, 0, 512, 512);

  // Subtle natural stone veins and pores
  ctx.fillStyle = 'rgba(166, 155, 138, 0.25)';
  for (let i = 0; i < 200; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    const w = 40 + Math.random() * 120;
    const h = 2 + Math.random() * 4;
    ctx.beginPath();
    ctx.ellipse(x, y, w, h, (Math.random() - 0.5) * 0.2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Stone grain speckles
  ctx.fillStyle = 'rgba(36, 37, 34, 0.04)';
  for (let i = 0; i < 1500; i++) {
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    ctx.fillRect(x, y, 1.5, 1.5);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(4, 4);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Procedural texture generator for teak wood decking
function createWoodTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = '#8C6D4F';
  ctx.fillRect(0, 0, 512, 512);

  // Plank lines
  ctx.fillStyle = '#5A432F';
  const plankHeight = 32;
  for (let y = 0; y < 512; y += plankHeight) {
    ctx.fillRect(0, y, 512, 2);
    // Subtle wood grain lines
    ctx.fillStyle = 'rgba(74, 53, 36, 0.18)';
    for (let j = 0; j < 8; j++) {
      ctx.fillRect(0, y + 4 + j * 3, 512, 1);
    }
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.set(2, 6);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

// Soft radial contact shadow texture
function createRadialShadowTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d')!;

  const gradient = ctx.createRadialGradient(128, 128, 20, 128, 128, 120);
  gradient.addColorStop(0, 'rgba(15, 15, 15, 0.55)');
  gradient.addColorStop(0.5, 'rgba(20, 20, 20, 0.25)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 256, 256);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export const ArchitecturalVillaViewer: React.FC<VillaViewerProps> = ({
  initialLighting = 'golden-hour',
  initialCamera = 'pool',
  className = '',
  isHero = false
}) => {
  const mountRef = useRef<HTMLDivElement>(null);
  const [activeLighting, setActiveLighting] = useState<LightingPreset>(initialLighting);
  const [activeCamera, setActiveCamera] = useState<CameraPreset>(initialCamera);
  const [explodedRatio, setExplodedRatio] = useState<number>(0);
  const [isAutoRotating, setIsAutoRotating] = useState<boolean>(true);
  const [isControlsCollapsed, setIsControlsCollapsed] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  // References for render loop state
  const stateRef = useRef({
    lighting: initialLighting,
    cameraPreset: initialCamera,
    explodedRatio: 0,
    targetExplodedRatio: 0,
    autoRotate: true,
    camTargetPos: new THREE.Vector3(12, 6, 14),
    camLookAt: new THREE.Vector3(0, 1.8, 0),
    isTransitioningCam: false
  });

  // Keep stateRef in sync with React state
  useEffect(() => {
    stateRef.current.lighting = activeLighting;
  }, [activeLighting]);

  useEffect(() => {
    stateRef.current.cameraPreset = activeCamera;
  }, [activeCamera]);

  useEffect(() => {
    stateRef.current.targetExplodedRatio = explodedRatio;
  }, [explodedRatio]);

  useEffect(() => {
    stateRef.current.autoRotate = isAutoRotating;
  }, [isAutoRotating]);

  // Handle camera preset positions
  const handleSelectCamera = useCallback((preset: CameraPreset) => {
    setActiveCamera(preset);
    const s = stateRef.current;
    s.isTransitioningCam = true;

    if (preset === 'pool') {
      s.camTargetPos.set(11, 4.5, 13);
      s.camLookAt.set(0, 1.5, 0);
    } else if (preset === 'balcony') {
      s.camTargetPos.set(4, 5.2, 7);
      s.camLookAt.set(-1, 3.5, -0.5);
    } else if (preset === 'garden') {
      s.camTargetPos.set(-14, 5, 10);
      s.camLookAt.set(0, 2, 0);
    } else if (preset === 'aerial') {
      s.camTargetPos.set(16, 16, 16);
      s.camLookAt.set(0, 1.2, 0);
    }
  }, []);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 600;

    // 1. Scene & Background
    const scene = new THREE.Scene();
    const fogColor = new THREE.Color(0xF7F5F0);
    scene.background = fogColor;
    scene.fog = new THREE.FogExp2(0xF7F5F0, 0.018);

    // 2. Camera
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(12, 5, 14);

    // 3. Renderer with ACESFilmicToneMapping & SRGBColorSpace
    const isHeadless = navigator.webdriver || /HeadlessChrome/i.test(navigator.userAgent);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(isHeadless ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = !isHeadless;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // 4. Studio Environment Reflection via RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    scene.environment = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    pmremGenerator.dispose();

    // 5. OrbitControls with damped rotation
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 - 0.04; // Don't go below ground
    controls.minDistance = 4;
    controls.maxDistance = 35;
    controls.target.set(0, 1.8, 0);

    // 6. Lighting Rig
    const hemiLight = new THREE.HemisphereLight(0xF7F5F0, 0x8C7E6C, 0.7);
    scene.add(hemiLight);

    const dirKeyLight = new THREE.DirectionalLight(0xFFF3DD, 2.4);
    dirKeyLight.position.set(18, 22, 12);
    dirKeyLight.castShadow = !isHeadless;
    dirKeyLight.shadow.mapSize.width = 2048;
    dirKeyLight.shadow.mapSize.height = 2048;
    dirKeyLight.shadow.camera.near = 0.5;
    dirKeyLight.shadow.camera.far = 60;
    dirKeyLight.shadow.camera.left = -16;
    dirKeyLight.shadow.camera.right = 16;
    dirKeyLight.shadow.camera.top = 16;
    dirKeyLight.shadow.camera.bottom = -16;
    dirKeyLight.shadow.bias = -0.0004;
    dirKeyLight.shadow.normalBias = 0.02;
    scene.add(dirKeyLight);

    // Soft architectural rim light
    const rimLight = new THREE.DirectionalLight(0xBAC8D3, 0.8);
    rimLight.position.set(-18, 12, -14);
    scene.add(rimLight);

    // Interior warm accent lighting group
    const interiorLight1 = new THREE.PointLight(0xFFA64D, 3.5, 12, 1.2);
    interiorLight1.position.set(0, 1.5, 0);
    scene.add(interiorLight1);

    const interiorLight2 = new THREE.PointLight(0xFFB366, 2.5, 10, 1.2);
    interiorLight2.position.set(-1.5, 4.2, 0);
    scene.add(interiorLight2);

    // Pool glow light (underwater luminaire)
    const poolLight = new THREE.PointLight(0x70A6B8, 2.0, 8, 1.5);
    poolLight.position.set(4, 0.2, 4);
    scene.add(poolLight);

    // 7. Textures
    const travertineTex = createTravertineTexture();
    const woodTex = createWoodTexture();
    const shadowTex = createRadialShadowTexture();

    // 8. Materials Library
    const concreteMaterial = new THREE.MeshStandardMaterial({
      color: 0xE2DDD5,
      roughness: 0.85,
      metalness: 0.05
    });

    const travertineMaterial = new THREE.MeshStandardMaterial({
      map: travertineTex,
      roughness: 0.72,
      metalness: 0.05
    });

    const woodDeckMaterial = new THREE.MeshStandardMaterial({
      map: woodTex,
      roughness: 0.65,
      metalness: 0.1
    });

    const bronzeMetalMaterial = new THREE.MeshStandardMaterial({
      color: 0x38342E,
      roughness: 0.35,
      metalness: 0.85
    });

    const champagneTrimMaterial = new THREE.MeshStandardMaterial({
      color: 0xB79A69,
      roughness: 0.25,
      metalness: 0.8
    });

    const glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xEEF5F8,
      transmission: 0.94,
      opacity: 1,
      transparent: true,
      roughness: 0.08,
      ior: 1.52,
      thickness: 0.4,
      depthWrite: false,
      attenuationColor: new THREE.Color(0xD9E9EE),
      attenuationDistance: 1.2
    });

    const poolWaterMaterial = new THREE.MeshPhysicalMaterial({
      color: 0x367A8C,
      transmission: 0.8,
      roughness: 0.12,
      ior: 1.333,
      transparent: true,
      opacity: 0.9,
      depthWrite: false
    });

    const fireplaceMaterial = new THREE.MeshStandardMaterial({
      color: 0x242522,
      roughness: 0.9,
      metalness: 0.2
    });

    const flameGlowMaterial = new THREE.MeshBasicMaterial({
      color: 0xFF8822
    });

    // 9. Build Procedural Architectural Villa (3–12 Part Composite Hierarchy)
    const villaRoot = new THREE.Group();
    scene.add(villaRoot);

    // PART 1: Foundation Plinth & Terrain Terrace
    const foundationGroup = new THREE.Group();
    villaRoot.add(foundationGroup);

    // Main ground platform
    const platformGeo = new THREE.BoxGeometry(18, 0.6, 16);
    const platformMesh = new THREE.Mesh(platformGeo, concreteMaterial);
    platformMesh.position.set(0, 0.3, 0);
    platformMesh.receiveShadow = true;
    foundationGroup.add(platformMesh);

    // Stepped entry terrace
    const step1 = new THREE.Mesh(new THREE.BoxGeometry(20, 0.25, 18), concreteMaterial);
    step1.position.set(0, 0.125, 0);
    step1.receiveShadow = true;
    foundationGroup.add(step1);

    // PART 2: Infinity Edge Pool & Sun Deck
    const poolBasin = new THREE.Mesh(
      new THREE.BoxGeometry(8, 0.5, 4.5),
      new THREE.MeshStandardMaterial({ color: 0x1A2830, roughness: 0.4 })
    );
    poolBasin.position.set(4, 0.35, 4.2);
    foundationGroup.add(poolBasin);

    // Pool water plane
    const poolWater = new THREE.Mesh(new THREE.PlaneGeometry(7.8, 4.3), poolWaterMaterial);
    poolWater.rotation.x = -Math.PI / 2;
    poolWater.position.set(4, 0.58, 4.2);
    foundationGroup.add(poolWater);

    // Teak wood pool deck surrounding
    const woodDeck = new THREE.Mesh(new THREE.BoxGeometry(3.5, 0.1, 5), woodDeckMaterial);
    woodDeck.position.set(7.5, 0.65, 4.2);
    woodDeck.receiveShadow = true;
    foundationGroup.add(woodDeck);

    // Stepping stones over water
    for (let i = 0; i < 3; i++) {
      const stone = new THREE.Mesh(new THREE.BoxGeometry(1.0, 0.12, 1.0), travertineMaterial);
      stone.position.set(1.2 + i * 1.5, 0.66, 4.2);
      stone.castShadow = true;
      stone.receiveShadow = true;
      foundationGroup.add(stone);
    }

    // PART 3: Ground Floor Travertine Pavilion & Columns
    const groundPavilionGroup = new THREE.Group();
    villaRoot.add(groundPavilionGroup);

    // Interior travertine floor
    const livingFloor = new THREE.Mesh(new THREE.BoxGeometry(11, 0.05, 9), travertineMaterial);
    livingFloor.position.set(-2, 0.62, -0.5);
    livingFloor.receiveShadow = true;
    groundPavilionGroup.add(livingFloor);

    // Structural slim steel columns (3x2 grid)
    const colGeo = new THREE.CylinderGeometry(0.08, 0.08, 3.2, 16);
    const colPositions = [
      [-6.5, 1.5, -4.2], [-6.5, 1.5, 3.2],
      [-2.0, 1.5, -4.2], [-2.0, 1.5, 3.2],
      [2.5, 1.5, -4.2], [2.5, 1.5, 3.2],
      [6.5, 1.5, -4.2], [6.5, 1.5, 0.5]
    ];
    colPositions.forEach(([x, y, z]) => {
      const col = new THREE.Mesh(colGeo, bronzeMetalMaterial);
      col.position.set(x, y, z);
      col.castShadow = true;
      col.receiveShadow = true;
      groundPavilionGroup.add(col);
    });

    // Floor-to-ceiling architectural glass walls
    const glassFront = new THREE.Mesh(new THREE.PlaneGeometry(9, 3.1), glassMaterial);
    glassFront.position.set(0, 2.15, 3.4);
    groundPavilionGroup.add(glassFront);

    const glassSide = new THREE.Mesh(new THREE.PlaneGeometry(8, 3.1), glassMaterial);
    glassSide.rotation.y = Math.PI / 2;
    glassSide.position.set(-6.8, 2.15, -0.5);
    groundPavilionGroup.add(glassSide);

    const glassRear = new THREE.Mesh(new THREE.PlaneGeometry(9, 3.1), glassMaterial);
    glassRear.rotation.y = Math.PI;
    glassRear.position.set(0, 2.15, -4.4);
    groundPavilionGroup.add(glassRear);

    // PART 4: Interior Pavilion Furnishings (Sculptural Fireplace & Minimalist Dining)
    const fireplaceBase = new THREE.Mesh(new THREE.BoxGeometry(1.6, 2.8, 0.8), fireplaceMaterial);
    fireplaceBase.position.set(-3.5, 2.0, 0);
    fireplaceBase.castShadow = true;
    groundPavilionGroup.add(fireplaceBase);

    // Glowing hearth recess
    const hearthFire = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.25, 0.4), flameGlowMaterial);
    hearthFire.position.set(-3.5, 1.1, 0.25);
    groundPavilionGroup.add(hearthFire);

    // Sculptural solid wood dining table
    const tableTop = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.1, 1.2), woodDeckMaterial);
    tableTop.position.set(1.5, 1.2, -1.0);
    tableTop.castShadow = true;
    groundPavilionGroup.add(tableTop);

    // Dining legs
    const legGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8);
    const legCoords = [[0.3, 0.9, -1.4], [0.3, 0.9, -0.6], [2.7, 0.9, -1.4], [2.7, 0.9, -0.6]];
    legCoords.forEach(([x, y, z]) => {
      const leg = new THREE.Mesh(legGeo, bronzeMetalMaterial);
      leg.position.set(x, y, z);
      groundPavilionGroup.add(leg);
    });

    // PART 5: Cantilevered Upper Master Suite & Louvers
    const upperSuiteGroup = new THREE.Group();
    upperSuiteGroup.position.set(0, 0, 0); // Will animate Y when exploded
    villaRoot.add(upperSuiteGroup);

    // Cantilevered second-story floor slab
    const upperFloorSlab = new THREE.Mesh(new THREE.BoxGeometry(13, 0.4, 9), concreteMaterial);
    upperFloorSlab.position.set(-1.5, 3.7, 0);
    upperFloorSlab.castShadow = true;
    upperFloorSlab.receiveShadow = true;
    upperSuiteGroup.add(upperFloorSlab);

    // Upper suite enclosed solid volume (warm stucco / limestone)
    const upperWallMat = new THREE.MeshStandardMaterial({ color: 0xF2ECE2, roughness: 0.8 });
    const upperEnclosure = new THREE.Mesh(new THREE.BoxGeometry(8, 2.8, 7.5), upperWallMat);
    upperEnclosure.position.set(-3.5, 5.2, -0.5);
    upperEnclosure.castShadow = true;
    upperEnclosure.receiveShadow = true;
    upperSuiteGroup.add(upperEnclosure);

    // Architectural Cedar Wood Louvers (brise-soleil) on cantilevered wing
    const louverGeo = new THREE.BoxGeometry(0.06, 2.7, 0.25);
    for (let i = 0; i < 18; i++) {
      const louver = new THREE.Mesh(louverGeo, woodDeckMaterial);
      louver.position.set(0.6 + i * 0.22, 5.2, 3.25);
      louver.rotation.y = 0.25;
      louver.castShadow = true;
      upperSuiteGroup.add(louver);
    }

    // Upper balcony glass balustrade with champagne handrail
    const balustrade = new THREE.Mesh(new THREE.PlaneGeometry(5.2, 1.0), glassMaterial);
    balustrade.position.set(2.4, 4.35, 4.3);
    upperSuiteGroup.add(balustrade);

    const handrail = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.04, 0.08), champagneTrimMaterial);
    handrail.position.set(2.4, 4.87, 4.3);
    upperSuiteGroup.add(handrail);

    // PART 6: Architectural Floating Roof Plane
    const roofGroup = new THREE.Group();
    villaRoot.add(roofGroup);

    const roofSlab = new THREE.Mesh(new THREE.BoxGeometry(14, 0.35, 10), concreteMaterial);
    roofSlab.position.set(-1.5, 6.75, 0);
    roofSlab.castShadow = true;
    roofSlab.receiveShadow = true;
    roofGroup.add(roofSlab);

    // Roof bronze fascia trim
    const roofTrim = new THREE.Mesh(new THREE.BoxGeometry(14.2, 0.1, 10.2), champagneTrimMaterial);
    roofTrim.position.set(-1.5, 6.9, 0);
    roofGroup.add(roofTrim);

    // Roof skylight opening
    const skylightGlass = new THREE.Mesh(new THREE.PlaneGeometry(3.5, 2.2), glassMaterial);
    skylightGlass.rotation.x = -Math.PI / 2;
    skylightGlass.position.set(-3.5, 6.95, -0.5);
    roofGroup.add(skylightGlass);

    // PART 7: Landscaping (Instanced Cypress Trees & Olive Shrubs)
    const foliageMat = new THREE.MeshStandardMaterial({
      color: 0x48583B,
      roughness: 0.9,
      metalness: 0.05
    });
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x4A3B2C,
      roughness: 0.95
    });

    const treePositions = [
      [-10, 0, -6], [-11, 0, -3], [-11.5, 0, 1], [-10.5, 0, 5],
      [-9, 0, 7], [9, 0, -6], [10.5, 0, -3], [11, 0, 2]
    ];

    treePositions.forEach(([x, y, z], idx) => {
      const treeGroup = new THREE.Group();
      treeGroup.position.set(x, y, z);
      const scale = 0.85 + Math.random() * 0.35;
      treeGroup.scale.set(scale, scale, scale);

      // Cypress conical body
      const foliage = new THREE.Mesh(new THREE.ConeGeometry(0.7, 4.2, 8), foliageMat);
      foliage.position.y = 2.4;
      foliage.castShadow = true;
      treeGroup.add(foliage);

      // Tree trunk
      const trunk = new THREE.Mesh(new THREE.CylinderGeometry(0.12, 0.16, 0.8, 8), trunkMat);
      trunk.position.y = 0.4;
      trunk.castShadow = true;
      treeGroup.add(trunk);

      foundationGroup.add(treeGroup);
    });

    // PART 8: Perimeter Stone Low Walls & Soft Ground Contact Shadow
    const gardenWallMat = new THREE.MeshStandardMaterial({ color: 0xCCC5B8, roughness: 0.95 });
    const wall1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 1.2, 18), gardenWallMat);
    wall1.position.set(-13, 0.6, 0);
    wall1.castShadow = true;
    foundationGroup.add(wall1);

    const wall2 = new THREE.Mesh(new THREE.BoxGeometry(22, 1.2, 0.4), gardenWallMat);
    wall2.position.set(-2, 0.6, -9);
    wall2.castShadow = true;
    foundationGroup.add(wall2);

    // Soft contact grounding shadow plane flush with ground (avoid Z-fight via offset)
    const contactShadowPlane = new THREE.Mesh(
      new THREE.PlaneGeometry(32, 28),
      new THREE.MeshBasicMaterial({
        map: shadowTex,
        transparent: true,
        opacity: 0.55,
        depthWrite: false
      })
    );
    contactShadowPlane.rotation.x = -Math.PI / 2;
    contactShadowPlane.position.set(0, 0.015, 0);
    scene.add(contactShadowPlane);

    // Pre-warm shaders
    renderer.compile(scene, camera);

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || (isHero ? 540 : 480);
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(() => {
        handleResize();
      });
      resizeObserver.observe(container);
    }

    // Animation Render Loop with Silky Exponential Damping
    let animId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const elapsed = clock.getElapsedTime();

      const s = stateRef.current;

      // 1. Camera interpolation when transitioning between presets
      if (s.isTransitioningCam) {
        camera.position.lerp(s.camTargetPos, 1 - Math.exp(-4 * delta));
        controls.target.lerp(s.camLookAt, 1 - Math.exp(-4 * delta));
        if (camera.position.distanceTo(s.camTargetPos) < 0.05) {
          s.isTransitioningCam = false;
        }
      }

      // 2. Exploded Floor Separation damping
      s.explodedRatio = THREE.MathUtils.damp(s.explodedRatio, s.targetExplodedRatio, 6, delta);
      upperSuiteGroup.position.y = s.explodedRatio * 1.5;
      roofGroup.position.y = s.explodedRatio * 3.2;

      // 3. Pool water gentle surface oscillation
      poolWater.position.y = 0.58 + Math.sin(elapsed * 1.8) * 0.01;

      // 4. Fireplace subtle flicker
      interiorLight1.intensity = 3.2 + Math.sin(elapsed * 6.0) * 0.4;

      // 5. Lighting preset color dynamics
      if (s.lighting === 'golden-hour') {
        scene.background = fogColor.set(0xF7F2E8);
        (scene.fog as THREE.FogExp2).color.set(0xF7F2E8);
        dirKeyLight.color.set(0xFFB866);
        dirKeyLight.intensity = 2.6;
        hemiLight.color.set(0xFFEACC);
        hemiLight.groundColor.set(0x736352);
        poolLight.intensity = 1.8;
      } else if (s.lighting === 'crisp-daylight') {
        scene.background = fogColor.set(0xF5F6F8);
        (scene.fog as THREE.FogExp2).color.set(0xF5F6F8);
        dirKeyLight.color.set(0xFFFFFF);
        dirKeyLight.intensity = 2.8;
        hemiLight.color.set(0xDEE8F0);
        hemiLight.groundColor.set(0x7D786D);
        poolLight.intensity = 0.8;
      } else if (s.lighting === 'twilight') {
        scene.background = fogColor.set(0x181C24);
        (scene.fog as THREE.FogExp2).color.set(0x181C24);
        dirKeyLight.color.set(0x4A6B82);
        dirKeyLight.intensity = 0.6;
        hemiLight.color.set(0x283244);
        hemiLight.groundColor.set(0x12151B);
        poolLight.intensity = 4.2;
      }

      // 6. Auto-orbit rotation if enabled
      controls.autoRotate = s.autoRotate && !s.isTransitioningCam;
      controls.autoRotateSpeed = 0.8;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      controls.dispose();
      renderer.dispose();
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className={`relative w-full overflow-hidden bg-[#F7F5F0] select-none ${className}`}>
      {/* 3D WebGL Canvas Container */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ minHeight: isHero ? '540px' : '480px' }}
      />

      {/* Top Left Minimal Spec Badge (Quiet Luxury, Zero Occlusion) */}
      <div className="absolute top-6 left-6 z-10 pointer-events-none">
        <div className="bg-[#242522]/90 text-[#F7F5F0] px-3.5 py-2 rounded-sm border border-white/10 shadow-sm flex items-center space-x-3 pointer-events-auto">
          <div className="w-2 h-2 rounded-full bg-[#B79A69]" />
          <div>
            <p className="text-[10px] tracking-widest uppercase text-[#B79A69] font-medium">Spatial Architecture Tour</p>
            <h4 className="text-xs font-serif tracking-wide text-white font-medium">The Glasshouse Residence — 8,400 sq ft</h4>
          </div>
        </div>
      </div>

      {/* Top Right Quick Controls (Auto-orbit & Fullscreen) */}
      <div className="absolute top-6 right-6 z-10 flex items-center space-x-2">
        <button
          onClick={() => setIsAutoRotating(!isAutoRotating)}
          title="Toggle Auto-Rotation"
          className={`px-3 py-1.5 rounded-sm text-xs font-medium tracking-wider transition-colors border ${
            isAutoRotating 
              ? 'bg-[#242522] text-[#B79A69] border-[#B79A69]/40' 
              : 'bg-white/90 text-[#242522] border-[#E9E2D8] hover:bg-white'
          }`}
        >
          {isAutoRotating ? 'Orbit Active' : 'Orbit Paused'}
        </button>

        <button
          onClick={() => {
            const el = mountRef.current?.parentElement;
            if (!document.fullscreenElement && el) {
              el.requestFullscreen?.();
              setIsFullscreen(true);
            } else if (document.exitFullscreen) {
              document.exitFullscreen();
              setIsFullscreen(false);
            }
          }}
          className="p-1.5 bg-white/90 hover:bg-white text-[#242522] border border-[#E9E2D8] rounded-sm transition-colors"
          title="Toggle Fullscreen"
        >
          {isFullscreen ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
        </button>
      </div>

      {/* Ergonomic Collapsible Bottom Control Dock (Strict Skill Compliance: 100% center unobstructed) */}
      <div 
        className={`absolute bottom-6 left-1/2 -translate-x-1/2 z-20 w-[94vw] max-w-[820px] transition-all duration-300 ease-out`}
        style={{
          transform: isControlsCollapsed 
            ? 'translate(-50%, calc(100% - 32px))' 
            : 'translate(-50%, 0)'
        }}
      >
        {/* Collapse / Expand Tab */}
        <div className="flex justify-center mb-1">
          <button
            onClick={() => setIsControlsCollapsed(!isControlsCollapsed)}
            className="flex items-center space-x-1.5 bg-[#242522] text-[#F7F5F0] text-[11px] uppercase tracking-widest px-3 py-1 rounded-t-sm border-t border-x border-white/10 hover:text-[#B79A69] transition-colors"
          >
            <span>{isControlsCollapsed ? 'Show Controls' : 'Hide Controls'}</span>
            {isControlsCollapsed ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
          </button>
        </div>

        {/* Unified Bottom Dock Surface (Solid/rgba without backdrop-filter) */}
        <div className="bg-[#242522]/95 border border-[#38342E] rounded-sm p-4 text-[#F7F5F0] shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            
            {/* 1. Camera Viewpoints */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#A69B8A] mb-2 flex items-center space-x-1">
                <Camera size={12} className="text-[#B79A69]" />
                <span>Camera Perspective</span>
              </p>
              <div className="grid grid-cols-4 gap-1">
                {(['pool', 'balcony', 'garden', 'aerial'] as CameraPreset[]).map((cam) => (
                  <button
                    key={cam}
                    onClick={() => handleSelectCamera(cam)}
                    className={`py-1.5 text-[11px] uppercase tracking-wider rounded-sm transition-colors border ${
                      activeCamera === cam
                        ? 'bg-[#B79A69] text-[#242522] font-semibold border-[#B79A69]'
                        : 'bg-[#2E2F2B] text-[#D8D2C6] border-white/5 hover:bg-[#383935]'
                    }`}
                  >
                    {cam}
                  </button>
                ))}
              </div>
            </div>

            {/* 2. Atmospheric Lighting Presets */}
            <div>
              <p className="text-[10px] uppercase tracking-wider text-[#A69B8A] mb-2 flex items-center space-x-1">
                <Sunset size={12} className="text-[#B79A69]" />
                <span>Atmosphere & Time</span>
              </p>
              <div className="grid grid-cols-3 gap-1">
                <button
                  onClick={() => setActiveLighting('golden-hour')}
                  className={`py-1.5 px-1 text-[11px] uppercase tracking-wider rounded-sm flex items-center justify-center space-x-1 transition-colors border ${
                    activeLighting === 'golden-hour'
                      ? 'bg-[#B79A69] text-[#242522] font-semibold border-[#B79A69]'
                      : 'bg-[#2E2F2B] text-[#D8D2C6] border-white/5 hover:bg-[#383935]'
                  }`}
                >
                  <Sunset size={12} />
                  <span>Golden</span>
                </button>
                <button
                  onClick={() => setActiveLighting('crisp-daylight')}
                  className={`py-1.5 px-1 text-[11px] uppercase tracking-wider rounded-sm flex items-center justify-center space-x-1 transition-colors border ${
                    activeLighting === 'crisp-daylight'
                      ? 'bg-[#B79A69] text-[#242522] font-semibold border-[#B79A69]'
                      : 'bg-[#2E2F2B] text-[#D8D2C6] border-white/5 hover:bg-[#383935]'
                  }`}
                >
                  <Sun size={12} />
                  <span>Daylight</span>
                </button>
                <button
                  onClick={() => setActiveLighting('twilight')}
                  className={`py-1.5 px-1 text-[11px] uppercase tracking-wider rounded-sm flex items-center justify-center space-x-1 transition-colors border ${
                    activeLighting === 'twilight'
                      ? 'bg-[#B79A69] text-[#242522] font-semibold border-[#B79A69]'
                      : 'bg-[#2E2F2B] text-[#D8D2C6] border-white/5 hover:bg-[#383935]'
                  }`}
                >
                  <Moon size={12} />
                  <span>Dusk</span>
                </button>
              </div>
            </div>

            {/* 3. Floor Exploded View Inspection */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <p className="text-[10px] uppercase tracking-wider text-[#A69B8A] flex items-center space-x-1">
                  <Layers size={12} className="text-[#B79A69]" />
                  <span>Architectural Layering</span>
                </p>
                <span className="text-[10px] text-[#B79A69] font-mono">
                  {explodedRatio === 0 ? 'Integrated' : `${Math.round(explodedRatio * 100)}% Split`}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="1"
                step="0.01"
                value={explodedRatio}
                onChange={(e) => setExplodedRatio(parseFloat(e.target.value))}
                className="w-full h-1.5 bg-[#3A3B36] rounded-lg appearance-none cursor-pointer accent-[#B79A69]"
              />
              <div className="flex justify-between text-[9px] uppercase tracking-wider text-[#7E786E] mt-1">
                <span>Assembled</span>
                <span>Explode Floors</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
