import { motion } from 'framer-motion'
import MagneticButton from '../components/MagneticButton.jsx'
import Reveal from '../components/Reveal.jsx'
import { contact, profile } from '../data/content.js'

const Icon = ({ d }) => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d={d} />
  </svg>
)

export default function Contact() {
  const tel = profile.phone.replace(/\s+/g, '')
  return (
    <section id="contact" aria-labelledby="contact-title" className="container-x py-16 sm:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-violet-700 via-pink-700 to-orange-700 p-7 text-white sm:p-14">
          {/* Decorative envelopes drifting into the CTA */}
          {[0, 1, 2].map((i) => (
            <motion.span
              key={i}
              aria-hidden="true"
              className="pointer-events-none absolute text-5xl opacity-20"
              style={{ top: `${15 + i * 28}%`, right: `${6 + i * 9}%` }}
              animate={{ y: [0, -14, 0], rotate: [-6, 6, -6] }}
              transition={{ duration: 5 + i, repeat: Infinity, ease: 'easeInOut' }}
            >
              ✉
            </motion.span>
          ))}

          <h2 id="contact-title" className="relative max-w-2xl text-4xl font-extrabold leading-tight sm:text-6xl">
            {contact.heading[0]}
            <br />
            <span className="text-amber-200">{contact.heading[1]}</span>
          </h2>
          <p className="relative mt-4 max-w-lg text-white/90">{contact.text}</p>

          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <MagneticButton href={`mailto:${profile.email}`} className="btn bg-white text-violet-800 hover:bg-amber-100">
              <Icon d="M4 6h16v12H4zM4 7l8 6 8-6" /> <span className="break-all">{profile.email}</span>
            </MagneticButton>
            <MagneticButton href={`tel:${tel}`} className="btn border-2 border-white/70 text-white hover:bg-white/10">
              <Icon d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2" /> {profile.phone}
            </MagneticButton>
            <MagneticButton href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="btn border-2 border-white/70 text-white hover:bg-white/10">
              <Icon d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2zM4 2a2 2 0 1 1 0 4 2 2 0 0 1 0-4z" /> LinkedIn
              <span className="sr-only">(opens in a new tab)</span>
            </MagneticButton>
            {profile.resumeUrl && (
              <MagneticButton href={profile.resumeUrl} download className="btn border-2 border-white/70 text-white hover:bg-white/10">
                <Icon d="M12 3v12M7 10l5 5 5-5M5 21h14" /> Resume (PDF)
              </MagneticButton>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  )
}
