# AGENTS.md

Single-page portfolio: React 18 + Vite + Tailwind 3 + Framer Motion, deployed as a static site on Netlify (`dist/`). There is no backend.

## Architecture
- `src/data/content.js` is the **only** place for copy and facts. Components must read from it; never hard-code personal content in components. Facts must come from the owner's resume. Don't invent numbers, clients or achievements. Unknown items are marked `TODO`.
- `src/lib/accents.js` holds the named accents. Content items pick one with `accent: 'violet'`, and components apply it with `style={accentVars(key)}` plus the `.accent-text / .accent-bg / .accent-border / .accent-soft` utilities in `index.css`. `solid` tones meet AA contrast with white text, and `glow` tones are for dark mode.
- Theme: `dark` class on `<html>`, colours as RGB CSS variables (`--bg`, `--surface`, `--fg`, `--muted`, `--line`) mapped in `tailwind.config.js`. An inline script in `index.html` applies the saved theme before paint, and `useTheme` persists it to `localStorage`.
- `components/EmailJourney.jsx` is the canvas hero, lazy-loaded from `Hero.jsx`. Its animation loop reads React state through refs (no re-render per frame), pauses off-screen or in hidden tabs, caps DPR at 2 and publishes the inbox % every 250 ms. Layout constants are fractions of canvas size at the top of the file.

## Conventions
- Motion: `MotionConfig reducedMotion="user"` wraps the app. Effects that rely on hover (tilt, magnetic) turn off on touch (`useFinePointer`) and with reduced motion. CSS animations stop in the `prefers-reduced-motion` media block.
- Accessibility: tabs follow the WAI-ARIA tabs pattern (arrow, Home and End keys), accordions use `aria-expanded`, gate toggles are `role="switch"`, and there is a skip link. Keep visible `:focus-visible` outlines.
- Avoid horizontal overflow at 360px: `body` has `overflow-x: hidden`, but don't depend on it. Check widths of new elements.
- Don't add large images. Put a photo in `/public` as WebP under about 60KB.
