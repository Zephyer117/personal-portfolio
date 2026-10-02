import { client } from '@/sanity/client'
import {
  HERO_QUERY,
  ABOUT_QUERY,
  SKILLS_QUERY,
  EXPERIENCE_QUERY,
  PROJECTS_QUERY,
  SERVICES_QUERY,
} from '@/sanity/types'
import { Suspense } from 'react'
import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
import About from '@/components/sections/About'
import dynamic from 'next/dynamic'

// Lazy load non-critical sections for better initial load performance
const Skills = dynamic(() => import('@/components/sections/Skills'), {
  loading: () => <div className="h-96 animate-pulse bg-slate-100" />,
})
const Experience = dynamic(() => import('@/components/sections/Experience'), {
  loading: () => <div className="h-96 animate-pulse bg-slate-100" />,
})
const Portfolio = dynamic(() => import('@/components/sections/Portfolio'), {
  loading: () => <div className="h-96 animate-pulse bg-slate-100" />,
})
const Services = dynamic(() => import('@/components/sections/Services'), {
  loading: () => <div className="h-96 animate-pulse bg-slate-100" />,
})
const Contact = dynamic(() => import('@/components/sections/Contact'), {
  loading: () => <div className="h-96 animate-pulse bg-slate-100" />,
})

export const revalidate = 3600 // Revalidate every hour

export default async function Home() {
  const [hero, about, skills, experience, projects, services] =
    await Promise.all([
      client.fetch(HERO_QUERY, {}, { cache: 'force-cache' }).catch(() => null),
      client.fetch(ABOUT_QUERY, {}, { cache: 'force-cache' }).catch(() => null),
      client.fetch(SKILLS_QUERY, {}, { cache: 'force-cache' }).catch(() => []),
      client.fetch(EXPERIENCE_QUERY, {}, { cache: 'force-cache' }).catch(() => []),
      client.fetch(PROJECTS_QUERY, {}, { cache: 'force-cache' }).catch(() => []),
      client.fetch(SERVICES_QUERY, {}, { cache: 'force-cache' }).catch(() => []),
    ])

  return (
    <main className="min-h-screen">
      <Navigation />
      <Hero data={hero} />
      <About data={about} />
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100" />}>
        <Skills data={skills} />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100" />}>
        <Experience data={experience} />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100" />}>
        <Portfolio data={projects} />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100" />}>
        <Services data={services} />
      </Suspense>
      <Suspense fallback={<div className="h-96 animate-pulse bg-slate-100" />}>
        <Contact data={null} />
      </Suspense>
    </main>
  )
}
