# Vibe Alchemist

Static PWA, no build step. Android-first.

## Deploy (Vercel)
No build step. `vercel --prod` from this folder, or import it in the dashboard with Framework Preset = Other,
Build Command empty, Output Directory empty (root). Vercel serves HTTPS, so the service worker, Install button and
offline mode work. `vercel.json` sets no-cache on `sw.js` so updates reach installed phones.

## Run locally
    python3 serve.py            # optional arg: port (default 8080)

## Install on Android (Chrome)
Service workers, the Install button and offline mode require a secure context (HTTPS or `localhost`).
`http://<LAN-IP>` does not qualify: the app runs, but is neither installable nor offline there.

- USB: `adb reverse tcp:8080 tcp:8080`, then open `http://localhost:8080` on the phone.
- Or host the folder on any HTTPS static host.
- Dev only: `chrome://flags/#unsafely-treat-insecure-origin-as-secure`.

## Updating an installed copy
`sw.js` is network-first for same-origin files. Bump `CACHE_NAME` in `sw.js` when you ship changes
so old caches are purged. Icons: `python3 generate_icons.py` (needs Pillow).

## Launcher shortcuts
Long-press the icon: `#shredder`, `#pet`, `#switchboard` (also `#oracle`, `#validation`).
