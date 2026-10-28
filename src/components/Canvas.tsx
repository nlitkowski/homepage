import { useEffect, useRef } from 'react'

export type Draw = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number, pointer: { x: number; y: number }) => void

const reducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches

// Sizes to its parent, runs `draw` every frame only while visible, and renders one still frame under reduced motion.
export function Canvas({ draw, className }: { draw: Draw; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const drawRef = useRef(draw)
  drawRef.current = draw

  useEffect(() => {
    const canvas = ref.current!
    const ctx = canvas.getContext('2d')!
    let w = 0
    let h = 0
    let raf = 0
    let visible = false
    const pointer = { x: 0.5, y: 0.5 }
    const start = performance.now()

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      if (reducedMotion()) frame(start + 4000)
    }

    const frame = (now: number) => {
      ctx.clearRect(0, 0, w, h)
      drawRef.current(ctx, w, h, (now - start) / 1000, pointer)
    }

    const loop = (now: number) => {
      frame(now)
      if (visible) raf = requestAnimationFrame(loop)
    }

    const onMove = (e: PointerEvent) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = (e.clientX - r.left) / r.width
      pointer.y = (e.clientY - r.top) / r.height
    }

    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && !reducedMotion()
      cancelAnimationFrame(raf)
      if (visible) raf = requestAnimationFrame(loop)
    })
    io.observe(canvas)
    window.addEventListener('pointermove', onMove, { passive: true })
    resize()

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return <canvas ref={ref} className={className} aria-hidden="true" />
}
