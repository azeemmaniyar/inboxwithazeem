import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'
import { journey } from '../data/content.js'
import { ACCENTS, accentVars } from '../lib/accents.js'

// ── Layout, as fractions of the canvas size ──────────────────
const SENDER_X = 0.075
const GATE_X = [0.32, 0.52, 0.72]
const GATE_TOP = 0.14
const GATE_BOTTOM = 0.64
const LANE_TOP = 0.2
const LANE_BOTTOM = 0.58
const INBOX_LEFT = 0.845
const SPAM_TOP = 0.75
const SPAM_LEFT = 0.24
const SPAM_RIGHT = 0.83

// Chance that an email is rejected at a gate when that check is switched off
const FAIL_CHANCE = { spf: 0.3, dkim: 0.3, dmarc: 0.35 }
const WINDOW = 30 // rolling window of results used for the inbox %

const KEYS = journey.checks.map((c) => c.key)

function roundRect(ctx, x, y, w, h, r) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.arcTo(x + w, y, x + w, y + h, r)
  ctx.arcTo(x + w, y + h, x, y + h, r)
  ctx.arcTo(x, y + h, x, y, r)
  ctx.arcTo(x, y, x + w, y, r)
  ctx.closePath()
}

function drawEnvelope(ctx, x, y, w, rot, fill, stroke, alpha) {
  const h = w * 0.68
  ctx.save()
  ctx.globalAlpha = alpha
  ctx.translate(x, y)
  if (rot) ctx.rotate(rot)
  roundRect(ctx, -w / 2, -h / 2, w, h, 2.5)
  ctx.fillStyle = fill
  ctx.fill()
  ctx.lineWidth = 1.5
  ctx.strokeStyle = stroke
  ctx.stroke()
  ctx.beginPath()
  ctx.moveTo(-w / 2 + 1.5, -h / 2 + 1.5)
  ctx.lineTo(0, h * 0.08)
  ctx.lineTo(w / 2 - 1.5, -h / 2 + 1.5)
  ctx.stroke()
  ctx.restore()
}

export default function EmailJourney({ dark }) {
  const reduce = useReducedMotion()
  const canvasRef = useRef(null)
  const wrapRef = useRef(null)
  const [checks, setChecks] = useState({ spf: true, dkim: true, dmarc: true })
  const [rate, setRate] = useState(100)

  // Values the animation loop reads without re-rendering React
  const checksRef = useRef(checks)
  const darkRef = useRef(dark)
  const reduceRef = useRef(reduce)
  const statsRef = useRef({ results: Array(WINDOW).fill(1), inbox: 0, spam: 0 })
  checksRef.current = checks
  darkRef.current = dark
  reduceRef.current = reduce

  useEffect(() => {
    const canvas = canvasRef.current
    const wrap = wrapRef.current
    const ctx = canvas.getContext('2d')
    let W = 0
    let H = 0
    let raf = 0
    let last = 0
    let spawnT = 0
    let visible = true
    let inboxFlash = 0
    const envelopes = []
    const gates = KEYS.map(() => ({ flash: 0, ok: true }))
    const pointer = { x: -999, y: -999, active: false }
    const stats = statsRef.current

    const resize = () => {
      const r = wrap.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      W = r.width
      H = r.height
      canvas.width = Math.round(W * dpr)
      canvas.height = Math.round(H * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }

    const record = (ok) => {
      stats.results.push(ok ? 1 : 0)
      if (stats.results.length > WINDOW) stats.results.shift()
      ok ? stats.inbox++ : stats.spam++
    }

    const spawn = () => {
      envelopes.push({
        x: W * SENDER_X,
        baseY: H * (LANE_TOP + Math.random() * (LANE_BOTTOM - LANE_TOP)),
        off: 0,
        offV: 0,
        y: 0,
        vx: 0,
        vy: 0,
        speed: W * (0.1 + Math.random() * 0.05),
        phase: Math.random() * Math.PI * 2,
        passed: 0,
        state: 'fly', // fly → inbox | fall → spam
        rot: 0,
        life: 1,
      })
    }

    const update = (dt, t) => {
      const slow = reduceRef.current ? 0.35 : 1
      const size = Math.max(12, Math.min(20, W / 38))
      const R = Math.max(60, W * 0.11)

      spawnT -= dt
      if (spawnT <= 0 && envelopes.length < 60) {
        spawn()
        spawnT = (reduceRef.current ? 1.1 : 0.38) + Math.random() * 0.2
      }

      for (const g of gates) g.flash = Math.max(0, g.flash - dt * 2.2)
      inboxFlash = Math.max(0, inboxFlash - dt * 2)

      for (let i = envelopes.length - 1; i >= 0; i--) {
        const e = envelopes[i]

        if (e.state === 'fly') {
          e.x += e.speed * slow * dt

          // Pointer repels nearby envelopes, then a spring pulls them back to their lane
          if (pointer.active) {
            const dx = e.x - pointer.x
            const dy = e.baseY + e.off - pointer.y
            const d = Math.hypot(dx, dy) || 1
            if (d < R) {
              const f = 1 - d / R
              e.offV += (dy / d) * f * 2600 * dt
              e.x += (dx / d) * f * 160 * dt
            }
          }
          e.offV += (-36 * e.off - 7 * e.offV) * dt
          e.off += e.offV * dt
          const bob = reduceRef.current ? 0 : Math.sin(t * 2.4 + e.phase) * 3
          e.y = Math.min(H * GATE_BOTTOM, Math.max(H * GATE_TOP, e.baseY + e.off + bob))

          // Gate checks
          if (e.passed < GATE_X.length && e.x >= W * GATE_X[e.passed]) {
            const key = KEYS[e.passed]
            const gate = gates[e.passed]
            const on = checksRef.current[key]
            e.passed++
            if (!on && Math.random() < FAIL_CHANCE[key]) {
              e.state = 'fall'
              e.vx = e.speed * 0.35
              e.vy = -90
              e.landY = H * (SPAM_TOP + 0.06 + Math.random() * 0.12)
              gate.ok = false
            } else {
              gate.ok = true
            }
            gate.flash = 1
          }

          if (e.x >= W * (INBOX_LEFT + 0.02)) {
            record(true)
            inboxFlash = 1
            envelopes.splice(i, 1)
          }
        } else if (e.state === 'fall') {
          e.vy += 900 * slow * dt
          e.x = Math.min(W * SPAM_RIGHT - size, e.x + e.vx * slow * dt)
          e.y += e.vy * slow * dt
          e.rot += 3 * slow * dt
          if (e.y >= e.landY) {
            e.y = e.landY
            e.state = 'spam'
            record(false)
          }
        } else {
          e.life -= dt * 0.45
          if (e.life <= 0) envelopes.splice(i, 1)
        }
      }
      return size
    }

    const draw = (size) => {
      const isDark = darkRef.current
      const muted = isDark ? 'rgba(200,196,235,.75)' : 'rgba(60,55,100,.8)'
      const fontSize = Math.max(10, Math.min(13, W / 34))
      ctx.clearRect(0, 0, W, H)
      ctx.font = `700 ${fontSize}px "DM Sans", system-ui, sans-serif`
      ctx.textAlign = 'center'
      ctx.textBaseline = 'middle'

      // Flow track
      ctx.setLineDash([3, 7])
      ctx.strokeStyle = isDark ? 'rgba(167,139,250,.25)' : 'rgba(109,40,217,.18)'
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(W * SENDER_X, H * ((LANE_TOP + LANE_BOTTOM) / 2))
      ctx.lineTo(W * INBOX_LEFT, H * ((LANE_TOP + LANE_BOTTOM) / 2))
      ctx.stroke()
      ctx.setLineDash([])

      // Sender
      const sw = Math.max(26, W * 0.06)
      roundRect(ctx, W * SENDER_X - sw / 2, H * 0.3, sw, H * 0.18, 8)
      ctx.fillStyle = isDark ? 'rgba(167,139,250,.18)' : 'rgba(109,40,217,.1)'
      ctx.fill()
      ctx.fillStyle = muted
      ctx.fillText('YOU', W * SENDER_X, H * 0.39)

      // Spam zone
      const sx = W * SPAM_LEFT
      const sy = H * SPAM_TOP
      roundRect(ctx, sx, sy, W * (SPAM_RIGHT - SPAM_LEFT), H * 0.22, 12)
      ctx.fillStyle = isDark ? 'rgba(239,68,68,.14)' : 'rgba(220,38,38,.08)'
      ctx.fill()
      ctx.setLineDash([5, 5])
      ctx.strokeStyle = 'rgba(239,68,68,.55)'
      ctx.lineWidth = 1.5
      ctx.stroke()
      ctx.setLineDash([])
      ctx.textAlign = 'left'
      ctx.fillStyle = isDark ? '#fca5a5' : '#b91c1c'
      ctx.fillText(`SPAM · ${stats.spam}`, sx + 10, sy + fontSize)
      ctx.textAlign = 'center'

      // Inbox
      const ix = W * INBOX_LEFT
      const iw = W * (0.985 - INBOX_LEFT)
      roundRect(ctx, ix, H * LANE_TOP - 6, iw, H * (LANE_BOTTOM - LANE_TOP) + 12, 12)
      ctx.fillStyle = `rgba(16,185,129,${(isDark ? 0.16 : 0.1) + inboxFlash * 0.25})`
      ctx.fill()
      ctx.strokeStyle = `rgba(16,185,129,${0.5 + inboxFlash * 0.5})`
      ctx.lineWidth = 2
      ctx.stroke()
      ctx.fillStyle = isDark ? '#6ee7b7' : '#047857'
      ctx.fillText('INBOX', ix + iw / 2, H * LANE_TOP - 6 - fontSize)
      ctx.font = `800 ${fontSize * 1.3}px "Bricolage Grotesque", system-ui, sans-serif`
      ctx.fillText(String(stats.inbox), ix + iw / 2, H * ((LANE_TOP + LANE_BOTTOM) / 2))
      ctx.font = `700 ${fontSize}px "DM Sans", system-ui, sans-serif`

      // Gates
      const gw = Math.max(8, W * 0.014)
      KEYS.forEach((key, i) => {
        const on = checksRef.current[key]
        const g = gates[i]
        const accent = ACCENTS[journey.checks[i].accent]
        const color = isDark ? accent.glow : accent.solid
        const x = W * GATE_X[i]
        const top = H * GATE_TOP
        const h = H * (GATE_BOTTOM - GATE_TOP)
        if (on) {
          const pulse = 0.12 + g.flash * 0.25
          ctx.globalAlpha = pulse
          ctx.fillStyle = color
          roundRect(ctx, x - gw * 2.5, top - 4, gw * 5, h + 8, gw * 2.5)
          ctx.fill()
          ctx.globalAlpha = 1
          roundRect(ctx, x - gw / 2, top, gw, h, gw / 2)
          ctx.fill()
        } else {
          ctx.setLineDash([4, 5])
          ctx.strokeStyle = isDark ? 'rgba(200,196,235,.45)' : 'rgba(60,55,100,.4)'
          ctx.lineWidth = 2
          roundRect(ctx, x - gw / 2, top, gw, h, gw / 2)
          ctx.stroke()
          ctx.setLineDash([])
          if (g.flash > 0 && !g.ok) {
            ctx.globalAlpha = g.flash * 0.35
            ctx.fillStyle = '#ef4444'
            roundRect(ctx, x - gw * 2.5, top - 4, gw * 5, h + 8, gw * 2.5)
            ctx.fill()
            ctx.globalAlpha = 1
          }
        }
        ctx.fillStyle = on ? color : muted
        ctx.fillText(on ? journey.checks[i].label : `${journey.checks[i].label} ✕`, x, top - fontSize)
      })

      // Envelopes
      const okFill = isDark ? '#f5f3ff' : '#ffffff'
      const okStroke = isDark ? '#a78bfa' : '#6d28d9'
      for (const e of envelopes) {
        const red = e.state !== 'fly'
        drawEnvelope(ctx, e.x, e.y, size, e.rot, red ? '#ef4444' : okFill, red ? (isDark ? '#fecaca' : '#7f1d1d') : okStroke, e.life)
      }
    }

    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000 || 0)
      last = now
      draw(update(dt, now / 1000))
      if (visible) raf = requestAnimationFrame(frame)
    }

    const start = () => {
      cancelAnimationFrame(raf)
      last = performance.now()
      raf = requestAnimationFrame(frame)
    }

    // Pointer / touch interaction
    const setPointer = (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.active = true
    }
    const clearPointer = () => { pointer.active = false }

    canvas.addEventListener('pointermove', setPointer)
    canvas.addEventListener('pointerdown', setPointer)
    canvas.addEventListener('pointerleave', clearPointer)
    canvas.addEventListener('pointerup', clearPointer)
    canvas.addEventListener('pointercancel', clearPointer)

    const ro = new ResizeObserver(resize)
    ro.observe(wrap)
    resize()

    // Only animate while on screen and the tab is visible
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !document.hidden
      if (visible) start()
    })
    io.observe(wrap)
    const onVis = () => {
      visible = !document.hidden
      if (visible) start()
    }
    document.addEventListener('visibilitychange', onVis)

    // Publish the inbox % to React a few times per second
    const tick = setInterval(() => {
      const r = stats.results
      setRate(Math.round((r.reduce((a, b) => a + b, 0) / r.length) * 100))
    }, 250)

    start()
    return () => {
      cancelAnimationFrame(raf)
      clearInterval(tick)
      ro.disconnect()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVis)
      canvas.removeEventListener('pointermove', setPointer)
      canvas.removeEventListener('pointerdown', setPointer)
      canvas.removeEventListener('pointerleave', clearPointer)
      canvas.removeEventListener('pointerup', clearPointer)
      canvas.removeEventListener('pointercancel', clearPointer)
    }
  }, [])

  const offChecks = journey.checks.filter((c) => !checks[c.key])
  const rateColor = rate >= 90 ? 'text-emerald-700 dark:text-emerald-300' : rate >= 60 ? 'text-amber-700 dark:text-amber-300' : 'text-red-700 dark:text-red-300'
  const barColor = rate >= 90 ? 'bg-emerald-500' : rate >= 60 ? 'bg-amber-500' : 'bg-red-500'

  return (
    <div className="card relative overflow-hidden p-3 shadow-2xl shadow-violet-500/10 sm:p-5">
      <div className="mb-2 flex items-end justify-between gap-3 px-1">
        <div>
          <p className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.18em] text-muted">
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
            </span>
            Live email journey
          </p>
          <p className="mt-1 text-sm text-muted">Reaching the inbox</p>
        </div>
        <p className={`font-display text-4xl font-extrabold tabular-nums sm:text-5xl ${rateColor}`} aria-label={`Reaching the inbox: ${rate} percent`}>
          {rate}%
        </p>
      </div>
      <div className="mb-3 h-2 overflow-hidden rounded-full bg-line/60" aria-hidden="true">
        <motion.div className={`h-full rounded-full ${barColor}`} animate={{ width: `${rate}%` }} transition={{ type: 'spring', stiffness: 80, damping: 20 }} />
      </div>

      <div ref={wrapRef} className="relative h-[260px] w-full sm:h-[330px] lg:h-[350px]">
        <canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-pan-y"
          role="img"
          aria-label="Animation: envelopes travel from you through SPF, DKIM and DMARC gates into the inbox. When a check is off, some envelopes turn red and fall into spam."
        />
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2" role="group" aria-label="Authentication checks">
        {journey.checks.map((c) => {
          const on = checks[c.key]
          return (
            <button
              key={c.key}
              type="button"
              role="switch"
              aria-checked={on}
              onClick={() => setChecks((s) => ({ ...s, [c.key]: !s[c.key] }))}
              style={accentVars(c.accent)}
              title={c.plain}
              className={`flex min-h-[48px] flex-col items-start justify-between gap-1.5 rounded-2xl min-[400px]:flex-row min-[400px]:items-center border-2 px-2.5 py-2 text-left transition-colors sm:px-3 ${on ? 'accent-border accent-soft' : 'border-line bg-surface/60'}`}
            >
              <span className="font-display text-sm font-extrabold sm:text-base">
                <span className={on ? 'accent-text' : 'text-muted line-through'}>{c.label}</span>
              </span>
              <span className={`relative h-5 w-9 shrink-0 rounded-full transition-colors ${on ? 'accent-bg' : 'bg-line'}`} aria-hidden="true">
                <motion.span layout className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow ${on ? 'right-0.5' : 'left-0.5'}`} />
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-3 min-h-[3.25rem] rounded-2xl bg-bg/60 px-3 py-2.5 text-sm leading-snug" aria-live="polite">
        {offChecks.length === 0 ? (
          <p><strong className="text-emerald-700 dark:text-emerald-300">All checks on.</strong> {journey.allOn}</p>
        ) : (
          offChecks.map((c) => (
            <p key={c.key}>
              <strong className="text-red-700 dark:text-red-300">{c.label} off:</strong> {c.off}
            </p>
          ))
        )}
      </div>

      <details className="mt-2 px-1 text-sm text-muted">
        <summary className="cursor-pointer select-none font-medium">What do SPF, DKIM and DMARC mean?</summary>
        <ul className="mt-2 space-y-1">
          {journey.checks.map((c) => (
            <li key={c.key}><strong className="text-fg">{c.label}:</strong> {c.plain}</li>
          ))}
        </ul>
      </details>
      <p className="mt-2 px-1 text-xs text-muted">{journey.hint}</p>
    </div>
  )
}
