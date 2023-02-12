import React, { useEffect } from 'react'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getRedirectResult, signInWithRedirect } from 'firebase/auth'
import { auth, provider } from '../../../../../firebase/firebase'
import Logo from '../../../assets/logo-color.svg'

const LoginButton = (): JSX.Element => {
  const navigate = useNavigate()

  useEffect(() => {
    const getUser = async (): Promise<void> => {
      try {
        const response = await getRedirectResult(auth)
        if (response !== null) {
          localStorage.setItem('firebaseUser', JSON.stringify(response.user))
          navigate('/')
        }
      } catch (error) {
        console.log(error)
      }
    }
    void getUser()
  }, [])

  const handleLogin = (): void => {
    void (async () => {
      try {
        await signInWithRedirect(auth, provider)
      } catch (error) {
        console.log(error)
      }
    })()
  }

  return (
    <>
      <img src={Logo} alt="UltiStats logo" />
      <Button variant="contained" size="large" onClick={handleLogin}>
        Login
      </Button>
    </>
  )
}

export default LoginButton
