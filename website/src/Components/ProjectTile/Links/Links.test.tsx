import { render } from '@testing-library/react'
import { IProject } from '../../../Types/ProjectData'
import Links from './Links'

const emptyProject: IProject = {
  title: '',
  description: '',
  image: '',
  imageDescription: '',
  category: '',
  date: '',
  id: '',
  madeUsing: [],
  hasWebsite: true,
  website: 'test',
  onGithub: true,
  github: 'test',
}

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
      const project: IProject = {
        ...emptyProject,
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
