import React from 'react'
import { render } from '@testing-library/react'
import App from './App'

test.skip('renders app', () => {
  const { getByText } = render(<App />)
  const linkElement = getByText(/app/i)
  expect(linkElement).toBeInTheDocument()
})
