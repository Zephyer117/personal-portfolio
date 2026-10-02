'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Hero as HeroType } from '@/sanity/types'
import { urlFor } from '@/sanity/client'
import { useState, useEffect } from 'react'

interface HeroProps {
  data: HeroType | null
}

const socialButtonClass =
  'rounded-full hover:bg-gradient-to-br hover:from-blue-600 hover:to-blue-700 hover:text-white hover:border-blue-600 transition-all duration-300 shadow-lg hover:shadow-xl'

export default function Hero({ data }: HeroProps) {
  if (!data) {
    return null
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  // Reduced particles for better performance (from 20 to 8)
  const particles = Array.from({ length: 8 }, (_, i) => ({
    id: i,
    left: (i * 12.5) % 100,
    top: (i * 12.5) % 100,
    delay: i * 0.3,
    duration: 8 + (i % 3) * 2,
  }))

  // Only render particles on client to avoid hydration mismatch
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-blue-50 via-slate-50 to-blue-100 perspective-2000">
      {/* Animated Background Elements - Enhanced 3D effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-1/4 -left-20 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/15 via-blue-300/10 to-slate-200/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
            rotate: [0, 90, 0],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-[500px] h-[500px] bg-gradient-to-br from-blue-300/15 via-slate-300/10 to-blue-200/8 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.25, 0.4, 0.25],
            rotate: [0, -90, 0],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 18, repeat: Infinity, delay: 1, ease: "easeInOut" }}
        />

        {/* Subtle Grid Pattern with 3D effect */}
        <motion.div
          className="absolute inset-0 bg-[linear-gradient(rgba(100,116,139,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(100,116,139,0.03)_1px,transparent_1px)] bg-[size:60px_60px]"
          animate={{
            backgroundPosition: ['0px 0px', '60px 60px', '0px 0px'],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear"
          }}
        />

        {/* Floating Particles with enhanced 3D movement */}
        {mounted &&
          particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute w-2 h-2 bg-gradient-to-br from-blue-400/30 to-blue-500/30 rounded-full"
              style={{
                left: `${particle.left}%`,
                top: `${particle.top}%`,
              }}
              animate={{
                y: [0, -100, 0],
                x: [0, (particle.id % 3) * 12 - 18, 0],
                z: [0, 20, 0],
                opacity: [0, 0.8, 0],
                scale: [0, 1, 0],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: particle.duration,
                repeat: Infinity,
                delay: particle.delay,
                ease: "easeInOut"
              }}
            />
          ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 pt-28 pb-24 relative z-10 max-w-7xl">
        <motion.div
          className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Column - Text Content */}
          <motion.div
            className="space-y-6 md:space-y-8 min-w-0"
            variants={containerVariants}
          >
            <motion.div variants={itemVariants}>
              <motion.span
                className="inline-flex items-center gap-4 px-6 py-3 max-w-full
                  bg-gradient-to-r from-blue-500/10 to-blue-600/10
                  border border-blue-200/50 text-blue-700 rounded-full
                  text-sm font-semibold tracking-wide backdrop-blur-sm shadow-lg"
                initial={{ opacity: 0, x: -30, y: 10 }}
                animate={{ 
                  opacity: 1, 
                  x: 0, 
                  y: [0, -5, 0],
                }}
                transition={{ delay: 0.3 }}
                whileHover={{ 
                  scale: 1.05,
                  y: -8,
                  boxShadow: "0 15px 30px rgba(37, 99, 235, 0.2)"
                }}
              >
                <span className="relative flex h-3 w-3 shrink-0 mr-1">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-blue-500" />
                </span>
                <span className="leading-snug">{data.headline}</span>
              </motion.span>
            </motion.div>

            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent leading-[1.1] tracking-tight pb-1 text-shadow-soft"
              variants={itemVariants}
              animate={{
                y: [0, -8, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              whileHover={{
                scale: 1.02,
                textShadow: "0 0 20px rgba(37, 99, 235, 0.3)"
              }}
            >
              {data.name}
            </motion.h1>

            <motion.p
              className="text-xl sm:text-2xl bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent font-semibold tracking-wide leading-snug pb-1 text-shadow-glow"
              variants={itemVariants}
              animate={{
                y: [0, -6, 0],
              }}
              transition={{
                duration: 3.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2
              }}
              whileHover={{
                scale: 1.01
              }}
            >
              {data.tagline}
            </motion.p>

            <motion.p
              className="text-base md:text-lg text-slate-800 max-w-xl leading-relaxed font-medium text-shadow-elevated"
              variants={itemVariants}
              animate={{
                y: [0, -4, 0],
              }}
              transition={{
                duration: 4.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.4
              }}
            >
              {data.description}
            </motion.p>

            <motion.div
              className="flex flex-wrap gap-4"
              variants={itemVariants}
            >
              <a
                href="#portfolio"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-semibold rounded-lg shadow-xl shadow-blue-900/20 hover:shadow-2xl hover:shadow-blue-900/30 transition-all duration-300 whitespace-nowrap hover:scale-105 hover:-translate-y-1 cursor-pointer"
              >
                View Projects
                <ArrowRight className="w-5 h-5 shrink-0" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 border-2 border-blue-300 hover:border-blue-600 hover:bg-gradient-to-r hover:from-blue-600 hover:to-blue-700 hover:text-white bg-white/70 backdrop-blur-sm text-slate-700 font-semibold rounded-lg transition-all duration-300 whitespace-nowrap hover:scale-105 hover:-translate-y-1 cursor-pointer"
              >
                Contact Me
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div 
              className="flex gap-3 pt-2 md:pt-4" 
              variants={itemVariants}
              style={{ transform: "translateZ(15px)" }}
            >
              <a href="https://linkedin.com/in/ms-utsho" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                <motion.div
                  whileHover={{ 
                    scale: 1.15,
                    rotate: 360,
                    y: -10
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Button size="icon" variant="outline" className={socialButtonClass}>
                    <span className="w-5 h-5 flex items-center justify-center font-bold">in</span>
                  </Button>
                </motion.div>
              </a>
              <a href="https://github.com/Zephyer117" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                <motion.div
                  whileHover={{ 
                    scale: 1.15,
                    rotate: 360,
                    y: -10
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Button size="icon" variant="outline" className={socialButtonClass}>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                  </Button>
                </motion.div>
              </a>
              <a href="mailto:msutsho55@gmail.com" aria-label="Email">
                <motion.div
                  whileHover={{ 
                    scale: 1.15,
                    rotate: 360,
                    y: -10
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Button size="icon" variant="outline" className={socialButtonClass}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </Button>
                </motion.div>
              </a>
            </motion.div>
          </motion.div>

          {/* Right Column - Profile Image */}
          <motion.div
            className="relative flex justify-center lg:justify-end"
            variants={itemVariants}
          >
            <motion.div
              className="relative w-full max-w-[280px] sm:max-w-sm lg:max-w-md xl:max-w-[480px] aspect-square"
              initial={{ scale: 0.9, opacity: 0, rotateY: 15 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
                rotateY: 0,
                y: [0, -15, 0],
                rotateX: [0, 3, 0],
              }}
              transition={{ 
                duration: 0.8, 
                delay: 0.4,
                y: {
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut"
                },
                rotateX: {
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }
              }}
              whileHover={{
                scale: 1.05,
                rotateX: 10,
                rotateY: -10,
                boxShadow: "0 40px 80px rgba(0, 0, 0, 0.3)"
              }}
            >
              {/* Glassmorphism Background */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-white/80 to-slate-50/60 backdrop-blur-xl rounded-3xl border border-slate-200/60 shadow-2xl"
                style={{ transform: "translateZ(-10px)" }}
              />

              {/* Decorative Glow with enhanced animation */}
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-blue-500/15 to-slate-400/10 rounded-3xl blur-xl"
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                  opacity: [0.5, 0.8, 0.5]
                }}
                transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              />

              {data.profileImage?.asset ? (
                <motion.div
                  className="relative w-full h-full"
                  style={{ transform: "translateZ(20px)" }}
                  whileHover={{ scale: 1.02 }}
                >
                  <Image
                    src={urlFor(data.profileImage).url()}
                    alt={data.name}
                    fill
                    sizes="(max-width: 640px) 280px, (max-width: 1024px) 384px, 480px"
                    className="object-cover rounded-3xl relative z-10"
                    priority
                    quality={90}
                  />
                </motion.div>
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-slate-100 to-blue-100 rounded-3xl flex items-center justify-center relative z-10" style={{ transform: "translateZ(20px)" }}>
                  <span className="text-slate-400 text-lg font-medium">Profile Image</span>
                </div>
              )}

              {/* Floating Badge with enhanced 3D effect */}
              <motion.div
                className="absolute -bottom-5 right-4 sm:-right-3 lg:-right-4 bg-gradient-to-br from-blue-600 to-blue-700 text-white px-5 py-2.5 rounded-2xl shadow-2xl z-30 whitespace-nowrap"
                initial={{ opacity: 0, y: 20, rotateX: -20 }}
                animate={{
                  opacity: 1,
                  y: [0, -8, 0],
                  rotateX: 0,
                }}
                transition={{
                  delay: 0.8,
                  duration: 0.5,
                  y: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }
                }}
                whileHover={{
                  scale: 1.1,
                  rotateX: 10,
                  rotateY: -10,
                  boxShadow: "0 20px 40px rgba(37, 99, 235, 0.4)"
                }}
                style={{ transformStyle: "preserve-3d" }}
              >
                <div className="flex items-center gap-2.5">
                  <motion.div
                    className="w-2 h-2 bg-green-400 rounded-full"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                  <div className="text-sm font-semibold">Available for Work</div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator (desktop only, it overlapped the image and badge on smaller screens) */}
      <motion.div
        className="hidden lg:block absolute bottom-6 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        <div className="w-7 h-12 border-2 border-slate-400/50 rounded-full flex justify-center pt-3 backdrop-blur-sm bg-white/20">
          <motion.div
            className="w-1.5 h-3 bg-gradient-to-b from-slate-600 to-slate-400 rounded-full"
            animate={{ y: [0, 16, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </motion.div>
    </section>
  )
}