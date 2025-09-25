'use client'

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
    image: '/static/ads/mtmas-kindle.jpg',
    url: 'https://mamatellmeastory.clydedsouza.net/',
    alt: 'Image showing the book Mama, Tell Me a Story',
  },
  MAMABOOKPAPERBACK: {
    image: '/static/ads/mtmas-paperback.jpg',
    url: 'https://mamatellmeastory.clydedsouza.net/',
    alt: 'Image showing a person holding the paperback book Mama, Tell Me a Story',
  },
  YOUTUBE: {
    image: '/static/ads/youtube.png',
    url: 'https://www.youtube.com/@clydedz',
    alt: 'Image showing the authors photo beside the YouTube logo and a call to action subscribe button',
  },
  GLIDE: {
    image: '/static/ads/glideapp.png',
    url: 'https://join.glideapps.com/templates-by-clyde',
    alt: 'Image showing a mobile phone and text to persuade the reader to purchase mobile app templates from Glide',
  },
  AITELLMEASTORY: {
    image: '/static/ads/aitellmeastory.png',
    url: 'https://aitellmeastory.clydedsouza.net/',
    alt: 'Image showing the book AI, Tell Me a Story',
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
