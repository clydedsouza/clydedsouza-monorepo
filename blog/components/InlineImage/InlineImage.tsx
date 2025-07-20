import Image, { ImageProps } from 'next/image'
import { ReactNode } from 'react'

const basePath = process.env.BASE_PATH

interface IInlineImageProps extends ImageProps {
  caption?: ReactNode
}

export const InlineImage = ({ src, alt, caption, ...rest }: IInlineImageProps) => (
  <>
    <figure className="mb-2">
      <Image
        src={`${basePath || ''}${src}`}
        alt={alt}
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
