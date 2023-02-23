import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Login from '../../src/routes/login'

describe('<Login />', () => {
  it('renders the component if user is logged in', () => {
    render(<Login />, { wrapper: BrowserRouter })

    const loginButton = screen.getByTestId('Login')
    expect(loginButton).toBeInTheDocument()
  })
})
