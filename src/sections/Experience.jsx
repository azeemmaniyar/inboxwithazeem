import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import { experience } from '../data/content.js'
import { accentVars } from '../lib/accents.js'

export default function Experience() {
  const [open, setOpen] = useState(0)

  return (
    <section id="experience" aria-labelledby="experience-title" className="container-x py-16 sm:py-24">
      <SectionHeading id="experience-title" eyebrow="Experience" title="Where I’ve worked" />

      <ol className="relative space-y-4 border-l-2 border-dashed border-line pl-5 sm:pl-8">
        {experience.map((job, i) => {
          const isOpen = open === i
          const panelId = `job-${i}`
          return (
            <Reveal as="li" key={job.role + job.company} delay={i * 0.08} className="relative">
              <span style={accentVars(job.accent)} className="accent-bg absolute -left-[29px] top-6 h-4 w-4 rounded-full ring-4 ring-bg sm:-left-[41px]" aria-hidden="true" />
              <div style={accentVars(job.accent)} className={`card overflow-hidden border-2 transition-colors ${isOpen ? 'accent-border' : ''}`}>
                <h3 className="text-lg sm:text-xl">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? -1 : i)}
                    className="flex w-full items-start justify-between gap-4 p-5 text-left sm:p-6"
                  >
                    <span>
                      <span className="block font-extrabold">{job.role}</span>
                      <span className="accent-text mt-0.5 block font-sans text-base font-semibold">{job.company}</span>
                      {(job.period || job.location) && (
                        <span className="mt-1 block font-sans text-sm font-normal text-muted">
                          {[job.period, job.location].filter(Boolean).join(' · ')}
                        </span>
                      )}
                    </span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="accent-soft accent-text grid h-9 w-9 shrink-0 place-items-center rounded-full text-2xl leading-none" aria-hidden="true">
                      +
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="px-5 pb-6 sm:px-6">
                        <ul className="space-y-2">
                          {job.points.map((p) => (
                            <li key={p} className="flex gap-3 text-muted">
                              <span className="accent-text mt-0.5" aria-hidden="true">▸</span>
                              <span>{p}</span>
                            </li>
                          ))}
                        </ul>
                        <ul className="mt-4 flex flex-wrap gap-2" aria-label="Tools">
                          {job.tags.map((t) => (
                            <li key={t} className="chip accent-border accent-soft text-xs">{t}</li>
                          ))}
                        </ul>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
                {!isOpen && <p className="-mt-3 px-5 pb-5 text-sm text-muted sm:px-6">{job.summary}</p>}
              </div>
            </Reveal>
          )
        })}
      </ol>
    </section>
  )
}
