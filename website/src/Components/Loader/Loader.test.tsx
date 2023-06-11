import { render } from '@testing-library/react'
import { LoaderTypes } from '../../Types/LoaderTypes'
import Loader from './Loader'

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
