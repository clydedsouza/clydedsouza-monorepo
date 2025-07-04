// ./schemaTypes/youTubeType/index.ts

import {PlayIcon} from '@sanity/icons'
import {defineField, defineType} from 'sanity'
import {YouTubePreview} from './youtubePreview'

export const youtube = defineType({
  name: 'youTube',
  type: 'object',
  title: 'YouTube Embed',
  icon: PlayIcon,
  fields: [
    defineField({
      name: 'url',
      type: 'url',
      title: 'YouTube video URL',
    }),
  ],
  preview: {
    select: {title: 'url'},
  },
  components: {
    preview: YouTubePreview,
  },
})
