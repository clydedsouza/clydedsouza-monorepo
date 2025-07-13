export interface IPost {
  title: string
  date: string
  tags: string[]
  lastmod: string
  draft: boolean
  summary: string
  images: string[]
  type: string
  readingTime: {
    text: string
    minutes: number
    time: number
    words: number
  }
  slug: string
  path: string
  filePath: string
  toc: Array<{
    value: string
    url: string
    depth: number
  }>
  structuredData: {
    '@context': string
    '@type': string
    headline: string
    datePublished: string
    dateModified: string
    description: string
    image: string
    url: string
  }
}
