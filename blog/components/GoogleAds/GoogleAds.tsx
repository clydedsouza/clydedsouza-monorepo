'use client'

import { AdUnit } from 'next-google-adsense'
import { usePathname } from 'next/navigation'

interface IGoogleAds {
  adLayout?: 'Square' | 'Responsive'
}

export const GoogleAds = ({ adLayout = 'Square' }: IGoogleAds) => {
  const path = usePathname()
  const isProduction = process.env.NODE_ENV === 'production'
  const optionalAttributes = isProduction ? {} : { className: 'border-2 border-indigo-500' }

  const containerWidth = adLayout === 'Square' ? 'w-[302px]' : 'w-full'

  const advt =
    adLayout === 'Square' ? (
      <AdUnit slotId="9442985910" layout="display" />
    ) : (
      <AdUnit slotId="7735157113" layout="in-article" />
    )

  return (
    <div className="flex justify-center" key={path.toString()}>
      <div className={`my-4 ${containerWidth}`}>
        <div {...optionalAttributes}>{advt}</div>
        <div className="mx-auto px-0 py-1 text-right text-xs font-medium text-black/50 no-underline">
          Google ad
        </div>
      </div>
    </div>
  )
}
