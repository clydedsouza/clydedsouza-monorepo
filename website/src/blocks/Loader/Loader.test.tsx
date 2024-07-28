import { render } from '@testing-library/react'
import Loader from './Loader'
import { LoaderTypes } from './LoaderTypes'

describe('Loader', () => {
  it('should render default loader', () => {
    render(<Loader />)
    expect(document.body).toMatchSnapshot()
  })

  it.each([LoaderTypes.Primary, LoaderTypes.Inverse])(
    'should render %s variant loader',
    (variant) => {
      render(<Loader variant={variant} />)
      expect(document.body).toMatchSnapshot()
    }
  )
})
