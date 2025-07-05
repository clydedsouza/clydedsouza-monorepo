import {defineArrayMember, defineType} from 'sanity'

export const blockContent = defineType({
  title: 'Block Content',
  name: 'blockContent',
  type: 'array',
  of: [
    defineArrayMember({
      type: 'link',
    }),
    defineArrayMember({
      type: 'inlineImage',
    }),
    defineArrayMember({
      type: 'code',
    }),
    defineArrayMember({
      type: 'githubGist',
    }),
    defineArrayMember({
      type: 'googleAds',
    }),
    defineArrayMember({
      type: 'youtube',
    }),
  ],
})
