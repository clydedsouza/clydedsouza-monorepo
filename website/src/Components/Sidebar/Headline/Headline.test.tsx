import { render } from '@testing-library/react'
import Headline from './Headline'

describe('Headline', () => {
  it('should render headline and tagline', () => {
    render(<Headline />)
    expect(document.body).toMatchSnapshot()
  })
})
