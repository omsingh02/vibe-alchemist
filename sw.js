const CACHE_NAME = 'vibe-alchemist-v2';
const CORE = [
  './',
  './index.html',
  './style.css',
  './app.js',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable.png'
];
const NETWORK_TIMEOUT_MS = 4000;

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) =>
      // one missing file must not abort the whole install
      Promise.all(CORE.map((url) => cache.add(url).catch(() => {})))
    )
  );
  self.skipWaiting();
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// Same-origin: network first (updates reach installed phones), cache on failure/timeout.
async function networkFirst(req) {
  const cache = await caches.open(CACHE_NAME);
  const network = fetch(req, { cache: 'no-cache' }).then((res) => {
    if (res && res.ok) cache.put(req, res.clone());
    return res;
  });
  network.catch(() => {});
  try {
    return await Promise.race([
      network,
      new Promise((_, reject) => setTimeout(reject, NETWORK_TIMEOUT_MS))
    ]);
  } catch (err) {
    const hit = (await cache.match(req, { ignoreSearch: true })) ||
      (req.mode === 'navigate' ? await cache.match('./index.html') : undefined);
    return hit || network;
  }
}

// Google Fonts: serve cached copy instantly, refresh in background.
async function staleWhileRevalidate(req) {
  const cache = await caches.open(CACHE_NAME);
  const hit = await cache.match(req);
  const net = fetch(req)
    .then((res) => {
      if (res && (res.ok || res.type === 'opaque')) cache.put(req, res.clone());
      return res;
    })
    .catch(() => hit);
  return hit || net;
}

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin === self.location.origin) {
    e.respondWith(networkFirst(req));
  } else if (url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com') {
    e.respondWith(staleWhileRevalidate(req));
  }
});
