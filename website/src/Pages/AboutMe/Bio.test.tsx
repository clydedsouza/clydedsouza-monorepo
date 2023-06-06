import { render, screen } from '@testing-library/react'
import Bio from './Bio'

test('renders page heading', () => {
  render(<Bio />)
  expect(screen.getByText('About me')).toBeInTheDocument()
})
