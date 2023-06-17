import mixpanel from 'mixpanel-browser'
import { PageTypes } from '../Components/Navigation/PageTypes'
import {
  ILinkClickedProps,
  MIXPANEL_DEV_PROJECT_ID,
  MIXPANEL_PROD_PROJECT_ID,
} from './IAnalytics'

export const initAnalyticsWithSuperProperties = () => {
  const mixpanelProjectId =
    process.env.NODE_ENV === 'production'
      ? MIXPANEL_PROD_PROJECT_ID
      : MIXPANEL_DEV_PROJECT_ID

  try {
    mixpanel.init(mixpanelProjectId)
    mixpanel.register({
      environment: process.env.NODE_ENV,
    })
  } catch {
    undefined
  }
}

export const sendPageViewEvent = (pageType: PageTypes) => {
  try {
    mixpanel.track('Page view', { page: pageType })
  } catch {
    undefined
  }
}

export const sendLinkClickedEvent = (props: ILinkClickedProps) => {
  try {
    mixpanel.track('Link clicked', {
      destination_url: props.link,
      link_type: props.type,
      page_location: props.location,
    })
  } catch {
    undefined
  }
}
