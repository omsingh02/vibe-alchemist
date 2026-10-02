const { chromium, devices } = require('playwright');
const results = [];
const check = (name, ok, extra = '') => { results.push(ok); console.log((ok ? 'PASS ' : 'FAIL ') + name + (extra ? '  ' + extra : '')); };

(async () => {
  const browser = await chromium.launch();
  const ctx = await browser.newContext({ ...devices['Pixel 7'], viewport: { width: 360, height: 740 }, serviceWorkers: 'allow' });
  const page = await ctx.newPage();
  const errors = [];
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message));
  page.on('console', (m) => { if (m.type() === 'error' && !/fonts\.(googleapis|gstatic)|ERR_|status of 403/.test(m.text())) errors.push('console: ' + m.text()); });

  await page.goto('http://localhost:8765/index.html#shredder');
  await page.waitForTimeout(600);

  // 1. launcher shortcut hash + nav indicator
  check('hash #shredder opens Shredder tab', await page.evaluate(() => document.getElementById('tab-shredder').classList.contains('active')));
  check('mood card not shown off-home', await page.evaluate(() => document.getElementById('moodBarometer').offsetParent === null));
  check('nav indicator has width', await page.evaluate(() => parseFloat(document.getElementById('navIndicator').style.width) > 20));

  // 2. back button returns home after tab switch from home
  await page.goto('http://localhost:8765/index.html');
  await page.waitForTimeout(400);
  await page.tap('#nav-oracle');
  check('tap Oracle -> oracle active', await page.evaluate(() => document.getElementById('tab-oracle').classList.contains('active')));
  await page.tap('#nav-switchboard');
  await page.goBack();
  await page.waitForTimeout(300);
  check('Back from non-home tab -> Bobo (home)', await page.evaluate(() => document.getElementById('tab-pet').classList.contains('active')));
  check('mood card visible on home', await page.evaluate(() => document.getElementById('moodBarometer').offsetParent !== null));

  // 3. theme sheet opens (was broken), applies theme, updates theme-color, closes on Back
  await page.tap('#themeBtn');
  check('theme sheet opens', await page.evaluate(() => document.getElementById('themeModal').classList.contains('open')));
  await page.goBack();
  await page.waitForTimeout(200);
  check('Back closes theme sheet (stays on home)', await page.evaluate(() => !document.getElementById('themeModal').classList.contains('open') && document.getElementById('tab-pet').classList.contains('active')));
  await page.tap('#themeBtn');
  await page.tap('[data-theme-val="midnight"]');
  await page.waitForTimeout(500);
  const th = await page.evaluate(() => ({ t: document.body.dataset.theme, meta: document.querySelector('meta[name=theme-color]').content, open: document.getElementById('themeModal').classList.contains('open') }));
  check('theme applied + meta theme-color synced + sheet closed', th.t === 'midnight' && th.meta.toLowerCase() === '#0f0e17' && !th.open, JSON.stringify(th));
  await page.reload(); await page.waitForTimeout(300);
  check('theme persists after reload', await page.evaluate(() => document.body.dataset.theme === 'midnight'));

  // 4. Bobo: one tap == exactly one poke (was double-firing), page does not scroll on canvas touch
  await page.evaluate(() => { window.__pokes = 0; const p = window.VA.pet; const o = p.poke.bind(p); p.poke = () => { window.__pokes++; o(); }; });
  const box = await page.locator('#petCanvas').boundingBox();
  await page.touchscreen.tap(box.x + box.width / 2, box.y + box.height / 2);
  await page.waitForTimeout(300);
  check('single tap on Bobo = 1 poke', (await page.evaluate(() => window.__pokes)) === 1, 'pokes=' + (await page.evaluate(() => window.__pokes)));
  check('canvas is DPR-scaled (crisp)', await page.evaluate(() => document.getElementById('petCanvas').width >= 340 * Math.min(devicePixelRatio, 3) - 1));
  check('canvas touch-action none', await page.evaluate(() => getComputedStyle(document.getElementById('petCanvas')).touchAction === 'none'));

  // Bobo shape stays circular after many pokes (radial-only physics)
  await page.evaluate(() => { for (let i = 0; i < 40; i++) window.VA.pet.poke(); });
  await page.waitForTimeout(2500);
  const dev = await page.evaluate(() => { const p = window.VA.pet; const rs = p.points.map((q) => Math.hypot(q.x, q.y)); return Math.max(...rs.map((r) => Math.abs(r - p.radius))); });
  check('blob relaxes back to circle after 40 pokes', dev < 3, 'max radial dev=' + dev.toFixed(2));

  // 5. Purr toggles and stops when app is backgrounded
  await page.tap('#purrBtn');
  check('purr on', await page.evaluate(() => window.VA.pet.isPurring));
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { value: true, configurable: true }); document.dispatchEvent(new Event('visibilitychange')); });
  check('purr stops when app hidden', await page.evaluate(() => !window.VA.pet.isPurring && !sounds.purrOsc));
  await page.evaluate(() => { Object.defineProperty(document, 'hidden', { value: false, configurable: true }); });

  // 6. mood row fits without horizontal scroll; shortcut buttons are consistent
  check('mood pills fit (no clipping)', await page.evaluate(() => { const r = document.getElementById('moodRow'); return r.scrollWidth <= r.clientWidth + 1; }));
  check('initial shortcut label matches cozy', await page.evaluate(() => document.querySelector('#moodShortcutBtn span').textContent.includes('Feed')));
  await page.tap('[data-mood="foggy"]');
  await page.tap('#moodShortcutBtn');
  await page.waitForTimeout(500);
  check('Foggy shortcut opens Sensory tab AND starts breathing', await page.evaluate(() => document.getElementById('tab-switchboard').classList.contains('active') && document.getElementById('breathCircle').classList.contains('inhale')));

  // 7. breathing phases 4/2/6, stop => Paused
  await page.waitForTimeout(4500);
  check('hold phase at ~5s', await page.evaluate(() => document.getElementById('breathCircle').classList.contains('hold') && document.getElementById('breathLabel').textContent.startsWith('Hold')));
  await page.waitForTimeout(2000);
  check('exhale phase at ~7s', await page.evaluate(() => document.getElementById('breathCircle').classList.contains('exhale')));
  await page.tap('#toggleBreathBtn');
  check('manual stop shows Paused (not Complete)', await page.evaluate(() => document.getElementById('breathLabel').textContent === 'Paused'));

  // 8. pearls: fit grid and >=48px tap targets, no overflow
  const pearls = await page.evaluate(() => { const g = document.getElementById('bubbleGrid').getBoundingClientRect(); const items = [...document.querySelectorAll('.bubble-wrap-item')].map((e) => e.getBoundingClientRect()); return { n: items.length, minW: Math.min(...items.map((r) => r.width)), inside: items.every((r) => r.left >= g.left - 1 && r.right <= g.right + 1) }; });
  check('24 pearls, >=48px, inside grid', pearls.n === 24 && pearls.minW >= 48 && pearls.inside, JSON.stringify(pearls));
  check('no horizontal page overflow at 360px', await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth));

  // 9. sips are per-day
  await page.evaluate(() => { localStorage.setItem('va-water-day', 'Mon Jan 01 2001'); localStorage.setItem('va-water-sips', '17'); });
  await page.reload(); await page.waitForTimeout(300);
  check('stale sips reset on new day', await page.evaluate(() => document.getElementById('waterSipBadge').textContent === '0 sips today'));

  // 10. shredder: double tap only triggers once; input locked then cleared
  await page.tap('#nav-shredder');
  await page.fill('#thoughtInput', 'test thought');
  await page.evaluate(() => { window.__verd = 0; const o = window.triggerConfettiBurst; window.triggerConfettiBurst = (...a) => { window.__verd++; return o(...a); }; });
  await page.tap('#shredActionBtn');
  const locked = await page.evaluate(() => document.getElementById('thoughtInput').readOnly && document.getElementById('shredActionBtn').disabled);
  check('shredder locks input+button during animation', locked);
  await page.waitForTimeout(1600);
  check('verdict shown once, input cleared, unlocked', await page.evaluate(() => document.getElementById('verdictBox').style.display === 'block' && document.getElementById('thoughtInput').value === '' && !document.getElementById('thoughtInput').readOnly && window.__verd === 1));

  // 11. clipboard fallback works without throwing (share path)
  await page.evaluate(() => { Object.defineProperty(navigator, 'share', { value: undefined, configurable: true }); });
  await page.tap('#shareVerdictBtn');
  await page.waitForTimeout(300);
  check('share fallback shows a toast, no exception', await page.evaluate(() => /copied|not available/i.test(document.getElementById('toastBubble').textContent)));

  // 12. keyboard hides bottom nav
  await page.tap('#thoughtInput');
  check('nav hidden while typing', await page.evaluate(() => document.body.classList.contains('kbd-open')));
  await page.evaluate(() => document.activeElement.blur());

  // 13. court heading changes
  await page.tap('#nav-validation');
  const h0 = await page.evaluate(() => document.getElementById('rulingHeading').textContent);
  await page.tap('#courtBuzzerBtn');
  const h1 = await page.evaluate(() => document.getElementById('rulingHeading').textContent);
  check('court heading updates with ruling', h0 !== h1, h1);

  // 14. service worker: registered on localhost, v2 cache populated
  await page.waitForTimeout(800);
  const sw = await page.evaluate(async () => { const reg = await navigator.serviceWorker.ready; const keys = await caches.keys(); const c = await caches.open(keys[0]); return { active: !!reg.active, keys, n: (await c.keys()).length }; });
  check('service worker active, cache vibe-alchemist-v3 populated', sw.active && sw.keys.includes('vibe-alchemist-v3') && sw.n >= 7, JSON.stringify(sw));

  check('no JS errors', errors.length === 0, errors.join(' | '));
  await browser.close();
  const failed = results.filter((r) => !r).length;
  console.log(`\n${results.length - failed}/${results.length} passed`);
  process.exit(failed ? 1 : 0);
})();
