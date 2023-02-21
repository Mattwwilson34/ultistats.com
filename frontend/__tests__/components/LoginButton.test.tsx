/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import {
  getRedirectResult,
  signInWithRedirect,
  getAuth,
  GoogleAuthProvider,
} from 'firebase/auth'
import React from 'react'
import LoginButton from '../../src/features/login'
import checkUserExists from '../../src/utils/check-user-exists'
import saveUserDataToDB from '../../src/utils/save-user-to-db'
import { auth } from '../../../firebase/firebase'
import 'jest-localstorage-mock'

jest.mock('../../../firebase/firebase')
jest.mock('../../src/utils/check-user-exists')
jest.mock('../../src/utils/save-user-to-db')
jest.mock('firebase/auth', () => ({
  getRedirectResult: jest.fn().mockResolvedValue({
    user: {
      providerData: [
        {
          providerId: 'google.com',
          uid: '116719161182905024316',
          displayName: 'Matt Wilson',
          email: 'mattwwilson34@gmail.com',
          phoneNumber: null,
          photoURL:
            'https://lh3.googleusercontent.com/a/AEdFTp4VE-2MhTCVIH5-kVZNziFheGMeDwJPpVG1X_WLpg=s96-c',
        },
      ],
    },
  }),
  signInWithRedirect: jest.fn(),
  getAuth: jest.fn(),
  GoogleAuthProvider: jest.fn(),
}))

describe('LoginButton', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders a login button', () => {
    render(<LoginButton />)
    expect(screen.getByText('Login')).toBeInTheDocument()
  })

  it('does not show circular progress bar initially', () => {
    render(<LoginButton />)
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument()
  })

  it('shows circular progress bar when redirected from Google Auth', async () => {
    localStorage.setItem('redirectedFromGoogleAuth', 'true')

    render(<LoginButton />)

    expect(screen.queryByText('Login')).not.toBeInTheDocument()
    expect(screen.getByRole('progressbar')).toBeInTheDocument()
  })

  it('calls signInWithRedirect on login button click', async () => {
    render(<LoginButton />)
    const loginButton = screen.getByText('Login')
    await userEvent.click(loginButton)
    expect(signInWithRedirect).toHaveBeenCalled()
  })

  it('redirects to home page if user exists in DB', async () => {
    const providerData = [{ providerId: 'google.com', uid: '12345' }]
    const getRedirectResultMock = getRedirectResult as jest.MockedFunction<
      typeof getRedirectResult
    >
    getRedirectResultMock.mockResolvedValueOnce({ user: { providerData } })
    const checkUserExistsMock = checkUserExists as jest.MockedFunction<
      typeof checkUserExists
    >
    checkUserExistsMock.mockResolvedValueOnce(true)

    render(<LoginButton />)

    await waitFor(() => {
      expect(localStorage.getItem('redirectedFromGoogleAuth')).toBeNull()
      expect(window.location.href).toEqual('http://localhost/')
    })
  })

  it('saves user data to DB if user does not exist in DB', async () => {
    const providerData = {
      providerId: 'google.com',
      uid: '116719161182905024316',
      displayName: 'Matt Wilson',
      email: 'mattwwilson34@gmail.com',
      phoneNumber: null,
      photoURL:
        'https://lh3.googleusercontent.com/a/AEdFTp4VE-2MhTCVIH5-kVZNziFheGMeDwJPpVG1X_WLpg=s96-c',
    }

    const getRedirectResultMock = getRedirectResult as jest.MockedFunction<
      typeof getRedirectResult
    >
    getRedirectResultMock.mockResolvedValueOnce({ user: { providerData } })
    const checkUserExistsMock = checkUserExists as jest.MockedFunction<
      typeof checkUserExists
    >
    checkUserExistsMock.mockResolvedValueOnce(false)

    render(<LoginButton />)

    await waitFor(() => {
      expect(saveUserDataToDB).toHaveBeenCalledWith(providerData)
      expect(localStorage.getItem('redirectedFromGoogleAuth')).toBeNull()
      expect(window.location.href).toEqual('http://localhost/')
    })
  })
})
