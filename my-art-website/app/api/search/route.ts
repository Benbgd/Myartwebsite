import { NextResponse } from 'next/server'
import db from '@/lib/db'

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url)
  const query = searchParams.get('q')

  if (!query) {
    return NextResponse.json({ message: 'Query parameter is required' }, { status: 400 })
  }

  try {
    const artists = db.prepare('SELECT id, name, "artist" as type, image FROM artists WHERE name LIKE ?').all(`%${query}%`)
    const artworks = db.prepare('SELECT id, title as name, "artwork" as type, image FROM artworks WHERE title LIKE ?').all(`%${query}%`)

    const results = [...artists, ...artworks]
    return NextResponse.json(results)
  } catch (error) {
    console.error('Search error:', error)
    return NextResponse.json({ message: 'An error occurred during search' }, { status: 500 })
  }
}