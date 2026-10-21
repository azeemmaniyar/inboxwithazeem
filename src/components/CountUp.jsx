import { useEffect, useRef, useState } from 'react'
import { animate, useInView, useReducedMotion } from 'framer-motion'

const fmt = (n, decimals) =>
  n.toLocaleString('en-US', { minimumFractionDigits: decimals, maximumFractionDigits: decimals })

export default function CountUp({ value, decimals = 0, suffix = '', duration = 1.8 }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })
  const reduce = useReducedMotion()
  const [n, setN] = useState(reduce ? value : 0)

  useEffect(() => {
    if (!inView || reduce) return setN(value)
    const controls = animate(0, value, { duration, ease: 'easeOut', onUpdate: setN })
    return () => controls.stop()
  }, [inView, value, duration, reduce])

  return (
    <span ref={ref} className="tabular-nums">
      {fmt(n, decimals)}
      {suffix}
    </span>
  )
}
