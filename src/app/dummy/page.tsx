'use client'

import { motion } from 'framer-motion'

export default function Component() {
  return (
    <div className="h-screen w-screen bg-white flex items-center justify-center">
      <div className="relative w-48 h-48">
        {/* Circuit background effects */}
        <motion.div
          className="absolute inset-0 bg-emerald-100 rounded-full opacity-50"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0.2, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Cow logo SVG with animations */}
        <motion.svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          initial="hidden"
          animate="visible"
        >
          {/* Circuit dots that pulse */}
          {[25, 35, 45, 55, 65, 75].map((x, i) => (
            <motion.circle
              key={i}
              cx={x}
              cy="40"
              r="1"
              fill="rgb(16 185 129)"
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1.5, 0],
              }}
              transition={{
                duration: 2,
                delay: i * 0.2,
                repeat: Infinity,
              }}
            />
          ))}

          {/* Main cow outline */}
          <motion.path
            d="M25 40 L35 25 L65 25 L75 40 L75 60 L65 75 L35 75 L25 60 Z"
            stroke="rgb(16 185 129)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 2,
              ease: "easeInOut",
              repeat: Infinity,
            }}
          />

          {/* Horns */}
          <motion.path
            d="M35 25 L25 15 M65 25 L75 15"
            stroke="rgb(16 185 129)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 0.5,
            }}
          />

          {/* Ears */}
          <motion.path
            d="M25 40 L15 35 M75 40 L85 35"
            stroke="rgb(16 185 129)"
            strokeWidth="2"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1.5,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 1,
            }}
          />

          {/* Circuit lines */}
          <motion.path
            d="M35 40 L45 40 L55 40 L65 40"
            stroke="rgb(16 185 129)"
            strokeWidth="1"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{
              duration: 1,
              ease: "easeInOut",
              repeat: Infinity,
              delay: 1.5,
            }}
          />
        </motion.svg>

        {/* Loading text */}
        <motion.p
          className="absolute -bottom-12 italic left-1/2 -translate-x-1/2 text-emerald-600 font-medium"
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          Ruminating, standby...
        </motion.p>
      </div>
    </div>
  )
}