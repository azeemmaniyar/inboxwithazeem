import { lazy, Suspense } from 'react'
import { motion } from 'framer-motion'
import MagneticButton from '../components/MagneticButton.jsx'
import RotatingText from '../components/RotatingText.jsx'
import CountUp from '../components/CountUp.jsx'
import { profile, stats } from '../data/content.js'
import { accentVars } from '../lib/accents.js'

// The canvas demo ships in its own chunk so the headline paints first
const EmailJourney = lazy(() => import('../components/EmailJourney.jsx'))

const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
})

export default function Hero({ dark }) {
  return (
    <section id="top" aria-labelledby="hero-title" className="container-x pb-14 pt-24 sm:pt-28 lg:pb-20">
      <div className="grid items-center gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-12">
        <div>
          <motion.div {...fadeUp(0)} className="mb-5 flex items-center gap-3">
            {profile.photo ? (
              <img src={profile.photo} alt={profile.name} width="48" height="48" className="h-12 w-12 rounded-full object-cover ring-2 ring-pink-500/60" />
            ) : (
              <span aria-hidden="true" className="grid h-12 w-12 place-items-center rounded-full bg-gradient-to-br from-violet-600 via-pink-600 to-orange-600 font-display font-extrabold text-white">
                {profile.initials}
              </span>
            )}
            <div className="leading-tight">
              <p className="font-semibold">{profile.name}</p>
              <p className="text-sm text-muted">{profile.location}</p>
            </div>
          </motion.div>

          <motion.h1 {...fadeUp(0.08)} id="hero-title" className="text-[2.5rem] font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            {profile.headline[0]} <span className="text-gradient">{profile.headline[1]}</span>
          </motion.h1>

          <motion.p {...fadeUp(0.16)} className="mt-5 flex flex-wrap items-baseline gap-x-2 font-display text-xl font-semibold sm:text-2xl">
            <span className="text-muted">Email</span>
            <RotatingText items={profile.roles} className="text-pink-700 dark:text-pink-300" />
          </motion.p>

          <motion.p {...fadeUp(0.22)} className="mt-4 max-w-lg text-muted">{profile.intro}</motion.p>

          <motion.div {...fadeUp(0.3)} className="mt-7 flex flex-wrap gap-3">
            <MagneticButton href="#contact">Fix my deliverability →</MagneticButton>
            <MagneticButton href="#experience" className="btn-ghost">See my work</MagneticButton>
          </motion.div>
        </div>

        <motion.div {...fadeUp(0.2)}>
          <Suspense fallback={<div className="card h-[520px] animate-pulse sm:h-[600px]" aria-label="Loading animation" />}>
            <EmailJourney dark={dark} />
          </Suspense>
        </motion.div>
      </div>

      <ul className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {stats.map((s, i) => (
          <motion.li key={s.label} {...fadeUp(0.35 + i * 0.08)} style={accentVars(s.accent)} className="card accent-border p-4 sm:p-5">
            <p className="accent-text font-display text-3xl font-extrabold sm:text-4xl">
              <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
            </p>
            <p className="mt-1 text-sm text-muted">{s.label}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  )
}
