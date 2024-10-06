"use client"

import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion, useAnimation } from 'framer-motion'
import Link from 'next/link'
import { Menu, X } from 'lucide-react'
import { Parallax, ParallaxProvider } from 'react-scroll-parallax'

export default function AboutPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cursorText, setCursorText] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const controls = useAnimation()

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY
      const windowHeight = window.innerHeight
      const sections = ['about']
      
      sections.forEach(section => {
        const element = document.getElementById(section)
        if (element) {
          const { top, bottom } = element.getBoundingClientRect()
          if (top <= windowHeight / 2 && bottom >= windowHeight / 2) {
            setCursorText(section)
          }
        }
      })
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    controls.start(i => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1 }
    }))
  }, [controls])

  const floatingTextVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: i => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        yoyo: Infinity,
        repeatDelay: 2
      }
    })
  }

  return (
    <ParallaxProvider>
      <div className="min-h-screen bg-purple-900 text-white">
        <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
          <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
            <Link href="/" className="text-3xl font-bold text-pink-500">BgdArt</Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/" className="hover:text-pink-500 transition-colors">Home</Link>
              <Link href="/about" className="hover:text-pink-500 transition-colors">About</Link>
              <Link href="/gallery" className="hover:text-pink-500 transition-colors">Art</Link>
              <Link href="/contact" className="hover:text-pink-500 transition-colors">Contact</Link>
            </div>
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </nav>
        </header>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween" }}
              className="fixed inset-y-0 right-0 w-64 bg-purple-800 z-50 md:hidden"
            >
              <div className="flex flex-col items-center justify-center h-full space-y-8">
                <Link href="/" className="text-2xl hover:text-pink-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
                <Link href="/about" className="text-2xl hover:text-pink-500 transition-colors" onClick={() => setIsMenuOpen(false)}>About</Link>
                <Link href="/gallery" className="text-2xl hover:text-pink-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Art</Link>
                <Link href="/contact" className="text-2xl hover:text-pink-500 transition-colors" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <main id="about" className="pt-20">
          <Parallax y={[-20, 20]} tagOuter="div">
            <div className="container mx-auto px-6 py-12">
              <motion.h1 
                className="text-5xl font-bold mb-8 text-center"
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                About BgdArt
              </motion.h1>
              <div className="max-w-4xl mx-auto">
                <motion.p 
                  className="text-lg mb-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Welcome to BgdArt, where creativity knows no bounds. We are a collective of passionate artists dedicated to pushing the boundaries of abstract art. Our journey began in the vibrant streets of Belgrade, where the rich tapestry of culture and history inspired us to express the inexpressible through color and form.
                </motion.p>
                <motion.p 
                  className="text-lg mb-6"
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                >
                  Each piece we create is a unique exploration of emotion, thought, and experience. We believe that abstract art has the power to transcend language and cultural barriers, speaking directly to the soul of the viewer. Our work is not just about creating beautiful images, but about provoking thought, stirring emotions, and inspiring new perspectives.
                </motion.p>
              </div>
            </div>
          </Parallax>

          <Parallax y={[-30, 30]} tagOuter="div">
            <div className="bg-purple-800 py-12">
              <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold mb-8 text-center">Our Values</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {['Creativity', 'Innovation', 'Passion'].map((value, index) => (
                    <motion.div
                      key={value}
                      custom={index}
                      variants={floatingTextVariants}
                      initial="hidden"
                      animate="visible"
                      className="bg-purple-700 p-6 rounded-lg text-center"
                    >
                      <h3 className="text-2xl font-bold mb-4">{value}</h3>
                      <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </Parallax>

          <Parallax y={[-40, 40]} tagOuter="div">
            <div className="container mx-auto px-6 py-12">
              <h2 className="text-3xl font-bold mb-8 text-center">Our Team</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {['John Doe', 'Jane Smith', 'Mike Johnson'].map((member, index) => (
                  <motion.div
                    key={member}
                    custom={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={controls}
                    className="bg-purple-700 p-6 rounded-lg text-center"
                  >
                    <div className="w-32 h-32 rounded-full bg-purple-500 mx-auto mb-4"></div>
                    <h3 className="text-2xl font-bold mb-2">{member}</h3>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </Parallax>
        </main>

        <footer className="bg-purple-900 py-8">
          <div className="container mx-auto px-6 text-center">
            <p>&copy; 2024 BgdArt. All rights reserved.</p>
          </div>
        </footer>

        <motion.div
          className="fixed pointer-events-none z-50 flex items-center justify-center"
          style={{
            left: mousePosition.x,
            top: mousePosition.y,
            width: cursorText ? "100px" : "20px",
            height: cursorText ? "100px" : "20px",
          }}
          animate={{
            scale: cursorText ? 1 : 0.5,
            opacity: cursorText ? 1 : 0.5,
          }}
          transition={{ duration: 0.2 }}
        >
          <div className="bg-pink-500 rounded-full w-full h-full flex items-center justify-center">
            {cursorText && (
              <span className="text-white text-sm font-medium">{cursorText}</span>
            )}
          </div>
        </motion.div>
      </div>
    </ParallaxProvider>
  )
}