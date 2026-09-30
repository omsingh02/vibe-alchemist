# Vibe Alchemist

A mobile-first Progressive Web Application for short, low-effort mood regulation, designed primarily for Android.
It is a dependency-free static site (HTML, CSS and JavaScript) and requires no build step.

## Features

| Module | Description |
| --- | --- |
| Bobo | Touch-responsive spring-physics pet with haptic feedback and a purr mode |
| Shredder | Text-entry ritual for discarding intrusive thoughts |
| Oracle | Randomised encouragement, filterable by category |
| Exonerate | Randomised light-hearted rulings |
| Sensory | Tactile pearl popping, a 60-second paced-breathing exercise (4 s inhale, 2 s hold, 6 s exhale), hydration tracking and celebratory effects |

Additional capabilities: seven colour themes, procedural Web Audio sound (no audio assets), Vibration API haptics,
offline operation via a service worker, Android launcher shortcuts, and handling of the system back gesture.

## Technical Notes

- Vanilla JavaScript; no framework, bundler or runtime dependencies.
- Service worker strategy: network-first for same-origin assets, stale-while-revalidate for Google Fonts.
- Service workers, installation and offline mode require a secure context (HTTPS or `localhost`).
- User data (theme, mood, favourites, daily hydration count) is stored locally in `localStorage` only.

## Local Development

```sh
python3 serve.py            # optional argument: port (default 8080)
```

To test installation on an Android device, forward the port over USB (`adb reverse tcp:8080 tcp:8080`) and open
`http://localhost:8080` on the device.

## Deployment

The repository deploys to Vercel as a static site (Framework Preset: Other; no build or output directory).
`vercel.json` disables caching of `sw.js` so that updates reach installed clients. Increment `CACHE_NAME` in
`sw.js` with each release.

## Repository Structure

```
index.html  style.css  app.js     Application
sw.js  manifest.json  icons/      PWA assets
vercel.json  .vercelignore        Hosting configuration
serve.py  generate_icons.py       Development utilities
```

## Author

**Om Singh**
GitHub: [@omsingh02](https://github.com/omsingh02)

## License

Released under the MIT License. See `LICENSE`.
