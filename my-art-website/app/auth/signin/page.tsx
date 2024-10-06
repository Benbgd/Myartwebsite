'use client'

import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'

export default function SignIn() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically validate the email and password
    // and then call your authentication API
    // For this example, we'll just use NextAuth's signIn method
    const result = await signIn('credentials', {
      redirect: false,
      email,
      password,
    })

    if (result?.error) {
      // Handle error
      console.error(result.error)
    } else {
      // Redirect to home page
      router.push('/')
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-purple-900 flex items-center justify-center"
    >
      <div className="bg-purple-800 p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">Sign In</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 py-2 bg-purple-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 py-2 bg-purple-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-md transition-colors"
          >
            Sign In
          </button>
        </form>
        <div className="mt-4">
          <button
            onClick={() => signIn('google')}
            className="w-full bg-white text-gray-900 py-2 rounded-md hover:bg-gray-100 transition-colors mb-2"
          >
            Sign in with Google
          </button>
          <button
            onClick={() => signIn('facebook')}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            Sign in with Facebook
          </button>
        </div>
        <p className="mt-4 text-center text-gray-300">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="text-pink-500 hover:text-pink-400">
            Sign up
          </Link>
        </p>
      </div>
    </motion.div>
  )
}