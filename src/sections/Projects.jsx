import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import TiltCard from '../components/TiltCard.jsx'
import { projects } from '../data/content.js'
import { accentVars } from '../lib/accents.js'

export default function Projects() {
  return (
    <section id="projects" aria-labelledby="projects-title" className="container-x py-16 sm:py-24">
      <SectionHeading id="projects-title" eyebrow="Projects" title="Things I’ve built" />

      <ul className="grid gap-5 sm:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal as="li" key={p.title} delay={(i % 2) * 0.1}>
            <TiltCard style={accentVars(p.accent)} className="card accent-border flex h-full flex-col overflow-hidden border-2 p-6 sm:p-7">
              <div aria-hidden="true" className="accent-bg pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full opacity-20 blur-2xl" />
              <span aria-hidden="true" className="accent-bg mb-5 grid h-12 w-12 place-items-center rounded-2xl text-2xl text-white shadow-lg">
                {p.icon}
              </span>
              <p className="accent-text text-sm font-bold uppercase tracking-wider">{p.kicker}</p>
              <h3 className="mt-1 text-2xl font-extrabold">{p.title}</h3>
              <p className="mt-3 flex-1 text-muted">{p.description}</p>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Tags">
                {p.tags.map((t) => (
                  <li key={t} className="chip accent-soft border-transparent text-xs">{t}</li>
                ))}
              </ul>
              {p.links.length > 0 && (
                <div className="mt-5 flex flex-wrap gap-3">
                  {p.links.map((l) => (
                    <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="accent-text font-semibold underline-offset-4 hover:underline">
                      {l.label} ↗<span className="sr-only"> (opens in a new tab, {p.title})</span>
                    </a>
                  ))}
                </div>
              )}
            </TiltCard>
          </Reveal>
        ))}
      </ul>
    </section>
  )
}
