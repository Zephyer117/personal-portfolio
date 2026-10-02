'use client'

import { motion } from 'framer-motion'
import { Experience as ExperienceType } from '@/sanity/types'
import { 
  Briefcase, 
  GraduationCap, 
  Award,
  MapPin,
  Calendar,
  ChevronRight
} from 'lucide-react'
import { PortableText } from '@portabletext/react'

interface ExperienceProps {
  data: ExperienceType[]
}

const typeIcons: Record<string, any> = {
  work: Briefcase,
  education: GraduationCap,
  certification: Award,
}

const typeLabels: Record<string, string> = {
  work: 'Work Experience',
  education: 'Education',
  certification: 'Certifications',
}

const typeColors: Record<string, string> = {
  work: 'from-blue-500 to-blue-600',
  education: 'from-blue-600 to-blue-700',
  certification: 'from-blue-700 to-blue-800',
}

export default function Experience({ data }: ExperienceProps) {
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
    hidden: { x: -50, opacity: 0, rotateY: -15, scale: 0.95 },
    visible: {
      x: 0,
      opacity: 1,
      rotateY: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring" as const,
        stiffness: 70,
      },
    },
  }

  // Group experiences by type
  const groupedExperience = data.reduce((acc, exp) => {
    if (!acc[exp.type]) {
      acc[exp.type] = []
    }
    acc[exp.type].push(exp)
    return acc
  }, {} as Record<string, ExperienceType[]>)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
    })
  }

  return (
    <section id="experience" className="py-32 bg-gradient-to-b from-slate-100 via-blue-50 to-slate-100 relative overflow-hidden perspective-1000">
      {/* 3D Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-400/25 via-purple-400/15 to-slate-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 90, 0],
            x: [0, -60, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-400/20 via-blue-400/15 to-slate-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, -90, 0],
            x: [0, 50, 0],
            y: [0, -35, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            delay: 1,
            ease: "easeInOut"
          }}
        />
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-1/3 left-1/5 w-16 h-16 border-2 border-blue-300/20 rounded-lg"
          animate={{
            rotate: [0, 45, 90, 135, 180, 0],
            scale: [1, 1.2, 1],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/5 w-12 h-12 border-2 border-purple-300/20 rounded-full"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            delay: 0.5,
            ease: "easeInOut"
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
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.span
              className="inline-block px-4 py-2 bg-gradient-to-r from-blue-500/10 to-blue-600/10 border border-blue-200/50 text-blue-700 rounded-full text-sm font-semibold tracking-wide mb-4 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              Experience
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent mb-6 section-heading"
              variants={itemVariants}
            >
              Experience & Education
            </motion.h2>
            <motion.p
              className="text-xl text-slate-800/70 max-w-2xl mx-auto font-light"
              variants={itemVariants}
            >
              My professional journey, educational background, and certifications
            </motion.p>
            <motion.div
              className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto mt-6 rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </motion.div>

          {/* No Data State */}
          {!data || data.length === 0 ? (
            <motion.div
              className="text-center py-12"
              variants={itemVariants}
            >
              <p className="text-slate-800/70">
                No experience data available yet.
              </p>
            </motion.div>
          ) : (
            /* Experience Timeline */
            <div className="space-y-16">
              {Object.entries(groupedExperience).map(([type, experiences]) => {
                const Icon = typeIcons[type] || Briefcase
                const gradient = typeColors[type] || 'from-gray-500 to-slate-500'
                const label = typeLabels[type] || type

                return (
                  <motion.div
                    key={type}
                    className="space-y-8"
                    variants={itemVariants}
                  >
                    {/* Type Header */}
                    <motion.div
                      className="flex items-center gap-3 mb-8"
                      variants={itemVariants}
                    >
                      <motion.div
                        className={`p-3 bg-gradient-to-br ${gradient} rounded-xl`}
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ duration: 0.2 }}
                      >
                        <Icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-slate-900">
                        {label}
                      </h3>
                    </motion.div>

                    {/* Timeline Items */}
                    <div className="relative perspective-1000">
                      {/* Timeline Line */}
                      <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 to-blue-600" />

                      {/* Experience Cards */}
                      <div className="space-y-8">
                        {experiences.map((exp, index) => (
                          <motion.div
                            key={exp._id}
                            className="relative pl-12"
                            variants={itemVariants}
                            style={{ transformStyle: "preserve-3d" }}
                            animate={{
                              y: [0, -10, 0],
                              rotateX: [0, 3, 0],
                              rotateY: [0, -2, 0],
                            }}
                            transition={{
                              duration: 4 + (index % 3) * 0.5,
                              repeat: Infinity,
                              ease: "easeInOut",
                              delay: index * 0.1
                            }}
                          >
                            {/* Timeline Dot */}
                            <motion.div
                              className={`absolute left-2 top-6 w-5 h-5 rounded-full bg-gradient-to-br ${gradient} border-4 border-white shadow-lg`}
                              style={{ transform: "translateZ(10px)" }}
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1, type: "spring" as const }}
                              whileHover={{ scale: 1.3 }}
                            />

                            {/* Card */}
                            <motion.div
                              className="bg-gradient-to-br from-white/90 to-slate-50/60 p-6 rounded-2xl shadow-lg shadow-slate-200/60 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 border border-slate-100/60 hover:border-slate-200/80 card-3d-hover"
                              style={{ transform: "translateZ(15px)" }}
                              whileHover={{
                                scale: 1.03,
                                x: 10,
                                rotateX: 8,
                                rotateY: -8,
                                y: -12,
                                boxShadow: "0 35px 70px -12px rgba(0, 0, 0, 0.3)"
                              }}
                            >
                              <div className="space-y-4">
                                {/* Header */}
                                <div>
                                  <h4 className="text-xl font-bold text-slate-900">
                                    {exp.title}
                                  </h4>
                                  <div className="flex flex-wrap items-center gap-4 text-sm text-slate-800/70">
                                    <span className="font-semibold text-slate-900">
                                      {exp.company}
                                    </span>
                                    {exp.location && (
                                      <span className="flex items-center gap-1 text-blue-700">
                                        <MapPin className="w-4 h-4" />
                                        {exp.location}
                                      </span>
                                    )}
                                  </div>
                                </div>

                                {/* Date Range */}
                                <div className="flex items-center gap-2 text-sm text-slate-800/70">
                                  <Calendar className="w-4 h-4 text-blue-500" />
                                  <span>
                                    {formatDate(exp.startDate)}
                                    {' - '}
                                    {exp.isCurrent ? (
                                      <span className="font-semibold text-blue-700">Present</span>
                                    ) : exp.endDate ? (
                                      formatDate(exp.endDate)
                                    ) : (
                                      'Ongoing'
                                    )}
                                  </span>
                                </div>

                                {/* Description */}
                                {exp.description && (
                                  <div className="prose prose-sm text-slate-800/70">
                                    <PortableText value={exp.description} />
                                  </div>
                                )}

                                {/* Technologies */}
                                {exp.technologies && exp.technologies.length > 0 && (
                                  <div>
                                    <div className="flex items-center gap-2 text-sm font-semibold text-slate-900 mb-2">
                                      <ChevronRight className="w-4 h-4 text-blue-500" />
                                      Focus Areas
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                      {exp.technologies.map((tech, techIndex) => (
                                        <span
                                          key={techIndex}
                                          className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-700 rounded-full text-sm font-medium border border-blue-200/50 hover:border-blue-300 transition-colors cursor-pointer"
                                        >
                                          {tech}
                                        </span>
                                      ))}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
