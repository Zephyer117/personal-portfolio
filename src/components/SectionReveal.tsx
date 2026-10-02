'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

interface SectionRevealProps {
  children: React.ReactNode
  className?: string
}

export default function SectionReveal({ children, className = '' }: SectionRevealProps) {
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-50px'
      }
    )

    const currentRef = ref.current
    if (currentRef) {
      observer.observe(currentRef)
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef)
      }
    }
  }, [])

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 60, rotateX: 10 }}
      animate={isVisible ? { opacity: 1, y: 0, rotateX: 0 } : { opacity: 0, y: 60, rotateX: 10 }}
      transition={{
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1]
      }}
    >
      {children}
    </motion.div>
  )
}
