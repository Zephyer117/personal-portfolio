'use client'

import { motion } from 'framer-motion'
import { Briefcase, Users, Calendar, ArrowRight } from 'lucide-react'
import { About as AboutType } from '@/sanity/types'
import { PortableText } from '@portabletext/react'
import { Button } from '@/components/ui/button'

interface AboutProps {
  data: AboutType | null
}

// Height of the fixed navbar, so the contact section doesn't land under it
const NAV_OFFSET = 80

export default function About({ data }: AboutProps) {
  if (!data) {
    return null
  }

  const scrollToContact = () => {
    const element = document.querySelector('#contact')
    if (!element) return
    const top = element.getBoundingClientRect().top + window.scrollY - NAV_OFFSET
    window.scrollTo({ top, behavior: 'smooth' })
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  }

  const stats = [
    {
      icon: Calendar,
      value: `${data.yearsOfExperience}+`,
      label: 'Years Experience',
    },
    {
      icon: Briefcase,
      value: `${data.projectsCompleted}+`,
      label: 'Projects Completed',
    },
    {
      icon: Users,
      value: `${data.happyClients}+`,
      label: 'Happy Clients',
    },
  ]

  return (
    <section id="about" className="py-32 bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden">
      {/* Enhanced Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-0 right-0 w-[900px] h-[900px] bg-gradient-to-br from-blue-200/40 via-slate-200/30 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[700px] h-[700px] bg-gradient-to-tr from-slate-200/30 via-blue-200/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            delay: 1,
          }}
        />

        {/* Floating Geometric Shapes */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-20 h-20 border-2 border-slate-200/30 rounded-lg rotate-45"
          animate={{
            rotate: [45, 90, 45],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-16 h-16 border-2 border-blue-200/30 rounded-full"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            delay: 0.5,
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-20" variants={itemVariants}>
            <motion.span
              className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-200/50 text-blue-700 rounded-full text-sm font-semibold tracking-wide mb-4 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              About Me
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent mb-6 section-heading"
              variants={itemVariants}
            >
              {data.title}
            </motion.h2>
            <motion.div
              className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left Column - Summary & Stats */}
            <motion.div className="space-y-10" variants={itemVariants}>
              <motion.p
                className="text-xl text-slate-800/70 leading-relaxed font-light"
                variants={itemVariants}
              >
                {data.summary}
              </motion.p>

              {/* Stats Grid */}
              <motion.div
                className="grid grid-cols-2 gap-5"
                variants={containerVariants}
              >
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="group bg-gradient-to-br from-white/80 to-slate-50/60 p-6 rounded-2xl border border-slate-100/60 shadow-lg shadow-slate-200/60 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 hover:border-slate-200/80"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05, y: -8 }}
                  >
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg">
                      <stat.icon className="w-6 h-6 text-white" />
                    </div>
                    <motion.div
                      className="text-3xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent"
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-slate-800/70 mt-2 font-medium group-hover:text-blue-700 transition-colors">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Column - Detailed Bio */}
            <motion.div
              className="bg-gradient-to-br from-white/90 via-slate-50/40 to-blue-50/30 p-8 rounded-3xl border border-slate-100/60 shadow-2xl shadow-slate-200/60 backdrop-blur-md hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-1"
              variants={itemVariants}
              whileHover={{ scale: 1.02 }}
            >
              {data.bio && (
                <div className="prose prose-lg text-slate-800/80 leading-relaxed">
                  <PortableText value={data.bio} />
                </div>
              )}
            </motion.div>
          </div>

          {/* CTA */}
          <motion.div
            className="mt-16 md:mt-20 flex justify-center"
            variants={itemVariants}
          >
            <Button
              size="lg"
              onClick={scrollToContact}
              className="group h-auto min-h-14 max-w-full gap-3 rounded-full px-6 py-4 sm:px-10 text-base sm:text-lg font-semibold text-white whitespace-normal sm:whitespace-nowrap bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-xl shadow-blue-900/25 hover:shadow-2xl hover:shadow-blue-900/35 ring-1 ring-white/20 transition-all duration-300 hover:scale-105"
            >
              Have a project in mind? Let&apos;s talk.
              <ArrowRight className="w-5 h-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1.5" />
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}