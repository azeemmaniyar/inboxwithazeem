import Background from './components/Background.jsx'
import Navbar from './components/Navbar.jsx'
import ScrollProgress from './components/ScrollProgress.jsx'
import Hero from './sections/Hero.jsx'
import Skills from './sections/Skills.jsx'
import Experience from './sections/Experience.jsx'
import Projects from './sections/Projects.jsx'
import Credentials from './sections/Credentials.jsx'
import Contact from './sections/Contact.jsx'
import Footer from './sections/Footer.jsx'
import { useTheme } from './hooks/useTheme.js'

export default function App() {
  const { dark, toggle } = useTheme()
  return (
    <>
      <a href="#main" className="sr-only-focusable fixed left-4 top-4 z-[70] rounded-full bg-fg px-4 py-2 text-bg">Skip to content</a>
      <ScrollProgress />
      <Background />
      <Navbar dark={dark} onToggleTheme={toggle} />
      <main id="main">
        <Hero dark={dark} />
        <Skills />
        <Experience />
        <Projects />
        <Credentials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
