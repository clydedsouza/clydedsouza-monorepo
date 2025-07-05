import {CiImageOn} from 'react-icons/ci'
import {defineField, defineType} from 'sanity'

export const inlineImage = defineType({
  name: 'inlineImage',
  type: 'image',
  title: 'Inline Image',
  icon: CiImageOn,
  options: {hotspot: true},
  fields: [
    defineField({
      name: 'alt',
      type: 'string',
      title: 'Alternative text',
      description: 'Important for SEO and accessibility.',
    }),
  ],
  //   preview: {
  //     select: {title: 'url'},
  //   },
  //   components: {
  //     preview: <></>,
  //   },
})
