'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Project as ProjectType } from '@/sanity/types'
import { urlFor } from '@/sanity/client'
import {
  ExternalLink,
  Filter,
  Search,
  ArrowRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'

interface PortfolioProps {
  data: ProjectType[]
}

const categoryLabels: Record<string, string> = {
  'web-development': 'Web Development',
  'graphic-design': 'Graphic Design',
  'uiux-design': 'UI/UX Design',
  'brand-identity': 'Brand Identity',
  'mobile-app': 'Mobile App',
  'ecommerce': 'E-commerce',
}

export default function Portfolio({ data }: PortfolioProps) {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)

  // Dynamically get available categories from the data
  const availableCategories = Array.from(
    new Set(data.map(project => project.category))
  )
  const allCategories = ['all', ...availableCategories]
  const [searchQuery, setSearchQuery] = useState('')

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4,
      },
    },
  }

  // Filter projects based on category and search
  const filteredProjects = data.filter((project) => {
    const allProjectCategories = [project.category, ...(project.relatedCategories || [])]
    const matchesCategory = selectedCategory === 'all' || allProjectCategories.includes(selectedCategory as any)
    const matchesSearch = 
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => 
        tech.toLowerCase().includes(searchQuery.toLowerCase())
      )
    return matchesCategory && matchesSearch
  })

  const getImageUrl = (imageRef: string) => {
    // Sanity image references are in format: image-{hash}-{dimensions}-{format}
    // Convert the format suffix to a proper extension
    let ref = imageRef.replace('image-', '')
    ref = ref.replace(/-png$/, '.png')
    ref = ref.replace(/-jpg$/, '.jpg')
    ref = ref.replace(/-jpeg$/, '.jpeg')
    ref = ref.replace(/-webp$/, '.webp')
    ref = ref.replace(/-gif$/, '.gif')
    return `https://cdn.sanity.io/images/${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}/${process.env.NEXT_PUBLIC_SANITY_DATASET}/${ref}`
  }

  return (
    <section id="portfolio" className="py-32 bg-gradient-to-b from-slate-100 via-blue-50 to-slate-100 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/20 via-slate-200/10 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-slate-200/20 via-blue-200/10 to-transparent rounded-full blur-3xl" />
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
              Portfolio
            </motion.span>
            <motion.h2
              className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-slate-900 via-blue-800 to-slate-900 bg-clip-text text-transparent mb-6 section-heading"
              variants={itemVariants}
            >
              Featured Projects
            </motion.h2>
            <motion.p
              className="text-xl text-slate-800/70 max-w-2xl mx-auto font-light"
              variants={itemVariants}
            >
              A showcase of my best work across web development, design, and creative projects
            </motion.p>
            <motion.div
              className="w-24 h-1.5 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto rounded-full"
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
            />
          </motion.div>

          {/* Filters and Search */}
          <motion.div
            className="mb-16 space-y-8"
            variants={itemVariants}
          >
            {/* Category Filters */}
            <div className="flex flex-wrap justify-center gap-3">
              {allCategories.map((category) => (
                <motion.button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-900/20'
                      : 'bg-white border border-slate-200 text-slate-700 hover:border-blue-300 hover:text-blue-700'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {category === 'all' ? 'All Projects' : categoryLabels[category]}
                </motion.button>
              ))}
            </div>

            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-blue-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 bg-white/70 backdrop-blur-md border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-300 shadow-lg hover:shadow-xl focus:shadow-blue-500/20"
              />
            </div>
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            key={selectedCategory}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project._id}
                className="bg-gradient-to-br from-white/90 to-slate-50/60 rounded-2xl border border-slate-100/60 shadow-lg shadow-slate-200/60 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 overflow-hidden group"
                variants={itemVariants}
                whileHover={{ y: -8, scale: 1.01 }}
              >
                {/* Project Image */}
                <div className="relative rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 cursor-pointer shadow-md hover:shadow-lg transition-shadow duration-300"
                     onClick={() => project.images[0]?.asset && setLightboxImage(getImageUrl(project.images[0].asset._ref))}>
                  {project.images[0]?.asset ? (
                    <Image
                      src={getImageUrl(project.images[0].asset._ref)}
                      alt={project.title}
                      width={600}
                      height={400}
                      className="w-full h-auto group-hover:scale-105 transition-transform duration-500"
                      quality={95}
                      priority={index < 6}
                    />
                  ) : (
                    <div className="w-full h-64 flex items-center justify-center bg-gradient-to-br from-gray-200 to-gray-300">
                      <span className="text-gray-400 font-medium">Project Image</span>
                    </div>
                  )}

                  {/* Zoom Icon Overlay */}
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                      <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                    {project.liveProofs && project.liveProofs.length > 0 && (
                      <a
                        href={project.liveProofs[0].url}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          size="sm"
                          className="flex-1 bg-white/95 backdrop-blur-sm text-blue-900 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200"
                        >
                          <ExternalLink className="w-4 h-4 mr-2" />
                          {project.liveProofs[0].label || 'View Live'}
                        </Button>
                      </a>
                    )}
                  </div>

                  {/* Featured Badge */}
                  {project.featured && (
                    <div className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-md backdrop-blur-sm z-10">
                      Featured
                    </div>
                  )}

                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 flex gap-2 z-10">
                    <span className="bg-white/90 backdrop-blur-sm text-blue-700 px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                      {categoryLabels[project.category]}
                    </span>
                    {project.relatedCategories && project.relatedCategories.length > 0 && (
                      <span className="bg-blue-100/90 backdrop-blur-sm text-blue-800 px-3 py-1 rounded-full text-xs font-semibold shadow-md">
                        +{project.relatedCategories.length}
                      </span>
                    )}
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-5 space-y-3 bg-white">
                  {/* Title */}
                  <h3 className="text-xl font-bold text-slate-900">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-800/70 line-clamp-2 text-sm leading-relaxed">
                    {project.description}
                  </p>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-1.5">
                    {project.technologies.slice(0, 3).map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1 bg-gradient-to-r from-blue-500/10 to-blue-600/10 text-blue-700 rounded-full text-xs font-medium border border-blue-200/50"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.technologies.length > 3 && (
                      <span className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-xs font-medium">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>

                  {/* View Details Button */}
                  <Link href={`/projects/${project.slug.current}`} prefetch={true}>
                    <Button
                      variant="ghost"
                      className="w-full hover:bg-blue-50 hover:text-blue-700 transition-all duration-200 font-medium text-sm"
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* No Results */}
          {filteredProjects.length === 0 && (
            <motion.div
              className="text-center py-12"
              variants={itemVariants}
            >
              <p className="text-xl text-gray-600">
                No projects found matching your criteria.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4 md:p-8"
            onClick={() => setLightboxImage(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-7xl max-h-[90vh] w-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <Image
                src={lightboxImage}
                alt="Project image in lightbox"
                width={1920}
                height={1080}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
                quality={100}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
