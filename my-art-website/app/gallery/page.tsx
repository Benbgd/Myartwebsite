"use client"

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import { Menu, X, Download } from 'lucide-react'

const images = [
  "https://fastly.picsum.photos/id/1078/1500/1000.jpg?grayscale&hmac=4BWBlqkScW5bntZ97Yu0EUIChSC8wF0UgI2vb3q_UZQ",
  "https://fastly.picsum.photos/id/838/1500/2200.jpg?grayscale&hmac=tzbirXw7cFs0XMpCISvDdR8fR15R4ZpAFoeXKc2gTd0",
  "https://unsplash.it/g/1500/1000?image=1077",
  "https://unsplash.it/g/1500/1200?image=345",
  "https://unsplash.it/g/1500/1000?image=1078",
  "https://unsplash.it/g/1500/1200?image=346",
]

interface Card {
  id: number
  image: string
  isFlipped: boolean
  isMatched: boolean
}

export default function Component() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [cursorText, setCursorText] = useState("")
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [matchedPairs, setMatchedPairs] = useState<number>(0)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [gameStats, setGameStats] = useState({ gamesPlayed: 0, bestScore: 0 })

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
      const sections = ['gallery', 'memory-game']
      
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
    initializeGame()
  }, [])

  const initializeGame = () => {
    const gameImages = [...images.slice(0, 6), ...images.slice(0, 6)]
    const shuffledImages = gameImages.sort(() => Math.random() - 0.5)
    const newCards = shuffledImages.map((image, index) => ({
      id: index,
      image,
      isFlipped: false,
      isMatched: false,
    }))
    setCards(newCards)
    setFlippedCards([])
    setMatchedPairs(0)
    setGameStats(prevStats => ({
      ...prevStats,
      gamesPlayed: prevStats.gamesPlayed + 1
    }))
  }

  const handleCardClick = (id: number) => {
    if (flippedCards.length === 2) return
    if (cards[id].isMatched) return

    const newCards = [...cards]
    newCards[id].isFlipped = true
    setCards(newCards)

    if (flippedCards.length === 1) {
      if (cards[flippedCards[0]].image === cards[id].image) {
        newCards[flippedCards[0]].isMatched = true
        newCards[id].isMatched = true
        setCards(newCards)
        setMatchedPairs(prevMatchedPairs => prevMatchedPairs + 1)
        setFlippedCards([])

        if (matchedPairs + 1 === 6) {
          // Game completed
          setGameStats(prevStats => ({
            ...prevStats,
            bestScore: Math.max(prevStats.bestScore, matchedPairs + 1)
          }))
        }
      } else {
        setFlippedCards([...flippedCards, id])
        setTimeout(() => {
          newCards[flippedCards[0]].isFlipped = false
          newCards[id].isFlipped = false
          setCards(newCards)
          setFlippedCards([])
        }, 1000)
      }
    } else {
      setFlippedCards([id])
    }
  }

  const handleDownload = (imageUrl: string) => {
    if (isLoggedIn) {
      // Implement download logic here
      console.log(`Downloading image: ${imageUrl}`)
    } else {
      alert('Please log in to download artworks.')
    }
  }

  return (
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

      <main className="pt-20">
        <section id="gallery" className="py-12">
          <div className="container mx-auto px-6">
            <motion.h1 
              className="text-5xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Art Gallery
            </motion.h1>
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {images.map((image, index) => (
                <motion.div
                  key={index}
                  className="relative overflow-hidden rounded-lg shadow-lg"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.3 }}
                >
                  <img src={image} alt={`Abstract Art ${index + 1}`} className="w-full h-64 object-cover" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <div className="text-center">
                      <h3 className="text-xl font-bold mb-2">Artwork {index + 1}</h3>
                      <a href={image} target="_blank" rel="noopener noreferrer" className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors mr-2">
                        View Artwork
                      </a>
                      <button onClick={() => handleDownload(image)} className="bg-purple-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-purple-600 transition-colors">
                        <Download className="inline-block mr-1" size={16} />
                        Download
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
            <div className="text-center mt-8">
              <Link href="/contact" className="bg-pink-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors inline-block">
                Request Custom Art
              </Link>
            </div>
          </div>
        </section>

        <section id="memory-game" className="py-12 bg-purple-800">
          <div className="container mx-auto px-6">
            <motion.h2 
              className="text-4xl font-bold mb-8 text-center"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Art Memory Game
            </motion.h2>
            <motion.div 
              className="grid grid-cols-3 md:grid-cols-4 gap-4 max-w-3xl mx-auto"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {cards.map((card) => (
                <motion.div
                  key={card.id}
                  className={`aspect-w-1 aspect-h-1 rounded-lg overflow-hidden cursor-pointer ${
                    card.isFlipped || card.isMatched ? '' : 'bg-purple-700'
                  }`}
                  onClick={() => handleCardClick(card.id)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence>
                    {(card.isFlipped || card.isMatched) && (
                      <motion.img
                        src={card.image}
                        alt="Card"
                        className="w-full h-full object-cover"
                        initial={{ opacity: 0, rotateY: 180 }}
                        animate={{ opacity: 1, rotateY: 0 }}
                        exit={{ opacity: 0, rotateY: 180 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </motion.div>
            <div className="text-center mt-8">
              <p className="text-xl mb-4">Matched Pairs: {matchedPairs} / 6</p>
              <button
                onClick={initializeGame}
                className="bg-pink-500 text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-pink-600 transition-colors"
              >
                Restart Game
              </button>
            </div>
            {isLoggedIn && (
              <div className="mt-8 text-center">
                <h3 className="text-2xl font-bold mb-4">Your Stats</h3>
                <p>Games Played: {gameStats.gamesPlayed}</p>
                <p>Best Score: {gameStats.bestScore}</p>
              </div>
            )}
          </div>
        </section>
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
  )
}