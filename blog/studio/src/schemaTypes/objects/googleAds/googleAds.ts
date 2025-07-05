import {FcGoogle} from 'react-icons/fc'
import {defineField, defineType} from 'sanity'

export const googleAds = defineType({
  name: 'googleAds',
  title: 'Google Ads',
  type: 'object',
  preview: {
    select: {
      size: 'size',
    },
    prepare({size}) {
      return {
        title: 'Google Ad',
        subtitle: size,
        media: FcGoogle,
      }
    },
  },
  icon: FcGoogle,
  fields: [
    defineField({
      name: 'size',
      title: 'Ad Size',
      type: 'string',
      options: {
        list: [
          {title: 'Responsive', value: 'responsive'},
          {title: '300x250', value: '300x250'},
          {title: '336x280', value: '336x280'},
          {title: '728x90', value: '728x90'},
          {title: '300x600', value: '300x600'},
          {title: '320x100', value: '320x100'},
          // Add more sizes as needed
        ],
      },
      description: 'Select the ad size',
    }),
  ],
})
