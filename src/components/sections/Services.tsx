'use client'

import { motion } from 'framer-motion'
import { Service as ServiceType } from '@/sanity/types'
import { 
  Code2, 
  Palette, 
  Layout, 
  PenTool, 
  Megaphone,
  Smartphone,
  ShoppingCart,
  Globe
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

interface ServicesProps {
  data: ServiceType[]
}

const iconMap: Record<string, any> = {
  'megaphone': Megaphone,
  'users': Smartphone,
  'globe': Globe,
  'layout': Layout,
  'palette': Palette,
  'pentool': PenTool,
  'code2': Code2,
  'smartphone': Smartphone,
  'shoppingcart': ShoppingCart,
}

export default function Services({ data }: ServicesProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  }

  const getIcon = (iconName: string) => {
    const normalizedName = iconName.toLowerCase().replace(/[^a-z]/g, '')
    return iconMap[normalizedName] || Code2
  }

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100">
      <div className="container mx-auto px-4 max-w-7xl">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Section Header */}
          <motion.div className="text-center mb-16" variants={itemVariants}>
            <motion.h2
              className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 section-heading"
              variants={itemVariants}
            >
              Services
            </motion.h2>
            <motion.p
              className="text-xl text-slate-800/70 max-w-2xl mx-auto"
              variants={itemVariants}
            >
              Professional services tailored to bring your vision to life
            </motion.p>
            <motion.div
              className="w-20 h-1 bg-gradient-to-r from-blue-600 to-blue-700 mx-auto mt-6"
              variants={itemVariants}
            />
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.map((service, index) => {
              const Icon = getIcon(service.icon)
              return (
                <motion.div
                  key={service._id}
                  className="bg-gradient-to-br from-white/90 to-slate-50/60 p-8 rounded-2xl border border-slate-100/60 shadow-lg shadow-slate-200/60 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 hover:-translate-y-2 group"
                  variants={itemVariants}
                  whileHover={{ y: -5 }}
                >
                  {/* Icon */}
                  <div
                    className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-lg"
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl font-bold text-slate-900 mb-3">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-800/70 leading-relaxed">
                    {service.description}
                  </p>

                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <ul className="space-y-2 mb-6">
                      {service.features.slice(0, 4).map((feature, featureIndex) => (
                        <li
                          key={featureIndex}
                          className="flex items-start gap-2 text-sm text-slate-800/80"
                        >
                          <span className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {/* CTA */}
                  <Link href="#contact">
                    <Button
                      variant="outline"
                      className="w-full border-blue-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 bg-white/70 backdrop-blur-sm transition-all duration-300 h-12"
                    >
                      Learn More
                    </Button>
                  </Link>
                </motion.div>
              )
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            className="mt-16 text-center"
            variants={itemVariants}
          >
            <div className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl p-12">
              <h3 className="text-3xl font-bold text-white mb-4">
                Ready to Start Your Project?
              </h3>
              <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                Let's discuss how I can help bring your ideas to life with professional design and development services.
              </p>
              <Link href="#contact">
                <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
