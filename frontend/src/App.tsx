import React from 'react'
import { Button } from '@mui/material'
import { auth } from '../../firebase/firebase'

function App(): React.ReactElement {
  const handleLogout = (): void => {
    void (async () => {
      try {
        await auth.signOut()
      } catch (error) {
        console.log(error)
      }
    })()
  }
  return (
    <div className="App" data-testid="App">
      <Button variant="text">{`Welcome`}</Button>
      <Button variant="contained" onClick={handleLogout}>
        Logout
      </Button>
    </div>
  )
}

export default App
