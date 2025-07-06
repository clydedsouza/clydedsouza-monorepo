// @ts-expect-error Image
import logo from './favicon.ico'

export const BlogLogo = () => {
  return <img src={logo} alt="My Logo" width={25} height={25} />
}
