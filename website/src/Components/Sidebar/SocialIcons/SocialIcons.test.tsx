import { render } from '@testing-library/react'
import SocialIcons from './SocialIcons'

describe('Social icons', () => {
  it('should render social icons', () => {
    render(<SocialIcons />)
    expect(document.body).toMatchSnapshot()
  })
})
