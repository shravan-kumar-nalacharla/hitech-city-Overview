/**
 * Procedural PBR Texture Generator for Cyber Towers
 * Generates ultra-realistic Glass Facade, Architectural Concrete, Brushed Metal & Plaza maps.
 */

import * as THREE from 'three';

export function createGlassFacadeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // 1. Base Glass Tint
  ctx.fillStyle = '#0f1c2e';
  ctx.fillRect(0, 0, 1024, 1024);

  // 2. Window Grid Parameters
  const cols = 16;
  const rows = 32;
  const cellW = 1024 / cols;
  const cellH = 1024 / rows;
  const padding = 3;

  // 3. Emissive Canvas for glowing office lights
  const emissiveCanvas = document.createElement('canvas');
  emissiveCanvas.width = 1024;
  emissiveCanvas.height = 1024;
  const emissiveCtx = emissiveCanvas.getContext('2d');
  emissiveCtx.fillStyle = '#000000';
  emissiveCtx.fillRect(0, 0, 1024, 1024);

  // 4. Bump Canvas for window frames
  const bumpCanvas = document.createElement('canvas');
  bumpCanvas.width = 1024;
  bumpCanvas.height = 1024;
  const bumpCtx = bumpCanvas.getContext('2d');
  bumpCtx.fillStyle = '#808080';
  bumpCtx.fillRect(0, 0, 1024, 1024);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cellW + padding;
      const y = r * cellH + padding;
      const w = cellW - padding * 2;
      const h = cellH - padding * 2;

      // Dark Frame around window pane (Bump)
      bumpCtx.fillStyle = '#101010'; // Inset frame
      bumpCtx.fillRect(x - 1, y - 1, w + 2, h + 2);
      bumpCtx.fillStyle = '#ffffff'; // Raised glass pane
      bumpCtx.fillRect(x, y, w, h);

      // Glass Color Gradient
      const grad = ctx.createLinearGradient(x, y, x, y + h);
      grad.addColorStop(0, '#1e385b');
      grad.addColorStop(0.5, '#12253f');
      grad.addColorStop(1, '#0b1626');
      ctx.fillStyle = grad;
      ctx.fillRect(x, y, w, h);

      // Randomly lit interior office lights
      const isLit = Math.random() > 0.45;
      if (isLit) {
        const lightColor = Math.random() > 0.3 ? '#ffea9f' : '#88e5ff'; // Warm gold or cyan light
        emissiveCtx.fillStyle = lightColor;
        emissiveCtx.fillRect(x + 2, y + 2, w - 4, h - 4);

        // Add soft interior glow on color map
        ctx.fillStyle = lightColor;
        ctx.globalAlpha = 0.45;
        ctx.fillRect(x + 2, y + 2, w - 4, h - 4);
        ctx.globalAlpha = 1.0;
      }
    }
  }

  // Draw metallic floor dividers every 4 rows
  ctx.fillStyle = '#334155';
  bumpCtx.fillStyle = '#ffffff';
  for (let r = 0; r < rows; r += 4) {
    ctx.fillRect(0, r * cellH, 1024, 4);
    bumpCtx.fillRect(0, r * cellH, 1024, 4);
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;

  const emissiveMap = new THREE.CanvasTexture(emissiveCanvas);
  emissiveMap.wrapS = THREE.RepeatWrapping;
  emissiveMap.wrapT = THREE.RepeatWrapping;

  const bumpMap = new THREE.CanvasTexture(bumpCanvas);
  bumpMap.wrapS = THREE.RepeatWrapping;
  bumpMap.wrapT = THREE.RepeatWrapping;

  return { map, emissiveMap, bumpMap };
}

export function createConcreteTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Base Concrete Slate
  ctx.fillStyle = '#525b68';
  ctx.fillRect(0, 0, 512, 512);

  // Add noise grain
  const imgData = ctx.getImageData(0, 0, 512, 512);
  const data = imgData.data;
  for (let i = 0; i < data.length; i += 4) {
    const noise = (Math.random() - 0.5) * 35;
    data[i] = Math.min(255, Math.max(0, data[i] + noise));
    data[i + 1] = Math.min(255, Math.max(0, data[i + 1] + noise));
    data[i + 2] = Math.min(255, Math.max(0, data[i + 2] + noise));
  }
  ctx.putImageData(imgData, 0, 0);

  // Panel Seams
  ctx.strokeStyle = '#2d343f';
  ctx.lineWidth = 3;
  for (let x = 0; x <= 512; x += 128) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }
  for (let y = 0; y <= 512; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(512, y);
    ctx.stroke();
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;

  return map;
}

export function createBrushedMetalTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#8a99ad';
  ctx.fillRect(0, 0, 512, 512);

  // Horizontal brush streaks
  ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
  for (let i = 0; i < 400; i++) {
    const y = Math.random() * 512;
    const h = Math.random() * 3 + 1;
    ctx.fillRect(0, y, 512, h);
  }

  ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
  for (let i = 0; i < 400; i++) {
    const y = Math.random() * 512;
    const h = Math.random() * 3 + 1;
    ctx.fillRect(0, y, 512, h);
  }

  const map = new THREE.CanvasTexture(canvas);
  map.wrapS = THREE.RepeatWrapping;
  map.wrapT = THREE.RepeatWrapping;

  return map;
}
