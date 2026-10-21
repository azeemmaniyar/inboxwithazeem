import Reveal from './Reveal.jsx'

export default function SectionHeading({ id, eyebrow, title, sub }) {
  return (
    <Reveal className="mb-8 sm:mb-10">
      <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-pink-700 dark:text-pink-300">{eyebrow}</p>
      <h2 id={id} className="text-3xl font-extrabold leading-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mt-3 max-w-xl text-muted">{sub}</p>}
    </Reveal>
  )
}
