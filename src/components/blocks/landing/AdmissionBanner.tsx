"use client"
import { motion } from "framer-motion"

export const AdmissionsBanner = () => {
  return (
    <div className="relative min-h-[70vh] w-full overflow-hidden shadow-xl pt-20">
      <motion.div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://res.cloudinary.com/dvvbxrs55/image/upload/v1741368302/IMG_E2801_tkldxd.jpg')",
        }}
        initial={{ scale: 1.2 }}
        animate={{ scale: 1 }}
        transition={{ duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-t from-blue-900/35 via-blue-800/30 to-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        />
        
        <motion.div
          className="absolute inset-0 bg-noise opacity-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          transition={{ duration: 1.5 }}
        />
      </motion.div>

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute left-[15%] top-[20%] h-40 w-40 rounded-full bg-cyan-400/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute right-[10%] top-[30%] h-32 w-32 rounded-full bg-blue-400/20 blur-3xl"
          animate={{
            scale: [1, 0.8, 1],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
      </div>

      {/* Content Container */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center px-4 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl space-y-6"
        >
          {/* Animated Heading with Gradient Text */}
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold tracking-tight text-white drop-shadow-2xl md:text-5xl lg:text-6xl"
          >
            <span className="bg-gradient-to-r from-cyan-400 to-green-300 bg-clip-text text-transparent">
            Admissions 2025-26            </span>
            <motion.span
              initial={{ x: -20 }}
              animate={{ x: 0 }}
              className="block text-2xl font-bold text-white md:text-5xl lg:text-3xl"
            >
              Now Open
            </motion.span>
          </motion.h1>

          {/* Animated Description Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mx-auto max-w-2xl text-lg text-blue-50/90 md:text-xl"
          >
            Begin your children journey towards excellence in a nurturing environment that fosters creativity and leadership
          </motion.p>


        </motion.div>
      </div>
    </div>
  )
}