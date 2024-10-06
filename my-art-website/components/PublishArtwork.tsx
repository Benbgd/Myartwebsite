import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { X } from 'lucide-react'

interface PublishArtworkProps {
  isOpen: boolean
  onClose: () => void
  onPublish: (title: string, description: string, type: string, allowReviews: boolean) => void
  artworkUrl: string
}

export default function PublishArtwork({ isOpen, onClose, onPublish, artworkUrl }: PublishArtworkProps) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [type, setType] = useState('')
  const [allowReviews, setAllowReviews] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onPublish(title, description, type, allowReviews)
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-purple-800 p-8 rounded-lg shadow-lg w-full max-w-2xl"
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Publish Artwork</h2>
          <button onClick={onClose} className="text-white hover:text-pink-500 transition-colors">
            <X size={24} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <img src={artworkUrl} alt="Your Artwork" className="w-full h-auto rounded-lg" />
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-white mb-1">
                Title
              </label>
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full px-3 py-2 bg-purple-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-white mb-1">
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full px-3 py-2 bg-purple-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                rows={4}
                required
              />
            </div>
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-white mb-1">
                Type
              </label>
              <select
                id="type"
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="w-full px-3 py-2 bg-purple-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
                required
              >
                <option value="">Select a type</option>
                <option value="abstract">Abstract</option>
                <option value="graphic">Graphic</option>
                <option value="portrait">Portrait</option>
                <option value="landscape">Landscape</option>
              </select>
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="allowReviews"
                checked={allowReviews}
                onChange={(e) => setAllowReviews(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="allowReviews" className="text-sm font-medium text-white">
                Allow reviews and feedback from other users
              </label>
            </div>
            <button
              type="submit"
              className="w-full bg-pink-500 text-white py-2 rounded-md hover:bg-pink-600 transition-colors"
            >
              Publish Artwork
            </button>
          </form>
        </div>
      </motion.div>
    </motion.div>
  )
}