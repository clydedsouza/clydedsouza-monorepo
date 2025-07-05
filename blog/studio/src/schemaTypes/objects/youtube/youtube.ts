// ./schemaTypes/youTubeType/index.ts

import {FaYoutube} from 'react-icons/fa'
import {defineField, defineType} from 'sanity'
import {YouTubePreview} from './YouTubePreview'

export const youtube = defineType({
  name: 'youtube',
  type: 'object',
  title: 'YouTube Video',
  icon: FaYoutube,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
    }),
  ],
  preview: {
    select: {url: 'url'},
  },
  components: {
    preview: YouTubePreview as React.ComponentType<any>,
  },
})
