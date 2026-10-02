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
    hidden: { y: 40, opacity: 0, rotateX: -10, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      rotateX: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        type: "spring" as const,
        stiffness: 70,
      },
    },
  }

  const getIcon = (iconName: string) => {
    const normalizedName = iconName.toLowerCase().replace(/[^a-z]/g, '')
    return iconMap[normalizedName] || Code2
  }

  return (
    <section id="services" className="py-20 bg-gradient-to-b from-slate-50 via-blue-50 to-slate-100 relative overflow-hidden perspective-1000">
      {/* 3D Animated Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-blue-400/15 to-purple-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.4, 1],
            rotate: [0, 120, 0],
            x: [0, 80, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-80 h-80 bg-gradient-to-tl from-purple-400/15 to-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -120, 0],
            x: [0, -80, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        {/* Floating geometric shapes */}
        <motion.div
          className="absolute top-1/3 left-1/4 w-16 h-16 border-2 border-blue-400/20 rounded-lg"
          animate={{
            rotate: [0, 45, 90, 135, 180, 0],
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute bottom-1/3 right-1/4 w-12 h-12 border-2 border-purple-400/20 rounded-full"
          animate={{
            rotate: [0, -90, -180, -270, -360, 0],
            scale: [1, 1.3, 1],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut"
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
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
            {data.map((service, index) => {
              const Icon = getIcon(service.icon)
              return (
                <motion.div
                  key={service._id}
                  className="bg-gradient-to-br from-white/90 to-slate-50/60 p-8 rounded-2xl border border-slate-100/60 shadow-lg shadow-slate-200/60 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 group card-3d-hover"
                  variants={itemVariants}
                  style={{ transformStyle: "preserve-3d" }}
                  animate={{
                    y: [0, -15, 0],
                    rotateX: [0, 4, 0],
                    rotateY: [0, -3, 0],
                  }}
                  transition={{
                    duration: 4.5 + (index % 3) * 0.6,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: index * 0.12
                  }}
                  whileHover={{
                    y: -18,
                    rotateX: 10,
                    rotateY: -10,
                    scale: 1.03,
                    boxShadow: "0 35px 70px -12px rgba(0, 0, 0, 0.3)"
                  }}
                >
                  {/* Icon */}
                  <motion.div
                    className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center mb-6 shadow-lg"
                    style={{ transform: "translateZ(30px)" }}
                    whileHover={{
                      rotate: 360,
                      scale: 1.2
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Title */}
                  <motion.h3
                    className="text-2xl font-bold text-slate-900 mb-3"
                    style={{ transform: "translateZ(20px)" }}
                    whileHover={{ x: 5, color: "#2563eb" }}
                  >
                    {service.title}
                  </motion.h3>

                  {/* Description */}
                  <motion.p
                    className="text-slate-800/70 leading-relaxed"
                    style={{ transform: "translateZ(15px)" }}
                  >
                    {service.description}
                  </motion.p>

                  {/* Features */}
                  {service.features && service.features.length > 0 && (
                    <motion.ul
                      className="space-y-2 mb-6"
                      style={{ transform: "translateZ(10px)" }}
                    >
                      {service.features.slice(0, 4).map((feature, featureIndex) => (
                        <motion.li
                          key={featureIndex}
                          className="flex items-start gap-2 text-sm text-slate-800/80"
                          whileHover={{ x: 5 }}
                        >
                          <motion.span
                            className="w-1.5 h-1.5 mt-2 bg-blue-500 rounded-full flex-shrink-0"
                            whileHover={{ scale: 1.5 }}
                          />
                          <span>{feature}</span>
                        </motion.li>
                      ))}
                    </motion.ul>
                  )}

                  {/* CTA */}
                  <motion.div style={{ transform: "translateZ(25px)" }}>
                    <Link href="#contact">
                      <motion.div whileHover={{ scale: 1.05 }}>
                        <Button
                          variant="outline"
                          className="w-full border-blue-200 hover:border-blue-600 hover:bg-blue-50 hover:text-blue-700 bg-white/70 backdrop-blur-sm transition-all duration-300 h-12"
                        >
                          Learn More
                        </Button>
                      </motion.div>
                    </Link>
                  </motion.div>
                </motion.div>
              )
            })}
          </div>

          {/* CTA Section */}
          <motion.div
            className="mt-16 text-center"
            variants={itemVariants}
            style={{ transformStyle: "preserve-3d" }}
          >
            <motion.div
              className="bg-gradient-to-br from-blue-900 to-slate-900 rounded-2xl p-12 relative overflow-hidden"
              whileHover={{
                rotateX: 2,
                rotateY: 2,
                scale: 1.02,
              }}
              transition={{ duration: 0.3 }}
            >
              {/* Animated background elements */}
              <motion.div
                className="absolute inset-0 opacity-10"
                animate={{
                  backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "linear"
                }}
                style={{
                  backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)',
                  backgroundSize: '40px 40px',
                }}
              />
              <motion.div
                className="absolute -top-20 -right-20 w-40 h-40 bg-blue-400/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.5, 1],
                  x: [0, 30, 0],
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <motion.div
                className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-400/20 rounded-full blur-2xl"
                animate={{
                  scale: [1, 1.5, 1],
                  x: [0, -30, 0],
                  y: [0, 30, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />

              <div className="relative z-10">
                <motion.h3
                  className="text-3xl font-bold text-white mb-4"
                  whileHover={{ scale: 1.05 }}
                >
                  Ready to Start Your Project?
                </motion.h3>
                <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
                  Let's discuss how I can help bring your ideas to life with professional design and development services.
                </p>
                <Link href="#contact">
                  <motion.div whileHover={{ scale: 1.1 }}>
                    <Button size="lg" className="bg-white text-blue-900 hover:bg-blue-50 shadow-lg">
                      Get In Touch
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
