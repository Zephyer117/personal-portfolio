'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, X } from 'lucide-react'

interface ImageGalleryProps {
  images: any[]
  projectTitle: string
}

export default function ImageGallery({ images, projectTitle }: ImageGalleryProps) {
  const [lightboxImage, setLightboxImage] = useState<string | null>(null)
  const [currentIndex, setCurrentIndex] = useState(0)

  const openLightbox = (index: number) => {
    setCurrentIndex(index)
    setLightboxImage(images[index].url)
  }

  const navigateImage = (direction: 'prev' | 'next') => {
    if (direction === 'prev') {
      const newIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1
      setCurrentIndex(newIndex)
      setLightboxImage(images[newIndex].url)
    } else {
      const newIndex = currentIndex === images.length - 1 ? 0 : currentIndex + 1
      setCurrentIndex(newIndex)
      setLightboxImage(images[newIndex].url)
    }
  }

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {images.map((image: any, index: number) => (
          <div
            key={index}
            className="relative rounded-xl overflow-hidden bg-gray-100 cursor-pointer group shadow-md hover:shadow-lg transition-shadow duration-300"
            onClick={() => openLightbox(index)}
          >
            <Image
              src={image.url}
              alt={`${projectTitle} - Image ${index + 1}`}
              width={800}
              height={600}
              className="w-full h-auto"
              quality={95}
              priority={index === 0}
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="bg-white/90 backdrop-blur-sm rounded-full p-3 shadow-lg">
                <svg className="w-6 h-6 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                </svg>
              </div>
            </div>
          </div>
        ))}
      </div>

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
              {/* Close Button */}
              <button
                onClick={() => setLightboxImage(null)}
                className="absolute -top-12 right-0 text-white hover:text-gray-300 transition-colors z-10"
              >
                <X className="w-8 h-8" />
              </button>

              {/* Navigation Buttons */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={() => navigateImage('prev')}
                    className="absolute left-0 md:-left-16 text-white hover:text-gray-300 transition-colors z-10"
                  >
                    <ChevronLeft className="w-10 h-10" />
                  </button>
                  <button
                    onClick={() => navigateImage('next')}
                    className="absolute right-0 md:-right-16 text-white hover:text-gray-300 transition-colors z-10"
                  >
                    <ChevronRight className="w-10 h-10" />
                  </button>
                </>
              )}

              {/* Image */}
              <Image
                src={lightboxImage}
                alt={`${projectTitle} - Image ${currentIndex + 1}`}
                width={1920}
                height={1080}
                className="max-w-full max-h-[85vh] w-auto h-auto object-contain"
                quality={100}
              />

              {/* Image Counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
                  {currentIndex + 1} / {images.length}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
