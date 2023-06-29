import App from './App'
import { render, screen } from '@testing-library/react'

describe('Working test', () => {
  it('the title is visible', () => {
    render(<App />)
    expect(screen.getByText("Last 100 news")).toBeInTheDocument()
  })
})
