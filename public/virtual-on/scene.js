'use strict';

(() => {
  const canvas = document.getElementById('scene');
  const square = canvas.dataset.layout === 'square';
  const ctx = canvas.getContext('2d', { alpha: false });
  const $ = id => document.getElementById(id);
  const vignette = document.querySelector('.vignette');
  const intro = document.querySelector('.intro');
  const brandGreen = '#63DF4E';
  const chestLogo = new Image();
  const monoChestLogo = document.createElement('canvas');
  // Pure-light only: the page inverts the canvas through a CSS filter, so colours are pre-compensated to land where they would on the normal render.
  let PURE = false;
  const preComp = (hex, k = 1) => {
    const m = /^#([0-9a-f]{6})$/i.exec(hex);
    if (!m) return hex;
    const out = [0, 2, 4].map(i => parseInt(m[1].slice(i, i + 2), 16) / 255 * k);
    const into = out.map(v => Math.min(1, Math.max(0, (v + 1.95) / 3)));
    const M = [[-0.574, 1.43, 0.144], [0.426, 0.43, 0.144], [0.426, 1.43, -0.856]];
    return `rgb(${M.map(r => Math.round(255 * Math.min(1, Math.max(0, 1 - (r[0] * into[0] + r[1] * into[1] + r[2] * into[2]))))).join(',')})`;
  };
  // A deeper, more saturated shade of an accent so titles hold up on the light ground.
  const deepen = (hex, l = 0.4) => {
    const m = /^#([0-9a-f]{6})$/i.exec(hex);
    if (!m) return hex;
    const [r, g, b] = [0, 2, 4].map(i => parseInt(m[1].slice(i, i + 2), 16) / 255);
    const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
    let h = 0;
    if (d) h = max === r ? ((g - b) / d + 6) % 6 : max === g ? (b - r) / d + 2 : (r - g) / d + 4;
    const sat = Math.min(1, (d / (1 - Math.abs(max + min - 1) || 1)) * 1.3 + 0.2);
    const c = (1 - Math.abs(2 * l - 1)) * sat, x = c * (1 - Math.abs(h % 2 - 1)), mm = l - c / 2;
    const [R, G, B] = h < 1 ? [c, x, 0] : h < 2 ? [x, c, 0] : h < 3 ? [0, c, x] : h < 4 ? [0, x, c] : h < 5 ? [x, 0, c] : [c, 0, x];
    return '#' + [R, G, B].map(v => Math.round((v + mm) * 255).toString(16).padStart(2, '0')).join('');
  };
  let whiteInk = '#f2f7f8';
  let flashRgb = '242,247,248';
  // Light theme on the page = pure-light: the scene is inverted by a CSS filter, so colours above are pre-compensated while it is on.
  const syncPure = () => {
    const app = document.getElementById('app');
    PURE = !!window.PURE_LIGHT && !!app && app.dataset.theme === 'light';
    whiteInk = PURE ? 'rgb(4,4,4)' : '#f2f7f8';
    flashRgb = PURE ? '4,4,4' : '242,247,248';
  };
  const pureLineLogo = document.createElement('canvas');
  const content = {
    title: 'Virtuality — A Line Study',
    header: 'A STUDY IN MOTION',
    subtitle: 'SEVEN SILHOUETTES / ONE SEQUENCE',
    description: 'A mechanical study in light and line.',
    systemLabel: 'SYSTEM CHARGE',
    completion: ['SIGNAL LOST', 'OUTCOME / UNCONFIRMED'],
    units: [
      { id: 1, name: 'Virtuaroid 1', kind: 'rifle', material: 'blue', accent: brandGreen, start: 0, heading: ['Otto.', 'Guided build.'], caption: 'Use ServiceNow Otto to guide and help building integrations.', detail: 'LAUNCH GANTRY', action: 'DEPLOYING' },
      { id: 2, name: 'Virtuaroid 2', kind: 'agile', material: 'rose', accent: '#e7a2bb', start: 9.1, heading: ['Integration Hub.', 'REST Integration.'], caption: 'Flexibly connect to most applications using REST.', detail: 'BALANCE STUDY', action: 'RESONATING' },
      { id: 3, name: 'Virtuaroid 3', kind: 'aerial', material: 'violet', accent: '#b3a9ed', start: 14, heading: ['Zero Copy for SQL.', 'Cloud Data.'], caption: 'Access Cloud Data Warehouses without copying.', detail: 'FLIGHT STUDY', action: 'ASCENDING' },
      { id: 4, name: 'Virtuaroid 4', kind: 'heavy', material: 'blue', accent: '#89b6ec', start: 17.45, heading: ['Zero Copy for ERP.', 'Legacy ERP.'], caption: 'Connect to legacy ERP without the complexity.', detail: 'DUAL ARRAY STUDY', action: 'DISCHARGING' },
      { id: 5, name: 'Virtuaroid 5', kind: 'siege', material: 'gold', accent: '#d2b879', start: 21.45, heading: ['External Content.', 'Unstructured documents.'], caption: 'Index and easily access unstructured documents.', detail: 'MASS STUDY', action: 'ACTUATING' },
      { id: 6, name: 'Virtuaroid 6', kind: 'close', material: 'mint', accent: brandGreen, start: 24.25, heading: ['Stream Connect.', 'Fast streaming data.'], caption: 'Produce and consume data at speed with Kafka.', detail: 'ARTICULATION STUDY', action: 'ENGAGING' },
      { id: 7, name: 'Virtuaroid 7', kind: 'orbital', material: 'violet', accent: '#b3a9ed', start: 26.95, heading: ['Agent Fabric.', 'MCP Client/Server.'], caption: 'Use the latest protocols to access skills and tools.', detail: 'ORBITAL STUDY', action: 'SYNCHRONIZING' }
    ],
    finale: { start: 30.85, name: 'Unknown unit', heading: ['USE CASE:', 'Financial Intelligence.'], caption: 'Integrate multiple sources to manage cost centers.', detail: 'UNKNOWN CONTACT', accent: '#d4a083' },
    closing: { start: 37.85, name: 'Sequence end', heading: ['WORKFLOW', 'DATA FABRIC'], caption: 'End-to-End Lab.', detail: 'END FRAME', accent: brandGreen }
  };
  const chapters = [...content.units, content.finale, content.closing];
  // Chapter starts sit on the hit points of the reference score (title cards
  // and strikes land on them), so a scored cut lines up without retiming.
  const duration = 42;
  const presentation = { responsiveFraming: false };
  // Cut timing follows the source opening's measured cut list: unit 01 gets a
  // long launch, units 02-07 get two fast close-ups, a title card, then the
  // signature move on the full-body framing. Times are chapter wall seconds.
  const launchCuts = { gantry: 1.0, leg: 2.2, visor: 2.8, launch: 3.5, space: 5.6, shoulder: 6.2, title: 7.0, shot: 7.6 };
  const unitCuts = { face: 0.55, body: 1.15, title: 1.75 };
  const finaleCuts = { eye: 1.6, eyes: 2.2, approach: 2.9, silhouette: 3.5, unknown: 4.3, closer: 4.9, zoom: 5.3, dash: 5.65, flash: 6.8 };
  // Motion-clock time of each kind's signature pose and the end of its track.
  const signatureBeats = { agile: [3.1, 6.8], aerial: [3.05, 7.5], heavy: [3.1, 7.1], siege: [2.35, 7.4], close: [2.0, 7.7], orbital: [4.0, 7.6] };
  const chapterLocal = (index, time) => time - chapters[index].start;
  const windUp = kind => Math.max(0.2, signatureBeats[kind][0] - 0.55);
  function chapterClock(index, time) {
    const u = chapterLocal(index, time);
    if (index === 0) return u < 4.6 ? u * 10.6 / 4.6 : Math.min(12, 10.6 + (u - 4.6) * 1.4);
    if (index < 7) {
      const kind = content.units[index].kind;
      if (u < unitCuts.body) return mix(0, windUp(kind), u / unitCuts.body);
      if (u < unitCuts.title) return windUp(kind);
      return Math.min(signatureBeats[kind][1], windUp(kind) + (u - unitCuts.title) * 1.4);
    }
    if (index === 7) return u < finaleCuts.dash ? mix(0.3, 2.4, u / finaleCuts.dash) : 5.6 + (u - finaleCuts.dash) * 1.15;
    return u * 4 / 3;
  }
  // Unit 01's post-launch beat reuses the encounter aim-and-fire keys.
  const spaceClock = u => u < launchCuts.title ? mix(0.9, 2.45, (u - launchCuts.space) / (launchCuts.title - launchCuts.space)) : u < launchCuts.shot ? 2.45 : Math.min(4.85, 2.5 + (u - launchCuts.shot) * 1.25);
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const state = { time: 0, playing: !reducedMotion.matches, loop: true, speed: 1, mono: false, orbit: 0, tilt: 0 };
  let width = 0, height = 0, dpr = 1, last = 0, faces = [], strokes = [], camera;
  let drag = null, model = null, modelOpacity = 1, activeChapter = -1, skeletons = [], emitters = [];
  const chapterAt = time => Math.max(0, chapters.findLastIndex(chapter => time >= chapter.start));
  const formatTime = time => {
    const tenths = Math.round(time * 10);
    return `${String(Math.floor(tenths / 600)).padStart(2, '0')}:${((tenths % 600) / 10).toFixed(1).padStart(4, '0')}`;
  };
  const clamp = (x, a = 0, b = 1) => Math.min(b, Math.max(a, x));
  const mix = (a, b, t) => a + (b - a) * t;
  const smooth = (a, b, t) => { const p = clamp((t - a) / (b - a)); return p * p * (3 - 2 * p); };
  const add = (a, b) => a.map((v, i) => v + b[i]);
  const sub = (a, b) => a.map((v, i) => v - b[i]);
  const mul = (a, s) => a.map(v => v * s);
  const dot = (a, b) => a.reduce((n, v, i) => n + v * b[i], 0);
  const cross = (a, b) => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
  const norm = a => mul(a, 1 / (Math.hypot(...a) || 1));
  const palette = {
    white: { fill: '#12191e', edge: '#afbec5', weight: 0.85 },
    blue: { fill: '#0d1623', edge: '#7194cf', weight: 1.05 },
    rose: { fill: '#21121c', edge: '#c28ca3', weight: 1.05 },
    violet: { fill: '#171425', edge: '#9b91cf', weight: 1.05 },
    mint: { fill: '#111f1b', edge: '#8cae9d', weight: 1.05 },
    gold: { fill: '#201d12', edge: '#b8a06d', weight: 1.05 },
    dark: { fill: '#080e13', edge: '#4d606c', weight: 0.65 },
    teal: { fill: '#15351a', edge: brandGreen, weight: 1.2 },
    amber: { fill: '#211d15', edge: '#b9a77a', weight: 0.8 },
    bay: { fill: '#0a1015', edge: '#364650', weight: 0.65 },
    brace: { fill: '#101920', edge: '#687b86', weight: 0.85 },
    enemy: { fill: '#0b1015', edge: '#7e929b', weight: 0.9 },
    enemyDark: { fill: '#080c10', edge: '#3c505a', weight: 0.7 },
    sensor: { fill: '#15351a', edge: brandGreen, weight: 1.35 },
    warning: { fill: '#271913', edge: '#d4a083', weight: 1.1 },
    alert: { fill: '#3a0c0c', edge: '#ff4a3d', weight: 1.5 }
  };
  const alertRed = '#ff4a3d';
  let alertEyes = false;
  // World mapping of the unit being drawn, so held weapons can aim by body facing.
  let unitFrame = point => point;

  function transform(p, position = [0, 0, 0], rotation = [0, 0, 0]) {
    let [x, y, z] = p;
    let c = Math.cos(rotation[0]), s = Math.sin(rotation[0]);
    [y, z] = [y * c - z * s, y * s + z * c];
    c = Math.cos(rotation[1]); s = Math.sin(rotation[1]);
    [x, z] = [x * c + z * s, -x * s + z * c];
    c = Math.cos(rotation[2]); s = Math.sin(rotation[2]);
    [x, y] = [x * c - y * s, x * s + y * c];
    return [x + position[0], y + position[1], z + position[2]];
  }

  function view(eye, target, roll = 0) {
    const forward = norm(sub(target, eye));
    const level = norm(cross(forward, [0, 1, 0]));
    const flat = cross(level, forward);
    const c = Math.cos(roll), r = Math.sin(roll);
    const right = add(mul(level, c), mul(flat, r));
    return { eye, target, forward, right, up: sub(mul(flat, c), mul(level, r)) };
  }

  function project(p) {
    const rel = sub(p, camera.eye);
    const z = dot(rel, camera.forward);
    const compact = presentation.responsiveFraming && width < 600;
    const focal = height * (square ? 1.8 : compact ? 1.02 : 1.47);
    return { x: width * (square ? 0.64 : compact ? 0.50 : 0.51) + dot(rel, camera.right) * focal / z, y: height * (square ? 0.58 : compact ? 0.535 : 0.49) - dot(rel, camera.up) * focal / z, z };
  }

  function artBounds() {
    return square ? [0, 0, width, height] : [width * 0.26, 124, width * 0.51, height - 304];
  }

  function screenCenter() {
    return { x: width * (square ? 0.64 : 0.51), y: height * (square ? 0.58 : 0.49) };
  }

  function face(points, material = 'white', detail = false, parent = null) {
    const vertices = points.map(p => project(model ? model(p) : p));
    if (vertices.some(p => p.z < 0.5)) return;
    const polygon = { points: vertices, depth: vertices.reduce((sum, p) => sum + p.z, 0) / vertices.length - (detail ? 0.004 : 0), material, opacity: modelOpacity, children: [] };
    (parent ? parent.children : faces).push(polygon);
    return polygon;
  }

  function line(points, color = '#364650', lineWidth = 0.65, alpha = 1) {
    strokes.push({ points: model ? points.map(model) : points, color, lineWidth, alpha: alpha * modelOpacity });
  }

  function prism(outline, depth, position, material = 'white', rotation = [0, 0, 0], taper = 1) {
    const front = outline.map(([x, y]) => transform([x, y, depth / 2], position, rotation));
    const back = outline.map(([x, y]) => transform([x * taper, y * taper, -depth / 2], position, rotation));
    face(back.slice().reverse(), material);
    for (let i = 0; i < front.length; i++) {
      const n = (i + 1) % front.length;
      face([front[i], back[i], back[n], front[n]], material);
    }
    return face(front, material);
  }

  function box(position, size, material = 'white', rotation = [0, 0, 0], bevel = 0.08) {
    const [w, h, d] = size.map(v => v / 2);
    const b = Math.min(w, h) * bevel;
    prism([[-w + b, h], [w - b, h], [w, h - b], [w, -h + b], [w - b, -h], [-w + b, -h], [-w, -h + b], [-w, h - b]], d * 2, position, material, rotation);
  }

  function plate(outline, z, position, material, rotation = [0, 0, 0], parent = null) {
    face(outline.map(([x, y]) => transform([x, y, z], position, rotation)), material, true, parent);
  }

  function cylinder(position, radius, depth, material = 'dark', rotation = [0, 0, 0], count = 10) {
    const outline = Array.from({ length: count }, (_, i) => [Math.cos(i * Math.PI * 2 / count) * radius, Math.sin(i * Math.PI * 2 / count) * radius]);
    return prism(outline, depth, position, material, rotation);
  }

  function chestMark(position, size, parent) {
    if (!parent) return;
    const h = size * 442 / 495;
    const world = [[-size / 2, h / 2, 0], [size / 2, h / 2, 0], [size / 2, -h / 2, 0], [-size / 2, -h / 2, 0]].map(p => {
      const point = add(position, p);
      return model ? model(point) : point;
    });
    parent.children.push({ logo: true, world, opacity: modelOpacity });
  }

  function drawChestMark(mark) {
    if (!chestLogo.complete || !chestLogo.naturalWidth) return;
    const point = (u, v) => ({ u, v, ...project(add(mark.world[0], add(mul(sub(mark.world[1], mark.world[0]), u), mul(sub(mark.world[3], mark.world[0]), v)))) });
    const triangle = (a, b, c) => {
      if ([a, b, c].some(p => p.z < 0.5)) return;
      const du = b.u - a.u, dv = b.v - a.v, eu = c.u - a.u, ev = c.v - a.v;
      const det = du * ev - eu * dv;
      const m11 = ((b.x - a.x) * ev - (c.x - a.x) * dv) / det;
      const m12 = ((b.y - a.y) * ev - (c.y - a.y) * dv) / det;
      const m21 = ((c.x - a.x) * du - (b.x - a.x) * eu) / det;
      const m22 = ((c.y - a.y) * du - (b.y - a.y) * eu) / det;
      ctx.save();ctx.beginPath();ctx.moveTo(a.x, a.y);ctx.lineTo(b.x, b.y);ctx.lineTo(c.x, c.y);ctx.closePath();ctx.clip();
      ctx.globalAlpha = mark.opacity;
      ctx.transform(m11, m12, m21, m22, a.x - m11 * a.u - m21 * a.v, a.y - m12 * a.u - m22 * a.v);
      ctx.drawImage(PURE && pureLineLogo.width ? pureLineLogo : state.mono ? monoChestLogo : chestLogo, 32, 51, 495, 442, 0, 0, 1, 1);
      ctx.restore();
    };
    for (let x = 0; x < 2; x++) for (let y = 0; y < 2; y++) {
      const a = point(x / 2, y / 2), b = point((x + 1) / 2, y / 2), c = point((x + 1) / 2, (y + 1) / 2), d = point(x / 2, (y + 1) / 2);
      triangle(a, b, c);triangle(a, c, d);
    }
  }

  function hangar(t) {
    const release = smooth(2.8, 5.2, t);
    for (let z = -25; z <= 7; z += 4) {
      line([[-5.7, 0, z], [-5.7, 9.2, z], [-4.5, 10.4, z], [4.5, 10.4, z], [5.7, 9.2, z], [5.7, 0, z]], '#26343f', 0.65);
      for (const s of [-1, 1]) {
        box([s * 5.7, 4.7, z], [0.17, 9.4, 0.23], 'bay');
        for (let y = 2; y <= 8; y += 2) {
          line([[s * 5.61, y, z], [s * 5.61, y, z - 3.5], [s * 5.61, y + 1.55, z - 3.5], [s * 5.61, y + 1.55, z]], '#2e414d', 0.7);
          line([[s * 5.59, y + 0.13, z - 0.15], [s * 5.59, y + 0.13, z - 3.35]], '#48606c', 0.65);
        }
      }
      line([[-5.7, 0, z], [5.7, 0, z]], '#293843');
      line([[-3.8, 10.4, z], [-3.8, 10.4, z - 3]], '#577078', 1);
      line([[3.8, 10.4, z], [3.8, 10.4, z - 3]], '#577078', 1);
    }
    for (const x of [-5.7, -4.9, -2.1, -1.7, 0, 1.7, 2.1, 4.9, 5.7]) line([[x, -0.03, -28], [x, -0.03, 15]], Math.abs(x) === 1.7 ? '#566b77' : '#293943', Math.abs(x) === 1.7 ? 1 : 0.6);
    for (const s of [-1, 1]) {
      const x = s * (2.72 + release * 1.58);
      box([x, 4.15, -1.55], [0.6, 8.3, 0.8], 'bay');
      box([x, 0.2, -0.45], [1.55, 0.35, 3.45], 'brace');
      box([x, 6.4, 0], [1.25, 2.4, 0.45], 'brace', [0, -s * release * 0.7, 0]);
      box([x, 6.48, 0.245], [0.92, 1.85, 0.025], 'dark', [0, -s * release * 0.7, 0]);
      box([x, 7.33, 0.3], [0.8, 0.07, 0.02], 'amber');
      box([s * (1.7 + release * 2.6), 3.95, -0.15], [1.2, 0.22, 0.5], 'brace');
      box([s * (1.3 + release * 2.9), 2.2, -0.4], [0.8, 0.25, 0.4], 'brace');
      for (let y = 1; y < 8; y += 0.7) box([x, y, -1.1], [0.12, 0.24, 0.06], 'dark');
      for (let i = 0; i < 5; i++) line([[x - 0.44 + i * 0.18, 5.58, 0.29], [x - 0.30 + i * 0.18, 5.77, 0.29]], '#a9946e', 1);
    }
    box([0, -0.2, -0.05], [5.3, 0.35, 4.5], 'bay');
    box([0, 4.5, -2.1], [1.5, 7.8, 0.3], 'bay');
  }

  function rifleBody(pose) {
    const block = box, shape = prism, panel = plate;
    const joint = (p, radius, depth, r = [0, 0, 0], mat = 'dark') => cylinder(p, radius, depth, mat, r);

    block([0, 5.7, -0.82], [1.36, 1.82, 0.65], 'dark');
    block([0, 5.78, -1.22], [1.12, 1.14, 0.25], 'white');
    block([0, 5.8, -1.37], [0.66, 0.66, 0.06], 'teal');
    for (const s of [-1, 1]) {
      block([s * 0.89, 5.65, -0.9], [0.47, 1.5, 0.68], 'blue');
      joint([s * 0.88, 5.02, -0.95], 0.24, 0.2, [Math.PI / 2, 0, 0]);
    }

    const chest = shape([[-1.18, 0.7], [-0.43, 0.86], [0.43, 0.86], [1.18, 0.7], [1.3, 0.18], [0.84, -0.52], [0.42, -0.72], [-0.42, -0.72], [-0.84, -0.52], [-1.3, 0.18]], 1.16, [0, 5.92, 0], 'blue', [0, 0, 0], 0.86);
    for (const s of [-1, 1]) {
      panel([[-0.19, 0.14], [0.19, 0.14], [0.17, -0.1], [-0.17, -0.1]], 0.61, [s * 0.97, 6.26, 0], 'dark', [0, 0, 0], chest);
      panel([[-0.13, 0.025], [0.13, 0.025], [0.13, -0.025], [-0.13, -0.025]], 0.65, [s * 0.97, 6.3, 0], 'teal', [0, 0, 0], chest);
    }
    panel([[-0.56, 0.6], [0.56, 0.6], [0.67, 0.47], [0.61, -0.53], [-0.61, -0.53], [-0.67, 0.47]], 0.63, [0, 5.92, 0], 'dark', [0, 0, 0], chest);
    chestMark([0, 5.98, 0.65], 1.16, chest);
    block([0, 4.79, 0], [1.02, 0.88, 0.75], 'dark');
    for (let y = 4.48; y < 5.13; y += 0.2) block([0, y, 0.39], [0.87, 0.07, 0.035], 'brace');
    shape([[-0.9, 0.38], [0.9, 0.38], [1.03, -0.12], [0.46, -0.41], [-0.46, -0.41], [-1.03, -0.12]], 0.92, [0, 4.03, 0], 'white');
    block([0, 4.17, 0.51], [0.42, 0.4, 0.12], 'amber');
    block([0, 4.18, 0.59], [0.19, 0.19, 0.045], 'dark');
    shape([[-0.33, 0.4], [0.33, 0.4], [0.26, -0.46], [-0.26, -0.46]], 0.18, [0, 3.66, 0.63], 'white');

    for (const s of [-1, 1]) {
      shape([[-0.42, 0.36], [0.4, 0.4], [0.47, -0.3], [0.22, -0.47], [-0.36, -0.3]], 0.21, [s * 0.78, 3.82, 0.61], 'white', [0.12, 0, -s * 0.14]);
      block([s * 0.78, 3.94, 0.76], [0.32, 0.14, 0.03], 'teal');
    }
    // Two tall white fins rise behind the shoulders, orange along the inner
    // edge: the strongest silhouette cue in the Temjin key art.
    for (const s of [-1, 1]) {
      shape([[-0.24, 0], [0.24, 0], [0.12, 2.1], [-0.02, 2.22]].map(([x, y]) => [s * x, y]), 0.2, [s * 1.12, 6.35, -0.9], 'white', [0, 0, -s * 0.1]);
      shape([[-0.04, 0.1], [0.04, 0.1], [0.02, 1.9], [-0.02, 1.95]], 0.22, [s * 0.96, 6.4, -0.9], 'amber', [0, 0, -s * 0.1]);
    }
    withTransform([0, 6.58, 0], [0, pose.look, 0], 1.05, () => withTransform([0, -6.93, 0], [0, 0, 0], 1, () => {
    joint([0, 6.93, 0], 0.3, 0.37, [Math.PI / 2, 0, 0]);
    // Temjin head after the source frontal shots: rounded white helmet with a
    // black vent over the crown, a wide blue wraparound visor carrying the
    // green lens strip, a small pointed white mask with two cheek fangs, and
    // two thin straight antennae rising from the back.
    // Head after the frontal key art: a compact white helmet carrying a large
    // rounded blue goggle visor with twin green lens strips, a small teal
    // window on the crown, a pointed white mask below and two thin antennae
    // angled outward from the visor ends.
    const helmet = shape([[-0.3, -0.25], [-0.32, 0.2], [-0.22, 0.42], [0.22, 0.42], [0.32, 0.2], [0.3, -0.25]], 0.72, [0, 7.62, -0.05], 'white', [0, 0, 0], 0.88);
    panel([[-0.12, 0.4], [0.12, 0.4], [0.1, 0.3], [-0.1, 0.3]], 0.37, [0, 7.62, -0.05], 'teal', [0, 0, 0], helmet);
    const visor = shape([[-0.4, 0.15], [-0.34, 0.22], [0.34, 0.22], [0.4, 0.15], [0.4, -0.13], [0.34, -0.2], [-0.34, -0.2], [-0.4, -0.13]], 0.8, [0, 7.55, 0.04], 'blue', [0, 0, 0], 0.9);
    for (const y of [0.08, -0.07]) panel([[-0.32, 0.035], [0.32, 0.035], [0.32, -0.035], [-0.32, -0.035]], 0.41, [0, 7.55 + y, 0.04], 'teal', [0, 0, 0], visor);
    const mask = shape([[-0.2, 0.02], [0.2, 0.02], [0.13, -0.16], [0, -0.3], [-0.13, -0.16]], 0.3, [0, 7.33, 0.18], 'white', [0, 0, 0], 0.85);
    panel([[-0.02, 0], [0.02, 0], [0.015, -0.24], [-0.015, -0.24]], 0.16, [0, 7.33, 0.18], 'dark', [0, 0, 0], mask);
    for (const s of [-1, 1]) shape([[-0.015, 0], [0.015, 0], [0.005, 0.85], [-0.005, 0.85]], 0.025, [s * 0.38, 7.72, -0.05], 'white', [0, 0, -s * 0.35]);
    // Cheek guards: the helmet sides continue below the visor to jaw level,
    // angling in toward the chin so the face sits framed inside the helmet.
    for (const s of [-1, 1]) shape([[0.36, 0.02], [0.2, 0.02], [0.13, -0.27], [0.27, -0.23]].map(([x, y]) => [s * x, y]), 0.6, [0, 7.36, 0.0], 'white', [0, 0, 0], 0.9);

    }));
  }

  function withTransform(position, rotation, scale, draw) {
    const parent = model;
    model = p => {
      const point = transform(mul(p, scale), position, rotation);
      return parent ? parent(point) : point;
    };
    try { draw(); } finally { model = parent; }
  }

  function ring(center, radius, rotation, color, alpha = 1, start = 0, end = Math.PI * 2) {
    const points = Array.from({ length: 65 }, (_, i) => {
      const angle = mix(start, end, i / 64);
      return transform([Math.cos(angle) * radius, Math.sin(angle) * radius, 0], center, rotation);
    });
    line(points, color, 0.75, alpha);
  }

  function stage(t, accent, radius = 4.9) {
    for (const r of [radius, radius - 0.13, radius * 0.67]) ring([0, -0.04, 0], r, [Math.PI / 2, 0, 0], '#354650');
    ring([0, -0.025, 0], radius - 0.05, [Math.PI / 2, 0, 0], accent, 0.65, t * 0.15, t * 0.15 + 0.9);
    for (let i = 0; i < 48; i++) {
      const a = i * Math.PI / 24;
      const r = i % 4 === 0 ? radius - 0.35 : radius - 0.15;
      line([[Math.cos(a) * r, 0, Math.sin(a) * r], [Math.cos(a) * radius, 0, Math.sin(a) * radius]], '#51636e', 0.6);
    }
    for (let x = -9; x <= 9; x += 3) line([[x, -0.06, -9], [x, -0.06, 6]], '#1c2932', 0.5);
    for (let z = -9; z <= 6; z += 3) line([[-9, -0.06, z], [9, -0.06, z]], '#1c2932', 0.5);
    for (const s of [-1, 1]) line([[s * 5.4, 0, -3], [s * 5.4, 8.7, -3], [s * 4.9, 9.2, -3]], '#263844', 0.6);
  }

  function armor(position, size, material, taper = 0.88) {
    const [w, h, depth] = size;
    const outline = [[-w * 0.36, h / 2], [w * 0.36, h / 2], [w / 2, h * 0.3], [w * 0.44, -h * 0.35], [w * 0.26, -h / 2], [-w * 0.26, -h / 2], [-w * 0.44, -h * 0.35], [-w / 2, h * 0.3]];
    const surface = prism(outline, depth, position, material, [0, 0, 0], taper);
    if (w > 0.75 && h > 0.65) plate(outline.map(([x, y]) => [x * 0.78, y * 0.78]), depth / 2 + 0.01, position, 'dark', [0, 0, 0], surface);
    return surface;
  }

  const raidenBarrels = [-0.24, 0.24];
  // Spike directions for the Dorkas-style ball head: the six axes plus the
  // eight cube diagonals, so a spike always meets the ground first.
  const spikeAxes = [[1, 0, 0], [-1, 0, 0], [0, 1, 0], [0, -1, 0], [0, 0, 1], [0, 0, -1], ...[-1, 1].flatMap(x => [-1, 1].flatMap(y => [-1, 1].map(z => norm([x, y, z]))))];

  function unitHead(kind, material) {
    const heavy = kind === 'heavy' || kind === 'siege';
    cylinder([0, 6.72, 0], 0.29, 0.34, 'dark', [Math.PI / 2, 0, 0]);
    const head = armor([0, 7.29, 0.03], [heavy ? 1.17 : 0.96, heavy ? 0.86 : 1.06, 0.8], 'white');
    plate([[-0.43, 0.09], [0.43, 0.09], [0.36, -0.1], [-0.36, -0.1]], 0.45, [0, 7.37, 0], 'teal', [0, 0, 0], head);
    armor([0, 6.99, 0.42], [0.43, 0.47, 0.23], 'white');
    if (kind === 'close') {
      // Belgdor: wide orange hex helmet over a green visor band, a green lens
      // box on one side and a white box on the other.
      box([0, 7.8, 0.02], [1.32, 0.5, 1.04], 'amber');
      prism([[-0.66, 0.06], [0.66, 0.06], [0.5, -0.12], [-0.5, -0.12]], 0.2, [0, 7.56, 0.5], 'amber');
      box([0, 7.42, 0.46], [1.1, 0.15, 0.08], 'teal');
      box([-0.74, 7.45, 0.1], [0.24, 0.44, 0.52], 'teal');
      box([0.74, 7.45, 0.1], [0.22, 0.48, 0.52], 'white');
    } else if (kind === 'agile' || kind === 'aerial') {
      for (const s of [-1, 1]) {
        if (kind === 'aerial') prism([[-0.18, -0.12], [0.17, -0.12], [s * 0.93, 1.35], [s * 0.55, 0.98]], 0.18, [s * 0.5, 7.65, -0.2], material);
        else {
          // Fei-Yen ear fins: tall, near-vertical, with orange tips.
          prism([[-0.1, -0.1], [0.1, -0.1], [s * 0.2, 1.45], [s * 0.06, 1.5]], 0.14, [s * 0.52, 7.6, -0.08], material);
          prism([[-0.06, 0], [0.08, 0], [s * 0.04, 0.32]], 0.15, [s * 0.66, 9.0, -0.08], 'amber');
        }
        armor([s * 0.59, 7.35, -0.03], [0.23, 0.62, 0.55], material);
      }
      // Viper II: two tall thin antennae, as in the full-body source frame.
      if (kind === 'aerial') for (const s of [-1, 1]) prism([[-0.02, 0], [0.02, 0], [0.006, 1.25], [-0.006, 1.25]], 0.03, [s * 0.18, 7.85, -0.12], 'white', [0, 0, -s * 0.08]);
    } else if (kind === 'siege') {
      // Dorkas: a small orange helmet with a green visor slit and a short crest.
      box([0, 7.5, 0.05], [0.84, 0.52, 0.8], material);
      box([0, 7.46, 0.45], [0.66, 0.13, 0.06], 'teal');
      box([0, 7.82, 0], [0.3, 0.14, 0.52], 'amber');
    } else {
      box([0, 7.79, 0], [0.47, 0.25, 0.56], material);
      box([0.49, 7.78, -0.18], [0.05, 0.63, 0.06], 'white');
    }
  }

  function standardBody(unit, pose, t) {
    const { kind, material, accent } = unit;
    const action = pose.action;
    const bulky = kind === 'heavy' || kind === 'siege';
    const agile = kind === 'agile';
      armor([0, 4, 0], [bulky ? 1.94 : 1.35, 0.73, 0.93], material);
      box([0, 4.7, 0], [agile ? 0.65 : 1.03, 0.85, 0.75], 'dark');
      for (let y = 4.45; y < 5.1; y += 0.2) box([0, y, 0.4], [agile ? 0.57 : 0.92, 0.055, 0.03], 'brace');
      const chest = armor([0, 5.85, 0], [bulky ? 2.78 : agile ? 1.34 : 2.15, bulky ? 1.76 : 1.5, bulky ? 1.55 : 1.06], material, agile ? 0.78 : 0.88);
      const front = bulky ? 0.79 : 0.55;
      chestMark([0, 5.79, front + 0.03], agile ? 1.04 : bulky ? 1.25 : 1.16, chest);
      for (const s of [-1, 1]) {
        plate([[-0.14, 0.07], [0.14, 0.07], [0.12, -0.07], [-0.12, -0.07]], front + 0.02, [s * (bulky ? 0.92 : 0.58), 6.43, 0], 'dark', [0, 0, 0], chest);
        box([s * 0.54, 5.81, -0.88], [0.51, 1.8, 0.56], material);
      }
      withTransform([0, 6.72, 0], [0, pose.look, 0], 0.85, () => withTransform([0, -6.72, 0], [0, 0, 0], 1, () => unitHead(kind, material)));
      for (const s of [-1, 1]) {
        if (agile) prism([[-0.28, 0.27], [0.28, 0.27], [0.5, -0.49], [-0.47, -0.49]], 0.25, [s * 0.63, 3.82, 0.49], material, [pose.rotation[0] * -0.5, 0, -s * 0.13]);
        else armor([s * (bulky ? 0.84 : 0.67), 3.88, 0.58], [bulky ? 0.84 : 0.66, 0.7, 0.24], material);
      }
      if (kind === 'agile') {
        armor([0, 3.78, 0.54], [0.6, 0.79, 0.26], 'white');
        // Flared skirt: two front panels and two side panels.
        for (const s of [-1, 1]) {
          prism([[-0.3, 0.25], [0.3, 0.25], [0.5, -0.75], [-0.32, -0.7]].map(([x, y]) => [s * x, y]), 0.08, [s * 0.36, 3.75, 0.52], 'white', [0.14, 0, s * 0.16]);
          prism([[-0.32, 0.25], [0.32, 0.25], [0.46, -0.72], [-0.46, -0.72]], 0.08, [s * 0.82, 3.75, 0], material, [0, s * Math.PI / 2, -s * 0.2]);
        }
        // Two long thin blades rising diagonally behind the shoulders.
        for (const s of [-1, 1]) prism([[0, 0], [s * 0.16, 0.06], [s * 1.7, 3.6], [s * 1.58, 3.66]], 0.1, [s * 0.55, 6.6, -0.6], material);
        if (action > 0) {
          ring([0, 5.7, 1.3], 1 + action * 1.8, [0, 0, t * 0.3], accent, action * 0.8);
          ring([0, 5.7, 1.32], 1.14 + action * 1.8, [0, 0, t * 0.3], accent, action * 0.35);
        }
      }
      if (kind === 'aerial') {
        for (const s of [-1, 1]) {
          withTransform([s * 0.69, 6.45, -0.9], [0, -s * action * 0.13, -s * action * 0.08], 1, () => {
            prism([[0, -0.2], [s * 0.3, 0.45], [s * 3.6, 1.25], [s * 3.45, 0.95], [s * 0.9, -0.35]], 0.12, [0, 0, 0], material);
            prism([[0, 0], [s * 2.6, 0.8], [s * 0.8, -0.1]], 0.04, [s * 0.2, 0.05, 0.08], 'dark');
          });
          box([s * 0.72, 4.95, -0.85], [0.39, 1.55, 0.54], 'white');
          for (let i = -1; i <= 1; i++) line([[s * 0.72 + i * 0.1, 4.2, -0.85], [s * 0.72 + i * 0.1, 3.4 - action * 2.2, -1.1]], accent, 0.8, action * 0.75);
        }
      }
      if (kind === 'heavy') {
        for (const s of [-1, 1]) withTransform([s * 1.8, 6.35, -0.36], [0, 0, -s * action * 0.55], 1, () => {
          armor([0, 0.25, 0], [1.1, 1.9, 1.25], material);
          box([0, 1.25, 0.09], [0.7, 0.15, 0.9], 'amber');
          // Raiden's long white laser cannon, banded, with a square muzzle;
          // the beams themselves are drawn in signature().
          box([0, 0.55, 1.2], [0.9, 0.8, 2.6], 'white');
          for (const z of [0.4, 0.75, 1.1]) box([0, 0.55, z], [0.94, 0.84, 0.08], 'dark');
          box([0, 0.55, 2.52], [0.72, 0.62, 0.06], 'dark');
          for (const x of raidenBarrels) cylinder([x, 0.55, 2.6], 0.13, 0.14, 'teal', [0, 0, 0], 10);
        });
      }
      if (kind === 'siege') {
        withTransform([1.76, 6.86, -0.05], [action * -0.2, 0, -0.08], 1, () => {
          armor([0, 0, 0], [1.94, 1.45, 1.31], material);
          for (const x of [-0.52, 0, 0.52]) for (const y of [-0.3, 0.3]) {
            cylinder([x, y, 0.71], 0.18, 0.13, 'dark', [0, 0, 0], 8);
            cylinder([x, y, 0.8], 0.07, 0.035, 'amber', [0, 0, 0], 8);
          }
        });
        box([-1.13, 5.72, -0.84], [1.1, 1.48, 0.66], 'white');
        for (let i = 0; i < 5; i++) box([-1.13, 5.2 + i * 0.22, -1.2], [0.75, 0.09, 0.06], 'dark');
      }
  }

  function orbitalBody(unit, pose, t) {
    const material = unit.material;
    cylinder([0, 5.72, 0], 1.13, 1.22, material, [0, 0, 0], 12);
    const chest = cylinder([0, 5.72, 0.64], 0.78, 0.18, 'dark', [0, 0, 0], 16);
    chestMark([0, 5.72, 0.76], 1.22, chest);
    for (let i = 0; i < 8; i++) {
      const angle = i * Math.PI / 4;
      box([Math.cos(angle) * 0.88, 5.72 + Math.sin(angle) * 0.88, 0.65], [0.1, 0.22, 0.055], 'white', [0, 0, angle - Math.PI / 2]);
    }
    armor([0, 4.47, -0.07], [0.93, 1.4, 0.82], 'dark');
    for (let i = 0; i < 4; i++) box([0, 4.15 + i * 0.18, 0.4], [0.59, 0.06, 0.06], 'brace');
    cylinder([0, 3.77, 0], 0.88, 0.32, 'brace', [Math.PI / 2, 0, 0], 12);
    const hull = [[3.62, 1.0], [3.23, 1.85], [2.43, 1.63], [1.97, 0.83]].map(([y, radius]) => Array.from({ length: 16 }, (_, i) => {
      const a = i * Math.PI / 8;
      return [Math.cos(a) * radius, y, Math.sin(a) * radius * 0.88];
    }));
    face(hull[0], material);
    for (let j = 0; j < hull.length - 1; j++) for (let i = 0; i < 16; i++) {
      const next = (i + 1) % 16;
      face([hull[j][i], hull[j][next], hull[j + 1][next], hull[j + 1][i]], j === 0 && i % 4 < 2 ? 'white' : material);
    }
    face(hull.at(-1).slice().reverse(), 'dark');
    cylinder([0, 1.9, 0], 0.75, 0.22, 'dark', [Math.PI / 2, 0, 0], 16);
    cylinder([0, 1.76, 0], 0.43, 0.07, 'teal', [Math.PI / 2, 0, 0], 12);
    for (const s of [-1, 1]) {
      prism([[-0.12, 0.42], [0.12, 0.42], [s * 0.42, -0.27], [-s * 0.12, -0.37]], 0.48, [s * 1.57, 2.59, 0], material);
      box([s * 0.96, 2.85, 1.22], [0.42, 0.14, 0.06], 'teal');
    }
    const thrust = 0.48 + pose.action * 0.3 + Math.sin(t * 4) * 0.06;
    for (const x of [-0.22, 0, 0.22]) line([[x, 1.7, 0], [x * 0.6, 1.7 - thrust, 0]], unit.accent, x ? 0.65 : 1.05, 0.42);
    withTransform([0, 6.63, 0], [0, pose.look, 0], 0.86, () => withTransform([0, -6.63, 0], [0, 0, 0], 1, () => {
      armor([0, 7.13, -0.15], [1.0, 0.99, 0.8], 'white');
      box([0, 7.23, 0.29], [0.66, 0.16, 0.08], 'teal');
      armor([0, 6.88, 0.33], [0.45, 0.43, 0.29], 'white');
      prism([[-0.2, 0], [0, 0.66], [0.2, 0]], 0.28, [0, 7.65, -0.1], material);
      for (const s of [-1, 1]) {
        box([s * 0.53, 7.22, -0.07], [0.24, 0.53, 0.61], material);
        box([s * 0.6, 7.75, -0.22], [0.065, 0.72, 0.1], 'white', [0, 0, -s * 0.16]);
      }
    }));
    if (pose.action > 0.1) ring([0, 5.3, 0], 3.65, [Math.PI / 2.5, 0, t * 0.12], unit.accent, pose.action * 0.22);
  }

  const neutralPose = {
    hip: [0, 4.6, 0], rotation: [0.015, 0, 0], twist: 0, look: 0, action: 0,
    feet: [[-0.9, 0.46, 0.15], [0.9, 0.46, -0.15]],
    footAngles: [[0, -0.1, 0], [0, 0.1, 0]],
    hands: [[-1.9, 3.3, 0.25], [1.9, 3.3, 0.25]],
    wrists: [[0, 0, -0.05], [0, 0, 0.05]],
    hammer: [0, -0.8, 0.6]
  };
  const motionKeys = {
    rifle: [
      [0, { hip: [0, 4.65, 0], feet: [[-0.72, 0.46, 0], [0.72, 0.46, 0]], hands: [[-2.03, 3.45, 0.35], [1.95, 3.28, 0.2]] }],
      [2.6, { look: -0.16 }],
      [4.2, { hip: [0.12, 4.46, 0.05], rotation: [0.035, -0.1, 0], hands: [[-1.8, 4.6, 1.1], [1.65, 4.4, 1.05]], look: 0.1 }],
      [5.6, { hip: [0.08, 4.14, 0.18], rotation: [0.12, -0.14, 0.025], hands: [[-1.55, 5.0, 1.7], [1.3, 4.8, 1.4]], action: 0.5 }],
      [7.45, { hip: [0, 3.83, 0.42], rotation: [0.24, -0.05, 0], hands: [[-1.05, 5.05, 2.35], [1.05, 4.5, 0.85]], look: -0.04, action: 1 }],
      [8.05, { hip: [0, 4.02, 0.38], rotation: [0.18, -0.04, 0] }],
      [8.85, { hip: [0, 5.15, 0.25], rotation: [0.28, -0.12, -0.03], feet: [[-0.83, 1.52, 0.75], [0.83, 1.13, -1.1]], footAngles: [[-0.2, -0.1, 0], [0.3, 0.1, 0]], hands: [[-1.5, 5.25, 1.95], [1.9, 4.35, 0.15]] }],
      [10.8, { hip: [0, 5.38, 0.25], rotation: [0.32, -0.08, 0], feet: [[-0.75, 2.0, 0.65], [0.9, 1.62, -1.25]] }]
    ],
    // Unit 01 in space: sprint with the blade trailing, raise, diagonal slash.
    slash: [
      [0, { hip: [0, 4.55, 0], rotation: [0.04, 0, 0], feet: [[-0.8, 0.46, 0.2], [0.8, 0.46, -0.2]], hands: [[-1.9, 4.0, 0.8], [1.85, 3.6, 0.4]], look: 0 }],
      // Boost dash after the source: crouch, then pitch hard forward and glide
      // low with the front knee bent, the trailing leg stretched back, feet
      // skimming the floor and the lit blade trailing low behind.
      [2.45, { hip: [0, 3.9, 0.1], rotation: [0.35, 0, 0], feet: [[-0.8, 0.46, 0.7], [0.8, 0.46, -0.5]], footAngles: [[0, -0.1, 0], [0, 0.1, 0]], hands: [[-1.9, 3.8, -1.6], [1.4, 5.2, 1.6]], twist: 0, look: -0.25, action: 0.3 }],
      [2.6, { hip: [0, 4.2, 0.3], rotation: [0.62, 0, 0.03], feet: [[-0.7, 1.4, 0.9], [0.8, 1.2, -1.9]], footAngles: [[0.3, -0.1, 0], [0.9, 0.1, 0]], hands: [[-1.9, 3.6, -2.0], [1.3, 5.0, 1.8]], twist: -0.1, look: -0.45, action: 0.5 }, true],
      [3.05, { hip: [0, 4.3, 0.3], rotation: [0.58, 0, -0.03], feet: [[-0.7, 1.5, 0.8], [0.8, 1.3, -1.8]], hands: [[-1.9, 3.7, -1.9], [1.3, 5.1, 1.7]], twist: -0.05 }],
      [3.45, { hip: [0, 4.0, 0.2], rotation: [0.15, 0, 0], feet: [[-1.1, 0.46, 0.7], [1.0, 0.46, -0.5]], footAngles: [[0, -0.1, 0], [0, 0.1, 0]], hands: [[-1.6, 4.4, -1.0], [1.6, 4.8, 0.8]], twist: 0.2, look: -0.1 }],
      // Frontal slash after the source: plant upright, coil the blade across
      // the body to the far shoulder, sweep it flat across the front toward
      // the viewer, then bring the free arm up to guard.
      [3.6, { hip: [0, 4.55, 0.1], rotation: [0.02, 0.45, 0], feet: [[-1.1, 0.46, 0.7], [1.0, 0.46, -0.5]], footAngles: [[0, -0.1, 0], [0, 0.1, 0]], hands: [[1.1, 6.3, -0.4], [1.8, 4.4, 0.4]], twist: 0.5, look: 0, action: 0.5 }],
      [3.75, { hip: [0, 4.45, 0.2], rotation: [0.06, -0.4, 0], hands: [[-2.7, 5.2, 2.0], [1.7, 4.6, 0.6]], twist: -0.5, look: 0.05, action: 1 }, true],
      [4.0, { hands: [[-2.6, 4.9, 1.4], [1.2, 5.6, 1.4]], twist: -0.45 }],
      [4.3, { hip: [0, 4.5, 0.15], rotation: [0.04, -0.2, 0], hands: [[-2.2, 4.4, 1.0], [0.5, 6.1, 1.9]], twist: -0.2 }],
      [4.85, { hip: [0, 4.5, 0.1], rotation: [0.03, -0.1, 0], hands: [[-1.9, 4.2, 0.9], [0.6, 5.9, 1.8]], twist: 0, look: 0, action: 0.3 }]
    ],
    // A trailing true marks a strike: the pose snaps in fast and holds, so
    // hits land hard while the travel between them stays on the spline.
    // Jump, then the heart beam from the apex.
    agile: [
      [0, { hip: [0.2, 4.6, 0], rotation: [0.01, -0.34, -0.035], hands: [[-1.6, 3.95, 0.65], [1.4, 4.45, 0.9]], look: 0.2 }],
      [1.15, { hip: [0.3, 4.3, 0], rotation: [0.05, -0.4, -0.05], hands: [[-1.8, 4.5, 0.5], [1.1, 4.9, 1.2]], twist: -0.12, action: 0.2 }],
      [2.55, { hip: [0, 3.55, 0.15], rotation: [0.28, -0.2, 0], feet: [[-1.0, 0.46, 0.4], [1.0, 0.46, -0.3]], hands: [[-2.2, 3.0, -0.8], [2.2, 3.0, -0.8]], twist: 0, look: -0.15, action: 0.3 }],
      [2.75, { hip: [0, 4.9, 0], rotation: [-0.12, -0.2, 0], feet: [[-0.7, 1.9, -0.3], [0.8, 1.5, -0.8]], footAngles: [[0.5, -0.1, 0], [0.6, 0.1, 0]], hands: [[-2.6, 6.2, 0.4], [2.6, 6.2, 0.4]], look: 0.2, action: 0.4 }, true],
      [3.3, { hip: [0, 4.8, 0], rotation: [0.1, -0.1, 0], feet: [[-0.8, 2.6, 0.6], [0.8, 2.4, 0.2]], footAngles: [[-0.3, -0.1, 0], [-0.3, 0.1, 0]], hands: [[-2.4, 6.4, 0.8], [2.4, 6.4, 0.8]], look: 0.1, action: 0.5 }],
      [3.6, { rotation: [0.04, -0.05, 0], hands: [[-0.55, 6.1, 2.1], [0.55, 6.1, 2.1]], look: 0, action: 1 }, true],
      [4.5, { hands: [[-0.6, 6.0, 2.2], [0.6, 6.0, 2.2]] }],
      [5.1, { hip: [0, 3.8, 0.2], rotation: [0.2, -0.15, 0], feet: [[-1.0, 0.46, 0.5], [1.0, 0.46, -0.3]], footAngles: [[0, -0.1, 0], [0, 0.1, 0]], hands: [[-2.0, 4.2, 0.8], [2.0, 4.2, 0.8]], action: 0.3 }, true],
      [5.9, { hip: [0.1, 4.5, 0.1], rotation: [0.02, -0.3, 0], hands: [[-1.6, 3.95, 0.65], [1.4, 4.45, 0.9]], look: 0.15, action: 0 }],
      [6.8, { hip: [0.2, 4.6, 0], rotation: [0.01, -0.34, -0.035] }]
    ],
    // Boost-dodge: crouch, kick off sideways, bank hard with the legs tucked
    // and trailing while a laser crosses the spot it just left, then land.
    aerial: [
      [0, { hip: [0, 4.4, 0], rotation: [0.04, -0.2, 0], hands: [[-1.9, 3.6, 0.2], [1.9, 3.6, 0.2]] }],
      [1.1, { hip: [-0.35, 3.75, 0.1], rotation: [0.14, -0.22, 0.1], feet: [[-1.0, 0.46, 0.2], [0.8, 0.46, -0.2]], hands: [[-2.0, 3.7, -0.6], [2.0, 3.7, -0.6]], look: 0.1, action: 0.3 }],
      [2.0, { hip: [0.7, 5.7, 0], rotation: [0.1, -0.25, -0.36], feet: [[-0.2, 3.5, -0.9], [1.1, 2.9, -1.4]], footAngles: [[0.6, -0.1, 0], [0.75, 0.1, 0]], hands: [[-2.3, 4.4, -0.8], [2.2, 3.7, -0.5]], twist: 0.08, look: -0.2, action: 0.8 }],
      [3.05, { hip: [1.6, 6.4, -0.2], rotation: [0.16, -0.3, -0.6], feet: [[0.6, 4.3, -1.7], [1.9, 3.8, -2.0]], footAngles: [[0.85, -0.1, 0], [0.95, 0.1, 0]], hands: [[-2.5, 4.7, -0.9], [2.3, 3.5, -0.3]], twist: 0.15, look: -0.32, action: 1 }],
      [4.2, { hip: [1.4, 5.9, -0.1], rotation: [0.1, -0.24, -0.42], feet: [[0.4, 3.7, -1.5], [1.7, 3.3, -1.8]], hands: [[-2.3, 4.4, -0.7], [2.2, 3.7, -0.4]], twist: 0.08, look: -0.15, action: 0.9 }],
      [4.9, { hip: [0.4, 4.1, 0.1], rotation: [0.12, -0.15, 0], feet: [[-0.5, 0.46, 0.15], [1.3, 0.46, -0.25]], footAngles: [[0, -0.1, 0], [0, 0.1, 0]], hands: [[-2.2, 4.0, -0.2], [2.2, 3.9, -0.1]], twist: 0, look: 0, action: 0.3 }, true],
      [5.6, { hip: [0.2, 4.4, 0.05], feet: [[-0.8, 0.46, 0.15], [0.9, 0.46, -0.25]], action: 0.1 }],
      [7.5, { hip: [0, 4.4, 0], rotation: [0.04, -0.2, 0], hands: [[-1.9, 3.6, 0.2], [1.9, 3.6, 0.2]], action: 0 }]
    ],
    // Twin-laser charge, fire, and the recoil that shoves it back.
    heavy: [
      [0, { hip: [0, 4.43, 0], feet: [[-1.1, 0.46, 0], [1.1, 0.46, 0]], hands: [[-2.1, 3.75, 0.6], [2.1, 3.75, 0.6]], rotation: [0.02, -0.14, 0] }],
      [0.85, { hip: [0.18, 4.15, 0], feet: [[-1.35, 0.95, 0.4], [1.1, 0.46, 0]], hands: [[-2.0, 4.2, 0.8], [2.0, 4.2, 0.8]] }],
      [1.6, { hip: [0, 4.08, 0], feet: [[-1.4, 0.46, 0.6], [1.1, 0.46, 0]], rotation: [0.055, -0.25, 0], hands: [[-2.65, 4.35, 0.35], [2.55, 4.4, 0.55]], action: 0.5 }],
      [2.0, { hip: [0, 3.85, -0.05], rotation: [0.1, -0.2, 0], feet: [[-1.5, 0.46, 0.5], [1.3, 0.46, -0.4]], hands: [[-2.6, 4.2, 0.5], [2.6, 4.2, 0.5]], twist: 0.05, action: 0.6 }],
      [2.55, { hip: [0, 3.7, -0.1], rotation: [0.14, -0.2, 0], action: 0.7 }],
      [2.8, { hip: [0, 3.9, -0.25], rotation: [-0.12, -0.2, 0], hands: [[-2.4, 4.6, 0.2], [2.4, 4.6, 0.2]], look: -0.1, action: 1 }, true],
      [3.6, { hip: [0, 3.8, -0.2], rotation: [-0.06, -0.2, 0] }],
      [4.1, { hip: [0.05, 4.1, 0], rotation: [0.05, -0.2, 0], hands: [[-2.1, 3.8, 0.6], [2.1, 3.8, 0.6]], twist: 0, look: 0, action: 0.2 }],
      [7.1, { hip: [0.05, 4.35, 0], action: 0 }]
    ],
    // Side-step, plant, and a three-round launcher salvo.
    // Dorkas: crouch with the hammer trailing low, leap with it cocked
    // overhead, then drive it down into the ground on landing (unit 06 owns
    // the spin). hammer is the head direction in body axes (x out, y up, z fwd).
    siege: [
      [0, { hip: [0, 4.4, 0], feet: [[-1.05, 0.46, 0.4], [1.05, 0.46, -0.35]], hands: [[-2.3, 3.6, 0.4], [2.0, 4.0, 0.7]], rotation: [0.02, 0.2, 0] }],
      [1.2, { hip: [0.05, 3.9, -0.1], rotation: [0.2, -0.1, 0], feet: [[-1.25, 0.46, 0.5], [1.15, 0.46, -0.45]], hands: [[-2.5, 3.7, -0.8], [1.7, 4.6, 1.0]], hammer: [-0.2, -0.6, -0.8], look: 0.1, action: 0.4 }],
      [1.8, { hip: [0.05, 3.6, -0.1], rotation: [0.28, -0.1, 0], hands: [[-2.5, 3.6, -1.0], [1.8, 4.4, 1.0]], hammer: [-0.3, -0.3, -0.9], look: 0.2, action: 0.6 }],
      [1.95, { hip: [0, 4.6, 0], rotation: [-0.15, 0, 0], feet: [[-1.0, 1.3, 0.3], [1.0, 1.0, -0.4]], footAngles: [[0.4, -0.1, 0], [0.3, 0.1, 0]], hands: [[-1.6, 7.6, -0.4], [1.9, 5.2, 0.6]], hammer: [0, 0.75, -0.65], look: -0.2, action: 0.8 }, true],
      [2.5, { hip: [0, 4.7, 0], rotation: [-0.2, 0, 0], feet: [[-1.0, 1.8, 0.6], [1.0, 1.6, 0.1]], hands: [[-1.4, 7.8, -0.6], [1.9, 5.4, 0.4]], hammer: [0, 0.4, -0.9] }],
      [2.75, { hip: [0, 3.4, 0.4], rotation: [0.45, 0, 0], feet: [[-1.3, 0.46, 0.7], [1.2, 0.46, -0.6]], footAngles: [[0, -0.1, 0], [0, 0.1, 0]], hands: [[-1.0, 3.6, 2.4], [1.9, 4.2, 0.8]], hammer: [0, -0.8, 0.6], look: 0.25, action: 1 }, true],
      [3.1, { hip: [0, 3.5, 0.4], rotation: [0.4, 0, 0] }],
      [3.55, { hip: [0, 4.3, 0], rotation: [0.03, -0.1, 0], feet: [[-1.05, 0.46, 0.4], [1.05, 0.46, -0.35]], hands: [[-2.3, 3.9, 0.5], [1.95, 4.2, 0.85]], hammer: [0, -0.8, 0.6], look: 0, action: 0.2 }],
      [7.4, { action: 0 }]
    ],
    // Dash in, one full spin with both blades out, then the finishing slash.
    close: [
      [0, { hip: [0, 4.35, 0], rotation: [0.04, -0.32, 0], feet: [[-1.0, 0.46, 0.65], [1.0, 0.46, -0.55]], hands: [[-1.1, 5.3, 1.35], [1.4, 5.05, 1.15]], look: 0.25 }],
      [1.1, { hip: [0.15, 4.06, -0.04], rotation: [0.07, -0.46, -0.015], hands: [[-1.0, 5.6, 1.4], [1.75, 5.35, 0.5]], twist: -0.2, action: 0.5 }],
      [1.45, { hip: [0.2, 3.85, -0.1], rotation: [0.12, -0.5, -0.02], hands: [[-1.1, 5.6, 1.5], [1.9, 5.3, 0.1]], twist: -0.25, action: 0.6 }],
      [1.55, { hip: [0, 3.9, 0.3], rotation: [0.3, -0.1, 0], feet: [[-1.0, 1.2, 0.9], [1.0, 0.46, -0.8]], hands: [[-2.6, 5.2, 0.8], [2.6, 5.2, 0.8]], twist: 0, action: 0.8 }, true],
      [1.9, { hip: [0, 4.1, 0.2], rotation: [0.12, 0, 0], feet: [[-1.0, 0.46, 0.5], [1.0, 0.46, -0.5]], hands: [[-2.9, 5.0, 0.4], [2.9, 5.0, 0.4]], action: 1 }],
      [2.4, { hip: [0.2, 3.75, 0.4], rotation: [0.18, 0.3, 0.03], hands: [[-0.2, 5.7, 1.4], [1.0, 6.0, 2.76]], twist: 0.3, look: -0.2 }, true],
      [2.85, { hip: [0, 4.0, 0.2], rotation: [0.06, -0.2, 0], hands: [[-1.1, 5.3, 1.4], [1.4, 5.1, 1.2]], twist: 0, look: 0.1, action: 0.4 }],
      [3.2, { hip: [0, 4.1, 0.1], action: 0.2 }],
      [7.7, { action: 0.2 }]
    ],
    // Flies in leaning into the approach, brakes, aims, fires the long beam.
    orbital: [
      [0, { hip: [0.1, 4.65, 0], rotation: [0.35, -0.16, 0], hands: [[-2.0, 4.2, -0.6], [2.0, 4.2, -0.6]] }],
      [1.6, { rotation: [0.3, -0.2, 0.05], hands: [[-2.1, 4.4, -0.7], [2.0, 4.3, -0.6]], action: 0.2 }],
      [3.45, { rotation: [0.32, -0.2, 0.04], action: 0.2 }],
      [3.95, { rotation: [-0.18, -0.2, 0], hands: [[-1.8, 5.0, 1.1], [1.7, 4.9, 1.3]], action: 0.4 }],
      [4.05, { rotation: [0.05, -0.1, 0] }, true],
      [4.2, { rotation: [0.02, 0.05, -0.02], hands: [[-1.4, 6.0, 2.0], [1.6, 4.6, 1.2]], look: -0.15, action: 0.7 }],
      [4.5, { rotation: [-0.1, 0.05, -0.02], hands: [[-1.2, 6.1, 2.3], [1.6, 4.7, 1.1]], action: 1 }, true],
      [5.6, { rotation: [-0.06, 0.05, -0.02] }],
      [6.1, { rotation: [0.04, -0.1, 0], hands: [[-1.8, 4.8, 1.0], [1.8, 4.85, 1.1]], look: 0, action: 0.2 }],
      [7.6, { hands: [[-1.85, 4.05, 0.65], [1.75, 4.5, 0.85]], action: 0 }]
    ]
  };
  // Root travel through the scene, so units dash, jump and fly instead of
  // acting in place. Every track starts and ends at the stage centre.
  const travelKeys = {
    rifle: [[0, {}]],
    agile: [[2.55, {}], [2.75, { root: [0, 1.2, 0.5] }, true], [3.3, { root: [0.6, 4.2, 1.8] }], [4.5, { root: [0.8, 4.6, 1.6] }], [4.9, { root: [0.4, 1.2, 1.0] }], [5.1, { root: [0.2, 0, 0.6] }], [6.2, { root: [0, 0, 0] }]],
    aerial: [[2.5, {}], [2.6, { root: [1.2, 0.6, 0.3] }, true], [3.4, { root: [3.2, 1.0, 0.8] }], [4.2, { root: [2.6, 0.8, 0.6] }], [4.9, { root: [0, 0, 0] }]],
    heavy: [[2.8, {}], [2.9, { root: [0, 0, -1.6] }, true], [3.6, { root: [0, 0, -3.0] }], [4.3, { root: [0, 0, 0] }]],
    siege: [[1.95, {}], [2.0, { root: [0, 0.6, 0.3] }, true], [2.5, { root: [0, 3.0, 1.0] }], [2.75, { root: [0, 0, 1.6] }, true], [3.55, { root: [0, 0, 0] }]],
    close: [[1.45, {}], [1.55, { root: [0.3, 0, 1.0] }, true], [1.9, { root: [1.0, 0, 4.0] }], [2.4, { root: [1.0, 0, 4.4], yaw: Math.PI * 2 }], [2.85, { root: [0.6, 0, 2.0], yaw: Math.PI * 2 }], [3.2, { root: [0, 0, 0], yaw: Math.PI * 2 }]],
    orbital: [[0, { root: [-16, 8, -18], yaw: 0.6 }], [3.45, { root: [-8, 4, -8], yaw: 0.45 }], [3.95, { root: [-0.5, 0.25, -0.4], yaw: 0.05 }], [4.05, { root: [0, 0, 0], yaw: 0 }, true], [4.5, {}], [4.55, { root: [0, 0.1, -0.8] }, true], [5.6, { root: [0, 0.1, -1.2] }], [6.6, { root: [0, 0, 0] }]],
    space: [[2.45, { root: [0, 0, -8] }], [2.6, { root: [0, 0.7, -7.0] }, true], [3.3, { root: [0, 0.6, -1.4] }], [3.45, { root: [0, 0, -0.8] }], [3.75, { root: [0, 0, 0.4] }, true], [4.85, { root: [0, 0, 0.8] }]]
  };
  // Camera moves during the action, relative to each unit's full-body framing:
  // yaw offset, distance scale, eye lift (negative is a low angle) and roll.
  const cameraKeys = {
    agile: [[2.55, { yaw: 0.1, dist: 0.8, lift: -3.5, roll: 0.08 }], [2.75, { yaw: 0, dist: 0.95, lift: -4.5, roll: -0.1 }, true], [3.6, { yaw: -0.15, dist: 0.75, lift: -3, roll: 0.12 }, true], [4.5, { yaw: -0.2, dist: 0.85, lift: -2.5, roll: 0.1 }], [5.1, { yaw: 0.05, dist: 1, lift: -1, roll: 0 }], [6.4, {}]],
    aerial: [[2.5, { dist: 0.85, lift: -2 }], [2.6, { yaw: 0.25, dist: 0.9, lift: -2.5, roll: -0.18 }, true], [3.4, { yaw: 0.35, dist: 0.95, lift: -1.5, roll: -0.22 }], [4.2, { yaw: 0.3, lift: -1, roll: -0.1 }], [4.9, { yaw: 0.05 }]],
    // Side three-quarter view so the barrel-axis beams cross the frame.
    heavy: [[2.55, { yaw: 0.55, dist: 0.8, lift: -2.2, roll: 0.06 }], [2.8, { yaw: 0.6, dist: 0.72, lift: -2.4, roll: 0.1 }, true], [3.6, { yaw: 0.65, dist: 0.82, lift: -2, roll: 0.08 }], [4.3, { yaw: 0.3, lift: -0.5 }]],
    siege: [[1.8, { yaw: 0.35, dist: 0.85, lift: -1.8, roll: 0.04 }], [1.95, { yaw: 0.4, dist: 1.05, lift: -3.2, roll: -0.06 }, true], [2.5, { yaw: 0.45, dist: 1.1, lift: -3.6, roll: -0.08 }], [2.75, { yaw: 0.12, dist: 1.1, lift: -2.8, roll: 0.12 }, true], [3.1, { yaw: 0.12, dist: 1.1, lift: -2.6, roll: 0.08 }], [3.55, {}]],
    close: [[1.45, { yaw: 0.2, dist: 0.8, lift: -2, roll: 0.05 }], [1.55, { yaw: 0.4, dist: 0.85, lift: -3, roll: 0.12 }, true], [2.4, { yaw: 0.2, dist: 0.62, lift: -3.2, roll: 0.16 }, true], [2.85, { yaw: 0.1, dist: 0.8, lift: -2, roll: 0.08 }], [3.2, {}]],
    orbital: [[3.45, { yaw: -0.45, dist: 1.1, lift: -1, roll: -0.14 }], [4.05, { yaw: -0.3, dist: 0.85, lift: -2, roll: -0.06 }, true], [4.5, { yaw: -0.15, dist: 0.7, lift: -2.5, roll: 0.1 }, true], [5.6, { yaw: -0.2, dist: 0.8, lift: -2, roll: 0.08 }], [6.6, {}]],
    space: [[2.5, { yaw: 0.15, dist: 1.0, lift: -1.2, roll: 0.04 }], [2.6, { yaw: 0.75, dist: 1.0, lift: -1.4, roll: -0.08 }, true], [3.4, { yaw: 0.5, dist: 0.9, lift: -1.5, roll: -0.1 }], [3.6, { yaw: 0, dist: 0.72, lift: -0.9, roll: 0.04 }, true], [3.75, { yaw: -0.05, dist: 0.68, lift: -1.0, roll: 0.1 }, true], [4.3, { yaw: -0.05, dist: 0.74, lift: -0.9, roll: 0.06 }], [4.85, { yaw: 0, dist: 0.8, lift: -0.8, roll: 0.03 }]]
  };
  // Hits on the motion clock: each shakes the camera; flash is the strength
  // of the one-frame white impact frame.
  const hitKeys = {
    agile: [[2.75, 0], [3.6, 1], [5.1, 0]],
    aerial: [[2.6, 0], [4.9, 0]],
    heavy: [[2.8, 1]],
    siege: [[1.95, 0], [2.75, 1], [2.78, 0.6]],
    close: [[1.55, 0], [2.4, 1]],
    orbital: [[4.05, 0], [4.5, 1]],
    space: [[2.6, 0], [3.75, 1]]
  };
  const buildTrack = (keys, base) => {
    let pose = structuredClone(base);
    return keys.map(([time, patch, snap]) => { pose = { ...pose, ...patch };return { time, snap: !!snap, pose: structuredClone(pose) }; });
  };
  const motionTracks = Object.fromEntries(Object.entries(motionKeys).map(([kind, keys]) => [kind, buildTrack(keys, neutralPose)]));
  const travelTracks = Object.fromEntries(Object.entries(travelKeys).map(([kind, keys]) => [kind, buildTrack(keys, { root: [0, 0, 0], yaw: 0 })]));
  const cameraTracks = Object.fromEntries(Object.entries(cameraKeys).map(([kind, keys]) => [kind, buildTrack(keys, { yaw: 0, dist: 1, lift: 0, roll: 0 })]));

  // Hermite spline through the keys, so motion flows through each pose
  // instead of snapping to it and parking until the next key. Strike keys
  // break the spline: the pose arrives in 0.1s, then settles from rest.
  function sampleTrack(track, time) {
    const next = track.findIndex(key => key.time > time);
    if (next < 0) return structuredClone(track.at(-1).pose);
    if (next === 0) return structuredClone(track[0].pose);
    const k0 = track[Math.max(0, next - 2)], k1 = track[next - 1], k2 = track[next], k3 = track[Math.min(track.length - 1, next + 1)];
    const span = k2.time - k1.time;
    if (k2.snap) {
      const p = 1 - (1 - clamp((time - k1.time) / Math.min(span, 0.1))) ** 3;
      const blend = (a, b) => Array.isArray(a) ? a.map((v, i) => blend(v, b[i])) : mix(a, b, p);
      return Object.fromEntries(Object.keys(k1.pose).map(key => [key, blend(k1.pose[key], k2.pose[key])]));
    }
    const s = (time - k1.time) / span;
    const h = [2 * s ** 3 - 3 * s * s + 1, s ** 3 - 2 * s * s + s, -2 * s ** 3 + 3 * s * s, s ** 3 - s * s];
    const curve = (a, b, c, d) => {
      if (Array.isArray(b)) return b.map((v, i) => curve(a[i], v, c[i], d[i]));
      const m1 = k0 === k1 || k1.snap ? 0 : (c - a) / (k2.time - k0.time) * span;
      const m2 = k3 === k2 || k3.snap ? 0 : (d - b) / (k3.time - k1.time) * span;
      return h[0] * b + h[1] * m1 + h[2] * c + h[3] * m2;
    };
    return Object.fromEntries(Object.keys(k1.pose).map(key => [key, curve(k0.pose[key], k1.pose[key], k2.pose[key], k3.pose[key])]));
  }

  // Body parts lead and trail each other (hips first, then arms, then the
  // head), with a slight breathing sway so held poses never freeze solid.
  function layeredPose(track, time) {
    const pose = sampleTrack(track, time);
    const lead = sampleTrack(track, time + 0.06);
    const trail = sampleTrack(track, time - 0.08);
    const head = sampleTrack(track, time - 0.14);
    pose.hip = lead.hip;pose.rotation = lead.rotation;
    pose.hands = trail.hands;pose.wrists = trail.wrists;pose.twist = trail.twist;pose.look = head.look;
    pose.hip = add(pose.hip, [0, Math.sin(time * 2.3) * 0.035, 0]);
    pose.rotation = add(pose.rotation, [0, 0, Math.sin(time * 1.6) * 0.012]);
    pose.hands = pose.hands.map((hand, i) => add(hand, [0, Math.sin(time * 2.0 + i * 1.7) * 0.045, Math.cos(time * 1.7 + i) * 0.03]));
    return pose;
  }

  const poseAt = (kind, time) => layeredPose(motionTracks[kind], time);
  const travelAt = (kind, time) => travelTracks[kind] ? sampleTrack(travelTracks[kind], time) : { root: [0, 0, 0], yaw: 0 };
  const placed = (travel, point) => transform(point, travel.root, [0, travel.yaw, 0]);
  // Shake and flash from the hits: a sharp onset, then a fast decay.
  function impact(kind, time) {
    let shake = 0, flash = 0;
    for (const [at, strength] of hitKeys[kind] || []) {
      const age = time - at;
      if (age < 0 || age > 0.6) continue;
      shake += Math.exp(-age / 0.14) * (0.6 + strength * 0.6);
      if (age < 0.07) flash = Math.max(flash, strength);
    }
    return { shake: Math.min(shake, 1.4), flash };
  }

  function solveChain(root, target, upper, lower, pole, maxBend = Math.PI) {
    const delta = sub(target, root);
    const requested = Math.hypot(...delta);
    const minimum = Math.sqrt(Math.max(0, upper * upper + lower * lower + 2 * upper * lower * Math.cos(maxBend)));
    const distance = clamp(requested, Math.max(minimum, Math.abs(upper - lower) + 0.0001), upper + lower - 0.0001);
    const axis = requested > 0.00001 ? mul(delta, 1 / requested) : [0, -1, 0];
    let bend = sub(pole, mul(axis, dot(pole, axis)));
    if (Math.hypot(...bend) < 0.00001) bend = cross(axis, Math.abs(axis[0]) < 0.9 ? [1, 0, 0] : [0, 0, 1]);
    const along = (upper * upper - lower * lower + distance * distance) / (2 * distance);
    const height = Math.sqrt(Math.max(0, upper * upper - along * along));
    const joint = add(add(root, mul(axis, along)), mul(norm(bend), height));
    const end = add(root, mul(axis, distance));
    return { root, joint, end, target, upper, lower, reachError: Math.abs(requested - distance), angle: Math.acos(clamp(dot(norm(sub(root, joint)), norm(sub(end, joint))), -1, 1)) };
  }

  function withFrame(origin, right, up, front, draw) {
    const parent = model;
    model = p => {
      const point = add(origin, add(mul(right, p[0]), add(mul(up, p[1]), mul(front, p[2]))));
      return parent ? parent(point) : point;
    };
    try { draw(); } finally { model = parent; }
  }

  function boneFrame(root, end, frontHint = [0, 0, 1]) {
    const up = norm(sub(root, end));
    const reference = norm(cross([0, 1, 0], frontHint));
    let right = sub(reference, mul(up, dot(reference, up)));
    if (Math.hypot(...right) < 0.001) right = cross(up, frontHint);
    right = norm(right);
    return { origin: root, right, up, front: norm(cross(right, up)) };
  }

  function inBone(root, end, hint, draw) {
    const frame = boneFrame(root, end, hint);
    withFrame(frame.origin, frame.right, frame.up, frame.front, draw);
  }

  function bodyPoint(pose, point) {
    const relative = sub(point, [0, 3.63, 0]);
    return transform(relative, pose.hip, [pose.rotation[0], pose.rotation[1] + pose.twist, pose.rotation[2]]);
  }

  function bodyDirection(pose, direction) {
    return transform(direction, [0, 0, 0], [pose.rotation[0], pose.rotation[1] + pose.twist, pose.rotation[2]]);
  }

  function jointHub(position, radius, width, material = 'brace') {
    cylinder(position, radius, width, 'dark', [0, Math.PI / 2, 0], 12);
    for (const s of [-1, 1]) cylinder(add(position, [s * (width / 2 + 0.012), 0, 0]), radius * 0.62, 0.035, material, [0, Math.PI / 2, 0], 10);
  }

  function hingeHub(chain, radius, width, material) {
    const up = norm(sub(chain.root, chain.joint));
    const axis = norm(cross(up, sub(chain.end, chain.joint)));
    withFrame(chain.joint, axis, up, norm(cross(axis, up)), () => jointHub([0, 0, 0], radius, width, material));
  }

  function drawLeg(unit, chain, side, pose, index) {
    const bulky = unit.kind === 'heavy' || unit.kind === 'siege';
    const slender = unit.kind === 'agile';
    const w = bulky ? 0.81 : slender ? 0.54 : 0.65;
    const hint = transform([0, 0, 1], [0, 0, 0], [0, pose.rotation[1] * 0.45, 0]);
    inBone(chain.root, chain.joint, hint, () => {
      jointHub([0, 0, 0], 0.26, w * 0.86);
      armor([0, -chain.upper * 0.52, 0], [w, chain.upper - 0.46, 0.69], 'white');
      box([0, -chain.upper * 0.52, 0.37], [w * 0.39, chain.upper - 0.7, 0.055], unit.material);
      for (const s of [-1, 1]) box([s * w * 0.33, -chain.upper * 0.54, -0.32], [0.09, chain.upper - 0.6, 0.11], 'brace');
    });
    hingeHub(chain, 0.27, w * 1.03, unit.material);
    inBone(chain.joint, chain.end, hint, () => {
      armor([0, -0.06, 0.37], [w * 1.07, 0.48, 0.27], unit.material);
      armor([0, -chain.lower * 0.52, -0.03], [w * 1.1, chain.lower - 0.45, bulky ? 0.83 : 0.71], unit.kind === 'rifle' || slender ? 'white' : unit.material);
      prism([[-w * 0.18, 0.62], [w * 0.18, 0.62], [w * 0.26, -0.67], [-w * 0.26, -0.67]], 0.05, [0, -chain.lower * 0.53, 0.39], unit.kind === 'rifle' ? 'blue' : 'white');
      jointHub([0, -chain.lower, 0], 0.2, w * 0.8);
      if (unit.kind === 'aerial') prism([[0, 0.3], [0, -chain.lower * 0.85], [side * 0.85, -chain.lower * 1.05], [side * 0.6, -0.2]], 0.08, [side * w * 0.5, 0, -0.05], unit.material);
    });
    const footWidth = bulky ? 1.03 : slender ? 0.7 : 0.88;
    withTransform(chain.end, pose.footAngles[index], 1, () => {
      armor([0, -0.1, 0.28], [footWidth, 0.53, 1.41], unit.material);
      box([0, -0.35, 0.29], [footWidth * 1.02, 0.12, 1.49], 'dark');
      box([0, -0.1, 1.005], [footWidth * 0.65, 0.09, 0.045], 'teal');
      for (const z of [0.32, 0.56, 0.8]) box([0, 0.13, z], [footWidth * 0.58, 0.03, 0.045], 'brace');
      if (unit.kind === 'siege') {
        for (const k of [-1, 1]) prism([[-0.3, -0.2], [0.3, -0.2], [0.05, 0.6]], 0.08, [k * (footWidth / 2 + 0.05), 0.15, -0.15], 'amber', [0, Math.PI / 2, 0]);
        prism([[-footWidth * 0.4, 0], [footWidth * 0.4, 0], [0, 0.6]], 0.24, [0, -0.24, 1.02], 'brace', [Math.PI / 2, 0, 0]);
      }
    });
  }

  function drawWeapon(unit, side, pose) {
    if (unit.kind === 'rifle' && side < 0) {
      const position = [-0.34, 0.15, 0.42];
      const rifle = prism([[-0.37, 1.47], [0.23, 1.56], [0.43, 1.23], [0.33, -0.25], [0.15, -1.48], [-0.26, -1.69], [-0.43, -0.2]], 0.59, position, 'blue');
      box(add(position, [0.11, 1.22, 0]), [0.24, 0.45, 0.67], 'amber');
      plate([[-0.15, 0.09], [0.12, 0.09], [0.06, -1.37], [-0.15, -1.37]], 0.31, position, 'teal', [0, 0, 0], rifle);
      plate([[-0.18, 1.07], [0.09, 1.07], [0.09, 0.63], [-0.18, 0.63]], 0.31, position, 'dark', [0, 0, 0], rifle);
      prism([[-0.14, 0.44], [0.14, 0.44], [0.1, -0.72], [-0.1, -0.72]], 0.3, add(position, [0, -1.98, 0]), 'white');
      box([-0.13, -0.01, 0.14], [0.42, 0.15, 0.25], 'dark');
      const origin = model([-0.34, -2.55, 0.42]);
      emitters.push({ kind: 'rifle', origin, direction: norm(sub(model([-0.34, -3.55, 0.42]), origin)) });
    }
    if (unit.kind === 'close') {
      box([side * 0.29, 0.72, 0.12], [0.2, 1.8, 0.28], 'white');
      box([side * 0.29, 1.88 + pose.action * 0.42, 0.12], [0.14, 0.5 + pose.action * 0.84, 0.16], 'teal');
      box([side * 0.12, 0.05, 0.12], [0.48, 0.16, 0.2], 'dark');
    }
    if (unit.kind === 'siege' && side < 0) {
      // The handle runs through the fist across the grip, perpendicular to the
      // forearm, with the spiked ball at the far end like a real hammer. The
      // wrist swings it through one arc in the body's facing plane, driven by
      // hand height: carried head-down at the side, up through upright in front
      // as the arm rises, then cocked back over the shoulder at the top.
      // It is built in world space at the fist, so the hand's own twist can't
      // knock it out of that plane.
      const grip = model([0, -0.2, 0]);
      const want = norm(sub(unitFrame(bodyDirection(pose, pose.hammer)), unitFrame([0, 0, 0])));
      const level = cross([0, 1, 0], want);
      const across = Math.hypot(...level) > 0.05 ? norm(level) : norm(cross(want, [0, 0, 1]));
      const held = model;
      model = null;
      withFrame(grip, across, cross(want, across), want, () => {
        box([0, 0, 1.25], [0.19, 0.23, 2.7], 'brace');
        box([0, 0, -0.22], [0.27, 0.3, 0.2], 'dark');
        box([0, 0, 2.45], [0.36, 0.36, 0.22], 'dark');
        const head = [0, 0, 3.2];
        emitters.push({ kind: 'hammer', origin: model(head) });
        for (const rotation of [[0, 0, 0], [Math.PI / 2, 0, 0], [0, Math.PI / 2, 0]]) cylinder(head, 0.66, 0.66, 'gold', rotation, 12);
        for (const d of spikeAxes) {
          if (d[2] < -0.9) continue;
          const a = -Math.asin(-d[1]), b = Math.atan2(-d[0], -d[2]);
          prism([[-0.1, -0.1], [0.1, -0.1], [0.1, 0.1], [-0.1, 0.1]], 0.55, add(head, mul(d, 0.86)), 'white', [a, b, 0], 0.12);
        }
      });
      model = held;
    }
  }

  function drawArm(unit, chain, side, pose, index) {
    const bulky = unit.kind === 'heavy' || unit.kind === 'siege';
    const slender = unit.kind === 'agile';
    const hint = bodyDirection(pose, [0, 0, 1]);
    const shoulderWidth = bulky ? 1.29 : slender ? 0.89 : 1.16;
    inBone(chain.root, chain.joint, hint, () => {
      jointHub([0, 0, 0], 0.3, 0.63);
      if (unit.kind === 'aerial') prism([[-0.46, 0.25], [side * 0.92, 0.55], [side * 0.59, -0.4], [-0.31, -0.27]], 0.77, [0, 0.02, 0], unit.material);
      else if (unit.kind === 'rifle') withTransform([0, 0.12, 0], [0, 0, 0], 1.3, () => {
        // Big blue shoulder block with a white vent panel, teal light, orange tip.
        prism([[-0.58, 0.31], [0.5, 0.37], [0.64, 0.12], [0.56, -0.34], [-0.52, -0.32]], 0.86, [0, 0.04, 0], 'blue');
        box([side * 0.62, 0.08, 0], [0.19, 0.54, 0.69], 'amber');
        box([-side * 0.08, 0.04, 0.445], [0.56, 0.36, 0.03], 'white');
        for (let i = -1; i <= 1; i++) box([-side * 0.08 + i * 0.15, 0.04, 0.47], [0.05, 0.22, 0.02], 'brace');
        box([side * 0.34, 0.04, 0.46], [0.09, 0.3, 0.02], 'teal');
      }); else if (unit.kind === 'siege') armor([0, 0.15, 0], [1.75, 1.45, 1.35], 'amber');
      else if (slender) {
        // Fei-Yen: big rounded shoulder guards sweeping up.
        prism([[-0.55, -0.2], [-0.5, 0.25], [-0.2, 0.55], [0.3, 0.6], [0.6, 0.3], [0.55, -0.25]].map(([x, y]) => [side * x * 1.45, y * 1.45]), 1.25, [side * 0.2, 0.35, 0], 'white', [0, 0, 0], 0.85);
      } else armor([0, 0.04, 0], [shoulderWidth, bulky ? 1.01 : 0.77, bulky ? 1.09 : 0.85], unit.material);
      armor([0, -chain.upper * 0.6, 0], [bulky ? 0.66 : 0.46, chain.upper - 0.55, 0.59], 'white');
      box([0, -chain.upper * 0.57, -0.34], [0.19, chain.upper - 0.44, 0.12], 'brace');
    });
    hingeHub(chain, 0.25, bulky ? 0.7 : 0.59, unit.kind === 'rifle' ? 'amber' : 'brace');
    inBone(chain.joint, chain.end, hint, () => {
      armor([0, -chain.lower * 0.5, 0.02], [bulky ? 0.84 : 0.6, chain.lower - 0.31, bulky ? 0.82 : 0.64], unit.kind === 'close' || unit.kind === 'rifle' ? 'white' : unit.material);
      box([0, -chain.lower * 0.52, bulky ? 0.46 : 0.37], [0.23, 0.34, 0.035], 'teal');
      jointHub([0, -chain.lower, 0], 0.15, 0.38);
      // Temjin's orange elbow fins point outward from the top of the forearm.
      if (unit.kind === 'rifle') prism([[0, 0.2], [0, -0.22], [side * 0.4, -0.02]], 0.18, [side * 0.3, -0.3, 0], 'amber');
      withTransform([0, -chain.lower, 0], pose.wrists[index], 1, () => {
        if (unit.kind === 'orbital') {
          // Bal-Bas-Bow arm cannon: a long grey box barrel along the forearm.
          if (side < 0) {
            // Two big stacked barrels, the lower one longer, with vents.
            box([0, -0.75, 0.62], [0.66, 3.0, 0.6], 'brace');
            box([0, -0.45, 1.25], [0.6, 2.3, 0.52], 'white');
            box([0, -2.27, 0.62], [0.48, 0.06, 0.44], 'dark');
            box([0, -1.62, 1.25], [0.44, 0.06, 0.38], 'dark');
            for (let i = 0; i < 4; i++) box([0.34, 0.3 - i * 0.22, 0.62], [0.03, 0.12, 0.48], 'dark');
          }
          armor([0, -0.2, 0], [0.7, 0.62, 0.57], 'white');
          cylinder([0, -0.19, 0.33], 0.2, 0.08, unit.material);
          for (let i = -1; i <= 1; i++) {
            box([i * 0.23, -0.7, 0.03], [0.15, 0.5, 0.22], unit.material);
            box([i * 0.23, -0.94, 0.14], [0.14, 0.15, 0.32], 'brace');
          }
          if (pose.action > 0.2) ring([0, -0.22, 0], 0.68, [0, 0, 0], unit.accent, pose.action * 0.5);
        } else {
          box([0, -0.18, 0.06], [0.39, 0.36, 0.45], 'dark');
          for (let i = -1; i <= 1; i++) box([i * 0.12, -0.2, 0.31], [0.09, 0.23, 0.095], 'brace');
        }
        drawWeapon(unit, side, pose);
      });
    });
  }

  function articulatedUnit(unit, t, override = null) {
    const sampled = override && typeof override === 'object' ? override : poseAt(unit.kind, t);
    const hovering = unit.kind === 'orbital';
    const pose = hovering ? { ...sampled, hip: [sampled.hip[0], 4.65 + Math.sin(t * 1.35) * 0.16 + sampled.action * 0.12, sampled.hip[2]] } : sampled;
    const bulky = unit.kind === 'heavy' || unit.kind === 'siege';
    const hipWidth = bulky ? 0.81 : unit.kind === 'agile' ? 0.53 : 0.65;
    const shoulderWidth = bulky ? 1.82 : unit.kind === 'agile' ? 1.2 : unit.kind === 'orbital' ? 1.47 : 1.66;
    const bodyOrigin = bodyPoint(pose, [0, 0, 0]);
    const axes = [[1, 0, 0], [0, 1, 0], [0, 0, 1]].map(axis => bodyDirection(pose, axis));
    const localToWorld = model || (point => point);
    unitFrame = localToWorld;
    const record = { id: unit.id, locomotion: hovering ? 'hover' : 'biped', hip: localToWorld(pose.hip), legs: [], arms: [] };
    const store = chain => ({ ...chain, root: localToWorld(chain.root), joint: localToWorld(chain.joint), end: localToWorld(chain.end), target: localToWorld(chain.target) });
    withFrame(bodyOrigin, ...axes, () => {
      if (unit.kind === 'rifle') rifleBody(pose);
      else if (unit.kind === 'orbital') orbitalBody(unit, pose, t);
      else standardBody(unit, pose, t);
    });
    for (const [index, side] of [-1, 1].entries()) {
      if (!hovering) {
        const hip = add(pose.hip, transform([side * hipWidth, 0, 0], [0, 0, 0], [0, pose.rotation[1], 0]));
        const kneePole = transform([side * 0.13, 0, 1], [0, 0, 0], [0, pose.rotation[1] * 0.5, 0]);
        const leg = solveChain(hip, pose.feet[index], 2.1, 2.3, kneePole);
        drawLeg(unit, leg, side, pose, index);record.legs.push(store(leg));
      }
      const shoulder = bodyPoint(pose, [side * shoulderWidth, 6.13, 0]);
      const hand = bodyPoint(pose, pose.hands[index]);
      const elbowPole = bodyDirection(pose, [side * 0.65, -0.2, -0.9]);
      const arm = solveChain(shoulder, hand, 1.48, 1.48, elbowPole, (bulky ? 120 : 135) * Math.PI / 180);
      drawArm(unit, arm, side, pose, index);record.arms.push(store(arm));
    }
    skeletons.push(record);
    return { pose: point => bodyPoint(pose, point), rig: pose };
  }

  function robot(t) {
    const ignition = smooth(5.4, 7.7, t);
    const launch = clamp((t - 8) / 2.5);
    const z = launch * launch * 36;
    let mech;
    withTransform([0, 0, z], [0, 0, 0], 1, () => { mech = articulatedUnit(content.units[0], t); });
    return { pose: point => add(mech.pose(point), [0, 0, z]), ignition, launch };
  }

  function showcase(index, t) {
    const unit = content.units[index];
    stage(t, unit.accent);
    return travelled(unit, travelAt(unit.kind, t), t);
  }

  // Draws a unit carried along its travel track and returns world helpers.
  function travelled(unit, travel, t, override = null) {
    let mech;
    withTransform(travel.root, [0, travel.yaw, 0], 1, () => { mech = articulatedUnit(unit, t, override); });
    return { ...mech, travel, pose: point => placed(travel, mech.pose(point)), dir: d => transform(bodyDirection(mech.rig, d), [0, 0, 0], [0, travel.yaw, 0]) };
  }

  const chargeDestination = [0, 15, -17];
  const encounterImpact = [0, 22.2, -18.7];
  const encounterKeys = [
    [0, { hip: [0, 4.57, 0], rotation: [0, 0, 0], hands: [[-1.95, 3.5, 0.4], [1.95, 3.35, 0.3]], feet: [[-0.84, 0.46, 0.25], [0.84, 0.46, -0.25]], look: 0 }],
    [1.5, { hip: [0.08, 4.42, 0], rotation: [-0.055, -0.05, 0], hands: [[-1.8, 4.5, 1.2], [1.55, 4.3, 0.95]], look: 0.12 }],
    [2.5, { hip: [0.05, 4.14, 0.1], rotation: [-0.02, -0.05, 0], hands: [[-1.25, 6.05, 2.4], [1.05, 4.65, 1.1]], wrists: [[-0.13, 0, 0], [0, 0, 0.05]], action: 1 }],
    [3.4, { hip: [0.04, 4.0, -0.08], rotation: [-0.095, -0.07, 0.025], hands: [[-1.25, 6.18, 2.2], [1.1, 4.75, 1.0]] }],
    [3.75, { hip: [0.05, 4.12, 0.08], rotation: [-0.02, -0.05, 0], hands: [[-1.25, 6.05, 2.4], [1.05, 4.65, 1.1]] }],
    [4.1, { hip: [0.22, 3.72, 0], rotation: [0.12, 0.12, -0.05], hands: [[-1.45, 5.15, 1.7], [1.6, 4.6, 0.8]], action: 0.3 }],
    [4.45, { hip: [0, 4.82, 0], rotation: [0.16, 0.24, -0.19], feet: [[-0.9, 1.25, 0.7], [0.84, 1.6, -0.65]], footAngles: [[-0.1, -0.1, 0], [0.2, 0.1, 0]], hands: [[-1.6, 4.7, 1.25], [2.05, 4.1, 0.35]] }],
    [5.05, { hip: [0, 3.78, 0.08], rotation: [0.13, -0.12, 0.02], feet: [[-0.9, 0.46, 0.5], [0.9, 0.46, -0.4]], footAngles: [[0, -0.1, 0], [0, 0.1, 0]] }],
    [5.5, { hip: [0, 3.64, 0.3], rotation: [0.3, -0.1, 0], hands: [[-1.35, 5.35, 1.9], [1.85, 4.05, 0.2]], action: 1 }],
    [5.85, { hip: [0, 4.95, 0], rotation: [0.62, -0.08, -0.04], feet: [[-0.85, 1.5, 0.65], [0.8, 1.26, -1.2]], footAngles: [[-0.1, -0.1, 0], [0.25, 0.1, 0]], hands: [[-1.25, 5.6, 2.0], [1.8, 4.1, -0.05]] }],
    [7.2, { hip: [0, 5.1, 0], rotation: [0.7, -0.06, 0], feet: [[-0.8, 1.65, 0.7], [0.8, 1.46, -1.3]] }]
  ];
  const encounterTrack = (() => {
    let pose = structuredClone(neutralPose);
    return encounterKeys.map(([time, patch]) => { pose = { ...pose, ...patch };return { time, pose: structuredClone(pose) }; });
  })();

  const encounterPose = t => layeredPose(encounterTrack, t);

  function encounterState(t) {
    const dodge = smooth(4.25, 4.75, t);
    const rush = smooth(5.75, 7.05, t);
    const hero = [mix(mix(-3, 4.5, dodge), chargeDestination[0], rush), chargeDestination[1] * rush, mix(mix(-3, -6, dodge), chargeDestination[2], rush)];
    const shots = [
      { until: 0.75, label: 'SIGNATURE DETECTED', status: 'UNIDENTIFIED', eye: [0, 30, 1], target: [0, 30, -24] },
      { until: 2.25, label: 'CONTACT / SCALE UNKNOWN', status: 'TRACKING', eye: [mix(14, 11, smooth(0.75, 2.25, t)), 14, 68], target: [0, 15, -20] },
      { until: 3.1, label: 'TARGET ACQUIRED', status: 'LOCKED', eye: [hero[0] + 5, 9, hero[2] + 21], target: [0, 14, -23] },
      { until: 4.05, label: 'OPENING EXCHANGE', status: 'ENGAGING', eye: [32, 17, 45], target: [0, 14, -15] },
      { until: 5.2, label: 'COUNTERFIRE / EVADE', status: 'EVADING', eye: [22, 14, 66], target: [0, 15, -17] },
      { until: 6.25, label: 'ASCENDING / CLOSING DISTANCE', status: 'CHARGING', eye: [hero[0] + 9, hero[1] + 6, hero[2] + 24], target: [0, mix(13, encounterImpact[1], rush), -22] },
      { until: 8.01, label: t < 6.96 ? 'FINAL APPROACH' : 'CONTACT / SIGNAL LOST', status: t < 7.1 ? 'CHARGING' : 'UNCONFIRMED', eye: [1, 12, 64], target: [0, 15, -23] }
    ];
    const shot = shots.find(item => t < item.until) || shots.at(-1);
    const orbitEye = add(shot.target, transform(sub(shot.eye, shot.target), [0, 0, 0], [0, state.orbit, 0]));
    orbitEye[1] += state.tilt;
    return { hero, rush, shot, eye: orbitEye, trail: norm(sub([4.5, 0, -6], chargeDestination)), yaw: Math.atan2(-hero[0], -24 - hero[2]) };
  }

  function encounterHall() {
    for (const x of [-28, -22, -14, -6, -3, 3, 6, 14, 22, 28]) line([[x, 0, -56], [x, 0, 32]], Math.abs(x) === 3 ? '#476069' : '#243641', 0.7);
    for (let z = -52; z < 32; z += 5) {
      line([[-28, 0, z], [28, 0, z]], '#273a44', 0.6);
      if (z < -8) for (const s of [-1, 1]) {
        line([[s * 28, 0, z], [s * 28, 34, z], [s * 23, 40, z], [s * 7, 40, z]], '#304550', 0.75);
        line([[s * 27.8, 5, z], [s * 27.8, 27, z]], '#66838b', 0.9, 0.35);
      }
    }
    for (const s of [-1, 1]) {
      box([s * 24, 18, -32], [1.9, 36, 2.5], 'bay');
      box([s * 24, 18, -30.6], [0.16, 27, 0.03], 'brace');
    }
    box([0, 37, -32], [49, 2.2, 2.5], 'bay');
  }

  function unknownUnit(t) {
    const open = smooth(0.8, 2.0, t);
    const counter = smooth(3.65, 4.15, t) * (1 - smooth(5.05, 5.55, t));
    const recoil = Math.sin(clamp((t - 4.35) / 0.3) * Math.PI) * (1 - smooth(4.6, 4.7, t));
    const previousOpacity = modelOpacity;
    modelOpacity = t < 0.75 ? mix(0.2, 0.65, smooth(0, 0.75, t)) : 0.78;
    withTransform([0, 0, -24], [0, 0, 0], 1, () => {
      for (const s of [-1, 1]) {
        armor([s * 7.2, 10.1, 0.1], [7.6, 10.8, 7.5], 'enemyDark');
        armor([s * 9.2, 5.1, 2.1], [7.8, 7.4, 8.0], 'enemy');
        box([s * 9.4, 1.55, 3.6], [9.4, 3.1, 10.8], 'enemy', [0, s * -0.08, 0], 0.25);
        box([s * 9.4, 0.4, 4.0], [9.8, 0.8, 11.1], 'enemyDark');
        for (const x of [-2.4, 0, 2.4]) prism([[-0.7, 0.5], [0.7, 0.5], [0.55, -0.5], [-0.55, -0.5]], 3.1, [s * 9.4 + x, 1.8, 9.15], 'enemy');
        cylinder([s * 8.2, 9.1, 4.1], 2.0, 0.65, 'enemyDark', [0, 0, 0], 12);
        cylinder([s * 8.2, 9.1, 4.49], 0.94, 0.13, 'brace', [0, 0, 0], 12);
      }
      armor([0, 13.2, 0], [15.1, 6.2, 8.2], 'enemyDark');
      const torso = prism([[-8.5, 5.6], [8.5, 5.6], [10.2, 2.7], [8, -4.2], [3.9, -6], [-3.9, -6], [-8, -4.2], [-10.2, 2.7]], 8.5, [0, 22.2, 0], 'enemy');
      plate([[-5.7, 3.2], [5.7, 3.2], [6.7, 0.8], [3.9, -3.5], [-3.9, -3.5], [-6.7, 0.8]], 4.28, [0, 22.2, 0], 'enemyDark', [0, 0, 0], torso);
      for (const s of [-1, 1]) {
        box([s * 5.5, 17.0, 4.5], [2.7, 2.8, 0.45], 'enemyDark');
        for (let i = 0; i < 4; i++) box([s * 5.5, 16.2 + i * 0.52, 4.76], [1.75, 0.16, 0.06], 'brace');
        box([s * 8.8, 31.5, -0.7], [3.4, 7.7, 4.6], 'enemyDark');
        box([s * 8.8, 33.2, 1.64], [1.5, 2.8, 0.14], 'enemy');
        cylinder([s * 10.25, 24.8, 0], 3.1, 3.5, 'enemyDark', [0, Math.PI / 2, 0], 12);
        withTransform([s * 11.2, 24.5, 0], [counter * 0.23, 0, -s * (0.04 + open * 0.08)], 1, () => {
          armor([s * 3.05, 0.1, 0], [8.7, 8.7, 7.6], 'enemy');
          box([s * 3.05, 0.1, 3.93], [6.8, 6.9, 0.22], 'enemyDark');
          for (const x of [-2.25, 2.25]) box([s * 3.05 + x, 0.1, 4.08], [0.13, 5.1, 0.06], 'brace');
          box([s * 3.05, 3.55, 4.1], [5.1, 0.11, 0.06], 'warning');
          withTransform([s * 4.15, -5.4, 1.0], [0.1 + counter * 0.55 - recoil * 0.08, s > 0 ? -counter * 0.7 : 0, s * open * 0.06], 1, () => {
            cylinder([0, 0, 0], 2.5, 4.8, 'enemyDark', [0, Math.PI / 2, 0], 12);
            armor([0, -3.4, 0.7], [6.8, 7.2, 7.1], 'enemy');
            cylinder([0, -3.5, 4.42], 2.3, 0.7, 'enemyDark', [0, 0, 0], 12);
            cylinder([0, -3.5, 4.83], 1.42, 0.18, counter > 0.2 && s > 0 ? 'warning' : 'brace', [0, 0, 0], 12);
            cylinder([0, -3.5, 4.97], 0.77, 0.1, 'enemyDark', [0, 0, 0], 10);
            if (s > 0) emitters.push({ kind: 'unknown', origin: model([0, -3.5, 5.1]) });
          });
        });
      }
      const head = armor([0, 29.4, 0.7], [10.8, 4.5, 6.6], 'enemyDark');
      plate([[-4.3, 0.6], [4.3, 0.6], [3.8, -0.4], [-3.8, -0.4]], 3.35, [0, 29.4, 0.7], 'enemyDark', [0, 0, 0], head);
      modelOpacity = 1;
      for (const s of [-1, 1]) {
        for (let row = 0; row < 2; row++) plate([[-0.98, 0.15], [0.98, 0.15], [0.79, -0.15], [-0.79, -0.15]], 3.39, [s * 2.25, 29.85 - row * 0.53, 0.7], alertEyes ? 'alert' : 'sensor', [0, 0, 0], head);
        box([s * 1.45, 14.7, 4.24], [0.6, 1.6, 0.09], alertEyes ? 'alert' : 'sensor');
      }
      box([0, 20.4, 4.43], [2.6, 0.22, 0.08], alertEyes ? 'alert' : 'sensor');
    });
    modelOpacity = previousOpacity;
  }

  function encounter(t, showHero = true) {
    const state = encounterState(t);
    encounterHall();unknownUnit(t);
    const pose = encounterPose(t);
    if (showHero && t >= 0.75) withTransform(state.hero, [0, state.yaw, 0], 1, () => articulatedUnit(content.units[0], t, pose));
    if (t > 5.65) {
      const power = smooth(5.65, 5.95, t) * (1 - smooth(7.2, 7.55, t));
      for (const s of [-1, 1]) {
        const start = add(state.hero, transform(bodyPoint(pose, [s * 0.8, 5.0, -1]), [0, 0, 0], [0, state.yaw, 0]));
        for (let i = -1; i <= 1; i++) line([add(start, [i * 0.16, 0, 0]), add(start, add(mul(state.trail, 5 + power * 4), [s * 0.35 + i * 0.3, 0, 0]))], brandGreen, i ? 0.7 : 1.3, power * 0.8);
      }
    }
  }

  function energyStroke(points, color, weight, alpha) {
    const projected = points.map(project);
    if (projected.some(point => point.z < 0.5)) return;
    ctx.beginPath();projected.forEach((point, i) => i ? ctx.lineTo(point.x, point.y) : ctx.moveTo(point.x, point.y));
    if (PURE && weight < 3 && projected.length === 2) {
      // Thin rays fade out along their length with a faint wide halo, so they read as light rather than hairlines.
      const [a, b] = projected, tint = preComp(color).replace('rgb(', '').replace(')', '');
      const fade = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      fade.addColorStop(0, `rgba(${tint},1)`);fade.addColorStop(1, `rgba(${tint},0)`);
      ctx.lineCap = 'round';
      ctx.strokeStyle = fade;ctx.lineWidth = weight * 5;ctx.globalAlpha = alpha * 0.18;ctx.stroke();
      ctx.lineWidth = weight * 1.4;ctx.globalAlpha = alpha;ctx.stroke();
      ctx.lineCap = 'butt';ctx.globalAlpha = 1;
      return;
    }
    if (PURE && weight >= 3) {
      // Light rays: a wide, faint halo under the stroke so thick beams read as translucent light, not hard lines.
      ctx.strokeStyle = preComp(color);ctx.lineCap = 'round';ctx.lineJoin = 'round';
      ctx.lineWidth = weight * 2.8;ctx.globalAlpha = alpha * 0.12;ctx.stroke();
      ctx.lineWidth = weight * 1.7;ctx.globalAlpha = alpha * 0.2;ctx.stroke();
      ctx.lineCap = 'butt';
    }
    ctx.strokeStyle = state.mono ? '#d5e2e4' : PURE ? preComp(color) : color;ctx.lineWidth = weight;ctx.globalAlpha = alpha;ctx.stroke();ctx.globalAlpha = 1;
  }

  function energyRing(center, radius, color, alpha, ground = false) {
    energyStroke(Array.from({ length: 49 }, (_, i) => {
      const a = i * Math.PI / 24;
      return add(center, ground ? [Math.cos(a) * radius, 0, Math.sin(a) * radius] : [Math.cos(a) * radius, Math.sin(a) * radius, 0]);
    }), color, 1.1, alpha);
  }

  function encounterEffects(t) {
    const rifle = emitters.find(emitter => emitter.kind === 'rifle');
    for (const beat of [3.25, 3.65]) {
      const pulse = smooth(beat, beat + 0.025, t) * (1 - smooth(beat + 0.12, beat + 0.23, t));
      if (!rifle || pulse <= 0 || rifle.direction[2] >= -0.01) continue;
      const distance = (-18.5 - rifle.origin[2]) / rifle.direction[2];
      if (distance <= 0) continue;
      const impact = add(rifle.origin, mul(rifle.direction, distance));
      energyStroke([rifle.origin, impact], brandGreen, 1.8, pulse);
      energyRing(rifle.origin, 0.26 + pulse * 0.25, brandGreen, pulse);
      energyRing(impact, 0.6 + (t - beat) * 8, '#d4a083', pulse * 0.85);
      for (let i = 0; i < 9; i++) {
        const angle = i * 2.39996;
        energyStroke([impact, add(impact, [Math.cos(angle) * 1.8, Math.sin(angle) * 1.8, 0.1])], '#d4a083', 0.8, pulse * 0.6);
      }
    }
    const cannon = emitters.find(emitter => emitter.kind === 'unknown');
    const counter = smooth(4.25, 4.32, t) * (1 - smooth(4.9, 5.12, t));
    if (cannon && counter > 0) {
      const impact = [-3.4, 0.22, 1.6];
      for (const offset of [-0.24, 0, 0.24]) energyStroke([add(cannon.origin, [offset, 0, 0]), add(impact, [offset, 0, 0])], '#e2ac87', offset ? 0.8 : 2.0, counter * (offset ? 0.6 : 0.95));
      for (const r of [0.5, 1.1, 1.65]) energyRing(impact, r + (t - 4.25) * 3.5, '#c79575', counter * 0.6, true);
      for (let i = 0; i < 14; i++) {
        const angle = i * 2.39996;
        energyStroke([impact, add(impact, [Math.cos(angle) * 3.1, 0.3 + (i % 4) * 0.7, Math.sin(angle) * 2.4])], '#d5ab88', 0.7, counter * 0.5);
      }
    }
    if (t > 5.75 && t < 7.3) {
      const flight = encounterState(t), pose = encounterPose(t);
      const power = smooth(5.75, 5.95, t) * (1 - smooth(7.08, 7.3, t));
      for (const s of [-1, 1]) {
        const start = add(flight.hero, transform(bodyPoint(pose, [s * 0.8, 5.0, -1]), [0, 0, 0], [0, flight.yaw, 0]));
        for (let i = -1; i <= 1; i++) energyStroke([add(start, [i * 0.15, 0, 0]), add(start, add(mul(flight.trail, 9 + power * 4), [s * 0.65 + i * 0.35, 0, 0]))], brandGreen, i ? 0.75 : 1.8, power * (i ? 0.55 : 0.95));
        energyRing(start, 0.25 + power * 0.18, brandGreen, power * 0.8);
      }
    }
    const collision = smooth(6.96, 7.03, t) * (1 - smooth(7.25, 7.7, t));
    if (collision > 0) {
      const impact = encounterImpact;
      for (const r of [1.3, 2.0, 3.2]) energyRing(impact, r + (t - 6.96) * 12, brandGreen, collision * 0.8);
      for (let i = 0; i < 35; i++) {
        const angle = i * 2.39996;
        const radius = 1.8 + (i % 8) * 0.7 + (t - 6.96) * 12;
        energyStroke([impact, add(impact, [Math.cos(angle) * radius, Math.sin(angle) * radius, (i % 5) * 0.8])], i % 4 ? brandGreen : '#e8c19b', 0.7, collision * 0.65);
      }
      ctx.globalAlpha = collision * 0.16;ctx.fillStyle = brandGreen;ctx.fillRect(...artBounds());ctx.globalAlpha = 1;
    }
  }

  // Full-frame cards, cut in hard like the source's unit name plates.
  // Cards sit right of the intro copy so long headings never overlap it.
  // On a 1:1 frame the cards sit low and near dead centre, clear of the
  // top-left copy, with room to keep their full size.
  const boxFrame = () => width / height < 1.3;
  const cardCenter = () => boxFrame() ? { x: width * 0.52, y: height * 0.6 } : { x: width * (square ? 0.74 : 0.6), y: height * 0.5 };
  const cardWidth = () => width * (boxFrame() ? 0.86 : square ? 0.42 : 0.62);

  function titleCard(code, name, accent, u) {
    const { x, y } = cardCenter();
    const punch = 1 + (1 - smooth(0, 0.12, u)) * 0.08;
    ctx.fillStyle = '#080b0e';ctx.fillRect(0, 0, width, height);
    ctx.save();ctx.translate(x, y);ctx.scale(punch, punch);
    ctx.textAlign = 'center';ctx.textBaseline = 'middle';
    ctx.shadowColor = PURE ? preComp(accent) : state.mono ? '#bfcccf' : accent;ctx.shadowBlur = height * 0.03;ctx.fillStyle = PURE ? preComp(deepen(accent)) : '#f2f7f8';
    ctx.font = `700 ${Math.round(height * 0.05)}px 'ServiceNow Sans', Arial, sans-serif`;
    ctx.fillText(code, 0, -height * 0.085);
    let size = height * 0.14;
    ctx.font = `800 ${Math.round(size)}px 'ServiceNow Sans', Arial, sans-serif`;
    const fit = cardWidth() / ctx.measureText(name).width;
    if (fit < 1) { size *= fit;ctx.font = `800 ${Math.round(size)}px 'ServiceNow Sans', Arial, sans-serif`; }
    ctx.fillText(name, 0, height * 0.04);
    ctx.restore();
  }

  function alertCard(lines, size, alpha = 1, scale = 1, backdrop = true) {
    const { x, y } = cardCenter();
    if (backdrop) { ctx.fillStyle = '#080b0e';ctx.fillRect(0, 0, width, height); }
    ctx.save();ctx.translate(x, y);ctx.scale(scale, scale);ctx.globalAlpha = alpha;
    ctx.textAlign = 'center';ctx.textBaseline = 'middle';
    ctx.shadowColor = alertRed;ctx.shadowBlur = height * (PURE ? 0.004 : 0.025);
    // Shrink the whole block if its widest line would run past the frame.
    const fontFor = (weight, px) => `${weight ? 800 : 600} ${Math.round(px)}px 'ServiceNow Sans', Arial, sans-serif`;
    const widest = Math.max(...lines.map(([text, weight]) => { ctx.font = fontFor(weight, height * (weight ? size : 0.028));return ctx.measureText(text).width; }));
    const shrink = scale > 1 ? 1 : Math.min(1, cardWidth() / widest);
    lines.forEach(([text, weight], i) => {
      ctx.fillStyle = weight ? (state.mono ? '#d5e2e4' : alertRed) : '#9aa9ae';
      ctx.font = fontFor(weight, height * (weight ? size : 0.028) * shrink);
      ctx.fillText(text, 0, (i - (lines.length - 1) / 2) * height * size * shrink * 1.08);
    });
    ctx.restore();
  }

  function burst(center, color, alpha, count, radius) {
    for (let i = 0; i < count; i++) {
      const angle = i * 2.39996;
      const reach = radius * (0.55 + (i % 5) * 0.11);
      energyStroke([center, add(center, [Math.cos(angle) * reach, Math.sin(angle) * reach, 0])], color, i % 3 ? 0.7 : 1.5, alpha * 0.8);
    }
    energyRing(center, radius * 0.3, color, alpha);
  }

  // Beam stroke clipped at the near plane, so beams fired toward the camera
  // still draw instead of vanishing when their far end passes behind it.
  function beam(a, b, color, weight, alpha) {
    const clipped = nearClip(a, b);
    if (clipped) energyStroke(clipped, color, weight, alpha);
  }

  function glowAt(point, radius, rgb, alpha) {
    const p = project(point);
    if (p.z < 1 || alpha <= 0) return;
    const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius);
    if (PURE) {
      // Coloured, translucent glow instead of an opaque white blob, so lines underneath stay visible.
      const [r, g, b] = rgb.split(',').map(Number);
      const hex = r > 230 ? '#2f8bff' : '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
      rgb = preComp(deepen(hex, 0.55)).replace(/[^0-9,]/g, '');
      alpha *= 0.4;
    }
    glow.addColorStop(0, `rgba(${rgb},${alpha})`);glow.addColorStop(1, `rgba(${rgb},0)`);
    ctx.fillStyle = glow;ctx.fillRect(p.x - radius, p.y - radius, radius * 2, radius * 2);
  }

  // Each kind's signature move, after the source units: heart beam, dodged
  // laser, twin lasers, launcher salvo, spinning slash and the long beam.
  function signature(unit, mech, t) {
    const pose = mech.rig;
    const color = state.mono ? '#d5e2e4' : PURE ? deepen(unit.accent, 0.5) : unit.accent;
    const white = PURE ? deepen(unit.accent, 0.62) : whiteInk;
    const forward = mech.dir([0, 0, 1]);
    // Shots angle across the frame instead of straight down the lens.
    const across = norm(mech.dir([0.65, 0.08, 1]));
    const hands = skeletons[0].arms.map(arm => arm.end);
    if (unit.kind === 'agile') {
      const fire = smooth(3.55, 3.65, t) * (1 - smooth(4.4, 4.75, t));
      if (fire <= 0) return;
      const origin = mul(add(hands[0], hands[1]), 0.5);
      const end = add(origin, mul(across, 22 * fire));
      beam(origin, end, color, 7, fire * 0.55);
      beam(origin, end, white, 2.5, fire * 0.9);
      for (let i = 1; i < 5; i++) energyRing(add(origin, mul(across, i * 4.5 * fire)), 0.8 + i * 0.25, color, fire * 0.7);
      burst(origin, color, fire, 28, 3 + fire * 6);
      burst(origin, white, fire * 0.8, 12, 2 + fire * 3);
      glowAt(origin, height * 0.4 * fire, '242,247,248', 0.55 * fire);
    } else if (unit.kind === 'aerial') {
      // An enemy shot cuts level through the chest height of the spot the unit
      // has just boosted out of, entering from screen-left.
      const right = norm([camera.right[0], 0, camera.right[2]]);
      const from = add([0, 5.4, 0], mul(right, -24)), to = add([0, 5.4, 0], mul(right, 24));
      const head = smooth(2.52, 2.72, t), tail = smooth(2.74, 3.05, t);
      const laser = state.mono ? '#d5e2e4' : '#d4a083';
      if (head > tail) {
        const a = from.map((v, i) => mix(v, to[i], tail)), b = from.map((v, i) => mix(v, to[i], head));
        beam(a, b, laser, 6, 0.9);
        beam(a, b, white, 2, 0.85);
        energyRing(b, 0.7, laser, 0.8);
      }
    } else if (unit.kind === 'heavy') {
      // Two thick level beams out of the shoulder-cannon barrels, parallel and
      // angled across the frame; a charge glow builds at the muzzles first.
      const charge = smooth(2.0, 2.76, t) * (1 - smooth(2.8, 2.9, t));
      const fire = smooth(2.76, 2.84, t) * (1 - smooth(3.9, 4.15, t));
      // Beams leave straight down each barrel's own axis.
      for (const s of [-1, 1]) for (const x of raidenBarrels) {
        const cannon = point => mech.pose(transform(point, [s * 1.8, 6.35, -0.36], [0, 0, -s * pose.action * 0.55]));
        const muzzle = cannon([x, 0.55, 2.7]);
        const flat = norm(sub(muzzle, cannon([x, 0.55, 0])));
        glowAt(muzzle, height * 0.06 * (charge + fire), '242,247,248', 0.6 * Math.max(charge, fire));
        if (fire <= 0) continue;
        const end = add(muzzle, mul(flat, 40 * fire));
        beam(muzzle, end, color, 9, fire * 0.5);
        beam(muzzle, end, white, 3, fire * 0.95);
      }
    } else if (unit.kind === 'siege') {
      const hammer = emitters.find(emitter => emitter.kind === 'hammer');
      if (!hammer) return;
      // Slam: shockwave rings race out across the ground from the impact
      // point, with shards and dust thrown up from the hammer head.
      const age = t - 2.75;
      if (age >= 0 && age < 0.6) {
        const fade = 1 - age / 0.6;
        const ground = [hammer.origin[0], 0.05, hammer.origin[2]];
        for (const r of [1.2, 2.6, 4.2]) energyRing(ground, r + age * 16, color, fade * 0.85, true);
        energyRing(ground, 0.6 + age * 6, white, fade, true);
        for (let i = 0; i < 18; i++) {
          const a = i * 2.39996, reach = (1.5 + (i % 4) * 0.6) * (0.4 + age * 3);
          energyStroke([ground, add(ground, [Math.cos(a) * reach, 0.8 + (i % 5) * 0.9 * (1 - age), Math.sin(a) * reach])], i % 3 ? color : white, 1.2, fade * 0.7);
        }
        glowAt(ground, height * 0.3 * fade, '242,247,248', 0.6 * fade);
      }
    } else if (unit.kind === 'close') {
      const spin = smooth(1.85, 1.95, t) * (1 - smooth(2.35, 2.5, t));
      if (spin > 0) {
        const centre = add(mech.travel.root, [0, 5.1, 0]);
        const ring = Array.from({ length: 33 }, (_, i) => {
          const a = mech.travel.yaw - i * 0.09;
          return add(centre, [Math.sin(a) * 3.6, Math.sin(i * 0.4) * 0.15, Math.cos(a) * 3.6]);
        });
        energyStroke(ring, color, 4, spin);
        energyStroke(ring.map(p => add(p, [0, -0.3, 0])), white, 1.4, spin * 0.8);
      }
      const slash = smooth(2.38, 2.42, t) * (1 - smooth(2.6, 2.85, t));
      if (slash > 0) {
        const arc = Array.from({ length: 25 }, (_, i) => {
          const a = mix(-1.2, 1.4, i / 24);
          return add(hands[1], add(mul(forward, Math.cos(a) * 4.8), [Math.sin(a) * 4.8, Math.sin(a) * 1.6, 0]));
        });
        energyStroke(arc, color, 5, slash);
        energyStroke(arc.map(p => add(p, [0, -0.35, 0])), white, 1.8, slash * 0.8);
      }
    } else if (unit.kind === 'orbital') {
      const fire = smooth(4.45, 4.55, t) * (1 - smooth(5.6, 6.0, t));
      if (fire <= 0) return;
      const origin = hands[0];
      const end = add(origin, mul(across, 26 * fire));
      beam(origin, end, color, 8, fire * 0.5);
      beam(origin, end, white, 2.6, fire * 0.9);
      energyRing(origin, 0.9 + fire * 1.0, color, fire);
      glowAt(origin, height * 0.18 * fire, '242,247,248', 0.5 * fire);
    }
  }

  // Screen-space streaks against the direction of travel while dashing.
  function speedLines(kind, t) {
    const now = travelAt(kind, t).root, before = travelAt(kind, t - 0.05).root;
    const velocity = mul(sub(now, before), 20);
    const speed = Math.hypot(...velocity);
    if (speed < 4) return;
    const a = project(add(now, [0, 5, 0])), b = project(add(sub(now, mul(velocity, 0.1)), [0, 5, 0]));
    if (a.z < 1 || b.z < 1) return;
    const length = Math.hypot(b.x - a.x, b.y - a.y) || 1;
    const dx = (b.x - a.x) / length, dy = (b.y - a.y) / length;
    const [x0, y0, w, h] = artBounds();
    const reach = clamp(speed * 7, 40, 220);
    ctx.strokeStyle = state.mono ? '#d5e2e4' : '#a9bcc2';ctx.lineWidth = 0.9;ctx.globalAlpha = clamp((speed - 4) / 10) * 0.5;
    for (let i = 0; i < 40; i++) {
      const x = x0 + ((i * 0.618 + t * 3.1) % 1) * w, y = y0 + ((i * 0.382 + i * i * 0.013) % 1) * h;
      ctx.beginPath();ctx.moveTo(x, y);ctx.lineTo(x + dx * reach * (0.5 + (i % 3) * 0.25), y + dy * reach * (0.5 + (i % 3) * 0.25));ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function starfield(u, alpha) {
    const { x, y } = screenCenter();
    ctx.strokeStyle = '#70969f';ctx.lineWidth = 0.7;ctx.globalAlpha = alpha;
    for (let i = 0; i < 48; i++) {
      const angle = i * 2.39996;
      const radius = 0.12 + ((i * 0.173 + u * 1.3) % 1) * 0.6;
      ctx.beginPath();ctx.moveTo(x + Math.cos(angle) * width * radius, y + Math.sin(angle) * height * radius);
      ctx.lineTo(x + Math.cos(angle) * width * (radius + 0.03), y + Math.sin(angle) * height * (radius + 0.03));ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  // Back thrusters during unit 01's dash: plumes streaming back and down from
  // the backpack, with a glow where they wash the floor.
  function boostTrail(t, mech) {
    const power = smooth(2.55, 2.65, t) * (1 - smooth(3.35, 3.5, t));
    if (power <= 0) return;
    // Opposite the direction of travel in world space, angled slightly down.
    const back = norm(transform([0, -0.3, -1], [0, 0, 0], [0, mech.travel.yaw, 0]));
    for (const s of [-1, 1]) {
      const nozzle = mech.pose([s * 0.55, 6.1, -0.95]);
      for (let i = -1; i <= 1; i++) {
        const end = add(nozzle, add(mul(back, (4.5 + Math.sin(t * 40 + i + s) * 0.6) * power), mul(mech.dir([1, 0, 0]), i * 0.25)));
        beam(nozzle, end, state.mono ? '#d5e2e4' : brandGreen, i ? 2 : 4, power * (i ? 0.5 : 0.85));
      }
      glowAt(nozzle, height * 0.06 * power, '99,223,78', 0.5 * power);
    }
    const wash = [mech.travel.root[0], 0.05, mech.travel.root[2] - 1.5];
    energyRing(wash, 1.2 + Math.sin(t * 30) * 0.15, brandGreen, power * 0.5, true);
  }

  // Unit 01's beam blade: lit along the rifle on the wind-up, with a crescent
  // trail around the shoulder through the slash.
  function bladeSlash(t, mech) {
    const rifle = emitters.find(emitter => emitter.kind === 'rifle');
    if (!rifle) return;
    const lit = smooth(2.5, 2.65, t) * (1 - smooth(4.5, 4.8, t));
    if (lit <= 0) return;
    const cyan = state.mono ? '#d5e2e4' : PURE ? deepen('#2f8bff', 0.52) : '#7fe7ff';
    const core = PURE ? deepen('#2f8bff', 0.64) : whiteInk;
    const tip = add(rifle.origin, mul(rifle.direction, 5.5 * lit));
    beam(rifle.origin, tip, cyan, 10, lit * 0.55);
    beam(rifle.origin, tip, core, 3, lit * 0.95);
    glowAt(tip, height * 0.05 * lit, '127,231,255', 0.5 * lit);
    // The slash crescent is laid out in camera space: a wide, flat sweep
    // across the front of the body from screen-right to screen-left, bowed
    // toward the viewer and tilted slightly, so the cut reads head-on.
    const fade = 1 - smooth(3.95, 4.3, t);
    const progress = smooth(3.64, 3.78, t);
    if (progress <= 0 || fade <= 0) return;
    const centre = add(mech.pose([0, 4.9, 0.6]), mul(camera.forward, -0.8));
    const start = -0.35, end = mix(start, Math.PI + 0.35, progress);
    const arc = Array.from({ length: 33 }, (_, i) => {
      const a = mix(start, end, i / 32);
      const sweep = add(mul(camera.right, Math.cos(a) * 4.6), mul(camera.up, Math.sin(a) * 0.55 - Math.cos(a) * 0.7));
      return add(centre, add(sweep, mul(camera.forward, -Math.sin(a) * 0.8)));
    });
    for (let i = 1; i < arc.length; i++) {
      const weight = 0.25 + 0.75 * i / 32;
      beam(arc[i - 1], arc[i], cyan, 30 * weight, fade * 0.4);
      beam(arc[i - 1], arc[i], core, 4 * weight, fade * 0.9);
    }
  }


  // Full-body framing that moves with the action: follows the unit's travel,
  // runs the per-unit camera track (whip pans, push-ins, low angles, roll)
  // and shakes on hits.
  function actionCamera(kind, t, base) {
    const cam = sampleTrack(cameraTracks[kind], t);
    const hit = impact(kind, t);
    const jolt = [Math.sin(t * 173), Math.cos(t * 151), Math.sin(t * 131)].map(v => v * hit.shake * 0.35);
    const target = add(add(base.target, mul(travelAt(kind, t).root, 0.6)), mul(jolt, 0.5));
    const angle = base.angle + cam.yaw + state.orbit;
    const distance = base.distance * cam.dist * (1 - hit.shake * 0.08);
    const eye = add(target, [Math.sin(angle) * distance, base.eyeY - base.target[1] + cam.lift + state.tilt, Math.cos(angle) * distance]);
    return view(add(eye, jolt), target, cam.roll);
  }

  const orbitView = (angle, distance, eyeY, target) => view([Math.sin(angle + state.orbit) * distance, eyeY + state.tilt, Math.cos(angle + state.orbit) * distance], target);
  const closeUp = (target, offset) => view(add(target, offset), target);

  function nearClip(a, b) {
    const depth = p => dot(sub(p, camera.eye), camera.forward);
    let za = depth(a), zb = depth(b);
    if (za < 0.6 && zb < 0.6) return null;
    if (za < 0.6) { a = add(b, mul(sub(a, b), (zb - 0.6) / (zb - za)));za = 0.6; }
    if (zb < 0.6) b = add(a, mul(sub(b, a), (za - 0.6) / (za - zb)));
    return [a, b];
  }

  function drawLines(items) {
    for (const item of items) {
      const world = item.points.length === 2 ? nearClip(...item.points) : item.points;
      if (!world) continue;
      const points = world.map(project);
      if (points.some(p => p.z < 0.5)) continue;
      ctx.beginPath();
      points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
      ctx.strokeStyle = state.mono ? '#52616b' : item.color;
      ctx.lineWidth = item.lineWidth;
      ctx.globalAlpha = item.alpha;
      ctx.stroke();
    }
    ctx.globalAlpha = 1;
  }

  function drawPolygon(f) {
    if (f.logo) { drawChestMark(f);return; }
    const material = palette[f.material];
    ctx.beginPath();
    f.points.forEach((p, i) => i ? ctx.lineTo(p.x, p.y) : ctx.moveTo(p.x, p.y));
    ctx.closePath();
    ctx.globalAlpha = 1;
    ctx.fillStyle = f.opacity < 1 ? '#080b0e' : state.mono ? (f.material === 'teal' ? '#253235' : '#0c1216') : material.fill;
    ctx.fill();
    ctx.strokeStyle = state.mono ? (f.material === 'bay' ? '#364650' : '#a8b8c0') : material.edge;
    ctx.lineWidth = material.weight;
    ctx.globalAlpha = f.opacity;
    ctx.stroke();
    ctx.globalAlpha = 1;
    f.children.forEach(drawPolygon);
  }

  function drawFaces() {
    faces.sort((a, b) => b.depth - a.depth);
    faces.forEach(drawPolygon);
  }

  function annotation(p, label, sublabel, dx, dy, alpha = 1) {
    const v = project(p);
    if (square || v.z < 1 || width < 1000) return;
    ctx.globalAlpha = alpha * 0.8;
    ctx.strokeStyle = '#71818a'; ctx.lineWidth = 0.6;
    ctx.beginPath(); ctx.arc(v.x, v.y, 2.4, 0, Math.PI * 2); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(v.x + Math.sign(dx) * 5, v.y); ctx.lineTo(v.x + dx * 0.4, v.y + dy); ctx.lineTo(v.x + dx, v.y + dy); ctx.stroke();
    ctx.textAlign = dx > 0 ? 'left' : 'right';
    ctx.font = '8px ui-monospace, monospace'; ctx.fillStyle = '#a5b4bb';
    ctx.fillText(label, v.x + dx, v.y + dy - 8);
    ctx.font = '6px ui-monospace, monospace'; ctx.fillStyle = '#5e717d';
    ctx.fillText(sublabel, v.x + dx, v.y + dy + 11);
    ctx.globalAlpha = 1;
  }

  function effects(t, mech) {
    const power = mech.ignition * (1 - smooth(9.7, 10.5, t));
    if (power > 0) {
      for (const s of [-1, 1]) {
        const p = project(mech.pose([s * 0.88, 4.9, -1]));
        const q = project(mech.pose([s * 0.88, 4.9 - 1.2 * power, -1 - power * 3]));
        if (p.z < 0.5 || q.z < 0.5) continue;
        ctx.globalAlpha = power * 0.5;
        ctx.strokeStyle = state.mono ? '#d8eeee' : brandGreen; ctx.lineWidth = 0.9;
        for (let i = -2; i <= 2; i++) {
          ctx.beginPath();ctx.moveTo(p.x + i * 2, p.y);ctx.lineTo(q.x + i * 5, q.y + Math.sin(t * 35 + i) * 7);ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }
      const visor = project(mech.pose([0, 7.46, 0.72]));
      if (visor.z > 1) {
        const r = 36 * power;
        const glow = ctx.createRadialGradient(visor.x, visor.y, 0, visor.x, visor.y, r);
        glow.addColorStop(0, `${brandGreen}40`);glow.addColorStop(1, `${brandGreen}00`);
        ctx.fillStyle = glow;ctx.fillRect(visor.x - r, visor.y - r, r * 2, r * 2);
      }
    }
    if (t > 8.1 && t < 10.7) {
      ctx.strokeStyle = '#70969f';ctx.lineWidth = 0.7;
      ctx.globalAlpha = Math.sin(clamp((t - 8.1) / 2.6) * Math.PI) * 0.45;
      for (let i = 0; i < 42; i++) {
        const angle = i * 2.39996;
        const radius = 0.18 + ((i * 0.173 + t * 0.8) % 1) * 0.5;
        const length = 0.018 + 0.05 * mech.launch;
        const { x, y } = screenCenter();
        ctx.beginPath();ctx.moveTo(x + Math.cos(angle) * width * radius, y + Math.sin(angle) * height * radius);ctx.lineTo(x + Math.cos(angle) * width * (radius + length), y + Math.sin(angle) * height * (radius + length));ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }
    if (t > 10.6) {
      const x = square ? screenCenter().x : width * 0.51;
      const y = square ? screenCenter().y : height * 0.47;
      ctx.globalAlpha = smooth(10.6, 11.1, t) * (1 - smooth(11.6, 12, t));
      ctx.textAlign = 'center';ctx.fillStyle = '#a5d9d7';ctx.font = '10px ui-monospace, monospace';
      ctx.fillText('V I R T U A R O I D   D E P L O Y E D', x, y);
      ctx.globalAlpha = 1;
    }
  }

  function reticle() {
    if (square) return;
    ctx.strokeStyle = '#2b3941';ctx.lineWidth = 0.7;
    const x = width * 0.51, y = height * 0.49;
    for (const s of [-1, 1]) {
      ctx.beginPath();ctx.moveTo(x + s * 15, y);ctx.lineTo(x + s * 23, y);ctx.stroke();
      ctx.beginPath();ctx.moveTo(x, y + s * 15);ctx.lineTo(x, y + s * 23);ctx.stroke();
    }
    if (width < 700) return;
    const left = width * 0.26, right = width * 0.77, top = 124, bottom = height - 180;
    for (const x of [left, right]) for (const y of [top, bottom]) {
      const sx = x === left ? 1 : -1, sy = y === top ? 1 : -1;
      ctx.beginPath();ctx.moveTo(x, y + sy * 9);ctx.lineTo(x, y);ctx.lineTo(x + sx * 9, y);ctx.stroke();
    }
    for (let y = top + 28; y < bottom; y += 16) {
      ctx.beginPath();ctx.moveTo(left - 10, y);ctx.lineTo(left - 7, y);ctx.stroke();
    }
  }

  function closingScene(t) {
    const color = state.mono ? '#a8b8c0' : content.closing.accent;
    const decay = 1 - smooth(0, 2.5, t);
    line([[-3.8, 4.25, 0], [-2.4, 4.25, 0], [-2.15, 4.25 + decay * 0.4, 0], [-1.9, 4.25 - decay * 0.3, 0], [-1.6, 4.25, 0]], color, 0.8, 0.3);
    line([[1.6, 4.25, 0], [3.8, 4.25, 0]], color, 0.8, 0.3);
    for (const s of [-1, 1]) line([[s * 4.2, 3.3, 0], [s * 4.4, 3.3, 0], [s * 4.4, 5.2, 0], [s * 4.2, 5.2, 0]], '#536c75', 0.7, 0.5);
  }

  function render() {
    syncPure();
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.globalAlpha = 1;
    ctx.fillStyle = '#080b0e';ctx.fillRect(0, 0, width, height);
    const index = chapterAt(state.time);
    const chapter = chapters[index];
    const t = chapterClock(index, state.time);
    const u = chapterLocal(index, state.time);
    const battle = index === 7;
    const compact = presentation.responsiveFraming && width < 600;
    const number = String(index + 1).padStart(2, '0');
    const inSpace = index === 0 && u >= launchCuts.space;
    const spaceT = spaceClock(u);
    let card = null, heroCut = 0, backlight = false, action = null;
    alertEyes = false;
    if (index === 0 && !inSpace) {
      if (u < launchCuts.gantry) camera = closeUp([0, 7.15, 0.2], [-1.2, 0.2, 4.6]);
      else if (u < launchCuts.leg) camera = view([7, 1.6, 17], [0, 5.6, 0]);
      else if (u < launchCuts.visor) camera = closeUp([0.8, 1.3, 0.2], [3.2, 0.4, 5.2]);
      else if (u < launchCuts.launch) camera = closeUp([0, 6.9, 0.3], [-2.6, -1.6, 5.4]);
      else camera = orbitView(0.29 - smooth(0, 8, t) * 0.13, compact ? 29 : 26, 6.25, [0, 4.65, 0]);
    } else if (inSpace) {
      const pose = poseAt('slash', spaceT);
      const travel = travelAt('space', spaceT);
      if (u < launchCuts.shoulder) camera = closeUp(placed(travel, bodyPoint(pose, [0.9, 6.2, 0])), [3.4, 0.6, 3.8]);
      else if (u < launchCuts.title) camera = closeUp(placed(travel, bodyPoint(pose, pose.hands[0])), [-2.8, -0.9, 4.6]);
      else {
        if (u < launchCuts.shot) card = () => titleCard(`UNIT–${number}`, chapter.heading[0], chapter.accent, u - launchCuts.title);
        heroCut = 1 - smooth(launchCuts.shot, launchCuts.shot + 0.35, u);
        camera = actionCamera('space', spaceT, { angle: 0.29, distance: 22 * (1 + heroCut * 0.3), eyeY: 6.25, target: [0, 4.9, 0] });
        if (!card) action = { kind: 'space', t: spaceT };
      }
    } else if (index < 7) {
      const pose = poseAt(chapter.kind, t);
      const travel = travelAt(chapter.kind, t);
      const side = index % 2 ? 1 : -1;
      if (u < unitCuts.face) camera = closeUp(placed(travel, bodyPoint(pose, [0, 7.3, 0.3])), [side * 1.6, 0.35, 4.2]);
      else if (u < unitCuts.body) camera = closeUp(placed(travel, bodyPoint(pose, [0, 5.2, 0])), [-side * 4.4, -3.2, 4.6]);
      else {
        if (u < unitCuts.title) card = () => titleCard(`UNIT–${number}`, chapter.heading[0], chapter.accent, u - unitCuts.body);
        heroCut = 1 - smooth(unitCuts.title, unitCuts.title + 0.35, u);
        const angles = [0.29, 0.58, 0.48, 0.52, 0.55, 0.13, 0.43];
        const distance = (compact ? 29 : index === 2 ? 29 : index === 6 ? 23 : 26) * (1 - heroCut * 0.35);
        camera = actionCamera(chapter.kind, t, { angle: angles[index] - smooth(0, 8, t) * 0.36, distance, eyeY: index === 2 ? 6.7 : 6.25, target: [0, index === 2 || index === 6 ? 5.25 : 4.65, 0] });
        if (!card) action = { kind: chapter.kind, t };
      }
    } else if (battle) {
      alertEyes = true;
      camera = null;
      const sensor = [2.25, 29.85, -19.9];
      if (u < finaleCuts.eye) {
        camera = view([12, 14, 66], [0, 15, -20]);
        const blink = Math.floor(u / 0.4) % 2 === 0 ? 1 : 0.25;
        card = () => alertCard([['WARNING', 1]], 0.16, blink, 1, false);
      } else if (u < finaleCuts.eyes) camera = closeUp(sensor, [0.6, 0.2, 3.4]);
      else if (u < finaleCuts.approach) camera = view([0, 29.8, -8.5], [0, 29.6, -19.9]);
      else if (u < finaleCuts.silhouette) card = () => alertCard([['ENEMY', 1], ['IS', 1], ['APPROACHING', 1]], 0.1);
      else if (u < finaleCuts.unknown) { camera = view([0, 4, 34], [0, 18, -24]); }
      else if (u < finaleCuts.closer) card = () => alertCard([['UNKNOWN', 1], ['SIGNATURE NOT RECOGNIZED', 0]], 0.12);
      // The readable card itself zooms in, growing from its own size with an
      // ease-in, so the giant crop reads as a push rather than a jump cut.
      else if (u < finaleCuts.zoom) {
        const push = clamp((u - finaleCuts.closer) / (finaleCuts.zoom - finaleCuts.closer));
        card = () => alertCard([['UNKNOWN', 1], ['SIGNATURE NOT RECOGNIZED', 0]], 0.12, 1, mix(1, 5, push * push * push));
      } else if (u < finaleCuts.dash) { camera = view([0, 14, 16], [0, 24, -24]); }
      if (u >= finaleCuts.dash || !camera) {
        const fight = encounterState(t);
        camera = view(fight.eye, fight.shot.target);
      }
    } else camera = orbitView(0, square ? 24 : 22, 6.25, [0, 4.25, 0]);
    ctx.save();
    ctx.beginPath();ctx.rect(...artBounds());ctx.clip();
    if (backlight) {
      const { x, y } = screenCenter();
      const glow = ctx.createRadialGradient(x, y, 0, x, y, Math.max(width, height) * 0.6);
      glow.addColorStop(0, 'rgba(206,220,224,0.62)');glow.addColorStop(1, 'rgba(206,220,224,0)');
      ctx.fillStyle = glow;ctx.fillRect(0, 0, width, height);
    }
    faces = [];strokes = [];skeletons = [];emitters = [];model = null;modelOpacity = 1;
    let mech, subject;
    if (index === 0 && !inSpace) { hangar(t);mech = robot(t);subject = mech; }
    else if (inSpace) subject = travelled(content.units[0], travelAt('space', spaceT), spaceT, poseAt('slash', spaceT));
    else if (index < 7) subject = showcase(index, t);
    else if (battle) encounter(t, u >= finaleCuts.dash);
    else closingScene(t);
    if (inSpace) starfield(u, 0.3);
    if (action) speedLines(action.kind, action.t);
    drawLines(strokes);drawFaces();
    if (battle) encounterEffects(t);
    if (inSpace) { boostTrail(spaceT, subject);bladeSlash(spaceT, subject); }
    if (alertEyes) for (const s of [-1, 1]) {
      const p = project([s * 2.25, 29.6, -19.9]);
      if (p.z < 1) continue;
      const r = height * 0.5 / Math.max(p.z, 4);
      const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r);
      glow.addColorStop(0, PURE ? 'rgba(255,74,61,0.14)' : 'rgba(255,74,61,0.55)');glow.addColorStop(1, 'rgba(255,74,61,0)');
      ctx.fillStyle = glow;ctx.fillRect(p.x - r, p.y - r, r * 2, r * 2);
    }
    if (mech) {
      effects(t, mech);
      const labels = 1 - smooth(2.4, 3.5, t);
      if (labels > 0) {
        annotation(mech.pose([0, 7.46, 0.65]), 'OPTICAL ARRAY', 'MODULE 01 / ONLINE', 154, -25, labels);
        annotation(skeletons[0].arms[0].end, 'PRIMARY ASSEMBLY', 'MODULE 02 / READY', -120, 18, labels);
        annotation(skeletons[0].legs[1].joint, 'ACTUATOR ARRAY', 'MODULE 03 / NOMINAL', 147, 27, labels);
      }
    } else if (index > 0 && index < 7) {
      signature(chapter, subject, t);
      const labels = u < unitCuts.body ? 1 : smooth(unitCuts.title + 0.35, unitCuts.title + 0.6, u) * (1 - smooth(unitCuts.title + 1.4, unitCuts.title + 1.8, u));
      annotation(subject.pose([0.35, 7.3, 0.45]), 'OPTICAL ARRAY', `UNIT ${number} / ONLINE`, 124, -22, labels);
      annotation(skeletons[0].arms[0].joint, 'JOINT ASSEMBLY', 'GEOMETRY / IN MOTION', -110, 22, labels);
    }
    ctx.restore();
    reticle();
    const flash = action ? impact(action.kind, action.t).flash : 0;
    if (flash > 0) { ctx.fillStyle = `rgba(${flashRgb},${0.55 * flash})`;ctx.fillRect(0, 0, width, height); }
    if (card) card();
    // The left-edge shading would dim half a centred card on a 1:1 frame.
    vignette.style.opacity = card && boxFrame() ? '0.25' : '';
    // A card turns the frame dark, so the copy switches to the dark-theme ink
    // for as long as the card is up; light mode would otherwise go unreadable.
    for (const [name, value] of [['--ink', '#dce6e9'], ['--caption', '#a1afb5'], ['--text-shadow', '#080b0e99']]) {
      if (card && boxFrame() && !PURE) intro.style.setProperty(name, value);
      else intro.style.removeProperty(name);
    }
    if (battle && u > finaleCuts.flash) { ctx.fillStyle = `rgba(${flashRgb},${smooth(finaleCuts.flash, finaleCuts.flash + 0.2, u)})`;ctx.fillRect(0, 0, width, height); }
    if (index === 8) {
      const x = width * (square ? 0.64 : width < 600 ? 0.5 : 0.51), y = height * (square ? 0.58 : width < 600 ? 0.535 : 0.49);
      ctx.fillStyle = '#080b0ee8';ctx.fillRect(x - 155, y - 32, 310, 63);
      ctx.textAlign = 'center';ctx.fillStyle = '#c2e1df';ctx.font = '12px ui-monospace, monospace';
      ctx.fillText(content.completion[0], x, y - 5);
      ctx.fillStyle = '#6e8c94';ctx.font = '8px ui-monospace, monospace';ctx.fillText(content.completion[1], x, y + 15);
      const flash = 1 - smooth(0, 1.2, u);
      if (flash > 0) { ctx.fillStyle = `rgba(${flashRgb},${flash})`;ctx.fillRect(0, 0, width, height); }
    }
    updateUI();
  }

  function updateUI() {
    const index = chapterAt(state.time);
    const chapter = chapters[index];
    const t = chapterClock(index, state.time);
    if (activeChapter !== index) {
      activeChapter = index;
      const number = String(index + 1).padStart(2, '0');
      // Unit chapters drop the first heading line here: the title card on the
      // right carries it as UNIT–0N / <name>, so the left keeps the description.
      if (index < 7) $('scene-heading').replaceChildren(document.createTextNode(chapter.heading[1]));
      else $('scene-heading').replaceChildren(document.createTextNode(chapter.heading[0]), document.createElement('br'), document.createTextNode(chapter.heading[1]));
      $('scene-caption').textContent = chapter.caption;
      $('unit-name').textContent = chapter.name;
      $('unit-eyebrow').textContent = index < 7 ? `SUBJECT / ${number}` : index === 7 ? 'CONTACT / UNKNOWN' : 'TRANSMISSION / LOST';
      $('unit-model').textContent = index < 7 ? `UNIT–${number}` : index === 7 ? 'CLASS–??' : 'LINK–LOST';
      $('unit-profile').textContent = index < 7 ? `TYPE ${number}` : 'UNCLASSIFIED';
      $('unit-assembly').textContent = index < 7 ? `MODULE ${number}` : index === 7 ? 'HEAVY FRAME' : 'UNCONFIRMED';
      $('shot-label').textContent = `${number} / ${chapter.detail}`;
      canvas.setAttribute('aria-label', `Animated line-art study: ${chapter.name}, ${chapter.detail.toLowerCase()}`);
      document.documentElement.style.setProperty('--cyan', state.mono ? '#bfcccf' : chapter.accent);
      chapterButtons.forEach((button, i) => {
        button.classList.toggle('active', index === i);
        button.setAttribute('aria-current', index === i ? 'step' : 'false');
      });
      if (width <= 600) {
        const nav = chapterButtons[index].parentElement;
        nav.scrollLeft = chapterButtons[index].offsetLeft - nav.clientWidth / 2 + chapterButtons[index].offsetWidth / 2;
      }
    }
    $('time').textContent = formatTime(state.time);
    $('seek').value = state.time;
    $('seek').style.setProperty('--progress', `${state.time / duration * 100}%`);
    $('seek').setAttribute('aria-valuetext', `${formatTime(state.time)} of ${formatTime(duration)}, ${chapter.name}`);
    $('unit-status').textContent = index === 0 ? (t < 3 ? 'DOCKED' : t < 5.5 ? 'UNLOCKING' : t < 8 ? 'CHARGING' : t < 10.6 ? 'DEPLOYING' : 'DEPLOYED') : index < 7 ? (t < 2 ? 'READY' : t < 6.5 ? chapter.action : 'NOMINAL') : index === 7 ? encounterState(t).shot.status : 'NO SIGNAL';
    if (index === 7) $('shot-label').textContent = `08 / ${encounterState(t).shot.label}`;
    const energy = index > 6 ? 0 : Math.round(mix(index === 0 ? 32 : 62, 100, smooth(0, index === 0 ? 7.9 : 5.5, t)));
    $('energy-value').textContent = index > 6 ? '—' : `${energy}%`;
    $('energy-bar').style.width = `${energy}%`;
    $('play').setAttribute('aria-label', state.playing ? 'Pause animation' : 'Play animation');
    $('play-icon').setAttribute('d', state.playing ? 'M6 4v12M14 4v12' : 'M6 3l10 7-10 7Z');
  }

  // One heading size for every chapter, small enough that the longest unit
  // line ("Unstructured documents.") still fits on one line in the panel.
  $('scene-heading').style.fontSize = '3.9cqw';
  document.title = square ? `${content.title} — Square` : content.title;
  $('header-title').textContent = content.header;
  $('header-subtitle').textContent = content.subtitle;
  $('energy-label').textContent = content.systemLabel;
  $('duration').textContent = ` / ${formatTime(duration)}`;
  $('seek').max = duration;
  const chapterButtons = chapters.map((chapter, index) => {
    const button = document.createElement('button');
    const number = document.createElement('span');
    number.textContent = String(index + 1).padStart(2, '0');
    button.dataset.time = chapter.start;
    button.setAttribute('aria-label', `Show ${chapter.name}`);
    button.append(number, document.createTextNode(index < 7 ? `UNIT ${number.textContent}` : index === 7 ? 'ENCOUNTER' : 'END FRAME'), document.createElement('i'));
    document.querySelector('.chapters').append(button);
    const tick = document.createElement('span');
    tick.textContent = number.textContent;
    tick.style.left = `${chapter.start / duration * 100}%`;
    document.querySelector('.ticks').append(tick);
    return button;
  });

  function resize() {
    const bounds = canvas.getBoundingClientRect();
    width = bounds.width;height = bounds.height;dpr = Math.min(devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * dpr);canvas.height = Math.round(height * dpr);
    activeChapter = -1;
    render();
  }

  function seek(time, pause = false) {
    state.time = clamp(time, 0, duration);
    if (pause) state.playing = false;
    render();
  }

  function togglePlay() {
    if (state.time >= duration) state.time = 0;
    state.playing = !state.playing;updateUI();
  }

  function frame(now) {
    const dt = last ? Math.min((now - last) / 1000, 0.08) : 0;
    last = now;
    if (state.playing && !document.hidden) {
      state.time += dt * state.speed;
      if (state.time >= duration) {
        if (state.loop) state.time %= duration;
        else { state.time = duration;state.playing = false; }
      }
      render();
    }
    requestAnimationFrame(frame);
  }

  $('play').addEventListener('click', togglePlay);
  $('restart').addEventListener('click', () => { state.orbit = 0;state.tilt = 0;seek(0); });
  $('seek').addEventListener('input', e => seek(Number(e.target.value)));
  $('speed').addEventListener('click', () => {
    const speeds = [1, 0.5, 0.25, 1.5];
    state.speed = speeds[(speeds.indexOf(state.speed) + 1) % speeds.length];
    $('speed').textContent = `${state.speed}×`;
  });
  $('loop').addEventListener('click', () => {
    state.loop = !state.loop;$('loop').classList.toggle('selected', state.loop);$('loop').setAttribute('aria-pressed', state.loop);
  });
  $('lines').addEventListener('click', () => {
    state.mono = !state.mono;activeChapter = -1;$('lines').classList.toggle('selected', state.mono);$('lines').setAttribute('aria-pressed', state.mono);render();
  });
  $('fullscreen').addEventListener('click', async () => {
    try {
      if (document.fullscreenElement) await document.exitFullscreen();
      else await $('app').requestFullscreen();
    } catch { $('fullscreen').title = 'Fullscreen is unavailable in this browser'; }
  });
  document.addEventListener('fullscreenchange', () => $('fullscreen').setAttribute('aria-label', document.fullscreenElement ? 'Exit fullscreen' : 'Enter fullscreen'));
  document.querySelectorAll('[data-time]').forEach(button => button.addEventListener('click', () => seek(Number(button.dataset.time))));
  document.addEventListener('keydown', e => {
    if (e.target.matches('input, button, a, textarea, select') || e.altKey || e.ctrlKey || e.metaKey) return;
    if (e.code === 'Space') { e.preventDefault();togglePlay(); }
    if (e.code === 'ArrowLeft' || e.code === 'ArrowRight') { e.preventDefault();seek(state.time + (e.code === 'ArrowLeft' ? -0.25 : 0.25), true); }
  });
  canvas.addEventListener('pointerdown', e => {
    drag = { x: e.clientX, y: e.clientY, orbit: state.orbit, tilt: state.tilt };
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove', e => {
    if (!drag) return;
    state.orbit = clamp(drag.orbit + (e.clientX - drag.x) * 0.004, -0.8, 0.8);
    state.tilt = clamp(drag.tilt + (e.clientY - drag.y) * 0.017, -3, 5);render();
  });
  canvas.addEventListener('pointerup', () => { drag = null; });
  canvas.addEventListener('pointercancel', () => { drag = null; });
  canvas.addEventListener('lostpointercapture', () => { drag = null; });
  reducedMotion.addEventListener('change', e => { if (e.matches) { state.playing = false;render(); } });
  document.addEventListener('visibilitychange', () => { last = 0; });
  window.addEventListener('resize', resize);
  window.launchStudy = Object.freeze({ seek: time => seek(time, true), getState: () => ({ ...state, duration, chapter: chapterAt(state.time), unit: chapters[chapterAt(state.time)].name }), getRig: () => structuredClone(skeletons), getCamera: () => structuredClone(camera), render });
  chestLogo.addEventListener('load', () => {
    monoChestLogo.width = chestLogo.naturalWidth;monoChestLogo.height = chestLogo.naturalHeight;
    const ink = monoChestLogo.getContext('2d');
    ink.drawImage(chestLogo, 0, 0);ink.globalCompositeOperation = 'source-in';ink.fillStyle = '#bfcccf';ink.fillRect(0, 0, monoChestLogo.width, monoChestLogo.height);
    pureLineLogo.width = chestLogo.naturalWidth;pureLineLogo.height = chestLogo.naturalHeight;
    const lineInk = pureLineLogo.getContext('2d');
    lineInk.drawImage(chestLogo, 0, 0);lineInk.globalCompositeOperation = 'source-in';lineInk.fillStyle = preComp(brandGreen);lineInk.fillRect(0, 0, pureLineLogo.width, pureLineLogo.height);
    render();
  }, { once: true });
  chestLogo.src = 'servicenow-mark-lineart.png';
  resize();requestAnimationFrame(frame);
})();
