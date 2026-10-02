/**
 * VIBE ALCHEMIST - Android 12+ Mood Panacea & Sensory Keepsake
 * Procedural Web Audio, Haptics, Spring Physics Jelly Blob,
 * Ambient Weather Particle System, Overthinking Shredder,
 * Validation Courtroom, Mindful Hydration, and Tactile Rain Pearls.
 */

// --- 1. PROCEDURAL WEB AUDIO SYNTHESIZER ---
class SoundEngine {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) {
        this.ctx = new AudioContext();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Crisp tactile pop (Bubble wrap / UI tap)
  playPop(freq = 480) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.2, now + 0.08);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // Water drop sound for pearls and hydration break
  playDrop(freq = 820) {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, now);
    osc.frequency.exponentialRampToValueAtTime(freq * 1.5, now + 0.04);
    osc.frequency.exponentialRampToValueAtTime(freq * 0.4, now + 0.16);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.18);
  }

  // Cute rubber squeak on jelly poke
  playSqueak() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const now = this.ctx.currentTime;

    osc.type = 'sine';
    const startFreq = 400 + Math.random() * 200;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(startFreq * 2.2, now + 0.12);

    gain.gain.setValueAtTime(0.25, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.14);
  }

  // Cute munch / chew sound for Bobo feeding
  playChew() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    [0, 0.07, 0.14].forEach((offset) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(340 + Math.random() * 60, now + offset);
      osc.frequency.exponentialRampToValueAtTime(160, now + offset + 0.05);

      gain.gain.setValueAtTime(0.2, now + offset);
      gain.gain.exponentialRampToValueAtTime(0.001, now + offset + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + offset);
      osc.stop(now + offset + 0.05);
    });
  }

  // Mechanical grinder + paper shredding effect
  playShred() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const dur = 1.1;

    // Buffer for white noise
    const bufferSize = Math.floor(this.ctx.sampleRate * dur);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    // Highpass filter for paper tearing texture
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.Q.setValueAtTime(3.0, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + dur);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    noise.start(now);
  }

  // Loud comic game show buzzer
  playBuzzer() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc2.type = 'sawtooth';

    osc1.frequency.setValueAtTime(130, now);
    osc2.frequency.setValueAtTime(138, now);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 0.35);
    osc2.stop(now + 0.35);
  }

  // Deep wooden courtroom gavel thud
  playGavel() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(40, now + 0.18);

    gain.gain.setValueAtTime(0.6, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.22);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.22);
  }

  // Uplifting multi-note harmonic chord chime
  playChime() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.05);

      gain.gain.setValueAtTime(0.18, now + idx * 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.05 + 0.35);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.05);
      osc.stop(now + idx * 0.05 + 0.35);
    });
  }

  // Triumphant 8-bit fanfare arpeggio
  playFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [392.00, 523.25, 659.25, 783.99, 1046.50]; // G4, C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + idx * 0.08);

      gain.gain.setValueAtTime(0.2, now + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.25);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now + idx * 0.08);
      osc.stop(now + idx * 0.08 + 0.25);
    });
  }

  // Low frequency oscillating cat purr
  startPurr() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    if (this.purrOsc) return;

    const now = this.ctx.currentTime;
    this.purrOsc = this.ctx.createOscillator();
    this.purrGain = this.ctx.createGain();

    this.purrOsc.type = 'triangle';
    this.purrOsc.frequency.setValueAtTime(54, now);

    this.lfo = this.ctx.createOscillator();
    this.lfoGain = this.ctx.createGain();
    this.lfo.frequency.setValueAtTime(4.5, now);
    this.lfoGain.gain.setValueAtTime(0.08, now);

    this.lfo.connect(this.lfoGain);
    this.lfoGain.connect(this.purrGain.gain);
    this.purrOsc.connect(this.purrGain);
    this.purrGain.connect(this.ctx.destination);

    this.purrGain.gain.setValueAtTime(0.12, now);
    this.purrOsc.start(now);
    this.lfo.start(now);
  }

  stopPurr() {
    if (this.purrOsc) {
      try {
        this.purrOsc.stop();
        this.lfo.stop();
      } catch (e) {}
      this.purrOsc = null;
      this.lfo = null;
    }
  }
}

const sounds = new SoundEngine();

// --- 2. ANDROID 12+ HAPTICS DRIVER ---
function vibrate(pattern) {
  if ('vibrate' in navigator) {
    try {
      navigator.vibrate(pattern);
    } catch (e) {}
  }
}

const haptics = {
  tap: () => vibrate(12),
  pop: () => vibrate(18),
  squish: () => vibrate([15, 25, 20]),
  shred: () => vibrate([35, 25, 45, 20, 70]),
  purrTick: () => vibrate(25),
  gavel: () => vibrate([60, 40, 80]),
  victory: () => vibrate([40, 30, 60, 30, 90]),
  gentle: () => vibrate(10)
};

window.VA = window.VA || {};

const safeStore = {
  get(k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
  set(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
};

// Cached theme colours (avoids getComputedStyle every animation frame)
const themeColors = { primary: '#FF6B81', secondary: '#FF9A76', bg: '#FFF7F2' };
function refreshThemeColors() {
  const cs = getComputedStyle(document.body);
  const get = (n, d) => cs.getPropertyValue(n).trim() || d;
  themeColors.primary = get('--accent-primary', themeColors.primary);
  themeColors.secondary = get('--accent-secondary', themeColors.secondary);
  themeColors.bg = get('--bg-app', themeColors.bg);
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) meta.setAttribute('content', themeColors.bg);
  document.documentElement.style.backgroundColor = themeColors.bg;
}

const lastPick = {};
function pickFresh(arr, key) {
  if (arr.length < 2) return arr[0];
  let i;
  do { i = Math.floor(Math.random() * arr.length); } while (i === lastPick[key]);
  lastPick[key] = i;
  return arr[i];
}

// navigator.clipboard / navigator.share are unavailable on plain-http origins
async function copyText(text) {
  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return true;
    }
  } catch (e) {}
  try {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.setAttribute('readonly', '');
    ta.style.cssText = 'position:fixed;top:0;left:0;opacity:0;user-select:text;';
    document.body.appendChild(ta);
    ta.select();
    ta.setSelectionRange(0, text.length);
    const ok = document.execCommand('copy');
    ta.remove();
    return ok;
  } catch (e) {
    return false;
  }
}

// --- 3. TOAST NOTIFICATION UTILITY ---
let toastTimeout = null;
function setIcon(el, id) {
  if (el) el.innerHTML = `<svg class="i" aria-hidden="true"><use href="#i-${id}"/></svg>`;
}

function showToast(message) {
  const toast = document.getElementById('toastBubble');
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add('show');

  if (toastTimeout) clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2400);
}

// --- 4. AMBIENT ATMOSPHERIC CANVAS LAYER (Rain & Starlight from Royal Indulgence) ---
class AmbientWeather {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas ? canvas.getContext('2d') : null;
    this.mode = 'rain'; // 'rain', 'sparks', 'bubbles', 'off'
    this.particles = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.animId = null;

    if (canvas && this.ctx) {
      this.resize();
      window.addEventListener('resize', () => this.resize());
      this.initParticles();
      this.loop = this.loop.bind(this);
      this.loop();
    }
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  setMode(mode) {
    this.mode = mode;
    this.initParticles();
    const icon = document.getElementById('weatherIcon');
    if (icon) {
      setIcon(icon, { rain: 'cloud-rain', sparks: 'sparkle', bubbles: 'bubbles' }[mode] || 'ban');
      if (icon.parentElement) icon.parentElement.setAttribute('aria-label', 'Ambience: ' + mode);
    }
  }

  cycleMode() {
    const modes = ['rain', 'sparks', 'bubbles', 'off'];
    const nextIdx = (modes.indexOf(this.mode) + 1) % modes.length;
    this.setMode(modes[nextIdx]);
    const labels = {
      rain: 'Monsoon Sukoon Active',
      sparks: 'Starlight Embers Active',
      bubbles: 'Floating Pearls Active',
      off: 'Ambiance Paused'
    };
    sounds.playDrop();
    haptics.tap();
  }

  initParticles() {
    this.particles = [];
    const count = this.mode === 'rain' ? 65 : (this.mode === 'sparks' ? 35 : (this.mode === 'bubbles' ? 24 : 0));

    for (let i = 0; i < count; i++) {
      if (this.mode === 'rain') {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          len: 12 + Math.random() * 16,
          speed: 8 + Math.random() * 9,
          alpha: 0.15 + Math.random() * 0.25,
          angle: 0.15
        });
      } else if (this.mode === 'sparks') {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          radius: 1.5 + Math.random() * 2.5,
          vy: -(0.3 + Math.random() * 0.6),
          vx: (Math.random() - 0.5) * 0.3,
          alpha: 0.2 + Math.random() * 0.6,
          pulse: Math.random() * Math.PI * 2
        });
      } else if (this.mode === 'bubbles') {
        this.particles.push({
          x: Math.random() * this.width,
          y: Math.random() * this.height,
          radius: 4 + Math.random() * 10,
          vy: -(0.4 + Math.random() * 0.8),
          vx: (Math.random() - 0.5) * 0.2,
          alpha: 0.15 + Math.random() * 0.3
        });
      }
    }
  }

  loop() {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    if (this.mode === 'rain') {
      this.ctx.strokeStyle = themeColors.primary;
      this.ctx.lineWidth = 1.2;

      this.particles.forEach((p) => {
        this.ctx.beginPath();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.moveTo(p.x, p.y);
        this.ctx.lineTo(p.x - p.len * p.angle, p.y + p.len);
        this.ctx.stroke();

        p.y += p.speed;
        p.x -= p.speed * p.angle;

        if (p.y > this.height) {
          p.y = -20;
          p.x = Math.random() * (this.width + 100);
        }
      });
      this.ctx.globalAlpha = 1;
    } else if (this.mode === 'sparks') {
      const color = themeColors.secondary;
      this.ctx.fillStyle = color;

      this.particles.forEach((p) => {
        p.pulse += 0.04;
        const currentAlpha = Math.max(0.1, p.alpha + Math.sin(p.pulse) * 0.2);
        this.ctx.beginPath();
        this.ctx.globalAlpha = currentAlpha;
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.fill();

        p.y += p.vy;
        p.x += p.vx;

        if (p.y < -10) {
          p.y = this.height + 10;
          p.x = Math.random() * this.width;
        }
      });
      this.ctx.globalAlpha = 1;
    } else if (this.mode === 'bubbles') {
      this.particles.forEach((p) => {
        this.ctx.beginPath();
        this.ctx.globalAlpha = p.alpha;
        this.ctx.strokeStyle = themeColors.secondary;
        this.ctx.lineWidth = 1;
        this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        this.ctx.stroke();

        p.y += p.vy;
        p.x += p.vx;

        if (p.y < -20) {
          p.y = this.height + 20;
          p.x = Math.random() * this.width;
        }
      });
      this.ctx.globalAlpha = 1;
    }

    this.animId = requestAnimationFrame(this.loop);
  }
}

let ambientWeather = null;

// --- 5. MOOD BAROMETER / WEATHER CHECK-IN SYSTEM ---
const MOOD_DATA = {
  stormy: {
    badge: 'Stormy',
    advice: 'Messy thoughts welcome. Try the 60-second sensory reset or drop the noise into the shredder.',
    shortcut: 'Open shredder',
    tab: 'tab-shredder',
    weather: 'rain'
  },
  foggy: {
    badge: 'Foggy',
    advice: 'Low bandwidth detected. Pick one tiny action, then let that be enough for now.',
    shortcut: 'Start 60s breathing',
    tab: 'tab-switchboard',
    action: 'breath',
    weather: 'bubbles'
  },
  buzzy: {
    badge: 'Buzzy',
    advice: 'Your energy needs a container. Shred the loudest thought loop first.',
    shortcut: 'Open shredder',
    tab: 'tab-shredder',
    weather: 'sparks'
  },
  cozy: {
    badge: 'Cozy',
    advice: 'A quiet corner just for you. Soft light, steady pulse, nowhere else to be.',
    shortcut: 'Feed Bobo',
    tab: 'tab-pet',
    action: 'feed',
    weather: 'sparks'
  },
  tired: {
    badge: 'Tired',
    advice: 'Sleepy rain, nothing to prove. A slow evening still counts.',
    shortcut: 'Open oracle',
    tab: 'tab-oracle',
    weather: 'rain'
  }
};

function applyMood(m, silent) {
  const data = MOOD_DATA[m];
  if (!data) return;
  document.querySelectorAll('.mood-pill').forEach((b) => {
    const on = b.getAttribute('data-mood') === m;
    b.classList.toggle('active', on);
    b.setAttribute('aria-pressed', on ? 'true' : 'false');
  });
  const badge = document.getElementById('currentMoodBadge');
  const advice = document.getElementById('moodAdvice');
  const shortcut = document.getElementById('moodShortcutBtn');
  if (badge) badge.textContent = data.badge;
  if (advice) advice.textContent = data.advice;
  if (shortcut) {
    shortcut.querySelector('span').textContent = data.shortcut;
    shortcut.dataset.mood = m;
  }
  if (ambientWeather) ambientWeather.setMode(data.weather);
  safeStore.set('va-mood', m);
  if (!silent) {
    sounds.playChime();
    haptics.tap();
  }
}

function initMoodBarometer() {
  const row = document.getElementById('moodRow');
  const shortcut = document.getElementById('moodShortcutBtn');
  if (!row) return;

  row.addEventListener('click', (e) => {
    const btn = e.target.closest('.mood-pill');
    if (btn) applyMood(btn.getAttribute('data-mood'));
  });

  if (shortcut) {
    shortcut.addEventListener('click', () => {
      const data = MOOD_DATA[shortcut.dataset.mood] || MOOD_DATA.cozy;
      switchToTab(data.tab);
      if (data.action === 'breath' && window.VA.startBreathing) window.VA.startBreathing();
      if (data.action === 'feed' && window.VA.openVault) window.VA.openVault();
      sounds.playPop(520);
      haptics.tap();
    });
  }

  const saved = safeStore.get('va-mood');
  applyMood(MOOD_DATA[saved] ? saved : 'cozy', true);
}

// --- 6. SPRING PHYSICS JELLY PET (BOBO) WITH COMFORT PANTRY ---
const BOBO_SNACKS = {
  croissant: {
    icon: '',
    sound: 'chew',
    quote: 'CRUNCH! Delicious butter calories detected. All systems at 100% contentment.'
  },
  burger: {
    icon: '',
    sound: 'chew',
    quote: 'CHEESE PULL UNLOCKED! Normal, never tandoori. Happiness levels spike by 400%!'
  },
  brownie: {
    icon: '',
    sound: 'chew',
    quote: 'WARM BROWNIE + COLD ICE CREAM! Scientific optimal strategy: ice cream before the last bite!'
  },
  momos: {
    icon: '',
    sound: 'chew',
    quote: 'STEAMING MOMOS! Fiery garlic dip balanced with maximum comfort. Brain static neutralized!'
  },
  boba: {
    icon: '',
    sound: 'drop',
    quote: 'SLURP! Brown sugar boba absorbed. Emotional battery officially recharged!'
  },
  paratha: {
    icon: '',
    sound: 'chew',
    quote: 'GOLDEN PARATHA & DAHI! The purest cosmic definition of sukoon. Zero worries remain!'
  }
};

class JellyPet {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.numPoints = 20;
    this.radius = 82;
    this.points = [];
    this.W = 340;
    this.H = 280;
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = this.W * dpr;
    canvas.height = this.H * dpr;
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.activePointer = null;
    this.cx = this.W / 2;
    this.cy = this.H / 2 + 10;
    this.targetX = this.cx;
    this.targetY = this.cy;
    this.vx = 0;
    this.vy = 0;

    this.isDragging = false;
    this.dragOffsetX = 0;
    this.dragOffsetY = 0;
    this.lookX = 0;
    this.lookY = 0;
    this.blushLevel = 0.5;
    this.isPurring = false;
    this.purrInterval = null;
    this.currentSnack = 'croissant';

    this.initMesh();
    this.bindEvents();
    this.animate = this.animate.bind(this);
    requestAnimationFrame(this.animate);
  }

  initMesh() {
    this.points = [];
    for (let i = 0; i < this.numPoints; i++) {
      const angle = (i / this.numPoints) * Math.PI * 2;
      this.points.push({
        baseAngle: angle,
        x: Math.cos(angle) * this.radius,
        y: Math.sin(angle) * this.radius,
        r: this.radius,
        rv: 0,
        targetRadius: this.radius
      });
    }
  }

  bindEvents() {
    const c = this.canvas;
    const getPos = (e) => {
      const rect = c.getBoundingClientRect();
      return {
        x: (e.clientX - rect.left) * (this.W / rect.width),
        y: (e.clientY - rect.top) * (this.H / rect.height)
      };
    };
    const margin = this.radius + 12;
    const clamp = (v, lo, hi) => Math.max(lo, Math.min(hi, v));

    c.addEventListener('contextmenu', (e) => e.preventDefault());

    // Pointer events: one code path for touch + mouse (no emulated-mouse double fire)
    c.addEventListener('pointerdown', (e) => {
      const pos = getPos(e);
      if (Math.hypot(pos.x - this.cx, pos.y - this.cy) < this.radius * 1.4) {
        this.isDragging = true;
        this.activePointer = e.pointerId;
        try { c.setPointerCapture(e.pointerId); } catch (err) {}
        this.dragOffsetX = pos.x - this.cx;
        this.dragOffsetY = pos.y - this.cy;
        this.poke();
      }
    });

    window.addEventListener('pointermove', (e) => {
      const pos = getPos(e);
      this.lookX = (pos.x - this.cx) / (this.radius * 2);
      this.lookY = (pos.y - this.cy) / (this.radius * 2);
      if (this.isDragging && e.pointerId === this.activePointer) {
        this.cx = clamp(pos.x - this.dragOffsetX, margin, this.W - margin);
        this.cy = clamp(pos.y - this.dragOffsetY, margin, this.H - margin);
      }
    });

    const endDrag = (e) => {
      if (this.isDragging && e.pointerId === this.activePointer) {
        this.isDragging = false;
        this.activePointer = null;
        this.vx = (this.W / 2 - this.cx) * 0.22;
        this.vy = (this.H / 2 + 10 - this.cy) * 0.22;
        haptics.squish();
        sounds.playPop(520);
      }
    };
    c.addEventListener('pointerup', endDrag);
    c.addEventListener('pointercancel', endDrag);
  }

  poke() {
    sounds.playSqueak();
    haptics.squish();
    this.blushLevel = 1.0;

    this.points.forEach((p) => {
      const r = (Math.random() - 0.5) * 35;
      p.targetRadius = this.radius + r;
      p.rv += (Math.random() - 0.5) * 8;
    });

    changePetSpeech();
  }

  feed(snackKey = 'croissant') {
    this.currentSnack = snackKey;
    const snack = BOBO_SNACKS[snackKey] || BOBO_SNACKS.croissant;

    if (snack.sound === 'drop') {
      sounds.playDrop();
    } else {
      sounds.playChew();
    }

    haptics.victory();
    this.blushLevel = 1.0;

    this.points.forEach((p) => {
      p.targetRadius = this.radius + 22;
    });
    setTimeout(() => {
      this.points.forEach((p) => {
        p.targetRadius = this.radius;
      });
    }, 450);

    const speech = document.getElementById('petSpeechText');
    if (speech) {
      speech.textContent = snack.quote;
    }

    const emojiIndicator = document.getElementById('currentTreatEmoji');
    if (emojiIndicator) {
      emojiIndicator.textContent = '';
    }
  }

  togglePurr() {
    this.isPurring = !this.isPurring;
    const btn = document.getElementById('purrBtn');
    const label = document.getElementById('purrLabel');
    const icon = document.getElementById('purrIcon');

    if (this.isPurring) {
      btn.classList.add('active');
      label.textContent = 'Purring';
      setIcon(icon, 'heart');
      sounds.startPurr();
      haptics.purrTick();
      this.purrInterval = setInterval(() => {
        haptics.purrTick();
      }, 350);
      showToast('Purr Therapy active: hold phone against palm');
    } else {
      btn.classList.remove('active');
      label.textContent = 'Purr';
      setIcon(icon, 'paw');
      sounds.stopPurr();
      clearInterval(this.purrInterval);
    }
  }

  stopPurr() {
    if (this.isPurring) this.togglePurr();
  }

  animate() {
    // Skip drawing while the Bobo tab is hidden
    if (this.canvas.offsetParent === null) {
      requestAnimationFrame(this.animate);
      return;
    }
    const ctx = this.ctx;
    ctx.clearRect(0, 0, this.W, this.H);

    const homeX = this.W / 2;
    const homeY = this.H / 2 + 10;
    this.blushLevel += (0.5 - this.blushLevel) * 0.02;

    if (!this.isDragging) {
      const ax = (homeX - this.cx) * 0.08;
      const ay = (homeY - this.cy) * 0.08;
      this.vx = (this.vx + ax) * 0.78;
      this.vy = (this.vy + ay) * 0.78;
      this.cx += this.vx;
      this.cy += this.vy;
    }

    const stiffness = 0.12;
    const damping = 0.82;

    this.points.forEach((p) => {
      // Radial-only spring: points stay on their ray, so the shape can't drift
      p.rv = (p.rv + (p.targetRadius - p.r) * stiffness) * damping;
      p.r += p.rv;
      p.x = Math.cos(p.baseAngle) * p.r;
      p.y = Math.sin(p.baseAngle) * p.r;

      p.targetRadius += (this.radius - p.targetRadius) * 0.05;
    });

    // 1. Jelly drop shadow
    ctx.beginPath();
    ctx.ellipse(homeX, homeY + 84, this.radius * 0.95, 16, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0, 0, 0, 0.12)';
    ctx.fill();

    // 2. Draw smooth spring physics blob
    ctx.beginPath();
    const p0 = this.points[0];
    const pLast = this.points[this.numPoints - 1];
    const startMidX = this.cx + (pLast.x + p0.x) / 2;
    const startMidY = this.cy + (pLast.y + p0.y) / 2;
    ctx.moveTo(startMidX, startMidY);

    for (let i = 0; i < this.numPoints; i++) {
      const curr = this.points[i];
      const next = this.points[(i + 1) % this.numPoints];
      const midX = this.cx + (curr.x + next.x) / 2;
      const midY = this.cy + (curr.y + next.y) / 2;
      ctx.quadraticCurveTo(this.cx + curr.x, this.cy + curr.y, midX, midY);
    }
    ctx.closePath();

    const grad = ctx.createLinearGradient(this.cx - this.radius, this.cy - this.radius, this.cx + this.radius, this.cy + this.radius);
    const prim = themeColors.primary;
    const sec = themeColors.secondary;
    grad.addColorStop(0, prim);
    grad.addColorStop(1, sec);

    ctx.fillStyle = grad;
    ctx.fill();

    ctx.lineWidth = 3.5;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
    ctx.stroke();

    // 3. Cute Kawaii Facial Features
    const eyeOffsetX = 24;
    const eyeOffsetY = -8;
    const lookLimit = 5;
    const lx = Math.max(-lookLimit, Math.min(lookLimit, this.lookX * 12));
    const ly = Math.max(-lookLimit, Math.min(lookLimit, this.lookY * 12));

    // Left Eye
    ctx.beginPath();
    ctx.ellipse(this.cx - eyeOffsetX + lx, this.cy + eyeOffsetY + ly, 6, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1e141a';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.cx - eyeOffsetX + lx - 2, this.cy + eyeOffsetY + ly - 2, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Right Eye
    ctx.beginPath();
    ctx.ellipse(this.cx + eyeOffsetX + lx, this.cy + eyeOffsetY + ly, 6, 8, 0, 0, Math.PI * 2);
    ctx.fillStyle = '#1e141a';
    ctx.fill();
    ctx.beginPath();
    ctx.arc(this.cx + eyeOffsetX + lx - 2, this.cy + eyeOffsetY + ly - 2, 2.5, 0, Math.PI * 2);
    ctx.fillStyle = '#ffffff';
    ctx.fill();

    // Blushing Cheeks
    ctx.beginPath();
    ctx.ellipse(this.cx - eyeOffsetX - 10, this.cy + eyeOffsetY + 10, 8, 4.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 90, 110, ${this.blushLevel * 0.75})`;
    ctx.fill();

    ctx.beginPath();
    ctx.ellipse(this.cx + eyeOffsetX + 10, this.cy + eyeOffsetY + 10, 8, 4.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 90, 110, ${this.blushLevel * 0.75})`;
    ctx.fill();

    // Tiny Happy Smile
    ctx.beginPath();
    ctx.arc(this.cx + lx * 0.5, this.cy + 10 + ly * 0.5, 7, 0.15 * Math.PI, 0.85 * Math.PI, false);
    ctx.lineWidth = 2.5;
    ctx.strokeStyle = '#1e141a';
    ctx.lineCap = 'round';
    ctx.stroke();

    requestAnimationFrame(this.animate);
  }
}

const PET_QUOTES = [
  'You are not behind. You are loading.',
  'I have reviewed the evidence: you deserve a snack right now.',
  'Tiny progress still changes the coordinates.',
  'Your brain is loud, not always correct. ₍^.ˬ.^₎',
  'Today can be a minimum-viable day. Protect your peace.',
  'Sukoon can be small: warm food, a deep breath, and zero hurry.',
  'Curiosity looks good on you. Take one tiny step.',
  'Some thoughts are weather — real for a moment, never permanent.'
];

function changePetSpeech() {
  const speech = document.getElementById('petSpeechText');
  if (speech) {
    const q = PET_QUOTES[Math.floor(Math.random() * PET_QUOTES.length)];
    speech.textContent = q;
  }
}

// --- 7. THE OVERTHINKING SHREDDER ---
const ABSURD_VERDICTS = [
  {
    title: 'Official Cosmic Disposition #804',
    stat: 'Analysis: 98.2% brain goblin mischief • 1.8% hunger',
    text: 'Your thought has been shredded into quantum glitter and dissolved. It is now legally just rainwater.',
    rx: 'Wrap like a burrito in your thickest blanket, acquire an iced drink, and refuse to explain yourself to anyone today.'
  },
  {
    title: 'Official Cosmic Disposition #219',
    stat: 'Analysis: Loop classified as temporary weather',
    text: 'Some thoughts are weather — real for a moment, never permanent. This one has cleared off your radar.',
    rx: 'Unclench your jaw, drop your shoulders, and do one tiny action that takes under two minutes.'
  },
  {
    title: 'Official Cosmic Disposition #912',
    stat: 'Analysis: 94.6% unnecessary social anxiety • 5.4% need for a nap',
    text: 'Literally nobody noticed or remembered that except your brain. The thought has been blasted out of the galaxy at Mach 4.',
    rx: 'Inhale fresh air, sigh loudly like an exhausted Victorian ghost, and eat a sweet treat immediately.'
  },
  {
    title: 'Official Cosmic Disposition #505',
    stat: 'Analysis: Case closed for tonight',
    text: 'Your brain opened seventeen tabs and called it an emergency. We have successfully closed sixteen.',
    rx: 'Drink water, change rooms, and return only if the issue still matters tomorrow.'
  },
  {
    title: 'Official Cosmic Disposition #333',
    stat: 'Analysis: Brain static successfully downsized',
    text: 'The loop has been removed from center stage and reassigned to background extra number four.',
    rx: 'Refuse to negotiate with imaginary versions of the problem.'
  }
];

function initShredder() {
  const input = document.getElementById('thoughtInput');
  const shredBtn = document.getElementById('shredActionBtn');
  const paperSheet = document.getElementById('paperSheet');
  const verdictBox = document.getElementById('verdictBox');
  const quickChips = document.getElementById('quickThoughts');
  const charCount = document.getElementById('charCount');

  if (input && charCount) {
    input.addEventListener('input', () => {
      charCount.textContent = `${input.value.length} / 280`;
    });
  }

  if (quickChips) {
    quickChips.addEventListener('click', (e) => {
      const chip = e.target.closest('.thought-chip');
      if (chip && input) {
        input.value = chip.getAttribute('data-text');
        if (charCount) charCount.textContent = `${input.value.length} / 280`;
        sounds.playPop(480);
        haptics.tap();
      }
    });
  }

  let shredding = false;
  if (shredBtn) {
    shredBtn.addEventListener('click', () => {
      if (shredding) return;
      const text = input ? input.value.trim() : '';
      if (!text) {
        showToast('Type something first to feed the shredder!');
        if (input) input.focus();
        haptics.tap();
        return;
      }

      shredding = true;
      if (input) { input.readOnly = true; input.blur(); }
      shredBtn.disabled = true;
      sounds.playShred();
      haptics.shred();

      if (paperSheet) {
        paperSheet.classList.add('shredding');
      }

      setTimeout(() => {
        triggerConfettiBurst();
        sounds.playFanfare();

        const v = pickFresh(ABSURD_VERDICTS, 'verdict');
        document.getElementById('verdictTitle').textContent = v.title;
        document.getElementById('verdictStats').textContent = v.stat;
        document.getElementById('verdictContent').textContent = v.text;
        document.getElementById('verdictRx').textContent = v.rx;

        verdictBox.style.display = 'block';
        verdictBox.scrollIntoView({ behavior: 'smooth', block: 'start' });
        shredding = false;
        if (input) input.readOnly = false;
        shredBtn.disabled = false;

        if (paperSheet) {
          paperSheet.classList.remove('shredding');
          input.value = '';
          if (charCount) charCount.textContent = '0 / 280';
        }
      }, 1200);
    });
  }

  const shredAgainBtn = document.getElementById('shredAgainBtn');
  if (shredAgainBtn) {
    shredAgainBtn.addEventListener('click', () => {
      verdictBox.style.display = 'none';
      if (input) input.focus();
      sounds.playPop(440);
      haptics.tap();
    });
  }

  const shareVerdictBtn = document.getElementById('shareVerdictBtn');
  if (shareVerdictBtn) {
    shareVerdictBtn.addEventListener('click', () => {
      const title = document.getElementById('verdictTitle').textContent;
      const text = document.getElementById('verdictContent').textContent;
      const rx = document.getElementById('verdictRx').textContent;
      const shareData = {
        title: 'Vibe Alchemist Verdict',
        text: `${title}\n"${text}"\n\nMandatory Prescription: ${rx}`
      };

      if (navigator.share) {
        navigator.share(shareData).catch(() => {});
      } else {
        copyText(shareData.text).then((ok) => showToast(ok ? 'Verdict copied to clipboard!' : 'Copy not available here'));
      }
      haptics.tap();
    });
  }
}

// --- 8. ABSURD ORACLE & PROPHECY ENGINE (Royal Indulgence + Vibe Alchemist) ---
const WEIRD_FORTUNES = [
  {
    category: 'rain',
    badge: 'SUKOON MEMO',
    text: 'Some thoughts are weather — real for a moment, never permanent.'
  },
  {
    category: 'rain',
    badge: 'WINDOW PROPHECY',
    text: "The ghost at the window isn't haunting you. It just likes the rain too."
  },
  {
    category: 'rain',
    badge: 'GENTLE TRUTH',
    text: 'Sukoon can be small: a rainy window, warm food, and nowhere else to be.'
  },
  {
    category: 'royal',
    badge: 'ROYAL EDICT',
    text: 'Curiosity looks good on you. Follow one strange little question tonight.'
  },
  {
    category: 'royal',
    badge: 'ROYAL EDICT',
    text: "Tonight's prophecy: extra cheese, one good laugh, and absolutely no waiting."
  },
  {
    category: 'royal',
    badge: 'ROYAL TRUTH',
    text: 'You have the rare ability to make a complicated day feel survivable.'
  },
  {
    category: 'royal',
    badge: 'ROYAL TRUTH',
    text: 'You carry the exact amount of chaos needed to stop the room becoming boring.'
  },
  {
    category: 'bakery',
    badge: 'BAKERY WISDOM',
    text: 'Your next good idea is currently disguised as a tiny, slightly inconvenient first step.'
  },
  {
    category: 'bakery',
    badge: 'BAKERY WISDOM',
    text: 'Someone would trust you with the emergency snack backpack. That is true leadership.'
  },
  {
    category: 'bakery',
    badge: 'BAKERY WISDOM',
    text: 'A future version of you is deeply grateful that you kept going today.'
  },
  {
    category: 'bakery',
    badge: 'BAKERY WISDOM',
    text: 'You are not behind. You are loading. Protect the softness.'
  }
];

function initOracle() {
  const orb = document.getElementById('orbBtn');
  const rollBtn = document.getElementById('anotherFortuneBtn');
  const shareBtn = document.getElementById('shareFortuneBtn');
  const catContainer = document.getElementById('oracleCategories');
  const customBtn = document.getElementById('genCustomBtn');
  const nameInput = document.getElementById('friendNameInput');

  let activeCat = 'all';

  function drawFortune() {
    const cap = document.getElementById('orbCaption');
    if (cap) cap.hidden = true;
    let pool = WEIRD_FORTUNES;
    if (activeCat !== 'all') {
      pool = WEIRD_FORTUNES.filter((f) => f.category === activeCat);
      if (pool.length === 0) pool = WEIRD_FORTUNES;
    }

    const f = pickFresh(pool, 'fortune-' + activeCat);
    const badge = document.getElementById('fortuneCategory');
    const text = document.getElementById('fortuneText');

    if (badge && text) {
      badge.textContent = f.badge;
      text.textContent = `“${f.text}”`;
    }

    sounds.playChime();
    haptics.pop();
  }

  if (catContainer) {
    catContainer.addEventListener('click', (e) => {
      const btn = e.target.closest('.oracle-cat-btn');
      if (btn) {
        catContainer.querySelectorAll('.oracle-cat-btn').forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        activeCat = btn.getAttribute('data-cat') || 'all';
        drawFortune();
      }
    });
  }

  if (orb) {
    orb.addEventListener('click', drawFortune);
    orb.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); drawFortune(); }
    });
  }
  if (rollBtn) rollBtn.addEventListener('click', drawFortune);

  if (customBtn && nameInput) {
    nameInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { e.preventDefault(); nameInput.blur(); customBtn.click(); }
    });
    customBtn.addEventListener('click', () => {
      const name = nameInput.value.trim() || 'Queen';
      const customQuotes = [
        `Dear ${name}, the universe officially grants you immunity from bad vibes today.`,
        `${name}, you are the human equivalent of finding extra cheese burst on your burger.`,
        `Attention ${name}: your emotional battery is now being recharged with pure sukoon.`
      ];
      const q = pickFresh(customQuotes, 'custom');
      document.getElementById('fortuneCategory').textContent = `MEMO FOR ${name.toUpperCase()}`;
      document.getElementById('fortuneText').textContent = `“${q}”`;

      sounds.playChime();
      haptics.victory();
      triggerConfettiBurst();
    });
  }

  if (shareBtn) {
    shareBtn.addEventListener('click', () => {
      const text = document.getElementById('fortuneText').textContent;
      const badge = document.getElementById('fortuneCategory').textContent;
      const shareData = {
        title: 'Oracle Prophecy',
        text: `${badge}\n${text}\n\n— via Vibe Alchemist`
      };

      if (navigator.share) {
        navigator.share(shareData).catch(() => {});
      } else {
        copyText(shareData.text).then((ok) => showToast(ok ? 'Oracle truth copied!' : 'Copy not available here'));
      }
      haptics.tap();
    });
  }
}

// --- 9. SUPREME COURT OF VALIDATION ---
function initValidationCourt() {
  const buzzer = document.getElementById('courtBuzzerBtn');
  const rulings = [
    'The Supreme Council of Sensible People has reviewed all footage. The other party was being completely irrational. You are exonerated with full honors.',
    'CASE CLOSED: You were being 1000% reasonable. The other party has been sentenced to stepping on a cold wet floor in socks.',
    'UNANIMOUS VERDICT: You are entitled to immediate iced coffee, a warm blanket, and zero follow-up explanations.',
    'SUPREME RULING: That conversation was completely absurd and you maintained heroic restraint. Case dismissed.'
  ];

  const headings = [
    'Case 404: you were 1000% in the right',
    'Case closed: heroic restraint noted',
    'Unanimous: immediate snacks owed',
    'Supreme ruling: case dismissed'
  ];

  lastPick.ruling = 0; // the ruling shown on load counts as already seen
  if (buzzer) {
    buzzer.addEventListener('click', () => {
      sounds.playBuzzer();
      setTimeout(() => sounds.playGavel(), 160);
      haptics.gavel();

      const idx = pickFresh(rulings.map((_, i) => i), 'ruling');
      const text = document.getElementById('rulingText');
      const heading = document.getElementById('rulingHeading');
      const card = document.getElementById('rulingCard');
      if (text) text.textContent = rulings[idx].replace(/^[A-Za-z0-9 ]{3,24}:\s*/, '');
      if (heading) heading.textContent = headings[idx];
      if (card) {
        card.classList.remove('flash');
        void card.offsetWidth;
        card.classList.add('flash');
      }

    });
  }
}

// --- 10. EMERGENCY SENSORY SWITCHBOARD & RAIN PEARLS ---
function initSensorySwitchboard() {
  // 1. Tactile Rain Pearls
  const grid = document.getElementById('bubbleGrid');
  const resetBtn = document.getElementById('resetBubblesBtn');
  const counter = document.getElementById('pearlCounter');
  const sweepBanner = document.getElementById('cleanSweepBanner');
  const TOTAL_PEARLS = 24;

  function updatePearlCount() {
    const unpopped = grid.querySelectorAll('.bubble-wrap-item:not(.popped)').length;
    if (counter) {
      counter.textContent = unpopped > 0 ? `${unpopped} left` : 'All cleared';
    }
    if (unpopped === 0) {
      if (sweepBanner) sweepBanner.style.display = 'block';
      sounds.playFanfare();
      haptics.victory();
      triggerConfettiBurst(true);
    } else {
      if (sweepBanner) sweepBanner.style.display = 'none';
    }
  }

  function renderBubbles() {
    if (!grid) return;
    grid.innerHTML = '';
    if (sweepBanner) sweepBanner.style.display = 'none';

    for (let i = 0; i < TOTAL_PEARLS; i++) {
      const bubble = document.createElement('div');
      bubble.className = 'bubble-wrap-item';
      bubble.setAttribute('role', 'button');
      bubble.setAttribute('aria-label', `Rain pearl ${i + 1}`);
      bubble.tabIndex = 0;
      bubble.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); bubble.click(); }
      });

      bubble.addEventListener('click', () => {
        if (!bubble.classList.contains('popped')) {
          bubble.classList.add('popped');
          const pitch = 500 + Math.random() * 350;
          sounds.playPop(pitch);
          haptics.pop();
          updatePearlCount();
        }
      });
      grid.appendChild(bubble);
    }
    updatePearlCount();
  }

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      renderBubbles();
      sounds.playPop(520);
      haptics.tap();
    });
  }
  renderBubbles();

  // 2. Bakery & Rain Breath Ritual: 4s in, 2s hold, 6s out = 12s x 5 = 60s
  const toggleBreathBtn = document.getElementById('toggleBreathBtn');
  const breathCircle = document.getElementById('breathCircle');
  const breathSection = document.querySelector('.breath-section');
  const label = document.getElementById('breathLabel');
  const sub = document.getElementById('breathSub');
  const timer = document.getElementById('breathTimer');
  const BREATH_TOTAL = 60;
  const PHASES = [
    { cls: 'inhale', until: 4, label: 'Inhale', sub: '' },
    { cls: 'hold', until: 6, label: 'Hold', sub: '' },
    { cls: 'exhale', until: 12, label: 'Exhale', sub: '' }
  ];
  let breathTimer = null;
  let breathStart = 0;
  let lastPhase = null;

  function stopBreathing(completed) {
    clearInterval(breathTimer);
    breathTimer = null;
    lastPhase = null;
    if (breathCircle) breathCircle.classList.remove('inhale', 'hold', 'exhale');
    if (toggleBreathBtn) toggleBreathBtn.textContent = 'Start';
    if (label) label.textContent = completed ? 'Done' : 'Paused';
    if (sub) sub.textContent = completed ? 'Mindful sukoon achieved' : 'Tap start whenever you are ready';
    if (timer) timer.textContent = completed ? '0:00' : '1:00';
  }

  function breathTick() {
    const elapsed = (Date.now() - breathStart) / 1000;
    if (elapsed >= BREATH_TOTAL) {
      stopBreathing(true);
      sounds.playFanfare();
      triggerConfettiBurst();
      return;
    }
    if (timer) { const rem = Math.ceil(BREATH_TOTAL - elapsed); timer.textContent = `${Math.floor(rem / 60)}:${String(rem % 60).padStart(2, '0')}`; }
    const t = elapsed % 12;
    const phase = PHASES.find((p) => t < p.until);
    if (phase.cls !== lastPhase) {
      lastPhase = phase.cls;
      if (breathCircle) {
        breathCircle.classList.remove('inhale', 'hold', 'exhale');
        breathCircle.classList.add(phase.cls);
      }
      if (label) label.textContent = phase.label;
      if (sub) sub.textContent = phase.sub;
      haptics.gentle();
    }
  }

  function startBreathing() {
    if (breathTimer) return;
    breathStart = Date.now();
    if (toggleBreathBtn) toggleBreathBtn.textContent = 'Stop';
    sounds.playChime();
    breathTick();
    breathTimer = setInterval(breathTick, 250);
  }

  window.VA.startBreathing = () => {
    startBreathing();
    if (breathSection) breathSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
  };

  if (toggleBreathBtn) {
    toggleBreathBtn.addEventListener('click', () => {
      if (breathTimer) {
        stopBreathing(false);
        sounds.playPop(420);
      } else {
        startBreathing();
      }
    });
  }

  // 3. Mindful Water Break & Rest (From Royal Indulgence)
  const sipBtn = document.getElementById('sipWaterBtn');
  const unclenchBtn = document.getElementById('unclenchBtn');
  const sipBadge = document.getElementById('waterSipBadge');

  const dayKey = () => new Date().toDateString();
  let sips = safeStore.get('va-water-day') === dayKey() ? parseInt(safeStore.get('va-water-sips') || '0', 10) || 0 : 0;
  if (sipBadge) sipBadge.textContent = `${sips} sips today`;

  if (sipBtn) {
    sipBtn.addEventListener('click', () => {
      if (safeStore.get('va-water-day') !== dayKey()) sips = 0;
      sips++;
      safeStore.set('va-water-day', dayKey());
      safeStore.set('va-water-sips', String(sips));
      if (sipBadge) sipBadge.textContent = `${sips} sips today`;
      sounds.playDrop();
      haptics.tap();
    });
  }

  if (unclenchBtn) {
    unclenchBtn.addEventListener('click', () => {
      sounds.playChime();
      haptics.gentle();
      showToast('Jaw unclenched. Shoulders down.');
    });
  }

  // 4. The No-Sharing Plate Comfort Keepsake Favorites
  document.querySelectorAll('.comfort-fav-btn').forEach((btn, idx) => {
    const isFav = safeStore.get(`va-fav-${idx}`) === 'true';
    if (isFav) btn.classList.add('active');
    btn.setAttribute('aria-pressed', isFav ? 'true' : 'false');

    btn.addEventListener('click', () => {
      btn.classList.toggle('active');
      const active = btn.classList.contains('active');
      safeStore.set(`va-fav-${idx}`, active ? 'true' : 'false');
      btn.setAttribute('aria-pressed', active ? 'true' : 'false');
      sounds.playPop(520);
      haptics.tap();
    });
  });

  // 5. Fireworks Panic Cannon
  const cannonBtn = document.getElementById('cannonBtn');
  if (cannonBtn) {
    cannonBtn.addEventListener('click', () => {
      sounds.playFanfare();
      haptics.victory();
      triggerConfettiBurst(true);
    });
  }
}

// --- 11. FULLSCREEN CONFETTI CANNON LAYER ---
let confettiParticles = [];
let confettiCtx = null;
let confettiAnimId = null;

function initConfettiCanvas() {
  const canvas = document.getElementById('confettiCanvas');
  if (!canvas) return;
  confettiCtx = canvas.getContext('2d');

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);
}

function triggerConfettiBurst(mega = false) {
  if (!confettiCtx) return;
  const count = mega ? 140 : 60;
  const colors = ['#FF6B81', '#FF9A76', '#FFEAA7', '#60A5FA', '#F5B8CB', '#C471ED'];

  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 4 + Math.random() * (mega ? 16 : 10);
    confettiParticles.push({
      x: window.innerWidth / 2,
      y: window.innerHeight * 0.6,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 6,
      gravity: 0.35,
      size: 6 + Math.random() * 8,
      rotation: Math.random() * 360,
      rotSpeed: (Math.random() - 0.5) * 12,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 1,
      decay: 0.012 + Math.random() * 0.015
    });
  }

  if (!confettiAnimId) {
    runConfettiLoop();
  }
}

function runConfettiLoop() {
  if (!confettiCtx) return;
  confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

  for (let i = confettiParticles.length - 1; i >= 0; i--) {
    const p = confettiParticles[i];
    p.x += p.vx;
    p.y += p.vy;
    p.vy += p.gravity;
    p.rotation += p.rotSpeed;
    p.alpha -= p.decay;

    if (p.alpha <= 0) {
      confettiParticles.splice(i, 1);
      continue;
    }

    confettiCtx.save();
    confettiCtx.translate(p.x, p.y);
    confettiCtx.rotate((p.rotation * Math.PI) / 180);
    confettiCtx.fillStyle = p.color;
    confettiCtx.globalAlpha = p.alpha;
    confettiCtx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
    confettiCtx.restore();
  }

  if (confettiParticles.length > 0) {
    confettiAnimId = requestAnimationFrame(runConfettiLoop);
  } else {
    confettiAnimId = null;
    confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
  }
}

// --- 12. NAVIGATION & TABS (with Android back-button + launcher-shortcut support) ---
const HOME_TAB = 'tab-pet';
const TAB_ALIASES = {
  pet: 'tab-pet', shredder: 'tab-shredder', oracle: 'tab-oracle',
  validation: 'tab-validation', exonerate: 'tab-validation',
  switchboard: 'tab-switchboard', sensory: 'tab-switchboard'
};
let currentTab = HOME_TAB;

function tabFromHash() {
  const h = location.hash.slice(1);
  if (TAB_ALIASES[h]) return TAB_ALIASES[h];
  const el = h ? document.getElementById(h) : null;
  return el && el.classList.contains('tab-panel') ? h : HOME_TAB;
}

function switchToTab(targetTabId, opts) {
  const fromHistory = !!(opts && opts.fromHistory);
  if (!document.getElementById(targetTabId)) targetTabId = HOME_TAB;

  document.querySelectorAll('.tab-panel').forEach((p) => p.classList.toggle('active', p.id === targetTabId));
  document.querySelectorAll('.nav-item').forEach((b) => {
    const on = b.getAttribute('data-tab') === targetTabId;
    b.classList.toggle('active', on);
    if (on) b.setAttribute('aria-current', 'page'); else b.removeAttribute('aria-current');
    if (on) updateNavIndicator(b);
  });

  const prev = currentTab;
  currentTab = targetTabId;
  if (prev === targetTabId) return;
  window.scrollTo(0, 0);

  if (fromHistory) return;
  try {
    const alias = targetTabId.replace('tab-', '');
    if (targetTabId === HOME_TAB) {
      if (history.state && history.state.vaTab) history.back();
      else if (location.hash) history.replaceState(null, '', location.pathname + location.search);
    } else if (prev === HOME_TAB) {
      history.pushState({ vaTab: true }, '', '#' + alias);
    } else {
      history.replaceState(history.state, '', '#' + alias);
    }
  } catch (e) {}
}

function updateNavIndicator(activeBtn) {
  const indicator = document.getElementById('navIndicator');
  if (!indicator || !activeBtn) return;
  const rect = activeBtn.getBoundingClientRect();
  const parentRect = activeBtn.parentElement.getBoundingClientRect();
  indicator.style.width = `${rect.width * 0.7}px`;
  indicator.style.left = `${rect.left - parentRect.left + rect.width * 0.15}px`;
}

function initNavigation() {
  document.querySelectorAll('.nav-item').forEach((btn) => {
    btn.addEventListener('click', () => {
      const tabId = btn.getAttribute('data-tab');
      if (tabId === currentTab) return;
      switchToTab(tabId);
      sounds.playPop(480);
      haptics.tap();
    });
  });

  window.addEventListener('popstate', () => {
    if (closeThemeSheet(true)) return;
    switchToTab(tabFromHash(), { fromHistory: true });
  });

  const refresh = () => updateNavIndicator(document.querySelector('.nav-item.active'));
  window.addEventListener('resize', refresh);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(refresh);

  switchToTab(tabFromHash(), { fromHistory: true });
  refresh();
  setTimeout(refresh, 150);
}

// --- 13. MATERIAL YOU & LUXURY PALETTE THEMING ---
function isThemeSheetOpen() {
  const m = document.getElementById('themeModal');
  return !!m && m.classList.contains('open');
}

function openThemeSheet() {
  const m = document.getElementById('themeModal');
  if (!m || isThemeSheetOpen()) return;
  m.classList.add('open');
  try { history.pushState({ vaModal: true }, ''); } catch (e) {}
}

// Returns true if a sheet was open. fromPop = the browser already popped the history entry.
function closeThemeSheet(fromPop) {
  const m = document.getElementById('themeModal');
  if (!m || !isThemeSheetOpen()) return false;
  m.classList.remove('open');
  if (!fromPop && history.state && history.state.vaModal) history.back();
  return true;
}

function applyTheme(val) {
  document.body.setAttribute('data-theme', val);
  document.querySelectorAll('.theme-option').forEach((o) => {
    o.classList.toggle('active', o.getAttribute('data-theme-val') === val);
  });
  refreshThemeColors();
}

function initTheming() {
  const themeBtn = document.getElementById('themeBtn');
  const themeModal = document.getElementById('themeModal');
  const closeBtn = document.getElementById('closeThemeBtn');

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      openThemeSheet();
      sounds.playPop(520);
      haptics.tap();
    });
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeThemeSheet(false);
      sounds.playPop(440);
    });
  }
  if (themeModal) {
    themeModal.addEventListener('click', (e) => {
      if (e.target === themeModal) closeThemeSheet(false);
    });
  }
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeThemeSheet(false);
  });

  document.querySelectorAll('.theme-option').forEach((opt) => {
    opt.addEventListener('click', () => {
      const themeVal = opt.getAttribute('data-theme-val');
      applyTheme(themeVal);
      safeStore.set('va-theme', themeVal);
      sounds.playChime();
      haptics.pop();
      setTimeout(() => closeThemeSheet(false), 200);
    });
  });

  const savedTheme = safeStore.get('va-theme');
  if (savedTheme && document.querySelector(`.theme-option[data-theme-val="${savedTheme}"]`)) {
    applyTheme(savedTheme);
  }
}

// --- 14. AUDIO & AMBIANCE CONTROLS ---
function initAudioControls() {
  const audioBtn = document.getElementById('audioBtn');
  const audioIcon = document.getElementById('audioIcon');
  const weatherBtn = document.getElementById('weatherBtn');

  if (audioBtn) {
    audioBtn.addEventListener('click', () => {
      sounds.enabled = !sounds.enabled;
      if (sounds.enabled) {
        audioBtn.classList.add('active');
        if (audioIcon) setIcon(audioIcon, 'volume');
        sounds.playPop(600);
        if (window.VA.pet && window.VA.pet.isPurring) sounds.startPurr();
      } else {
        audioBtn.classList.remove('active');
        if (audioIcon) setIcon(audioIcon, 'volume-off');
        sounds.stopPurr();
      }
      haptics.tap();
    });
  }

  if (weatherBtn && ambientWeather) {
    weatherBtn.addEventListener('click', () => {
      ambientWeather.cycleMode();
    });
  }
}

// --- 15. PWA OFFLINE & INSTALLATION ---
function initPWA() {
  // Service workers need HTTPS or localhost; elsewhere the app still runs, just not offline/installable.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch((err) => {
      console.info('Service worker not registered (needs HTTPS or localhost):', err && err.message);
    });
  }

  let deferredPrompt = null;
  const banner = document.getElementById('installBanner');
  const installBtn = document.getElementById('installBtn');
  const dismissBtn = document.getElementById('installDismissBtn');
  const standalone = window.matchMedia('(display-mode: standalone)').matches;
  const DISMISS_MS = 30 * 24 * 3600 * 1000;
  const hide = () => { if (banner) banner.hidden = true; };

  if (installBtn) {
    installBtn.addEventListener('click', async () => {
      if (!deferredPrompt) return;
      hide();
      deferredPrompt.prompt();
      try { await deferredPrompt.userChoice; } catch (e) {}
      deferredPrompt = null;
    });
  }
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => { safeStore.set('va-install-dismissed', String(Date.now())); hide(); });
  }

  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    const dismissed = parseInt(safeStore.get('va-install-dismissed') || '0', 10);
    if (standalone || (dismissed && Date.now() - dismissed < DISMISS_MS)) return;
    deferredPrompt = e;
    if (banner) banner.hidden = false;
  });

  window.addEventListener('appinstalled', () => { deferredPrompt = null; hide(); });
}

// --- 16. BOOTSTRAP APP ON LOAD ---
document.addEventListener('DOMContentLoaded', () => {
  refreshThemeColors();

  // Mobile autoplay policy: create/resume the AudioContext on the first completed gesture
  const unlockEvents = ['pointerup', 'touchend', 'click', 'keydown'];
  const unlockAudio = () => {
    sounds.init();
    if (sounds.ctx && sounds.ctx.state === 'running') {
      unlockEvents.forEach((ev) => window.removeEventListener(ev, unlockAudio));
    }
  };
  unlockEvents.forEach((ev) => window.addEventListener(ev, unlockAudio, { passive: true }));

  // Hide the bottom nav while the on-screen keyboard is up
  const isField = (t) => t && (t.tagName === 'INPUT' || t.tagName === 'TEXTAREA');
  document.addEventListener('focusin', (e) => { if (isField(e.target)) document.body.classList.add('kbd-open'); });
  document.addEventListener('focusout', (e) => { if (isField(e.target)) document.body.classList.remove('kbd-open'); });

  const ambCanvas = document.getElementById('ambientCanvas');
  if (ambCanvas) {
    ambientWeather = new AmbientWeather(ambCanvas);
  }

  const petCanvas = document.getElementById('petCanvas');
  let pet = null;
  if (petCanvas) {
    pet = new JellyPet(petCanvas);
    window.VA.pet = pet;
    const pokeBtn = document.getElementById('pokeBtn');
    const feedBtn = document.getElementById('feedBtn');
    const purrBtn = document.getElementById('purrBtn');
    const speech = document.getElementById('petSpeech');
    const snackVault = document.getElementById('snackVault');
    const closeVaultBtn = document.getElementById('closeVaultBtn');

    window.VA.openVault = () => {
      if (!snackVault) return;
      snackVault.style.display = 'block';
      snackVault.scrollIntoView({ behavior: 'smooth', block: 'center' });
    };

    if (pokeBtn) pokeBtn.addEventListener('click', () => pet.poke());
    if (purrBtn) purrBtn.addEventListener('click', () => {
      if (snackVault) snackVault.style.display = 'none';
      pet.togglePurr();
    });
    if (speech) speech.addEventListener('click', () => pet.poke());

    if (feedBtn) {
      feedBtn.addEventListener('click', () => {
        if (snackVault) {
          snackVault.style.display = snackVault.style.display === 'none' ? 'block' : 'none';
          sounds.playPop(520);
          haptics.tap();
        }
      });
    }

    if (closeVaultBtn && snackVault) {
      closeVaultBtn.addEventListener('click', () => {
        snackVault.style.display = 'none';
      });
    }

    document.querySelectorAll('.snack-item').forEach((item) => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.snack-item').forEach((s) => s.classList.remove('active'));
        item.classList.add('active');
        const snackKey = item.getAttribute('data-snack') || 'croissant';
        pet.feed(snackKey);
        if (snackVault) snackVault.style.display = 'none';
      });
    });

    // Never keep purring (audio + vibration) once the app leaves the foreground
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) pet.stopPurr();
    });
  }

  const hint = document.getElementById('petHint');
  if (hint) {
    if (safeStore.get('va-hint-seen')) hint.hidden = true;
    else if (petCanvas) petCanvas.addEventListener('pointerdown', () => { hint.hidden = true; safeStore.set('va-hint-seen', '1'); }, { once: true });
  }

  initMoodBarometer();
  initShredder();
  initOracle();
  initValidationCourt();
  initSensorySwitchboard();
  initConfettiCanvas();
  initTheming();
  initNavigation();
  initAudioControls();
  initPWA();

  if (ambientWeather && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    ambientWeather.setMode('off');
  }
});
