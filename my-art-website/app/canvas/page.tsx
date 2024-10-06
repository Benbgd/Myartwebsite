"use client"

import React, { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowLeft, Download, Eraser, PenTool, Upload, Square, Circle } from 'lucide-react'
import { useSession } from 'next-auth/react'
import PublishArtwork from '../../components/PublishArtwork'

export default function CanvasPage() {
  const { data: session } = useSession()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState('#FFFFFF')
  const [brushSize, setBrushSize] = useState(5)
  const [tool, setTool] = useState<'pen' | 'eraser' | 'square' | 'circle'>('pen')
  const [lastPoint, setLastPoint] = useState<{ x: number; y: number } | null>(null)
  const [isPublishModalOpen, setIsPublishModalOpen] = useState(false)
  const [artworkUrl, setArtworkUrl] = useState('')

  useEffect(() => {
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx) {
        ctx.fillStyle = '#4A1D96'
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }
    }
  }, [])

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current
    if (canvas) {
      const rect = canvas.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      setLastPoint({ x, y })
      setIsDrawing(true)
    }
  }

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      if (ctx && lastPoint) {
        const rect = canvas.getBoundingClientRect()
        const x = e.clientX - rect.left
        const y = e.clientY - rect.top

        ctx.beginPath()
        ctx.moveTo(lastPoint.x, lastPoint.y)

        if (tool === 'pen' || tool === 'eraser') {
          ctx.lineTo(x, y)
          ctx.strokeStyle = tool === 'eraser' ? '#4A1D96' : color
          ctx.lineWidth = brushSize
          ctx.lineCap = 'round'
          ctx.lineJoin = 'round'
          ctx.stroke()
        } else if (tool === 'square') {
          const width = x - lastPoint.x
          const height = y - lastPoint.y
          ctx.rect(lastPoint.x, lastPoint.y, width, height)
          ctx.strokeStyle = color
          ctx.lineWidth = brushSize
          ctx.stroke()
        } else if (tool === 'circle') {
          const radius = Math.sqrt(Math.pow(x - lastPoint.x, 2) + Math.pow(y - lastPoint.y, 2))
          ctx.arc(lastPoint.x, lastPoint.y, radius, 0, 2 * Math.PI)
          ctx.strokeStyle = color
          ctx.lineWidth = brushSize
          ctx.stroke()
        }

        setLastPoint({ x, y })
      }
    }
  }

  const stopDrawing = () => {
    setIsDrawing(false)
    setLastPoint(null)
  }

  const downloadCanvas = () => {
    const canvas = canvasRef.current
    if (canvas) {
      const image = canvas.toDataURL('image/png')
      const link = document.createElement('a')
      link.href = image
      link.download = 'my-artwork.png'
      link.click()
    }
  }

  const publishArt = () => {
    if (session) {
      const canvas = canvasRef.current
      if (canvas) {
        const image = canvas.toDataURL('image/png')
        setArtworkUrl(image)
        setIsPublishModalOpen(true)
      }
    } else {
      // Redirect to login page
      window.location.href = '/auth/signin'
    }
  }

  const handlePublish = (title: string, description: string, type: string, allowReviews: boolean) => {
    // Here you would typically send the artwork data to your backend
    console.log('Publishing artwork:', { title, description, type, allowReviews, artworkUrl })
    setIsPublishModalOpen(false)
    // Redirect to the newly published artwork page or show a success message
  }

  return (
    <div className="min-h-screen bg-purple-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <Link href="/" className="flex items-center text-pink-500 hover:text-pink-400 transition-colors">
            <ArrowLeft className="mr-2" />
            Back to Home
          </Link>
          <h1 className="text-4xl font-bold">Create Your Art</h1>
          <div className="flex space-x-4">
            <button
              onClick={downloadCanvas}
              className="flex items-center bg-pink-500 text-white px-4 py-2 rounded-full hover:bg-pink-600 transition-colors"
            >
              <Download className="mr-2" />
              Download
            </button>
            <button
              onClick={publishArt}
              className={`flex items-center ${session ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500'} text-white px-4 py-2 rounded-full transition-colors`}
              title={session ? 'Publish your artwork' : 'Login to publish your artwork'}
            >
              <Upload className="mr-2" />
              Publish
            </button>
          </div>
        </div>
        <div className="bg-purple-800 p-4 rounded-lg shadow-lg">
          <canvas
            ref={canvasRef}
            width={1024}
            height={576}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseOut={stopDrawing}
            className="w-full h-auto bg-purple-700 rounded cursor-crosshair"
          />
          <div className="mt-4 flex items-center justify-between flex-wrap">
            <div className="flex items-center space-x-4 mb-4">
              <button
                onClick={() => setTool('pen')}
                className={`p-2 rounded ${tool === 'pen' ? 'bg-pink-500' : 'bg-purple-700'}`}
              >
                <PenTool />
              </button>
              <button
                onClick={() => setTool('eraser')}
                className={`p-2 rounded ${tool === 'eraser' ? 'bg-pink-500' : 'bg-purple-700'}`}
              >
                <Eraser />
              </button>
              <button
                onClick={() => setTool('square')}
                className={`p-2 rounded ${tool === 'square' ? 'bg-pink-500' : 'bg-purple-700'}`}
              >
                <Square />
              </button>
              <button
                onClick={() => setTool('circle')}
                className={`p-2 rounded ${tool === 'circle' ? 'bg-pink-500' : 'bg-purple-700'}`}
              >
                <Circle />
              </button>
            </div>
            <div className="flex items-center space-x-4 mb-4">
              <input
                type="color"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                className="w-10 h-10 rounded"
              />
              <input
                type="range"
                min="1"
                max="50"
                value={brushSize}
                onChange={(e) => setBrushSize(parseInt(e.target.value))}
                className="w-32"
              />
            </div>
            <div className="flex items-center space-x-4">
              {['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'].map((presetColor) => (
                <button
                  key={presetColor}
                  onClick={() => setColor(presetColor)}
                  className="w-8 h-8 rounded-full"
                  style={{ backgroundColor: presetColor }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      <PublishArtwork
        isOpen={isPublishModalOpen}
        onClose={() => setIsPublishModalOpen(false)}
        onPublish={handlePublish}
        artworkUrl={artworkUrl}
      />
    </div>
  )
}