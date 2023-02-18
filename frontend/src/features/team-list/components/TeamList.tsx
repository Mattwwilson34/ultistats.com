import * as React from 'react'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import AddIcon from '@mui/icons-material/Add'
import ListItemText from '@mui/material/ListItemText'
import ListItemIcon from '@mui/material/ListItemIcon'
import Divider from '@mui/material/Divider'
import TeamListItem from './TeamListItem'
import { uuidv4 } from '@firebase/util'

interface TeamListProps {
  teams: string[] | null
}

export default function TeamList({ teams }: TeamListProps): React.ReactElement {
  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="New Team" />
              <ListItemIcon>
                <AddIcon />
              </ListItemIcon>
            </ListItemButton>
          </ListItem>
        </List>
      </nav>
      <Divider />
      <nav aria-label="secondary mailbox folders">
        {teams == null
          ? null
          : teams.map((team) => {
              return (
                <List key={uuidv4()}>
                  <TeamListItem teamName={team} />
                </List>
              )
            })}
      </nav>
    </Box>
  )
}
