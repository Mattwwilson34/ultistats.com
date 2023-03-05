import React from 'react'
import { act, render } from '@testing-library/react'
import { AuthContext, AuthProvider } from '../../src/Auth/AuthContext'

describe('<AuthProvider />', () => {
  test('provides expected AuthContext object to child elements when currentUser is null', async () => {
    let getByText
    await act(async () => {
      const { getByText: getByTextInner } = render(
        <AuthProvider>
          <AuthContext.Consumer>
            {({ currentUser }) => (
              <p>
                {currentUser === null ? 'User is null' : 'User is not null'}
              </p>
            )}
          </AuthContext.Consumer>
        </AuthProvider>
      )
      getByText = getByTextInner
    })

    expect(getByText('User is null')).toBeTruthy()
  })

  test('provides expected AuthContext object to child elements when currentUser is not null', async () => {
    const user = { email: 'testuser@example.com' }
    let getByText

    await act(async () => {
      const { getByText: getByTextInner } = render(
        <AuthProvider>
          <AuthContext.Provider value={{ currentUser: user }}>
            <AuthContext.Consumer>
              {({ currentUser }) => (
                <p>
                  {currentUser != null ? currentUser.email : 'User is null'}
                </p>
              )}
            </AuthContext.Consumer>
          </AuthContext.Provider>
        </AuthProvider>
      )
      getByText = getByTextInner
    })

    expect(getByText(user.email)).toBeTruthy()
  })
})
