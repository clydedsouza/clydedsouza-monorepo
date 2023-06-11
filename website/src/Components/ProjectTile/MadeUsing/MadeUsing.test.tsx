import { render } from '@testing-library/react'
import { IProject } from '../../../Types/ProjectData'
import MadeUsing from './MadeUsing'

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

describe('Made using', () => {
  it.each([
    {
      madeUsing: [],
    },
    {
      madeUsing: ['html'],
    },
    {
      madeUsing: ['html', 'javascript'],
    },
  ])(
    'should render made using component when $madeUsing is supplied',
    ({ madeUsing }) => {
      const project: IProject = {
        ...emptyProject,
        madeUsing,
      }
      render(<MadeUsing {...project} />)
      expect(document.body).toMatchSnapshot()
    }
  )
})
