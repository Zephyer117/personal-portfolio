import { createClient } from 'next-sanity'
import { createImageUrlBuilder } from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: true,
  perspective: 'published',
  stega: {
    studioUrl: '/studio',
    logger: console,
  },
})

const builder = createImageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

export async function getPosts() {
  return await client.fetch(`*[_type == "post"]`)
}

export async function getPostBySlug(slug: string) {
  return await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]`,
    { slug }
  )
}
