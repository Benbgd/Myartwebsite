"use client"

import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Search } from 'lucide-react'

interface Artist {
  id: number
  name: string
  avatar: string
  artCount: number
}

export default function ArtistsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [artists, setArtists] = useState<Artist[]>([])

  useEffect(() => {
    // Fetch artists from your API
    const fetchArtists = async () => {
      // Replace this with your actual API call
      const response = await fetch('/api/artists')
      const data = await response.json()
      setArtists(data)
    }

    fetchArtists()
  }, [])

  const filteredArtists = artists.filter(artist =>
    artist.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-purple-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center">Discover Artists</h1>
        <div className="mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Search artists..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 bg-purple-800 text-white rounded-full focus:outline-none focus:ring-2 focus:ring-pink-500 pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredArtists.map(artist => (
            <motion.div
              key={artist.id}
              className="bg-purple-800 rounded-lg p-6 shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img src={artist.avatar} alt={artist.name} className="w-24 h-24 rounded-full mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-center mb-2">{artist.name}</h2>
              <p className="text-center text-gray-300">{artist.artCount} Artworks</p>
              <div className="mt-4 text-center">
                <Link href={`/artists/${artist.id}`} className="bg-pink-500 text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-pink-600 transition-colors">
                  View Profile
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}