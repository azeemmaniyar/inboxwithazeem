# Mohammad Azeem Maniyar | Portfolio

Personal portfolio for an Email Marketing Executive, Campaign Analyst and Email Deliverability Specialist based in Bengaluru.

The hero is a live, interactive **email journey**: envelopes fly through SPF, DKIM and DMARC gates into an inbox. Switch a check off and some envelopes turn red and drop into spam while the "reaching the inbox %" meter falls. Envelopes move away from your mouse or finger.

## Tech
- React 18 + Vite 5
- Tailwind CSS 3 (light/dark via `class`, theme colours as CSS variables in `src/index.css`)
- Framer Motion (reveals, tabs, tilt, magnetic buttons, count-ups)
- HTML canvas for the hero animation (no Three.js; it pauses when off-screen)
- Netlify (static deploy, see `netlify.toml`)

## Edit the content
Everything is in **`src/data/content.js`**. Search it for `TODO` to find the placeholders (certifications, internship dates and bullets, campaign analysis tool text, photo, resume link).

## Run locally
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
npm run preview    # serve the build locally
```

## Deploy to Netlify
This repo is already connected to Netlify, so every push to `main` deploys automatically (build `npm ci --include=dev && npm run build`, publish `dist`).

To deploy manually with the CLI instead:
```bash
npm install -g netlify-cli
netlify login
netlify deploy --build          # preview URL
netlify deploy --build --prod   # production
```

## Folder structure
```
public/            favicon.svg, apple-touch-icon.png, og-image.png
src/
  data/content.js  ← all text, links, skills, jobs, projects
  lib/accents.js   accent colour palette
  hooks/           useTheme, useFinePointer
  components/      EmailJourney (canvas), TiltCard, MagneticButton, Marquee,
                   RotatingText, CountUp, Reveal, Navbar, ThemeToggle, ScrollProgress, Background
  sections/        Hero, Skills, Experience, Projects, Credentials, Contact, Footer
  App.jsx, main.jsx, index.css
index.html         SEO, Open Graph and JSON-LD tags
netlify.toml       build settings, SPA fallback, cache and security headers
```
