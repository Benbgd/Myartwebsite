'use client'

import { Providers } from './providers'
import { motion, AnimatePresence } from 'framer-motion'
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AnimatePresence mode="wait">
            <motion.div
              key={Math.random()} // This ensures a new animation on each page change
              initial={{ opacity: 0, x: -200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              transition={{ duration: 0.5 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </Providers>
      </body>
    </html>
  )
}