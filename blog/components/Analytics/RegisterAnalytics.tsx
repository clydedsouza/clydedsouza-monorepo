'use client'

import { useEffect } from 'react'
import { initMixpanel } from '../../lib/mixpanel'

export const RegisterAnalytics = () => {
  useEffect(() => {
    initMixpanel()
  }, [])
  return <></>
}
