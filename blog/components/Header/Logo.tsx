import Image from 'next/image'

export const Logo = () => {
  return (
    <Image
      src="/static/images/clydedsouza.jpg"
      width={35}
      height={35}
      style={{ borderRadius: '100px' }}
      priority
      alt="Picture of the author"
    />
  )
}
