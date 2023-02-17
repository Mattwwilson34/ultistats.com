import React, { createContext, useEffect, useState } from 'react'
import { auth } from '../../../firebase/firebase'
import { type User } from 'firebase/auth'
import { CircularProgress } from '@mui/material'

interface AuthContextType {
  currentUser: User | null
}

const AuthContext = createContext<AuthContextType>({ currentUser: null })

const AuthProvider = ({
  children,
}: {
  children: React.ReactNode
}): JSX.Element => {
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [pending, setPending] = useState<boolean>(true)

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setPending(false)
    })
  }, [currentUser])

  if (pending) {
    return (
      <>
        <CircularProgress />
      </>
    )
  }
  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export { AuthProvider, AuthContext }
