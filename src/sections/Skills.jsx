import { useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import { skillGroups } from '../data/content.js'
import { accentVars } from '../lib/accents.js'

export default function Skills() {
  const [active, setActive] = useState(skillGroups[0].id)
  const tabRefs = useRef([])
  const group = skillGroups.find((g) => g.id === active)

  // Arrow-key navigation between tabs (WAI-ARIA tabs pattern)
  const onKeyDown = (e, i) => {
    const dir = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[e.key]
    let next = dir !== undefined ? (i + dir + skillGroups.length) % skillGroups.length : null
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = skillGroups.length - 1
    if (next === null) return
    e.preventDefault()
    setActive(skillGroups[next].id)
    tabRefs.current[next]?.focus()
  }

  return (
    <section id="skills" aria-labelledby="skills-title" className="container-x py-16 sm:py-24">
      <SectionHeading id="skills-title" eyebrow="Toolkit" title="What I work with" />

      <Reveal>
        <div role="tablist" aria-label="Skill groups" className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-2 sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0">
          {skillGroups.map((g, i) => {
            const selected = g.id === active
            return (
              <button
                key={g.id}
                ref={(el) => (tabRefs.current[i] = el)}
                role="tab"
                id={`tab-${g.id}`}
                aria-selected={selected}
                aria-controls={`panel-${g.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => setActive(g.id)}
                onKeyDown={(e) => onKeyDown(e, i)}
                style={accentVars(g.accent)}
                className={`relative shrink-0 rounded-full border-2 px-4 py-2 font-semibold transition-colors ${selected ? 'border-transparent text-white' : 'accent-border bg-surface/70 hover:accent-soft'}`}
              >
                {selected && <motion.span layoutId="skill-pill" className="accent-bg absolute inset-0 -z-0 rounded-full" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                <span className="relative z-10 flex items-center gap-2">
                  <span aria-hidden="true" className={selected ? '' : 'accent-text'}>{g.icon}</span>
                  {g.label}
                </span>
              </button>
            )
          })}
        </div>

        <div className="card mt-4 min-h-[220px] p-5 sm:p-8" style={accentVars(group.accent)}>
          <AnimatePresence mode="wait">
            <motion.div
              key={group.id}
              id={`panel-${group.id}`}
              role="tabpanel"
              aria-labelledby={`tab-${group.id}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25 }}
            >
              <p className="accent-text mb-5 font-display text-xl font-bold">{group.blurb}</p>
              <ul className="flex flex-wrap gap-2.5">
                {group.items.map((item, i) => (
                  <motion.li
                    key={item}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.035, type: 'spring', stiffness: 400, damping: 22 }}
                    whileHover={{ y: -3 }}
                    className="chip accent-border accent-soft"
                  >
                    {item}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </AnimatePresence>
        </div>
      </Reveal>
    </section>
  )
}
