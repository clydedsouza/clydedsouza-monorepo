import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import * as apiCacheModule from '../../Api/Cache'
import { PageTypes } from '../Navigation/PageTypes'
import Cards from './Cards'

jest.mock('../../Api/Cache')

const projectDataMockResponse = [
  {
    id: '20121201-tulips-cover',
    title: 'Tulips cover page designs',
    date: '01 Dec 2012',
    description:
      'I was responsible for designing the cover page for Tulips - a church bulletin. Each cover page was designed in accordance to a theme for that particular issue and conveyed the underlying meaning of the theme.',
    website: '',
    github: '',
    madeUsing: ['Photoshop'],
    category: 'Graphic Design',
    image: 'https://files.clydedsouza.net/portfolio/tulips-collage.jpg',
    imageDescription: "Church magazine cover designs by Clyde D'Souza",
  },
  {
    id: '20170701-profile-sticker',
    title: 'Profile Sticker',
    date: '01 Jul 2017',
    description:
      'Profile Sticker is a web app that allows a user to add a sticker from different themes to their profile picture. The user can choose to upload a picture from and download to a computer or Facebook.',
    website: 'https://profilesticker.net',
    github: 'https://github.com/profilesticker/profilesticker.github.io/',
    madeUsing: ['HTML', 'CSS', 'SCSS', 'JavaScript', 'Mustache.js'],
    category: 'Website',
    image: 'https://files.clydedsouza.net/portfolio/profilesticker-website.png',
    imageDescription:
      'Add a sticker to your profile picture using Profile Sticker in just 4 easy steps.',
  },
]

const sortCallbackMock = jest.fn()

describe('Cards', () => {
  afterEach(() => {
    jest.resetAllMocks()
  })

  describe('given API returns a single item', () => {
    beforeEach(() => {
      jest
        .spyOn(apiCacheModule, 'getCachedProjectData')
        .mockImplementationOnce(() =>
          Promise.resolve({
            app: {},
            data: [projectDataMockResponse[0]],
          })
        )
    })

    it('should render cards', async () => {
      render(<Cards pageType={PageTypes.Portfolio} />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
      expect(document.body).toMatchSnapshot()
    })

    it('should not call the supplied sort callback', async () => {
      render(
        <Cards pageType={PageTypes.Portfolio} sortCards={sortCallbackMock} />
      )
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
      expect(sortCallbackMock).not.toBeCalled()
    })

    describe.each([PageTypes.Portfolio, PageTypes.Platforms])(
      'given page type is %s',
      (pageType: PageTypes) => {
        it(`should call API with ${pageType} page type`, async () => {
          render(<Cards {...{ pageType: pageType }} />)
          await waitForElementToBeRemoved(() =>
            screen.queryByRole('progressbar')
          )
          expect(apiCacheModule.getCachedProjectData).toBeCalledTimes(1)
          expect(apiCacheModule.getCachedProjectData).toBeCalledWith(pageType)
        })
      }
    )
  })

  describe('given API returns multiple items', () => {
    beforeEach(() => {
      jest
        .spyOn(apiCacheModule, 'getCachedProjectData')
        .mockImplementationOnce(() =>
          Promise.resolve({
            app: {},
            data: [...projectDataMockResponse],
          })
        )
    })

    it('should render cards', async () => {
      render(<Cards pageType={PageTypes.Portfolio} />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
      expect(document.body).toMatchSnapshot()
    })

    it('should call the supplied sort callback', async () => {
      render(
        <Cards pageType={PageTypes.Portfolio} sortCards={sortCallbackMock} />
      )
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
      expect(sortCallbackMock).toBeCalled()
    })
  })

  describe('given API returns no items', () => {
    beforeEach(() => {
      jest
        .spyOn(apiCacheModule, 'getCachedProjectData')
        .mockImplementationOnce(() =>
          Promise.resolve({
            app: {},
            data: [],
          })
        )
    })

    it('should render empty cards', async () => {
      render(<Cards pageType={PageTypes.Portfolio} />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
      expect(document.body).toMatchSnapshot()
    })
  })

  describe('given API returns an error', () => {
    beforeEach(() => {
      jest
        .spyOn(apiCacheModule, 'getCachedProjectData')
        .mockImplementationOnce(() => Promise.reject('Error'))
    })

    it('should render empty cards', async () => {
      render(<Cards pageType={PageTypes.Portfolio} />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
      expect(document.body).toMatchSnapshot()
    })
  })
})
