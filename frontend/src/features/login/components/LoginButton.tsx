import React, { useEffect, useState } from 'react'
import { Button, CircularProgress } from '@mui/material'
import { getRedirectResult, signInWithRedirect } from 'firebase/auth'
import { auth, provider } from '../../../../../firebase/firebase'
import checkUserExists from '../../../utils/check-user-exists'
import saveUserDataToDB from '../../../utils/save-user-to-db'

const LoginButton = (): JSX.Element => {
  const [redirected, setRedirected] = useState(false)

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      try {
        const response = await getRedirectResult(auth)
        if (response == null) {
          throw Error('Response undefined')
        }

        const userData = response.user?.providerData[0]
        console.log(userData)
        if (userData === null || userData === undefined) {
          throw Error('User data undefined')
        }

        const userExistsInDB: boolean = await checkUserExists(userData)
        if (userExistsInDB) {
          localStorage.removeItem('redirectedFromGoogleAuth')
          window.location.href = '/'
        }

        await saveUserDataToDB(userData)
        localStorage.removeItem('redirectedFromGoogleAuth')
        window.location.href = '/'
      } catch (error) {
        console.error(error)
      }
    }
    const redirected = localStorage.getItem('redirectedFromGoogleAuth')
    if (redirected != null) {
      setRedirected((prevRedirected) => !prevRedirected)
      void getUser()
    }
  }, [])

  const handleLogin = (): void => {
    void (async () => {
      try {
        localStorage.setItem('redirectedFromGoogleAuth', 'true')
        await signInWithRedirect(auth, provider)
      } catch (error) {
        console.log(error)
      }
    })()
  }

  return (
    <>
      {!redirected ? (
        <Button variant="contained" size="large" onClick={handleLogin}>
          Login
        </Button>
      ) : (
        <CircularProgress />
      )}
    </>
  )
}

export default LoginButton
