'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'

type SearchResult = {
  id: number
  name: string
  type: 'artist' | 'artwork'
  image: string
}

export default function SearchPage() {
  const searchParams = useSearchParams()
  const query = searchParams.get('q')
  const [results, setResults] = useState<SearchResult[]>([])

  useEffect(() => {
    if (query) {
      fetch(`/api/search?q=${encodeURIComponent(query)}`)
        .then(res => res.json())
        .then(data => setResults(data))
    }
  }, [query])

  return (
    <div className="min-h-screen bg-purple-900 text-white p-8">
      <h1 className="text-3xl font-bold mb-6">Search Results for "{query}"</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {results.map(result => (
          <Link key={result.id} href={`/${result.type}s/${result.id}`}>
            <div className="bg-purple-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
              <Image src={result.image} alt={result.name} width={300} height={200} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{result.name}</h2>
                <p className="text-gray-300 capitalize">{result.type}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {results.length === 0 && (
        <p className="text-xl text-center mt-12">No results found for "{query}"</p>
      )}
    </div>
  )
}