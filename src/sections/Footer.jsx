import { profile } from '../data/content.js'

export default function Footer() {
  return (
    <footer className="container-x flex flex-col items-center justify-between gap-3 border-t border-line/70 py-8 text-sm text-muted sm:flex-row">
      <p>© {new Date().getFullYear()} {profile.name} · {profile.location}</p>
      <div className="flex gap-4">
        <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-fg">LinkedIn</a>
        <a href={profile.github} target="_blank" rel="noopener noreferrer" className="hover:text-fg">GitHub</a>
        <a href="#top" className="hover:text-fg">Back to top ↑</a>
      </div>
    </footer>
  )
}
