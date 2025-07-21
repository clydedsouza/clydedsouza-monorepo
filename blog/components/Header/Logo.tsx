import Image from 'next/image'

export const Logo = () => {
  return (
    <Image
      src="/static/images/clydedsouza.jpg"
      width={35}
      height={35}
      style={{ borderRadius: '100px' }}
      className="transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-110"
      priority
      alt="Picture of the author"
    />
  )
}
