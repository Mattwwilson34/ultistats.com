import React, { useContext } from 'react'
import App from '../App'
import { AuthContext } from '../Auth/AuthContext'

const Root = (): JSX.Element => {
  const { currentUser } = useContext(AuthContext)
  if (currentUser == null) {
    window.location.href = '/login'
  }
  return <App />
}

export default Root
