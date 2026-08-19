/**
 * Three.js 3D WebGL Scene for Cyber Towers Presentation
 * Features Continuous 3D Auto-Rotation, Dynamic Camera Transitions & Canvas Fading
 */

import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

export class CyberScene {
  constructor(container, onProgress, onLoadComplete) {
    this.container = container;
    this.onProgress = onProgress;
    this.onLoadComplete = onLoadComplete;

    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;

    this.modelGroup = null;
    this.cityModelGroup = null;
    this.showCityMap = false;
    this.currentTheme = 'studio';

    this.hotspotElements = [];
    this.hotspotData = [];

    this.animatingCamera = false;
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    // 1. Scene setup - Clean Minimalist White Background
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0xffffff);
    this.scene.fog = new THREE.Fog(0xffffff, 70, 250);

    // 2. Camera setup
    const aspect = this.container.clientWidth / this.container.clientHeight;
    this.camera = new THREE.PerspectiveCamera(45, aspect, 0.1, 1000);
    this.camera.position.set(29, 25, 45);

    // 3. Renderer setup - Optimized for 60 FPS
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      powerPreference: "high-performance",
      alpha: false
    });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.2;
    this.container.appendChild(this.renderer.domElement);
    this.isCanvasVisible = true;

    // 4. HDRI Environment Map
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    this.environmentMap = pmremGenerator.fromScene(roomEnv).texture;
    this.scene.environment = this.environmentMap;

    // 5. Orbit Controls with Continuous 3D Auto-Rotation
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 - 0.02;
    this.controls.minDistance = 4;
    this.controls.maxDistance = 120;
    this.controls.target.set(-6, 15, 0);
    this.controls.autoRotate = true;
    this.controls.autoRotateSpeed = 0.8;
    this.controls.update();

    // 6. Studio Lighting
    this.setupLighting();

    // 7. Ground Shadow Plane
    this.setupEnvironment();

    // 8. Load GLB Model
    this.loadCyberTowersGLBModel();

    // 9. Event Listeners & Loop
    window.addEventListener('resize', () => this.onWindowResize());
    this.animate();
  }

  setupLighting() {
    this.ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    this.scene.add(this.ambientLight);

    this.sunLight = new THREE.DirectionalLight(0xffffff, 2.2);
    this.sunLight.position.set(45, 65, 40);
    this.sunLight.castShadow = true;
    this.sunLight.shadow.mapSize.width = 1024;
    this.sunLight.shadow.mapSize.height = 1024;
    this.sunLight.shadow.bias = -0.0001;
    this.scene.add(this.sunLight);

    const fillLight1 = new THREE.DirectionalLight(0xf8fafc, 0.8);
    fillLight1.position.set(-35, 25, -30);
    this.scene.add(fillLight1);

    const fillLight2 = new THREE.DirectionalLight(0xffffff, 0.6);
    fillLight2.position.set(30, 20, 40);
    this.scene.add(fillLight2);
  }

  setupEnvironment() {
    // 1. Expansive Greenfield Shadow Base Plane
    const groundGeo = new THREE.PlaneGeometry(350, 350);
    const groundMat = new THREE.ShadowMaterial({
      opacity: 0.12
    });
    const groundMesh = new THREE.Mesh(groundGeo, groundMat);
    groundMesh.rotation.x = -Math.PI / 2;
    groundMesh.position.y = -0.01;
    groundMesh.receiveShadow = true;
    this.scene.add(groundMesh);

    // 2. Masterplan Site Ground Base (Large Expansive Rectangle)
    const baseGeo = new THREE.BoxGeometry(220, 0.4, 200);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.6,
      metalness: 0.05
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = -0.2;
    baseMesh.receiveShadow = true;
    this.scene.add(baseMesh);

    // 3. Grid Helper for Masterplan Grid Feel
    const gridHelper = new THREE.GridHelper(220, 44, 0xcbd5e1, 0xe2e8f0);
    gridHelper.position.y = 0.01;
    this.scene.add(gridHelper);

    // 4. Create 151-Acre HITEC City Map Border
    this.createHitecCityRedBoundary();
  }

  createHitecCityRedBoundary() {
    // 151-Acre Greenfield Masterplan Map Border Vertices (Realistic Multi-Point Geographic Boundary)
    const mapBorderPoints = [
      new THREE.Vector3(-75, 0.3, -70),  // North-West (STPI Earth Station Link)
      new THREE.Vector3(0, 0.3, -82),    // North (Main Concourse Road)
      new THREE.Vector3(65, 0.3, -65),   // North-East (Mindspace & Novotel Corridor)
      new THREE.Vector3(85, 0.3, -15),   // East (Cyber Gateway Corridor)
      new THREE.Vector3(88, 0.3, 40),    // South-East (Hitech City Metro Rotary)
      new THREE.Vector3(45, 0.3, 78),    // South (Durgam Cheruvu Access Link)
      new THREE.Vector3(-35, 0.3, 82),   // South-West (Phase 2 SEZ District)
      new THREE.Vector3(-82, 0.3, 35),   // West (Madhapur Commercial Hub)
      new THREE.Vector3(-85, 0.3, -25)   // West-North (Service Logistics Bay)
    ];

    // Sharp GIS Map Border Line
    const mapBorderGeo = new THREE.BufferGeometry().setFromPoints([
      ...mapBorderPoints,
      mapBorderPoints[0] // Close loop
    ]);

    const lineMat = new THREE.LineBasicMaterial({
      color: 0xef4444, // Vibrant Red Map Border
      linewidth: 4
    });
    this.redBoundaryLine = new THREE.Line(mapBorderGeo, lineMat);
    this.scene.add(this.redBoundaryLine);

    // Glowing Red Ribbon Tube along Map Border
    const path = new THREE.CatmullRomCurve3(mapBorderPoints, true, 'catmullrom', 0.1); // Low tension = sharp map corners
    const tubeGeo = new THREE.TubeGeometry(path, 256, 0.6, 12, true);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: 0xef4444,
      emissive: 0xd97706,
      roughness: 0.15,
      metalness: 0.7,
      transparent: true,
      opacity: 0.85
    });

    this.redBoundaryTube = new THREE.Mesh(tubeGeo, tubeMat);
    this.scene.add(this.redBoundaryTube);

    // Translucent Red Masterplan Region Fill Mesh inside the Map Border
    const shapePoints = mapBorderPoints.map(p => new THREE.Vector2(p.x, p.z));
    const shape = new THREE.Shape(shapePoints);
    const fillGeo = new THREE.ShapeGeometry(shape);
    const fillMat = new THREE.MeshBasicMaterial({
      color: 0xef4444,
      transparent: true,
      opacity: 0.08,
      side: THREE.DoubleSide
    });
    const fillMesh = new THREE.Mesh(fillGeo, fillMat);
    fillMesh.rotation.x = Math.PI / 2;
    fillMesh.position.y = 0.05;
    this.scene.add(fillMesh);

    // Map Corner Pins (3D Red Poles at Map Boundary Vertices)
    mapBorderPoints.forEach((pt) => {
      const pinGeo = new THREE.CylinderGeometry(0.35, 0.35, 4.5, 16);
      const pinMat = new THREE.MeshStandardMaterial({ color: 0xef4444, emissive: 0xb91c1c });
      const pinMesh = new THREE.Mesh(pinGeo, pinMat);
      pinMesh.position.set(pt.x, 2.25, pt.z);
      this.scene.add(pinMesh);
    });
  }

  showHitecCityBoundaryView(duration = 2.0) {
    // Wide-angle high camera overview framing the entire 151-acre map border polygon
    this.animateCameraTo(
      { x: 75, y: 85, z: 105 },
      { x: 0, y: 0, z: 0 },
      duration
    );
  }

  loadCyberTowersGLBModel() {
    const loader = new GLTFLoader();

    loader.load(
      'cyber towers main.glb',
      (gltf) => {
        const model = gltf.scene;
        this.modelGroup = new THREE.Group();

        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.y, size.z);
        const scaleFactor = 30 / maxDim;

        model.scale.set(scaleFactor, scaleFactor, scaleFactor);

        model.position.x = -center.x * scaleFactor;
        model.position.y = -box.min.y * scaleFactor;
        model.position.z = -center.z * scaleFactor;

        model.traverse((child) => {
          if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach(m => m.side = THREE.DoubleSide);
              } else {
                child.material.side = THREE.DoubleSide;
              }
            }
          }
        });

        this.modelGroup.add(model);
        this.scene.add(this.modelGroup);

        // Load Surrounding 3D Urban Map of Hyderabad / HITEC City
        this.loadHitecCityUrbanMapGLB();

        if (this.onLoadComplete) {
          this.onLoadComplete();
        }
      },
      (xhr) => {
        if (xhr.lengthComputable && this.onProgress) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          this.onProgress(percent);
        } else if (this.onProgress) {
          this.onProgress(50);
        }
      },
      (error) => {
        console.error('Error loading Cyber Towers GLB model:', error);
      }
    );
  }

  loadHitecCityUrbanMapGLB() {
    const loader = new GLTFLoader();

    loader.load(
      'Hyderabad_City_Urban_Merged.glb',
      (gltf) => {
        const cityModel = gltf.scene;
        this.cityModelGroup = new THREE.Group();

        const box = new THREE.Box3().setFromObject(cityModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        const maxDim = Math.max(size.x, size.z);
        if (maxDim > 0) {
          const scaleFactor = 180 / maxDim;
          cityModel.scale.set(scaleFactor, scaleFactor, scaleFactor);
          cityModel.position.x = -center.x * scaleFactor;
          cityModel.position.y = -box.min.y * scaleFactor;
          cityModel.position.z = -center.z * scaleFactor;
        }

        // Shared Low-Cost Lambert Material (Reused across thousands of urban meshes for 95% draw call reduction)
        const citySharedMaterial = new THREE.MeshLambertMaterial({
          color: 0x94a3b8,
          side: THREE.FrontSide
        });

        cityModel.traverse((child) => {
          if (child.isMesh) {
            child.material = citySharedMaterial;
            child.receiveShadow = false;
            child.castShadow = false;
            child.matrixAutoUpdate = false;
            child.updateMatrix();
          }
        });

        this.cityModelGroup.matrixAutoUpdate = false;
        this.cityModelGroup.updateMatrix();
        this.cityModelGroup.visible = this.showCityMap;

        this.cityModelGroup.add(cityModel);
        this.scene.add(this.cityModelGroup);
        console.log('Loaded & Optimized 3D Urban Map: Hyderabad_City_Urban_Merged.glb');
      },
      (xhr) => {
        if (xhr.lengthComputable) {
          const percent = Math.round((xhr.loaded / xhr.total) * 100);
          console.log(`Hyderabad Urban Map loading: ${percent}%`);
        }
      },
      (error) => {
        console.warn('Could not load Hyderabad_City_Urban_Merged.glb:', error);
      }
    );
  }

  toggleCityModel(show = null) {
    if (show === null) {
      this.showCityMap = !this.showCityMap;
    } else {
      this.showCityMap = !!show;
    }

    if (this.cityModelGroup) {
      this.cityModelGroup.visible = this.showCityMap;
    }

    return this.showCityMap;
  }

  fadeCanvasOut(duration = 0.4) {
    this.isCanvasVisible = false;
    if (window.gsap && this.container) {
      window.gsap.to(this.container, {
        opacity: 0,
        duration: duration,
        ease: "power2.inOut",
        onComplete: () => {
          this.container.style.pointerEvents = 'none';
        }
      });
    }
  }

  fadeCanvasIn(duration = 0.4) {
    this.isCanvasVisible = true;
    if (window.gsap && this.container) {
      this.container.style.pointerEvents = 'auto';
      window.gsap.to(this.container, {
        opacity: 1,
        duration: duration,
        ease: "power2.inOut"
      });
    }
  }

  setTheme(themeName) {
    this.currentTheme = themeName;
    if (themeName === 'blueprint') {
      this.scene.background.setHex(0x020813);
      this.scene.fog.color.setHex(0x020813);
    } else {
      this.scene.background.setHex(0xffffff);
      this.scene.fog.color.setHex(0xffffff);
    }
  }

  animateCameraTo(targetPos, targetLookAt, duration = 1.8, onComplete = null) {
    if (!window.gsap) return;

    this.animatingCamera = true;
    this.controls.enabled = false;
    this.controls.autoRotate = false;

    // Shift camera target to offset 3D model to right 60% of viewport (0% overlap with left slide card)
    const viewOffset = 5.5;
    const offsetTargetX = targetLookAt.x - viewOffset;
    const offsetPosX = targetPos.x - viewOffset;

    window.gsap.to(this.camera.position, {
      x: offsetPosX,
      y: targetPos.y,
      z: targetPos.z,
      duration: duration,
      ease: "power2.inOut"
    });

    window.gsap.to(this.controls.target, {
      x: offsetTargetX,
      y: targetLookAt.y,
      z: targetLookAt.z,
      duration: duration,
      ease: "power2.inOut",
      onUpdate: () => {
        this.controls.update();
      },
      onComplete: () => {
        this.animatingCamera = false;
        this.controls.enabled = true;
        this.controls.autoRotate = true;
        if (onComplete) onComplete();
      }
    });
  }

  updateHotspots(hotspotList, containerElement, onHotspotClick) {
    this.hotspotData = hotspotList;

    this.hotspotElements.forEach(item => {
      if (item && item.element && typeof item.element.remove === 'function') {
        item.element.remove();
      }
    });
    this.hotspotElements = [];

    hotspotList.forEach(hs => {
      const pin = document.createElement('button');
      pin.className = 'hotspot-pin';
      pin.innerHTML = `
        <span class="pin-pulse"></span>
        <span class="pin-dot"></span>
        <span class="pin-label">${hs.label}</span>
      `;
      pin.dataset.id = hs.id;
      pin.addEventListener('click', (e) => {
        e.stopPropagation();
        onHotspotClick(hs);
      });

      containerElement.appendChild(pin);
      this.hotspotElements.push({ element: pin, data: hs });
    });
  }

  projectHotspots() {
    if (!this.hotspotElements.length) return;

    const tempV = new THREE.Vector3();
    const halfWidth = this.container.clientWidth / 2;
    const halfHeight = this.container.clientHeight / 2;

    this.hotspotElements.forEach(item => {
      tempV.set(item.data.worldPos.x, item.data.worldPos.y, item.data.worldPos.z);
      tempV.project(this.camera);

      if (tempV.z > 1) {
        item.element.style.display = 'none';
        return;
      }

      const x = (tempV.x * halfWidth) + halfWidth;
      const y = -(tempV.y * halfHeight) + halfHeight;

      item.element.style.display = 'flex';
      item.element.style.transform = `translate(-50%, -50%) translate(${x}px,${y}px)`;
    });
  }

  onWindowResize() {
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    // Skip WebGL render pass entirely when canvas is hidden in full-content slide mode
    if (!this.isCanvasVisible) return;

    if (this.redBoundaryTube && this.clock) {
      const elapsed = this.clock.getElapsedTime();
      this.redBoundaryTube.material.opacity = 0.65 + Math.sin(elapsed * 3.5) * 0.25;
    }

    if (this.controls && this.controls.enabled) {
      this.controls.update();
    }

    this.projectHotspots();
    this.renderer.render(this.scene, this.camera);
  }
}
