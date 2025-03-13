"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion } from "framer-motion"

export default function LoadingScreen() {
  const [progress, setProgress] = useState(0)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 4
      })
    }, 200)

    return () => clearInterval(interval)
  }, [])

  // Don't render animations until client-side
  if (!isMounted) {
    return (
      <div className="fixed inset-0 bg-[#0f172a] flex flex-col items-center justify-center z-50">
        <div className="text-center">
          <div className="relative w-40 h-40 mx-auto mb-8">
            <div className="absolute inset-0">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/personalogo.jpg-GdsYkYNMf4zntjjLwNSjCeX2jMSltt.jpeg"
                alt="Persona Logo"
                width={160}
                height={160}
                className="rounded-full"
              />
            </div>
          </div>
          <h1 className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text">
            The Personality Grooming Club
          </h1>
          <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden mt-6">
            <div className="h-full bg-gradient-to-r from-indigo-600 to-purple-600" style={{ width: "0%" }} />
          </div>
          <p className="text-white/70 mt-3">Loading experience... 0%</p>
        </div>
      </div>
    )
  }

  return (
    <div className="fixed inset-0 bg-[#0f172a] flex flex-col items-center justify-center z-50">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="relative w-40 h-40 mx-auto mb-8">
          <motion.div
            animate={{
              rotate: 360,
              scale: [1, 1.05, 1],
            }}
            transition={{
              rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
              scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
            }}
            className="absolute inset-0"
          >
          </motion.div>
        </div>

        <motion.h1
          className="text-3xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-indigo-400 text-transparent bg-clip-text"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        >
          The Personality Grooming Club
        </motion.h1>

        <div className="w-100 h-2 bg-gray-800 rounded-full overflow-hidden mt-6">
          <motion.div
            className="h-full bg-gradient-to-r from-indigo-600 to-purple-600"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.2 }}
          />
        </div>

        <p className="text-white/70 mt-3">Loading experience... {progress}%</p>
      </motion.div>
    </div>
  )
}

