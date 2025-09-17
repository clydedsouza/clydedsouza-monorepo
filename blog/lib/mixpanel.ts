import mixpanel from 'mixpanel-browser'

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN

export const initMixpanel = () => {
  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token is missing! Check your .env file.')
    return
  }

  mixpanel.init(MIXPANEL_TOKEN, {
    autocapture: {
      pageview: 'url-with-path-and-query-string',
      click: true,
      input: true,
      rage_click: true,
      scroll: true,
      submit: true,
      capture_text_content: false,
    },
    debug: true,
    track_pageview: 'url-with-path-and-query-string',
    ignore_dnt: true,
    persistence: 'localStorage',
  })
}
