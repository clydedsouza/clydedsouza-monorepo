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
    alt: 'Mama, Tell Me a Story',
  },
  MAMABOOKPAPERBACK: {
    image: 'https://files.clydedsouza.net/portfolio/dotnetconf.png',
    url: 'https://mamatellmeastory.clydedsouza.net/',
    alt: 'Mama, Tell Me a Story',
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
      <div className="my-2 h-fit w-[302px]">
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
            blurDataURL=""
            className="mx-auto my-0 mt-0 mb-0 aspect-1/1 object-cover py-0"
          />
          <div className="mx-auto px-0 py-1 text-right text-xs font-medium text-black/50 no-underline">
            Blog ad
          </div>
          <div className="sr-only">{ad.alt}</div>
        </Link>
      </div>
    </div>
  )
}
