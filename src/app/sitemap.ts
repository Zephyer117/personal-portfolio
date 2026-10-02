import { MetadataRoute } from 'next'
import { client } from '@/sanity/client'
import { PROJECTS_QUERY } from '@/sanity/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  
  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${siteUrl}/#about`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteUrl}/#skills`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/#experience`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.7,
    },
    {
      url: `${siteUrl}/#portfolio`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${siteUrl}/#services`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.6,
    },
    {
      url: `${siteUrl}/#contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ]

  try {
    // Fetch dynamic content
    const projects = await client.fetch(PROJECTS_QUERY)

    // Add project pages
    const projectPages: MetadataRoute.Sitemap = projects.map((project: any) => ({
      url: `${siteUrl}/projects/${project.slug.current}`,
      lastModified: new Date(project.publishedAt),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))

    return [...staticPages, ...projectPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return staticPages
  }
}
