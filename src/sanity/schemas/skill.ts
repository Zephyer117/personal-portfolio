import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Frontend', value: 'frontend' },
          { title: 'Backend', value: 'backend' },
          { title: 'CMS', value: 'cms' },
          { title: 'UI/UX', value: 'uiux' },
          { title: 'Graphic Design', value: 'graphic-design' },
          { title: 'Branding', value: 'branding' },
          { title: 'Digital Marketing', value: 'digital-marketing' },
          { title: 'Development Tools', value: 'dev-tools' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'proficiency',
      title: 'Proficiency Level',
      type: 'number',
      description: 'Percentage (0-100)',
      validation: (Rule) => Rule.required().min(0).max(100),
    }),
    defineField({
      name: 'icon',
      title: 'Icon (optional)',
      type: 'string',
      description: 'Lucide icon name',
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
})
