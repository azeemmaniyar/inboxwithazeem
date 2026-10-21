import SectionHeading from '../components/SectionHeading.jsx'
import Reveal from '../components/Reveal.jsx'
import Marquee from '../components/Marquee.jsx'
import TiltCard from '../components/TiltCard.jsx'
import { certifications, education } from '../data/content.js'
import { accentVars } from '../lib/accents.js'

const CERT_ACCENTS = ['violet', 'emerald', 'pink', 'amber', 'sky', 'orange', 'teal', 'rose']

export default function Credentials() {
  return (
    <section id="credentials" aria-labelledby="credentials-title" className="py-16 sm:py-24">
      <div className="container-x">
        <SectionHeading id="credentials-title" eyebrow="Credentials" title="Certified & educated" />
      </div>

      <Reveal>
        <h3 className="sr-only">Certifications</h3>
        <Marquee label="Certifications">
          {certifications.map((c, i) => (
            <li key={i} style={accentVars(CERT_ACCENTS[i % CERT_ACCENTS.length])} className="card accent-border flex shrink-0 items-center gap-3 border-2 px-5 py-3 backdrop-blur-none">
              <span aria-hidden="true" className="accent-bg grid h-8 w-8 place-items-center rounded-full text-sm text-white">✓</span>
              <span>
                <span className="block font-semibold">{c.name}</span>
                <span className="accent-text block text-sm">{c.issuer}</span>
              </span>
            </li>
          ))}
        </Marquee>
      </Reveal>

      <div className="container-x mt-10">
        <h3 className="mb-4 text-xl font-extrabold">Education</h3>
        <ul className="grid gap-4 md:grid-cols-3">
          {education.map((e, i) => (
            <Reveal as="li" key={e.degree} delay={i * 0.08}>
              <TiltCard style={accentVars(e.accent)} className="card accent-border h-full border-2 p-6">
                <p className="accent-text font-display text-4xl font-extrabold">{e.score}</p>
                <p className="mt-3 text-lg font-bold">{e.degree}</p>
                <p className="text-sm text-muted">{e.school}</p>
              </TiltCard>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
