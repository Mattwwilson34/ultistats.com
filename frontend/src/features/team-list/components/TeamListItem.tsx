import * as React from 'react'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'

interface TeamListItemProps {
  teamName: string
}

export default function TeamListItem({
  teamName,
}: TeamListItemProps): React.ReactElement {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemText primary={teamName} />
      </ListItemButton>
    </ListItem>
  )
}
