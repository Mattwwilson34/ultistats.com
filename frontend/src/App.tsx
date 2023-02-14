import React, { useContext } from 'react'
import { Button } from '@mui/material'
import userContext from './utils/user-context'

function App(): React.ReactElement {
  const user = useContext(userContext) ?? {displayName: 'User not found in DB'}
  return (
    <div className="App">
      <Button variant="text">
        {`Welcome ${user?.displayName}`}
      </Button>
    </div>
  )
}

export default App
