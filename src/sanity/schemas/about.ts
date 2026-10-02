import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'about',
  title: 'About Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'About Me',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Professional Summary',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Detailed Bio',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'yearsOfExperience',
      title: 'Years of Experience',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'projectsCompleted',
      title: 'Projects Completed',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'happyClients',
      title: 'Happy Clients',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
  ],
})
