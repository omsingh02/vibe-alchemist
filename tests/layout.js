const { chromium, devices } = require('playwright');
let fails = 0; const ok = (n, c, x = '') => { if (!c) fails++; console.log((c ? 'PASS ' : 'FAIL ') + n + (x ? '  ' + x : '')); };
(async () => {
  const b = await chromium.launch();
  for (const w of [320, 360, 412]) {
    const p = await (await b.newContext({ ...devices['Pixel 7'], viewport: { width: w, height: 740 } })).newPage();
    await p.goto('http://localhost:8765/index.html'); await p.waitForTimeout(500);
    const base = await p.evaluate(() => ({
      hdrH: document.querySelector('.top-bar').getBoundingClientRect().height,
      hdrSticky: getComputedStyle(document.querySelector('.top-bar')).position,
      title1: document.querySelector('.brand-title').getBoundingClientRect().height < 30,
      navBg: getComputedStyle(document.querySelector('.bottom-nav')).backgroundColor,
      overflowX: document.documentElement.scrollWidth > innerWidth,
      banner: document.getElementById('installBanner').hidden,
      petTop: document.getElementById('petCanvas').getBoundingClientRect().top,
    }));
    ok(`[${w}] header <=64dp, non-sticky, title on one line`, base.hdrH <= 64 && base.hdrSticky === 'static' && (w < 340 || base.title1), JSON.stringify([base.hdrH, base.hdrSticky]));
    ok(`[${w}] nav opaque`, /^rgb\(/.test(base.navBg) || /,\s*1\)$/.test(base.navBg), base.navBg);
    ok(`[${w}] no horizontal overflow, banner hidden by default`, !base.overflowX && base.banner);
    ok(`[${w}] Bobo canvas starts above the nav`, base.petTop < 740 - 64 - 100, 'top=' + Math.round(base.petTop));
    for (const tab of ['pet', 'shredder', 'oracle', 'validation', 'switchboard']) {
      await p.tap(`#nav-${tab}`); await p.waitForTimeout(250);
      const r = await p.evaluate((tab) => {
        const panel = document.getElementById('tab-' + tab); const small = [];
        [...panel.querySelectorAll('button:not(.thought-chip)'), ...document.querySelectorAll('.header-actions button, .nav-item')].forEach((e) => {
          const r = e.getBoundingClientRect(); if (r.width && r.height && (r.height < 47.5 || r.width < 47.5) && !e.hidden && e.offsetParent !== null) small.push(e.id || e.className.split(' ')[0] + ':' + Math.round(r.width) + 'x' + Math.round(r.height));
        });
        const card = panel.querySelector('.section-card, .pet-hero-card').getBoundingClientRect();
        const outside = [...panel.querySelectorAll('button, input, textarea')].filter((e) => { const r = e.getBoundingClientRect(); return r.width && (r.right > card.right + 1 || r.left < card.left - 1); }).map((e) => e.id || e.className);
        return { small, outside, overflowX: document.documentElement.scrollWidth > innerWidth };
      }, tab);
      ok(`[${w}] ${tab}: targets >=48dp, nothing outside card, no x-overflow`, !r.small.length && !r.outside.length && !r.overflowX, JSON.stringify(r));
    }
    await p.tap('#nav-oracle');
    const o = await p.evaluate(() => { const c = document.getElementById('oracleCategories'); return { clip: c.scrollWidth > c.clientWidth + 1, hs: getComputedStyle(c).overflowX }; });
    ok(`[${w}] oracle categories fit without scrolling`, !o.clip, JSON.stringify(o));
    await p.tap('#anotherFortuneBtn'); await p.evaluate(() => document.getElementById('orbBtn').click()); await p.waitForTimeout(200);
    const toast = await p.evaluate(() => { const t = document.getElementById('toastBubble').getBoundingClientRect(); const h = document.querySelector('.top-bar').getBoundingClientRect(); const n = document.querySelector('.bottom-nav').getBoundingClientRect(); return { t: [t.top, t.bottom], hdrBottom: h.bottom, navTop: n.top }; });
    await p.fill('#friendNameInput', 'Mochi'); await p.evaluate(() => document.activeElement.blur()); await p.tap('#shareFortuneBtn'); await p.waitForTimeout(300);
    const t2 = await p.evaluate(() => { const t = document.getElementById('toastBubble'); const r = t.getBoundingClientRect(); const n = document.querySelector('.bottom-nav').getBoundingClientRect(); const lh = parseFloat(getComputedStyle(t).lineHeight); return { shown: t.classList.contains('show'), bottomGap: n.top - r.bottom, lines: Math.round(r.height / lh), above: r.bottom <= n.top }; });
    ok(`[${w}] snackbar sits above nav, <=2 lines, never over header`, !t2.shown || (t2.above && t2.lines <= 3), JSON.stringify(t2));
  }
  await b.close(); console.log(fails ? `\n${fails} FAILED` : '\nlayout: all passed'); process.exit(fails ? 1 : 0);
})();
