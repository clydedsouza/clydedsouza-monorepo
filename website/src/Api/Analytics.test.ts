import mixpanel from 'mixpanel-browser'
import { PageTypes } from '../Components/Navigation/PageTypes'
import {
  initAnalyticsWithSuperProperties,
  sendLinkClickedEvent,
  sendPageViewEvent,
} from './Analytics'
import {
  AnalyticsLinkType,
  MIXPANEL_DEV_PROJECT_ID,
  MIXPANEL_PROD_PROJECT_ID,
} from './IAnalytics'

const mixpanelTrackMock = jest.spyOn(mixpanel, 'track')
const mixpanelInitMock = jest.spyOn(mixpanel, 'init')
const mixpanelRegisterMock = jest.spyOn(mixpanel, 'register')
const processEnvironment = process.env

describe('Analytics', () => {
  beforeEach(() => {
    process.env = { ...processEnvironment }
  })

  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('given sendPageViewEvent is called', () => {
    it('should send a page view event', () => {
      sendPageViewEvent(PageTypes.Cta)
      expect(mixpanelTrackMock).toHaveBeenCalledWith('Page view', {
        page: PageTypes.Cta,
      })
    })

    it('should handle error gracefully', () => {
      const mixpanelTrackThrowErrorMock = jest
        .spyOn(mixpanel, 'track')
        .mockImplementation(() => {
          throw Error('Something is broken')
        })

      sendPageViewEvent(PageTypes.Cta)
      expect(mixpanelTrackThrowErrorMock).toThrowError()
      expect(sendPageViewEvent).not.toThrowError()
    })
  })

  describe('given sendLinkClickedEvent is called', () => {
    describe.each([
      {
        link: 'google.com',
        type: AnalyticsLinkType.GeneralWebsite,
        location: 'testcase',
      },
      {
        link: 'google.com',
        type: AnalyticsLinkType.GeneralWebsite,
        location: undefined,
      },
      {
        link: undefined,
        type: AnalyticsLinkType.GeneralWebsite,
        location: 'testcase',
      },
      {
        link: 'google.com',
        type: undefined,
        location: 'testcase',
      },
    ])(
      'given link is $link, location is $location and type is $type',
      ({ link, location, type }) => {
        it('should send a link clicked event', () => {
          sendLinkClickedEvent({
            link,
            type,
            location,
          })
          expect(mixpanelTrackMock).toHaveBeenCalledWith('Link clicked', {
            destination_url: link,
            link_type: type,
            page_location: location,
          })
        })
      }
    )

    it('should handle error gracefully', () => {
      const mixpanelTrackThrowErrorMock = jest
        .spyOn(mixpanel, 'track')
        .mockImplementation(() => {
          throw Error('Something is broken')
        })

      sendLinkClickedEvent({
        link: 'test',
        type: AnalyticsLinkType.GeneralWebsite,
        location: 'test',
      })
      expect(mixpanelTrackThrowErrorMock).toThrowError()
      expect(sendLinkClickedEvent).not.toThrowError()
    })
  })

  describe('given initAnalyticsWithSuperProperties is called', () => {
    describe.each([
      { environment: 'production', projectId: MIXPANEL_PROD_PROJECT_ID },
      { environment: 'staging', projectId: MIXPANEL_DEV_PROJECT_ID },
      { environment: 'development', projectId: MIXPANEL_DEV_PROJECT_ID },
    ])(
      'given node environment is $environment',
      ({ environment, projectId }) => {
        it(`should initialize analytics with ${projectId} and super properties`, () => {
          process.env = { ...processEnvironment, NODE_ENV: environment }

          initAnalyticsWithSuperProperties()

          expect(mixpanelInitMock).toBeCalledWith(projectId)
          expect(mixpanelRegisterMock).toBeCalledWith({
            environment: environment,
          })
        })
      }
    )

    it('should handle error gracefully', () => {
      const mixpanelInitThrowErrorMock = jest
        .spyOn(mixpanel, 'init')
        .mockImplementation(() => {
          throw Error('Something is broken')
        })
      const mixpanelRegisterThrowErrorMock = jest
        .spyOn(mixpanel, 'register')
        .mockImplementation(() => {
          throw Error('Something is broken')
        })

      initAnalyticsWithSuperProperties()
      expect(mixpanelInitThrowErrorMock).toThrowError()
      expect(mixpanelRegisterThrowErrorMock).toThrowError()
      expect(initAnalyticsWithSuperProperties).not.toThrowError()
    })
  })
})
