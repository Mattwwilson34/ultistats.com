import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import logoutUser from '../../../utils/logout-user'

export default function TopAppNav(): React.ReactElement {
  return (
    <Box sx={{ flexGrow: 1, width: 1, marginBottom: 2 }}>
      <AppBar position="static">
        <Toolbar disableGutters>
          <IconButton color="inherit" aria-label="menu"></IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            UltiStats
          </Typography>
          <Button color="inherit" onClick={logoutUser}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  )
}
