import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Project Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'text',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Primary Category',
      type: 'string',
      options: {
        list: [
          { title: 'Web Development', value: 'web-development' },
          { title: 'Graphic Design', value: 'graphic-design' },
          { title: 'UI/UX Design', value: 'uiux-design' },
          { title: 'Brand Identity', value: 'brand-identity' },
          { title: 'Mobile App', value: 'mobile-app' },
          { title: 'E-commerce', value: 'ecommerce' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'relatedCategories',
      title: 'Related Categories',
      type: 'array',
      of: [
        {
          type: 'string',
          options: {
            list: [
              { title: 'Web Development', value: 'web-development' },
              { title: 'Graphic Design', value: 'graphic-design' },
              { title: 'UI/UX Design', value: 'uiux-design' },
              { title: 'Brand Identity', value: 'brand-identity' },
              { title: 'Mobile App', value: 'mobile-app' },
              { title: 'E-commerce', value: 'ecommerce' },
            ],
          },
        },
      ],
      description: 'Additional categories this project aligns with (e.g., Brand Identity + Graphic Design)',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies Used',
      type: 'array',
      of: [{ type: 'string' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'images',
      title: 'Main Project Images',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'relatedGallery',
      title: 'Related Work Gallery',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'type',
              title: 'Media Type',
              type: 'string',
              options: {
                list: [
                  { title: 'Image', value: 'image' },
                  { title: 'Video', value: 'video' },
                ],
              },
              initialValue: 'image',
            }),
            defineField({
              name: 'image',
              title: 'Image',
              type: 'image',
              options: { hotspot: true },
              hidden: ({ parent }) => parent?.type !== 'image',
            }),
            defineField({
              name: 'videoUrl',
              title: 'Video URL',
              type: 'url',
              description: 'YouTube or Vimeo URL',
              hidden: ({ parent }) => parent?.type !== 'video',
            }),
            defineField({
              name: 'caption',
              title: 'Caption',
              type: 'string',
            }),
          ],
        },
      ],
      description: 'Additional images or videos showcasing related work',
    }),
    defineField({
      name: 'video',
      title: 'Project Video (optional)',
      type: 'url',
      description: 'YouTube or Vimeo URL',
    }),
    defineField({
      name: 'github',
      title: 'GitHub Repository',
      type: 'url',
    }),
    defineField({
      name: 'liveProofs',
      title: 'Live Proofs',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            defineField({
              name: 'platform',
              title: 'Platform',
              type: 'string',
              options: {
                list: [
                  { title: 'Website', value: 'website' },
                  { title: 'Facebook', value: 'facebook' },
                  { title: 'Instagram', value: 'instagram' },
                  { title: 'Twitter/X', value: 'twitter' },
                  { title: 'LinkedIn', value: 'linkedin' },
                  { title: 'Dribbble', value: 'dribbble' },
                  { title: 'Behance', value: 'behance' },
                  { title: 'YouTube', value: 'youtube' },
                  { title: 'Other', value: 'other' },
                ],
              },
            }),
            defineField({
              name: 'url',
              title: 'URL',
              type: 'url',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'Custom Label',
              type: 'string',
              description: 'Custom label for the link (e.g., "Live Site", "Facebook Page")',
            }),
          ],
        },
      ],
      description: 'Multiple live proof links (website, social media, etc.)',
    }),
    defineField({
      name: 'client',
      title: 'Client Name',
      type: 'string',
    }),
    defineField({
      name: 'duration',
      title: 'Project Duration',
      type: 'string',
      description: 'e.g., "3 months", "2 weeks"',
    }),
    defineField({
      name: 'caseStudy',
      title: 'Case Study',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'features',
      title: 'Key Features',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'challenges',
      title: 'Challenges & Solutions',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'results',
      title: 'Results/Outcomes',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured Project',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: 'Order',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
    {
      title: 'Published Date',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      media: 'images.0',
      category: 'category',
    },
    prepare(selection) {
      const { title, media, category } = selection
      return {
        title,
        media,
        subtitle: category,
      }
    },
  },
})
