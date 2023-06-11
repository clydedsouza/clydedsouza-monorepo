import {
  render,
  screen,
  waitForElementToBeRemoved,
} from '@testing-library/react'
import { emptyProject } from '../../../tests/testHelper'
import * as apiCacheModule from '../../Api/Cache'
import Cta from './Cta'

jest.mock('../../Api/Cache')

const ctaDataMockResponse = [
  {
    ...emptyProject,
    id: 'ai-tell-me-a-story',
    title: 'Purchase my book AI, Tell Me a Story from these platforms.',
    hasWebsite: true,
    website: 'https://aitellmeastory.clydedsouza.net',
  },
  {
    ...emptyProject,
    id: 'mama-tell-me-a-story',
    title: 'Purchase my book Mama, Tell Me a Story from these platforms.',
    hasWebsite: true,
    website: 'https://mamatellmeastory.clydedsouza.net',
  },
]

describe('Cta', () => {
  describe('given api return a single item', () => {
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
      await waitForElementToBeRemoved(() =>
        screen.queryByText('Contents are loading...')
      )
      expect(document.body).toMatchSnapshot()
    })
  })

  describe('given api returns multiple items', () => {
    beforeEach(() => {
      jest
        .spyOn(apiCacheModule, 'getCachedProjectData')
        .mockImplementationOnce(() =>
          Promise.resolve({
            app: {},
            data: [ctaDataMockResponse[0], ctaDataMockResponse[1]],
          })
        )
    })

    it('should render cta', async () => {
      render(<Cta />)
      await waitForElementToBeRemoved(() =>
        screen.queryByText('Contents are loading...')
      )
      expect(screen.getByRole('link')).toHaveTextContent(/Purchase my book/)
      expect(screen.getByRole('link')).toHaveAttribute(
        'href',
        expect.stringContaining('tellmeastory.clydedsouza.net')
      )
    })
  })

  describe('given api returns no items', () => {
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
      await waitForElementToBeRemoved(() =>
        screen.queryByText('Contents are loading...')
      )
      expect(document.body).toMatchSnapshot()
    })
  })

  describe('given api returns an error', () => {
    beforeEach(() => {
      jest
        .spyOn(apiCacheModule, 'getCachedProjectData')
        .mockImplementationOnce(() => Promise.reject('Error'))
    })

    it('should render empty cta', async () => {
      render(<Cta />)
      await waitForElementToBeRemoved(() =>
        screen.queryByText('Contents are loading...')
      )
      expect(document.body).toMatchSnapshot()
    })
  })
})
