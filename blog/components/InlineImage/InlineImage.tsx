import Image, { ImageProps } from 'next/image'
import { ReactNode } from 'react'

const basePath = process.env.BASE_PATH

interface IInlineImageProps extends ImageProps {
  caption?: ReactNode
}

export const InlineImage = ({ src, caption, ...rest }: IInlineImageProps) => (
  <>
    <figure>
      <Image
        src={`${basePath || ''}${src}`}
        {...rest}
        className="mb-0 aspect-16/9 object-cover pb-1"
        height={536.63}
        width={954}
      />
      {caption && (
        <figcaption>
          <center>{caption}</center>
        </figcaption>
      )}
    </figure>
  </>
)
