import { useEffect, useRef, useState, type ReactNode } from 'react'
import { motion, useMotionValue, useScroll, useSpring, useTransform, type MotionValue } from 'motion/react'
import Lenis from 'lenis'
import { profile } from '../data/cv'

export let lenis: Lenis | null = null

export function useSmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    lenis = new Lenis({ lerp: 0.09, anchors: { offset: -56 } })
    let raf = 0
    const tick = (time: number) => {
      lenis?.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      lenis?.destroy()
      lenis = null
    }
  }, [])
}

export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return
    lenis?.stop()
    document.documentElement.style.overflow = 'hidden'
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && window.dispatchEvent(new Event('overlay:close'))
    window.addEventListener('keydown', onKey)
    return () => {
      lenis?.start()
      document.documentElement.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [locked])
}

export function useClock() {
  const fmt = () =>
    new Intl.DateTimeFormat('en-GB', { hour: '2-digit', minute: '2-digit', timeZone: profile.timezone }).format(new Date())
  const [time, setTime] = useState(fmt)
  useEffect(() => {
    const id = setInterval(() => setTime(fmt()), 10_000)
    return () => clearInterval(id)
  }, [])
  return time
}

export function Mark({ className = '' }: { className?: string }) {
  return <span className={`mark ${className}`}>nl</span>
}

export function Reveal({ children, delay = 0, className }: { children: ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-10% 0px' }}
      transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

export function SectionLabel({ index, children }: { index: string; children: ReactNode }) {
  return (
    <div className="section__label">
      <span className="mono muted">({index})</span>
      <span className="caps">{children}</span>
    </div>
  )
}

// Words light up one by one as the block scrolls through the viewport.
export function ScrollWords({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 85%', 'end 45%'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={className}>
      {words.map((word, i) => (
        <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]}>
          {word}
        </Word>
      ))}
    </p>
  )
}

function Word({ children, progress, range }: { children: string; progress: MotionValue<number>; range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return <motion.span style={{ opacity }}>{children}</motion.span>
}

export function Cursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 500, damping: 40 })
  const sy = useSpring(y, { stiffness: 500, damping: 40 })
  const [big, setBig] = useState(false)

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      setBig(!!(e.target as Element).closest?.('a, button'))
    }
    window.addEventListener('pointermove', move, { passive: true })
    return () => window.removeEventListener('pointermove', move)
  }, [x, y])

  return <motion.div className="cursor" style={{ x: sx, y: sy }} animate={{ scale: big ? 4.2 : 1 }} transition={{ duration: 0.3 }} />
}
