'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, User, Search, Palette, Users, PenTool, Mail, Phone, MapPin } from 'lucide-react'
import Link from 'next/link'
import { useSession, signIn, signOut } from 'next-auth/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

const artCategories = [
  { name: 'Abstract', image: 'https://source.unsplash.com/random/800x600?abstract' },
  { name: 'Portrait', image: 'https://source.unsplash.com/random/800x600?portrait' },
  { name: 'Landscape', image: 'https://source.unsplash.com/random/800x600?landscape' },
  { name: 'Still Life', image: 'https://source.unsplash.com/random/800x600?still-life' },
]

const featuredArtworks = [
  { id: 1, title: 'Sunset Dreams', artist: 'Jane Doe', image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80' },
  { id: 2, title: 'Urban Jungle', artist: 'John Smith', image: 'https://images.unsplash.com/photo-1514539079130-25950c84af65?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80' },
  { id: 3, title: 'Ethereal Whispers', artist: 'Emily Johnson', image: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80' },
]

export default function Home() {
  const { data: session, status } = useSession()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [currentSlide, setCurrentSlide] = useState(0)
  const router = useRouter()

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % featuredArtworks.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const handleSignOut = () => {
    signOut()
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-purple-900 text-white"
    >
      <header className="fixed top-0 left-0 right-0 z-50 bg-transparent">
        <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
          <Link href="/" className="text-2xl font-bold text-pink-500">BgdArt</Link>
          <div className="hidden md:flex space-x-6">
            <Link href="/" className="hover:text-pink-500 transition-colors">Home</Link>
            <Link href="/gallery" className="hover:text-pink-500 transition-colors">Art</Link>
            <Link href="/artists" className="hover:text-pink-500 transition-colors">Artists</Link>
            <Link href="/canvas" className="hover:text-pink-500 transition-colors">Canvas</Link>
            <Link href="/contact" className="hover:text-pink-500 transition-colors">Contact</Link>
            {status === 'authenticated' ? (
              <>
                <Link href="/profile" className="hover:text-pink-500 transition-colors">
                  <User className="inline-block mr-1" size={18} />
                  Profile
                </Link>
                <button onClick={handleSignOut} className="hover:text-pink-500 transition-colors">
                  Sign Out
                </button>
              </>
            ) : (
              <Link href="/auth/signin" className="hover:text-pink-500 transition-colors">
                <User className="inline-block mr-1" size={18} />
                Sign In
              </Link>
            )}
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-purple-900 z-40 md:hidden"
          >
            <div className="flex flex-col items-center justify-center h-full space-y-8">
              <Link href="/" className="text-2xl hover:text-pink-500 transition-colors">Home</Link>
              <Link href="/gallery" className="text-2xl hover:text-pink-500 transition-colors">Art</Link>
              <Link href="/artists" className="text-2xl hover:text-pink-500 transition-colors">Artists</Link>
              <Link href="/canvas" className="text-2xl hover:text-pink-500 transition-colors">Canvas</Link>
              <Link href="/contact" className="text-2xl hover:text-pink-500 transition-colors">Contact</Link>
              {status === 'authenticated' ? (
                <>
                  <Link href="/profile" className="text-2xl hover:text-pink-500 transition-colors">Profile</Link>
                  <button onClick={handleSignOut} className="text-2xl hover:text-pink-500 transition-colors">Sign Out</button>
                </>
              ) : (
                <Link href="/auth/signin" className="text-2xl hover:text-pink-500 transition-colors">Sign In</Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <main>
        <section className="hero relative h-screen overflow-hidden">
          <AnimatePresence initial={false}>
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 1, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={featuredArtworks[currentSlide].image}
                alt={featuredArtworks[currentSlide].title}
                layout="fill"
                objectFit="cover"
                priority
              />
              <div className="absolute inset-0 bg-black bg-opacity-50" />
            </motion.div>
          </AnimatePresence>
          <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl md:text-6xl font-bold mb-4 text-center"
            >
              Welcome to BgdArt
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl mb-8 text-center"
            >
              Discover, create, and share amazing digital art
            </motion.p>
            <motion.form 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
              onSubmit={handleSearch} 
              className="w-full max-w-md px-4"
            >
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for artworks or artists..."
                  className="w-full px-4 py-2 rounded-full bg-white bg-opacity-20 text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-pink-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <button type="submit" className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white hover:text-pink-500 transition-colors">
                  <Search size={24} />
                </button>
              </div>
            </motion.form>
          </div>
        </section>

        <section className="features py-16 bg-purple-800">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">What We Offer</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-center"
              >
                <Palette className="mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold mb-2">Diverse Art Styles</h3>
                <p>Explore a wide range of digital art styles and techniques</p>
              </motion.div>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="text-center"
              >
                <Users className="mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold mb-2">Artist Community</h3>
                <p>Connect with fellow artists, share ideas, and collaborate</p>
              </motion.div>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="text-center"
              >
                <PenTool className="mx-auto mb-4" size={48} />
                <h3 className="text-xl font-semibold mb-2">Create Your Art</h3>
                <p>Use our built-in canvas to bring your digital creations to life</p>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="featured-artworks py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8">Featured Artworks</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredArtworks.map((artwork, index) => (
                <motion.div
                  key={artwork.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-purple-800 rounded-lg overflow-hidden shadow-lg"
                >
                  <Image src={artwork.image} alt={artwork.title} width={400} height={300} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{artwork.title}</h3>
                    <p className="text-gray-300">by {artwork.artist}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="art-categories py-16 bg-purple-800">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8">Explore Art Categories</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {artCategories.map((category, index) => (
                <motion.div
                  key={category.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group cursor-pointer"
                >
                  <Image src={category.image} alt={category.name} width={200} height={200} className="w-full h-40 object-cover rounded-lg" />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-lg">
                    <p className="text-white text-xl font-semibold">{category.name}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="canvas-preview py-16">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8">Create Your Masterpiece</h2>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-purple-800 p-8 rounded-lg shadow-lg"
            >
              <div className="aspect-w-16 aspect-h-9 mb-4" style={{ height: '500px' }}>
                <iframe
                  src="/canvas-preview"
                  className="w-full h-full rounded-lg"
                  title="Canvas Preview"
                ></iframe>
              </div>
              <p className="text-xl mb-4">Experience our powerful digital canvas tool</p>
              <Link href="/canvas" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-3 rounded-full inline-block transition-colors">
                Open Full Canvas
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="contact py-16 bg-purple-900">
          <div className="container mx-auto px-6">
            <h2 className="text-3xl font-bold mb-8 text-center">Contact Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-purple-800 p-8 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-4">Get in Touch</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">Name</label>
                    <input type="text" id="name" name="name" className="w-full px-3 py-2 bg-purple-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    <input type="email" id="email" name="email" className="w-full px-3 py-2 bg-purple-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500" />
                  </div>
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-1">Message</label>
                    <textarea id="message" name="message" rows={4} className="w-full px-3 py-2 bg-purple-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"></textarea>
                  </div>
                  <button type="submit" className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-full transition-colors">Send Message</button>
                </form>
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-purple-800 p-8 rounded-lg shadow-lg"
              >
                <h3 className="text-2xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-4">
                  <div className="flex items-center">
                    <Mail className="mr-2" size={24} />
                    <p>support@bgdart.com</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="mr-2" size={24} />
                    <p>+1 (123) 456-7890</p>
                  </div>
                  <div className="flex items-center">
                    <MapPin className="mr-2" size={24} />
                    <p>123 Art Street, Creativity City, AC 12345</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
    </motion.div>
  )
}