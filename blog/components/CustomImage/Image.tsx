import NextImage, { ImageProps } from 'next/image'

const basePath = process.env.BASE_PATH

const Image = ({ src, ...rest }: ImageProps) => (
  <div>
    <NextImage src={`${basePath || ''}${src}`} {...rest} />
  </div>
)

export default Image

// interface CustomImageProps extends ImageProps {
//   caption?: React.ReactNode
// }

// export const Image = ({ src, caption, ...rest }: CustomImageProps) => (
//   <>
//     <div>
//       <NextImage src={`${basePath || ''}${src}`} {...rest} />
//     </div>
//     {caption && <div>{caption}</div>}
//   </>
// )
