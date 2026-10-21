// `solid` is dark enough for white text (WCAG AA); `glow` is the bright tone used on dark backgrounds.
export const ACCENTS = {
  violet: { solid: '#6d28d9', glow: '#a78bfa' },
  emerald: { solid: '#047857', glow: '#34d399' },
  pink: { solid: '#be185d', glow: '#f472b6' },
  amber: { solid: '#b45309', glow: '#fbbf24' },
  sky: { solid: '#0369a1', glow: '#38bdf8' },
  orange: { solid: '#c2410c', glow: '#fb923c' },
  teal: { solid: '#0f766e', glow: '#2dd4bf' },
  rose: { solid: '#be123c', glow: '#fb7185' },
  indigo: { solid: '#4338ca', glow: '#818cf8' },
}

// Inline style that exposes the accent as CSS variables (used by .accent-* utilities in index.css)
export const accentVars = (key) => {
  const a = ACCENTS[key] || ACCENTS.violet
  return { '--a-solid': a.solid, '--a-glow': a.glow }
}
