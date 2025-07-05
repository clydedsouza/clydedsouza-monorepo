import {PiCodeBlock} from 'react-icons/pi'
import {defineArrayMember, defineField, defineType} from 'sanity'

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
      name: 'codeBlock',
      title: 'Code Block',
      type: 'object',
      icon: <PiCodeBlock />,
      preview: {
        select: {
          language: 'language',
          code: 'code',
        },
        prepare({language, code}) {
          return {
            title: `Code Block (${language || 'plain'})`,
            subtitle: code ? code.substring(0, 30) + (code.length > 30 ? '...' : '') : '',
            media: <PiCodeBlock />,
          }
        },
      },
      fields: [
        defineField({
          name: 'language',
          title: 'Language',
          type: 'string',
          options: {
            list: [
              {title: 'JavaScript', value: 'javascript'},
              {title: 'TypeScript', value: 'typescript'},
              {title: 'Python', value: 'python'},
              {title: 'HTML', value: 'html'},
              {title: 'CSS', value: 'css'},
              // Add more as needed
            ],
          },
        }),
        defineField({
          name: 'filename',
          title: 'Filename',
          type: 'text',
        }),
        defineField({
          name: 'code',
          title: 'Code',
          type: 'text',
        }),
      ],
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
