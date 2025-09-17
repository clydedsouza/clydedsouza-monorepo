import { Authors, Blog } from 'contentlayer/generated'
import { CoreContent } from 'pliny/utils/contentlayer'
import { ReactNode } from 'react'

export interface LayoutProps {
  content: CoreContent<Blog>
  authorDetails: CoreContent<Authors>[]
  next?: CoreContent<Blog> //{ path: string; title: string }
  prev?: CoreContent<Blog> //{ path: string; title: string, image }
  children: ReactNode
}
