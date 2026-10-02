'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Mail, 
  Phone, 
  MapPin, 
  MessageCircle, 
  Send,
  CheckCircle2,
  Loader2,
  AlertCircle,
  Link,
  Share2,
  ExternalLink,
  Camera,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'

interface ContactProps {
  data: null
}

interface FormData {
  fullName: string
  email: string
  company: string
  phone: string
  subject: string
  projectType: string
  budget: string
  message: string
  terms: boolean
}

interface FormErrors {
  fullName?: string
  email?: string
  subject?: string
  message?: string
}

export default function Contact({ data }: ContactProps) {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    company: '',
    phone: '',
    subject: '',
    projectType: '',
    budget: '',
    message: '',
    terms: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errors, setErrors] = useState<FormErrors>({})

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

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full name is required'
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = 'Name must be at least 2 characters'
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required'
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(formData.email)) {
        newErrors.email = 'Please enter a valid email address'
      }
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required'
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required'
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrors({})

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (response.ok) {
        setSubmitStatus('success')
        setFormData({
          fullName: '',
          email: '',
          company: '',
          phone: '',
          subject: '',
          projectType: '',
          budget: '',
          message: '',
          terms: false,
        })
      } else {
        setSubmitStatus('error')
        console.error('Submission error:', result.error)
      }
    } catch (error) {
      setSubmitStatus('error')
      console.error('Network error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  // Contact information - update these with your actual details
  const contactInfo = {
    email: 'mostofashahriar2003@gmail.com',
    phone: '+880 1756680320',
    whatsapp: '+880 1756680320',
    location: 'Khulna, Bangladesh',
    linkedin: 'https://www.linkedin.com/in/ms-utsho-wddm',
    instagram: 'https://www.instagram.com/zephyer.studio/',
    facebook: 'https://www.facebook.com/profile.php?id=61593551365262',
    twitter: 'https://x.com/Shahria_builds',
  }

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-slate-50 via-blue-50/30 to-slate-100 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 left-0 w-[600px] h-[600px] bg-gradient-to-br from-blue-200/30 via-blue-300/20 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-gradient-to-tl from-purple-200/25 via-slate-200/15 to-transparent rounded-full blur-3xl"
          animate={{
            scale: [1, 1.15, 1],
            x: [0, -25, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: 1,
          }}
        />
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          className="max-w-6xl mx-auto"
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
              <span className="text-sm font-semibold text-blue-700">Contact Me</span>
            </motion.div>
            <motion.h2
              className="text-5xl md:text-6xl font-bold text-slate-900 mb-6 section-heading"
              variants={itemVariants}
            >
              Let's Work Together
            </motion.h2>
            <motion.p
              className="text-xl text-slate-600/80 max-w-3xl mx-auto leading-relaxed"
              variants={itemVariants}
            >
              Have a project in mind or just want to chat? I'd love to hear from you. 
              Send me a message and I'll get back to you within 24 hours.
            </motion.p>
            <motion.div
              className="w-24 h-1.5 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-600 mx-auto mt-8 rounded-full"
              variants={itemVariants}
            />
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Contact Information */}
            <motion.div className="space-y-8" variants={itemVariants}>
              <div>
                <h3 className="text-3xl font-bold text-slate-900 mb-4">
                  Get in Touch
                </h3>
                <p className="text-slate-600 text-lg leading-relaxed">
                  Feel free to reach out through any of these channels. 
                  I'm always open to discussing new projects, creative ideas, 
                  or opportunities to be part of your vision.
                </p>
              </div>

              {/* Contact Details */}
              <div className="space-y-5">
                {/* Email */}
                <motion.div 
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                  whileHover={{ x: 8 }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-blue-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-blue-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-semibold text-slate-900 mb-1">Email</h4>
                    <a
                      href={`mailto:${contactInfo.email}`}
                      className="text-slate-600 hover:text-blue-700 transition-colors text-sm"
                    >
                      {contactInfo.email}
                    </a>
                  </div>
                </motion.div>

                {/* Phone */}
                {contactInfo.phone && (
                  <motion.div 
                    className="group flex items-start gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                    whileHover={{ x: 8 }}
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-emerald-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <Phone className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="font-semibold text-slate-900 mb-1">Phone</h4>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-slate-600 hover:text-emerald-700 transition-colors text-sm"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* WhatsApp */}
                {contactInfo.whatsapp && contactInfo.whatsapp !== contactInfo.phone && (
                  <motion.div 
                    className="group flex items-start gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                    whileHover={{ x: 8 }}
                  >
                    <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-green-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-green-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                      <MessageCircle className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1 pt-1">
                      <h4 className="font-semibold text-slate-900 mb-1">WhatsApp</h4>
                      <a
                        href={`https://wa.me/${contactInfo.whatsapp}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-slate-600 hover:text-green-700 transition-colors text-sm"
                      >
                        {contactInfo.whatsapp}
                      </a>
                    </div>
                  </motion.div>
                )}

                {/* Location */}
                <motion.div 
                  className="group flex items-start gap-4 p-4 rounded-2xl bg-white/50 backdrop-blur-sm border border-slate-100 hover:border-blue-200 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                  whileHover={{ x: 8 }}
                >
                  <div className="w-14 h-14 bg-gradient-to-br from-purple-600 to-purple-700 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/30 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div className="flex-1 pt-1">
                    <h4 className="font-semibold text-slate-900 mb-1">Location</h4>
                    <p className="text-slate-600 text-sm">{contactInfo.location}</p>
                  </div>
                </motion.div>
              </div>

              {/* Social Links */}
              <div className="pt-6">
                <h4 className="font-semibold text-slate-900 mb-4 text-lg">Connect on Social</h4>
                <div className="flex flex-wrap gap-3">
                  {contactInfo.linkedin && (
                    <motion.a 
                      href={contactInfo.linkedin} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full hover:bg-[#0077b5] hover:text-white hover:border-[#0077b5] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
                      >
                        <Link className="w-5 h-5" />
                      </Button>
                    </motion.a>
                  )}

                  {contactInfo.instagram && (
                    <motion.a 
                      href={contactInfo.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full hover:bg-gradient-to-br hover:from-purple-600 hover:to-pink-600 hover:text-white hover:border-transparent transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/20"
                      >
                        <Camera className="w-5 h-5" />
                      </Button>
                    </motion.a>
                  )}
                  {contactInfo.facebook && (
                    <motion.a 
                      href={contactInfo.facebook} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full hover:bg-[#1877f2] hover:text-white hover:border-[#1877f2] transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-blue-500/20"
                      >
                        <Users className="w-5 h-5" />
                      </Button>
                    </motion.a>
                  )}
                  {contactInfo.twitter && (
                    <motion.a 
                      href={contactInfo.twitter} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Button
                        size="lg"
                        variant="outline"
                        className="rounded-full hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-gray-500/20"
                      >
                        <Share2 className="w-5 h-5" />
                      </Button>
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div variants={itemVariants}>
              <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl shadow-slate-200/60 border border-slate-100/60 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500">
                <h3 className="text-2xl font-bold text-slate-900 mb-2">
                  Send a Message
                </h3>
                <p className="text-slate-600 mb-6 text-sm">
                  Fill out the form below and I'll get back to you as soon as possible.
                </p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Full Name */}
                  <div>
                    <Label htmlFor="fullName" className="text-slate-700 font-medium">Full Name *</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={`mt-2 bg-white/50 backdrop-blur-sm border-slate-200 focus:border-blue-500 focus:ring-blue-500/50 transition-all duration-300 hover:border-blue-300 ${errors.fullName ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''}`}
                    />
                    {errors.fullName && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.fullName}
                      </motion.p>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <Label htmlFor="email" className="text-slate-700 font-medium">Email *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={`mt-2 bg-white/50 backdrop-blur-sm border-slate-200 focus:border-blue-500 focus:ring-blue-500/50 transition-all duration-300 hover:border-blue-300 ${errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''}`}
                    />
                    {errors.email && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.email}
                      </motion.p>
                    )}
                  </div>

                  {/* Company */}
                  <div>
                    <Label htmlFor="company" className="text-slate-700 font-medium">Company</Label>
                    <Input
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleChange}
                      placeholder="Your Company (optional)"
                      className="mt-2 bg-white/50 backdrop-blur-sm border-slate-200 focus:border-blue-500 focus:ring-blue-500/50 transition-all duration-300 hover:border-blue-300"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <Label htmlFor="phone" className="text-slate-700 font-medium">Phone</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+880 1XXX-XXXXXX (optional)"
                      className="mt-2 bg-white/50 backdrop-blur-sm border-slate-200 focus:border-blue-500 focus:ring-blue-500/50 transition-all duration-300 hover:border-blue-300"
                    />
                  </div>

                  {/* Subject */}
                  <div>
                    <Label htmlFor="subject" className="text-slate-700 font-medium">Subject *</Label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      placeholder="Project Inquiry"
                      className={`mt-2 bg-white/50 backdrop-blur-sm border-slate-200 focus:border-blue-500 focus:ring-blue-500/50 transition-all duration-300 hover:border-blue-300 ${errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''}`}
                    />
                    {errors.subject && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.subject}
                      </motion.p>
                    )}
                  </div>

                  {/* Project Type */}
                  <div>
                    <Label htmlFor="projectType" className="text-slate-700 font-medium">Project Type</Label>
                    <select
                      id="projectType"
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="mt-2 w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-300 cursor-pointer"
                    >
                      <option value="">Select a project type (optional)</option>
                      <option value="web-development">Web Development</option>
                      <option value="graphic-design">Graphic Design</option>
                      <option value="uiux-design">UI/UX Design</option>
                      <option value="brand-identity">Brand Identity</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {/* Budget */}
                  <div>
                    <Label htmlFor="budget" className="text-slate-700 font-medium">Budget Range</Label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="mt-2 w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 bg-white/50 backdrop-blur-sm transition-all duration-300 hover:border-blue-300 cursor-pointer"
                    >
                      <option value="">Select budget range (optional)</option>
                      <option value="500-1000">$200 - $500</option>
                      <option value="1000-5000">$500 - $1,000</option>
                      <option value="5000-10000">$1,000 - $1,500</option>
                      <option value="10000+">Zoom Meeting Call & Discussion</option>
                      <option value="discussing">Just Discussing & Getting Audit For Later Consideration</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-slate-700 font-medium">Message *</Label>
                    <Textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Tell me about your project..."
                      rows={5}
                      className={`mt-2 bg-white/50 backdrop-blur-sm border-slate-200 focus:border-blue-500 focus:ring-blue-500/50 transition-all duration-300 hover:border-blue-300 resize-none ${errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500/50' : ''}`}
                    />
                    {errors.message && (
                      <motion.p 
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-1 text-sm text-red-600 flex items-center gap-1"
                      >
                        <AlertCircle className="w-4 h-4" />
                        {errors.message}
                      </motion.p>
                    )}
                  </div>

                  {/* Terms Checkbox */}
                  <div className="flex items-start gap-3 pt-2">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      checked={formData.terms}
                      onChange={handleChange}
                      required
                      className="mt-1 w-5 h-5 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-offset-0 cursor-pointer"
                    />
                    <Label htmlFor="terms" className="text-sm text-slate-600 cursor-pointer">
                      I agree to the terms and conditions and privacy policy
                    </Label>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-900/30 hover:shadow-xl hover:shadow-blue-900/40 transition-all duration-300 hover:scale-[1.02] font-semibold text-base"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Send Message
                      </>
                    )}
                  </Button>

                  {/* Success Message */}
                  {submitStatus === 'success' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-emerald-50 border border-emerald-200 rounded-xl flex items-center gap-3 text-emerald-700"
                    >
                      <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium">Message sent successfully! I'll get back to you soon.</span>
                    </motion.div>
                  )}

                  {/* Error Message */}
                  {submitStatus === 'error' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3 text-red-700"
                    >
                      <AlertCircle className="w-5 h-5 flex-shrink-0" />
                      <span className="text-sm font-medium">Something went wrong. Please try again or contact me directly via email.</span>
                    </motion.div>
                  )}
                </form>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
