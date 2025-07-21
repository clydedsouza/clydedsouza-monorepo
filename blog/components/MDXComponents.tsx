import type { MDXComponents } from 'mdx/types'
import BlogNewsletterForm from 'pliny/ui/BlogNewsletterForm'
import Pre from 'pliny/ui/Pre'
import TOCInline from 'pliny/ui/TOCInline'
import { CustomAd } from './CustomAd/CustomAd'
import Image from './CustomImage/Image'
import CustomLink from './CustomLink/Link'
import { InlineImage } from './InlineImage/InlineImage'
import TableWrapper from './TableWrapper/TableWrapper'
import YouTube from './YouTube/YouTube'

export const components: MDXComponents = {
  Image,
  InlineImage,
  TOCInline,
  a: CustomLink,
  pre: Pre,
  table: TableWrapper,
  BlogNewsletterForm,
  YouTube,
  CustomAd,
}
