import {defineField, defineType} from 'sanity'

export const tags = defineType({
  name: 'tag',
  type: 'document',
  title: 'Tags',
  description: 'Create and manage tags for posts',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
      title: 'Tag name',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      type: 'slug',
      title: 'Slug',
      options: {source: 'title', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
  ],
})
