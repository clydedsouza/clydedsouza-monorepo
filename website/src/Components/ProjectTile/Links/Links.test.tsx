import { render } from '@testing-library/react'
import { IProject } from '../../../Types/ProjectData'
import Links from './Links'

describe('Links', () => {
  it.each([
    {
      hasWebsite: true,
      website: 'https://www.google.com/',
      onGithub: true,
      github: 'https://github.com/',
    },
    {
      hasWebsite: false,
      website: '',
      onGithub: true,
      github: 'https://github.com/',
    },
    {
      hasWebsite: true,
      website: 'https://www.google.com/',
      onGithub: false,
      github: '',
    },
    {
      hasWebsite: false,
      website: '',
      onGithub: false,
      github: '',
    },
  ])(
    'should render links component when hasWebsite is $hasWebsite and onGithub is $onGithub',
    ({ hasWebsite, website, onGithub, github }) => {
      const project: Partial<IProject> = {
        hasWebsite,
        website,
        onGithub,
        github,
      }
      render(<Links {...project} />)
      expect(document.body).toMatchSnapshot()
    }
  )
})
