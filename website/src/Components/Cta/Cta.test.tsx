import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { emptyProject } from '../../../TestHelpers/testHelper'
import * as apiCacheModule from '../../Api/Cache'
import Cta from './Cta'

jest.mock('../../Api/Cache')

const ctaDataMockResponse = [
  {
    ...emptyProject,
    id: 'ai-tell-me-a-story',
    title: 'Purchase my book AI, Tell Me a Story from these platforms.',
    website: 'https://aitellmeastory.clydedsouza.net',
  },
  {
    ...emptyProject,
    id: 'mama-tell-me-a-story',
    title: 'Purchase my book Mama, Tell Me a Story from these platforms.',
    website: 'https://mamatellmeastory.clydedsouza.net',
  },
]

describe('Cta', () => {
  describe('given API return a single item', () => {
    beforeEach(() => {
      jest
        .spyOn(apiCacheModule, 'getCachedProjectData')
        .mockImplementationOnce(() =>
          Promise.resolve({
            app: {},
            data: [ctaDataMockResponse[0]],
          })
        )
    })

    it('should render cta', async () => {
      render(<Cta />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
      expect(document.body).toMatchSnapshot()
    })
  })

  describe.each([
    { title: '', website: '' },
    { title: 'test', website: '' },
    { title: '', website: 'test' },
  ])('given API return a single invalid item', ({ title, website }) => {
    beforeEach(() => {
      jest
        .spyOn(apiCacheModule, 'getCachedProjectData')
        .mockImplementationOnce(() =>
          Promise.resolve({
            app: {},
            data: [{ ...emptyProject, title, website }],
          })
        )
    })

    it(`should render cta when title is ${title} and website is ${website}`, async () => {
      render(<Cta />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
      expect(document.body).toMatchSnapshot()
    })
  })

  describe('given API returns multiple items', () => {
    beforeEach(() => {
      jest
        .spyOn(apiCacheModule, 'getCachedProjectData')
        .mockImplementationOnce(() =>
          Promise.resolve({
            app: {},
            data: [...ctaDataMockResponse],
          })
        )
    })

    it('should render cta', async () => {
      render(<Cta />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
      expect(screen.getByRole('link')).toHaveTextContent(/Purchase my book/)
      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        expect.stringContaining('tellmeastory.clydedsouza.net')
      )
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

    it('should render empty cta', async () => {
      render(<Cta />)
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

    it('should render empty cta', async () => {
      render(<Cta />)
      await waitForElementToBeRemoved(() => screen.queryByRole('progressbar'))
      expect(document.body).toMatchSnapshot()
    })
  })
})
