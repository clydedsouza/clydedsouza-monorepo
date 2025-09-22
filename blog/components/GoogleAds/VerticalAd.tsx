'use client'

import { AdUnit } from 'next-google-adsense'

interface AdComponentProps {
  adSlot: string
  adFormat?: string
  adLayout?: string
}

const VerticalAd = ({ adSlot, adFormat = 'auto', adLayout = '' }: AdComponentProps) => {
  return <AdUnit publisherId="pub-4666761687967451" slotId="9442985910" layout="display" />
}

export default VerticalAd
