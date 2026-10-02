'use client'

import { motion } from 'framer-motion'
import { Skill as SkillType } from '@/sanity/types'
import { 
  Code2, 
  Database, 
  Layout, 
  Palette, 
  PenTool, 
  Megaphone, 
  Settings,
  Cpu,
  LucideIcon,
  icons
} from 'lucide-react'

interface SkillsProps {
  data: SkillType[]
}

const categoryIcons: Record<string, LucideIcon> = {
  frontend: Code2,
  backend: Database,
  cms: Layout,
  uiux: Palette,
  'graphic-design': PenTool,
  branding: PenTool,
  'digital-marketing': Megaphone,
  'dev-tools': Settings,
}

const categoryGradients: Record<string, { from: string, to: string, accent: string }> = {
  frontend: { from: 'from-blue-500', to: 'to-blue-600', accent: 'bg-blue-500' },
  backend: { from: 'from-emerald-500', to: 'to-emerald-600', accent: 'bg-emerald-500' },
  cms: { from: 'from-purple-500', to: 'to-purple-600', accent: 'bg-purple-500' },
  uiux: { from: 'from-pink-500', to: 'to-rose-600', accent: 'bg-pink-500' },
  'graphic-design': { from: 'from-orange-500', to: 'to-amber-600', accent: 'bg-orange-500' },
  branding: { from: 'from-red-500', to: 'to-rose-600', accent: 'bg-red-500' },
  'digital-marketing': { from: 'from-cyan-500', to: 'to-teal-600', accent: 'bg-cyan-500' },
  'dev-tools': { from: 'from-slate-500', to: 'to-gray-600', accent: 'bg-slate-500' },
}

const categoryLabels: Record<string, string> = {
  frontend: 'Frontend Development',
  backend: 'Backend Development',
  cms: 'CMS',
  uiux: 'UI/UX Design',
  'graphic-design': 'Graphic Design',
  branding: 'Branding',
  'digital-marketing': 'Digital Marketing',
  'dev-tools': 'Development Tools',
}

const getProficiencyLabel = (level: number) => {
  if (level >= 90) return { label: 'Expert', color: 'text-emerald-600', bg: 'bg-emerald-50' }
  if (level >= 75) return { label: 'Advanced', color: 'text-blue-600', bg: 'bg-blue-50' }
  if (level >= 60) return { label: 'Intermediate', color: 'text-amber-600', bg: 'bg-amber-50' }
  return { label: 'Beginner', color: 'text-gray-600', bg: 'bg-gray-50' }
}

const getIcon = (iconName?: string): LucideIcon => {
  if (!iconName) return Cpu
  const icon = icons[iconName as keyof typeof icons]
  return icon || Cpu
}

export default function Skills({ data }: SkillsProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        duration: 0.8,
        type: "spring" as const,
        stiffness: 100,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0, rotateX: -10 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      transition: {
        duration: 0.5,
        type: "spring" as const,
        stiffness: 100,
      },
    },
  }

  // Group skills by category and sort by order
  const groupedSkills = data.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = []
    }
    acc[skill.category].push(skill)
    return acc
  }, {} as Record<string, SkillType[]>)

  // Sort skills within each category by order
  Object.keys(groupedSkills).forEach(category => {
    groupedSkills[category].sort((a, b) => (a.order || 0) - (b.order || 0))
  })

  return (
    <section id="skills" className="py-24 bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-100 relative overflow-hidden perspective-1000 scroll-mt-20">
      {/* Animated 3D Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 180, 360],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-tl from-purple-400/20 to-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [360, 180, 0],
            x: [0, -50, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Floating 3D grid */}
        <motion.div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(0deg, transparent 24%, rgba(59, 130, 246, .3) 25%, rgba(59, 130, 246, .3) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .3) 75%, rgba(59, 130, 246, .3) 76%, transparent 77%, transparent),
              linear-gradient(90deg, transparent 24%, rgba(59, 130, 246, .3) 25%, rgba(59, 130, 246, .3) 26%, transparent 27%, transparent 74%, rgba(59, 130, 246, .3) 75%, rgba(59, 130, 246, .3) 76%, transparent 77%, transparent)
            `,
            backgroundSize: '50px 50px',
          }}
          animate={{
            backgroundPosition: ['0px 0px', '50px 50px', '0px 0px'],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-20" variants={itemVariants}>
            <motion.div
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full mb-6"
              variants={itemVariants}
            >
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-blue-700">My Expertise</span>
            </motion.div>
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 section-heading"
              variants={itemVariants}
            >
              Skills & Expertise
            </motion.h2>
            <motion.p
              className="text-xl text-slate-600/80 max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              A comprehensive overview of my technical skills and creative capabilities, 
              refined through years of hands-on experience and continuous learning
            </motion.p>
            <motion.div
              className="w-24 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 mx-auto mt-8 rounded-full"
              variants={itemVariants}
            />
          </motion.div>

          {/* Skills Grid by Category */}
          <div className="space-y-16">
            {Object.entries(groupedSkills).map(([category, skills]) => {
              const CategoryIcon = categoryIcons[category] || Cpu
              const gradient = categoryGradients[category] || { from: 'from-gray-500', to: 'to-gray-600', accent: 'bg-gray-500' }
              const label = categoryLabels[category] || category

              return (
                <motion.div
                  key={category}
                  className="space-y-8"
                  variants={itemVariants}
                >
                  {/* Category Header */}
                  <motion.div
                    className="flex items-center gap-4 mb-8"
                    variants={itemVariants}
                  >
                    <div className={`p-4 bg-gradient-to-br ${gradient.from} ${gradient.to} rounded-2xl shadow-lg shadow-${gradient.accent}/20`}>
                      <CategoryIcon className="w-7 h-7 text-white" />
                    </div>
                    <div>
                      <h3 className="text-3xl font-bold text-slate-900 tracking-tight">
                        {label}
                      </h3>
                      <p className="text-slate-500 text-sm mt-1">{skills.length} technologies mastered</p>
                    </div>
                    <div className="flex-1 h-px bg-gradient-to-r from-slate-200 to-transparent ml-4" />
                  </motion.div>

                  {/* Skills Cards */}
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 perspective-1000">
                    {skills.map((skill, index) => {
                      const SkillIcon = getIcon(skill.icon)
                      const proficiency = getProficiencyLabel(skill.proficiency)

                      return (
                        <motion.div
                          key={skill._id}
                          className="group bg-white p-6 rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-slate-200 relative overflow-hidden card-3d-hover"
                          variants={itemVariants}
                          style={{ transformStyle: "preserve-3d" }}
                          animate={{
                            y: [0, -12, 0],
                            rotateX: [0, 3, 0],
                            rotateY: [0, -2, 0],
                          }}
                          transition={{
                            duration: 4 + (index % 3) * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                            delay: index * 0.1
                          }}
                          whileHover={{
                            scale: 1.05,
                            rotateX: 8,
                            rotateY: -8,
                            z: 50,
                            boxShadow: "0 30px 60px -12px rgba(0, 0, 0, 0.3)",
                            y: -20
                          }}
                        >
                          {/* 3D Hover gradient effect */}
                          <motion.div
                            className={`absolute inset-0 bg-gradient-to-br ${gradient.from} ${gradient.to} opacity-0`}
                            animate={{ opacity: 0 }}
                            whileHover={{ opacity: 0.1 }}
                            transition={{ duration: 0.3 }}
                          />

                          {/* Glowing border effect */}
                          <motion.div
                            className={`absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                            style={{
                              background: `linear-gradient(135deg, ${gradient.from} 0%, ${gradient.to} 100%)`,
                              padding: '2px',
                              mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                              maskComposite: 'exclude',
                              WebkitMaskComposite: 'xor',
                            }}
                          />

                          <div className="relative z-10" style={{ transformStyle: "preserve-3d" }}>
                            <div className="flex items-start justify-between mb-4">
                              <motion.div
                                className={`p-3 bg-gradient-to-br ${gradient.from} ${gradient.to} rounded-xl shadow-md shadow-${gradient.accent}/20`}
                                whileHover={{
                                  rotate: 360,
                                  scale: 1.2
                                }}
                                transition={{ duration: 0.6 }}
                              >
                                <SkillIcon className="w-5 h-5 text-white" />
                              </motion.div>
                              <motion.span
                                className={`px-3 py-1 rounded-full text-xs font-semibold ${proficiency.bg} ${proficiency.color}`}
                                whileHover={{ scale: 1.1 }}
                              >
                                {proficiency.label}
                              </motion.span>
                            </div>

                            <motion.h4
                              className="text-lg font-bold text-slate-900 mb-3 group-hover:text-blue-600 transition-colors"
                              whileHover={{ x: 5 }}
                            >
                              {skill.name}
                            </motion.h4>

                            {/* 3D Proficiency Bar */}
                            <div className="space-y-2">
                              <div className="flex justify-between text-xs text-slate-500">
                                <span>Proficiency</span>
                                <motion.span
                                  className="font-semibold text-slate-700"
                                  whileHover={{ scale: 1.1 }}
                                >
                                  {skill.proficiency}%
                                </motion.span>
                              </div>
                              <div className="h-2 bg-slate-100 rounded-full overflow-hidden relative">
                                <motion.div
                                  initial={{ width: 0 }}
                                  whileInView={{ width: `${skill.proficiency}%` }}
                                  viewport={{ once: true }}
                                  transition={{ duration: 1, delay: 0.2, type: "spring" as const }}
                                  className={`h-full bg-gradient-to-r ${gradient.from} ${gradient.to} rounded-full relative`}
                                  style={{ transform: "translateZ(10px)" }}
                                >
                                  <motion.div
                                    className="absolute inset-0 bg-white/30"
                                    animate={{
                                      x: ['-100%', '100%'],
                                    }}
                                    transition={{
                                      duration: 2,
                                      repeat: Infinity,
                                      ease: "linear"
                                    }}
                                  />
                                </motion.div>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
