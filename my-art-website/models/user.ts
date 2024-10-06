import { ObjectId } from 'mongodb'

export interface User {
  _id: ObjectId
  name: string
  email: string
  password: string
  isArtist: boolean
  savedArtworks: ObjectId[]
}

export interface Artwork {
  _id: ObjectId
  title: string
  description: string
  type: string
  imageUrl: string
  artistId: ObjectId
  likes: number
  allowReviews: boolean
  reviews: Review[]
}

export interface Review {
  userId: ObjectId
  rating: number
  comment: string
}