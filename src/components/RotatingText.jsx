import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

export default function RotatingText({ items, interval = 2400, className = '' }) {
  const [i, setI] = useState(0)
  const reduce = useReducedMotion()

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % items.length), reduce ? interval * 2 : interval)
    return () => clearInterval(t)
  }, [items.length, interval, reduce])

  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className}`}>
      {/* Screen readers get the full list once instead of a constantly changing word */}
      <span className="sr-only">{items.join(', ')}</span>
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={items[i]}
          aria-hidden="true"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="block whitespace-nowrap"
        >
          {items[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
