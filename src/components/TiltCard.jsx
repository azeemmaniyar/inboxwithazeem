import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion'
import { useFinePointer } from '../hooks/useFinePointer.js'

// 3D tilt with a moving glare highlight. Falls back to a flat card on touch or reduced motion.
export default function TiltCard({ children, className = '', style, max = 10 }) {
  const fine = useFinePointer()
  const reduce = useReducedMotion()
  const enabled = fine && !reduce

  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const spring = { stiffness: 220, damping: 20 }
  const rotateX = useSpring(useTransform(py, [0, 1], [max, -max]), spring)
  const rotateY = useSpring(useTransform(px, [0, 1], [-max, max]), spring)
  const gx = useTransform(px, (v) => `${v * 100}%`)
  const gy = useTransform(py, (v) => `${v * 100}%`)
  const glare = useMotionTemplate`radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,.35), transparent 55%)`
  const glareOpacity = useMotionValue(0)

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect()
    px.set((e.clientX - r.left) / r.width)
    py.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    px.set(0.5)
    py.set(0.5)
    glareOpacity.set(0)
  }

  if (!enabled) {
    return <div className={`relative ${className}`} style={style}>{children}</div>
  }

  return (
    <div style={{ perspective: 900 }} className="h-full">
      <motion.div
        className={`relative h-full ${className}`}
        style={{ ...style, rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onPointerMove={onMove}
        onPointerEnter={() => glareOpacity.set(1)}
        onPointerLeave={onLeave}
      >
        {children}
        <motion.div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] mix-blend-overlay transition-opacity duration-300"
          style={{ background: glare, opacity: glareOpacity }}
        />
      </motion.div>
    </div>
  )
}
