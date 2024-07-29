import { render } from '@testing-library/react'
import Avatar from './Avatar'

describe('Avatar', () => {
  it('should render avatar', () => {
    render(<Avatar />)
    expect(document.body).toMatchSnapshot()
  })
})
