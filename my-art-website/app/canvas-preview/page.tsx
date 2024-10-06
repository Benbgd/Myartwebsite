'use client'

import { useEffect, useRef } from 'react'

export default function CanvasPreview() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Simple animation for the preview
    let hue = 0
    const animate = () => {
      ctx.fillStyle = `hsl(${hue}, 100%, 50%)`
      ctx.fillRect(Math.random() * canvas.width, Math.random() * canvas.height, 5, 5)
      hue = (hue + 1) % 360
      requestAnimationFrame(animate)
    }

    animate()
  }, [])

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={300}
      className="w-full h-full rounded-lg"
    />
  )
}