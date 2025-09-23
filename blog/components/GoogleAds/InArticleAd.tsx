'use client'

import { AdUnit } from 'next-google-adsense'

interface AdComponentProps {
  adSlot: string
  adFormat?: string
  adLayout?: string
}

const InArticleAd = ({ adSlot, adFormat = 'auto', adLayout = '' }: AdComponentProps) => {
  const isProduction = process.env.NODE_ENV === 'production'
  const optionalAttributes = isProduction ? {} : { className: 'border-2 border-indigo-500' }
  return (
    <div className="flex justify-center">
      <div className="my-4 h-fit w-[302px]">
        <div {...optionalAttributes}>
          <AdUnit publisherId="pub-4666761687967451" slotId="7735157113" layout="in-article" />
        </div>
        <div className="mx-auto px-0 py-1 text-right text-xs font-medium text-black/50 no-underline">
          Google ad
        </div>
      </div>
    </div>
  )
}

export default InArticleAd
