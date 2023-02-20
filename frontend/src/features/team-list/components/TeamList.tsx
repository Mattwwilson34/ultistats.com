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
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../Auth/AuthContext'
import useTeams from '../../../hooks/useTeams'

export default function TeamList(): React.ReactElement {
  const { currentUser } = React.useContext(AuthContext)
  const navigate = useNavigate()
  const { data: teams, isLoading, isError } = useTeams(currentUser.uid)

  const handleNewTeamClick = (): void => {
    navigate('/add-team')
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error loading teams</div>
  }

  console.log(teams)

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <nav aria-label="secondary mailbox folders">
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleNewTeamClick}>
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
                  <TeamListItem teamName={team.teamName} />
                </List>
              )
            })}
      </nav>
    </Box>
  )
}
