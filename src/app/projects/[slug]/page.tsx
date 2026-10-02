import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, Calendar, User, Clock, Tag, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { client } from '@/sanity/client'
import { PROJECT_BY_SLUG_QUERY, RELATED_PROJECTS_QUERY } from '@/sanity/types'
import { PortableText } from '@portabletext/react'
import ImageGallery from '@/components/ImageGallery'

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  // Fetch project and related projects in parallel with error handling
  const [project, relatedProjects] = await Promise.all([
    client.fetch(PROJECT_BY_SLUG_QUERY, { slug }).catch(() => null),
    client.fetch(RELATED_PROJECTS_QUERY, { slug }).catch(() => [])
  ])

  if (!project) {
    notFound()
  }

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

  const categoryLabels: Record<string, string> = {
    'web-development': 'Web Development',
    'graphic-design': 'Graphic Design',
    'uiux-design': 'UI/UX Design',
    'brand-identity': 'Brand Identity',
    'mobile-app': 'Mobile App',
    'ecommerce': 'E-commerce',
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <Link href="/#portfolio">
            <Button variant="ghost" className="gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Portfolio
            </Button>
          </Link>
        </div>
      </header>

      {/* Project Hero */}
      <section className="py-12 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              <div className="flex items-center gap-3 flex-wrap">
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                  {categoryLabels[project.category]}
                </span>
                {project.relatedCategories && project.relatedCategories.length > 0 && (
                  project.relatedCategories.map((cat: string, index: number) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold"
                    >
                      {categoryLabels[cat]}
                    </span>
                  ))
                )}
                {project.featured && (
                  <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                    Featured Project
                  </span>
                )}
              </div>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
                {project.title}
              </h1>

              <p className="text-xl text-gray-600 leading-relaxed">
                {project.description}
              </p>

              {/* Project Meta */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-600">
                {project.client && (
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span>Client: {project.client}</span>
                  </div>
                )}
                {project.duration && (
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>Duration: {project.duration}</span>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(project.publishedAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                    })}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap gap-4">
                {project.liveProofs && project.liveProofs.length > 0 && (
                  project.liveProofs.map((liveProof: any, index: number) => (
                    <a
                      key={index}
                      href={liveProof.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Button className="gap-2 bg-gray-900 hover:bg-gray-800">
                        <ExternalLink className="w-4 h-4" />
                        {liveProof.label || 'View Live'}
                      </Button>
                    </a>
                  ))
                )}
                {project.github && (
                  <a href={project.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="gap-2">
                      <ExternalLink className="w-4 h-4" />
                      View Code
                    </Button>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Hero Image */}
      {project.images && project.images.length > 0 && (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 shadow-2xl">
                <Image
                  src={getImageUrl(project.images[0].asset._ref)}
                  alt={`${project.title} - Featured Image`}
                  width={1200}
                  height={800}
                  className="w-full h-auto"
                  quality={95}
                  priority
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Project Images */}
      {project.images && project.images.length > 0 && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Gallery</h2>
              <ImageGallery
                images={project.images.map((img: any) => ({
                  ...img,
                  url: getImageUrl(img.asset._ref)
                }))}
                projectTitle={project.title}
              />
            </div>
          </div>
        </section>
      )}

      {/* Related Gallery */}
      {project.relatedGallery && project.relatedGallery.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Work Gallery</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {project.relatedGallery.map((item: any, index: number) => (
                  <div key={index} className="space-y-2">
                    {item.type === 'image' && item.image ? (
                      <div className="relative rounded-xl overflow-hidden bg-gray-100 cursor-pointer group shadow-md hover:shadow-lg transition-shadow duration-300">
                        <Image
                          src={getImageUrl(item.image.asset._ref)}
                          alt={item.caption || `Related work ${index + 1}`}
                          width={600}
                          height={400}
                          className="w-full h-auto"
                          quality={95}
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2 shadow-lg">
                            <svg className="w-5 h-5 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    ) : item.type === 'video' && item.videoUrl ? (
                      <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 shadow-md">
                        <iframe
                          src={item.videoUrl}
                          className="w-full h-full"
                          allowFullScreen
                          title={`Related video ${index + 1}`}
                        />
                      </div>
                    ) : null}
                    {item.caption && (
                      <p className="text-sm text-gray-600">{item.caption}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Technologies */}
      {project.technologies && project.technologies.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Tag className="w-6 h-6" />
                Technologies Used
              </h2>
              <div className="flex flex-wrap gap-3">
                {project.technologies.map((tech: string, index: number) => (
                  <span
                    key={index}
                    className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-700 font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Case Study */}
      {project.caseStudy && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Case Study</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <PortableText value={project.caseStudy} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Key Features */}
      {project.features && project.features.length > 0 && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Key Features</h2>
              <ul className="space-y-3">
                {project.features.map((feature: string, index: number) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 text-gray-700"
                  >
                    <span className="w-2 h-2 mt-2 bg-blue-600 rounded-full flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}

      {/* Challenges & Solutions */}
      {project.challenges && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Challenges & Solutions
              </h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <PortableText value={project.challenges} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Results */}
      {project.results && (
        <section className="py-12 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Results & Outcomes</h2>
              <div className="prose prose-lg max-w-none text-gray-700">
                <PortableText value={project.results} />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Video */}
      {project.video && (
        <section className="py-12">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Project Video</h2>
              <div className="aspect-video rounded-xl overflow-hidden bg-gray-100">
                <iframe
                  src={project.video}
                  className="w-full h-full"
                  allowFullScreen
                  title={`${project.title} Video`}
                />
              </div>
            </div>
          </div>
        </section>
      )}

      {/* More of my work */}
      {relatedProjects && relatedProjects.length > 0 && (
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8">
                Here are more of my work
              </h1>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProjects.map((relatedProject: any) => (
                  <Link
                    key={relatedProject._id}
                    href={`/projects/${relatedProject.slug.current}`}
                    className="group"
                  >
                    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      {relatedProject.images && relatedProject.images[0] && (
                        <div className="relative aspect-video overflow-hidden bg-gray-100">
                          <Image
                            src={getImageUrl(relatedProject.images[0].asset._ref)}
                            alt={relatedProject.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                            quality={95}
                          />
                        </div>
                      )}
                      <div className="p-4">
                        <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                          {relatedProject.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {relatedProject.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-12 bg-gradient-to-br from-gray-900 to-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-white mb-4">
              Like This Project?
            </h2>
            <p className="text-gray-300 mb-8">
              Let's discuss how we can work together on your next project.
            </p>
            <Link href="#contact">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100">
                Get In Touch
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
