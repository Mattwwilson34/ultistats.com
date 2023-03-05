import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import TopAppNav from '../../src/features/top-app-nav'
import logoutUser from '../../src/utils/logout-user'

jest.mock('../../src/utils/logout-user')

describe('TopAppNav', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe('TopAppNav component', () => {
    it('matches snapshot', () => {
      const { asFragment } = render(<TopAppNav />)
      expect(asFragment()).toMatchSnapshot()
    })

    it('renders the app name', () => {
      const { getByText } = render(<TopAppNav />)
      const appName = getByText(/UltiStats/)
      expect(appName).toBeInTheDocument()
    })

    it('renders a logout button', () => {
      const { getByRole } = render(<TopAppNav />)
      const logoutButton = getByRole('button', { name: /Logout/ })
      expect(logoutButton).toBeInTheDocument()
    })

    it('calls logoutUser when the Logout button is clicked', () => {
      const { getByText } = render(<TopAppNav />)
      const logoutButton = getByText('Logout')
      fireEvent.click(logoutButton)
      expect(logoutUser).toHaveBeenCalled()
    })
  })
})
