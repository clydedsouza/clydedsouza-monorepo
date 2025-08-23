'use client'

import { useEffect, useRef } from 'react'

interface AdComponentProps {
  adSlot: string
  adFormat?: string
  adLayout?: string
}

const VerticalAd = ({ adSlot, adFormat = 'auto', adLayout = '' }: AdComponentProps) => {
  console.log(adSlot)
  const adRef = useRef(null)

  useEffect(() => {
    // Dynamically load the AdSense script ONCE
    if (!document.getElementById('adsbygoogle-js')) {
      const script = document.createElement('script')
      script.id = 'adsbygoogle-js'
      script.src =
        'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-4666761687967451'
      script.async = true
      script.crossOrigin = 'anonymous'
      document.head.appendChild(script)
    }
    // Push ad
    try {
      if (window && (window as any).adsbygoogle && adRef.current) {
        ;(window as any).adsbygoogle.push({})
      }
    } catch (e) {
      // ignore duplicate push errors
    }
  }, [])

  return (
    <ins
      ref={adRef}
      className="adsbygoogle"
      style={{ display: 'block' }}
      data-ad-client="ca-pub-4666761687967451"
      data-ad-slot="9442985910"
      data-ad-format="auto"
      data-adtest="on"
      data-full-width-responsive="true"
    ></ins>
  )

  //   const adRef = useRef(null)

  //   useEffect(() => {
  //     if (!window) return
  //     try {
  //       if (adRef.current) {
  //         // Only push if not already initialized
  //         if (!(adRef.current as any)._adsbygoogleLoaded) {
  //           ;(window as any).adsbygoogle = (window as any).adsbygoogle || []
  //           ;(window as any).adsbygoogle.push({})
  //           ;(adRef.current as any)._adsbygoogleLoaded = true
  //         }
  //       }
  //     } catch (e) {
  //       console.error('Error loading ads:', e)
  //     }
  //   }, [])

  //   return (
  //     <ins
  //       ref={adRef}
  //       className="adsbygoogle"
  //       style={{ display: 'block' }}
  //       data-ad-client="ca-pub-4666761687967451"
  //       data-ad-slot={adSlot}
  //       data-ad-format={adFormat}
  //       data-full-width-responsive="true"
  //       data-ad-layout={adLayout}
  //     ></ins>
  //   )
}

export default VerticalAd
