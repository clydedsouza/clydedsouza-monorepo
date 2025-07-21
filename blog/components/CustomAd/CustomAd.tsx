import Image from 'next/image'
import Link from 'next/link'

interface ICustomAdData {
  image: string
  url: string
  alt: string
}

type ICustomAd = Record<string, ICustomAdData>

const CUSTOM_ADS: ICustomAd = {
  MAMABOOKKINDLE: {
    image: '/static/images/mtmas-kindle.jpg',
    url: 'https://mamatellmeastory.clydedsouza.net/',
    alt: 'Mama, tell me a story',
  },
  MAMABOOKPAPERBACK: {
    image: '/static/images/mtmas-paperback.jpg',
    url: 'https://mamatellmeastory.clydedsouza.net/',
    alt: 'Mama, tell me a story',
  },
}

interface ICustomAdProps {
  isRandom?: boolean
  adKey?: string
}

export const CustomAd = ({ isRandom = true, adKey = 'MAMABOOKKINDLE' }: ICustomAdProps) => {
  const adKeys = Object.keys(CUSTOM_ADS)
  const randomKey = isRandom ? adKeys[Math.floor(Math.random() * adKeys.length)] : adKey
  const ad = CUSTOM_ADS[randomKey]

  return (
    <div className="flex justify-center">
      <div className="my-2 h-fit w-[302px] border-2 border-black bg-black hover:border-teal-500 hover:bg-teal-500">
        <Link
          href={ad.url}
          target="_blank"
          rel="noopener noreferrer mx-auto"
          className="no-underline"
        >
          <Image
            src={ad.image}
            alt={''}
            width={302}
            height={302}
            className="mx-auto my-0 mt-0 mb-0 aspect-1/1 object-cover py-0"
          />
          <div className="mx-auto px-1 py-1 text-xs font-medium text-white no-underline">
            Blog ad
          </div>
          <div className="sr-only">{ad.alt}</div>
        </Link>
      </div>
    </div>
  )
}
