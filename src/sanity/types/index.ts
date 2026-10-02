import { defineQuery } from 'next-sanity'

export const HERO_QUERY = defineQuery(`*[_type == "hero"][0]`)
export const ABOUT_QUERY = defineQuery(`*[_type == "about"][0]`)
export const SKILLS_QUERY = defineQuery(`*[_type == "skill"] | order(order asc)`)
export const EXPERIENCE_QUERY = defineQuery(`*[_type == "experience"] | order(order asc)`)
export const PROJECTS_QUERY = defineQuery(`*[_type == "project"] | order(order asc)`)
export const FEATURED_PROJECTS_QUERY = defineQuery(`*[_type == "project" && featured == true] | order(order asc)`)
export const PROJECT_BY_SLUG_QUERY = defineQuery(`*[_type == "project" && slug.current == $slug][0]`)
export const RELATED_PROJECTS_QUERY = defineQuery(`*[_type == "project" && slug.current != $slug] | order(order asc)[0...3]`)
export const SERVICES_QUERY = defineQuery(`*[_type == "service"] | order(order asc)`)

export interface Hero {
  _id: string
  headline: string
  name: string
  tagline: string
  description: string
  profileImage?: {
    asset: {
      _ref: string
      _type: string
    }
  }
  resumeButton?: {
    text: string
    file?: {
      asset: {
        _ref: string
        _type: string
      }
    }
  }
  projectsButton?: {
    text: string
    link: string
  }
}

export interface About {
  _id: string
  title: string
  summary: string
  bio: any[]
  yearsOfExperience: number
  projectsCompleted: number
  happyClients: number
}

export interface Skill {
  _id: string
  name: string
  category: 'frontend' | 'backend' | 'cms' | 'uiux' | 'graphic-design' | 'branding' | 'digital-marketing' | 'dev-tools'
  proficiency: number
  icon?: string
  order: number
}

export interface Experience {
  _id: string
  type: 'work' | 'education' | 'certification'
  title: string
  company: string
  location?: string
  startDate: string
  endDate?: string
  isCurrent: boolean
  description?: any[]
  technologies?: string[]
  order: number
}

export interface Project {
  _id: string
  title: string
  slug: {
    current: string
  }
  description: string
  category: 'web-development' | 'graphic-design' | 'uiux-design' | 'brand-identity' | 'mobile-app' | 'ecommerce'
  relatedCategories?: ('web-development' | 'graphic-design' | 'uiux-design' | 'brand-identity' | 'mobile-app' | 'ecommerce')[]
  technologies: string[]
  images: {
    asset: {
      _ref: string
      _type: string
    }
  }[]
  relatedGallery?: {
    type: 'image' | 'video'
    image?: {
      asset: {
        _ref: string
        _type: string
      }
    }
    videoUrl?: string
    caption?: string
  }[]
  video?: string
  github?: string
  liveProofs?: {
    platform: 'website' | 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'dribbble' | 'behance' | 'youtube' | 'other'
    url: string
    label?: string
  }[]
  client?: string
  duration?: string
  caseStudy?: any[]
  features?: string[]
  challenges?: any[]
  results?: any[]
  featured: boolean
  order: number
  publishedAt: string
}

export interface Service {
  _id: string
  title: string
  description: string
  icon: string
  features?: string[]
  order: number
}
