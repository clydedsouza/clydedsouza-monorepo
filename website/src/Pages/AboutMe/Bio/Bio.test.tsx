import { render } from '@testing-library/react'
import Bio from './Bio'

describe('Bio', () => {
  it('should render bio', () => {
    render(<Bio />)
    expect(document.body).toMatchSnapshot()
  })
})
