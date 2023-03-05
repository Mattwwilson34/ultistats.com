import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { AuthContext } from '../../src/Auth/AuthContext'
import Root from '../../src/routes/root'

const mockContext = {
  currentUser: {
    uid: '1234',
  },
}

describe('<Root />', () => {
  it('renders the component if user is logged in', () => {
    render(
      <AuthContext.Provider value={mockContext}>
        <Root />
      </AuthContext.Provider>,
      { wrapper: BrowserRouter }
    )

    const header = screen.getByText('UltiStats')
    expect(header).toBeInTheDocument()
    expect(window.location.href).toBe('http://localhost/')
  })

  it('navigates to login page if user not logged in', () => {
    render(
      <AuthContext.Provider value={{ currentUser: null }}>
        <Root />
      </AuthContext.Provider>,
      { wrapper: BrowserRouter }
    )

    const header = screen.getByText('UltiStats')
    expect(header).toBeInTheDocument()
    expect(window.location.href).toBe('http://localhost/login')
  })
})
