import {FaGithub} from 'react-icons/fa'
import {defineField, defineType} from 'sanity'

export const githubGist = defineType({
  name: 'githubGist',
  title: 'GitHub Gist',
  type: 'object',
  icon: FaGithub,
  preview: {
    select: {
      url: 'url',
    },
    prepare({url}) {
      return {
        title: 'GitHub Gist',
        subtitle: url,
        media: FaGithub,
      }
    },
  },
  fields: [
    defineField({
      name: 'url',
      title: 'Gist URL',
      type: 'url',
      validation: (rule) => rule.uri({scheme: ['https']}),
    }),
  ],
})
