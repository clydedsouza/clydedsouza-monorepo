import { render } from '@testing-library/react'
import { IProject } from '../../../Types/ProjectData'
import MadeUsing from './MadeUsing'

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
      const project: Partial<IProject> = {
        madeUsing,
      }
      render(<MadeUsing {...project} />)
      expect(document.body).toMatchSnapshot()
    }
  )
})
