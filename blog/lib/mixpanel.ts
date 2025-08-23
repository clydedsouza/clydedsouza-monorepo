import mixpanel from 'mixpanel-browser/dist/mixpanel.cjs'

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

export const initMixpanel = () => {
  console.log(MIXPANEL_TOKEN)
  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token is missing! Check your .env file.')
    return
  }

  mixpanel.init(MIXPANEL_TOKEN, {
    debug: true,
    track_pageview: true,
    ignore_dnt: true,
    autocapture: true,
  })
}
