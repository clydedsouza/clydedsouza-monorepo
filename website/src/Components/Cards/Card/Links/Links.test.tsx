import { render } from '@testing-library/react'
import { IProject } from '../../../../Api/IProjectData'
import Links from './Links'

describe('Links', () => {
  it.each([
    {
      website: 'https://www.google.com/',
      github: 'https://github.com/',
    },
    {
      website: '',
      github: 'https://github.com/',
    },
    {
      website: 'https://www.google.com/',
      github: '',
    },
    {
      website: '',
      github: '',
    },
  ])(
    'should render links component when website is $website and github is $github',
    ({ website, github }) => {
      const project: Partial<IProject> = {
        website,
        github,
      }
      render(<Links {...project} />)
      expect(document.body).toMatchSnapshot()
    }
  )
})
