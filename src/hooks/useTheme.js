import { useCallback, useEffect, useState } from 'react'

// Dark/light theme persisted in localStorage. index.html applies it before first paint.
export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
    document.querySelector('meta[name="theme-color"]')?.setAttribute('content', dark ? '#0b0a1f' : '#faf8ff')
  }, [dark])

  const toggle = useCallback(() => {
    setDark((d) => {
      try { localStorage.setItem('theme', d ? 'light' : 'dark') } catch {}
      return !d
    })
  }, [])

  return { dark, toggle }
}
