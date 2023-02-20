import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box'
import { TextField, Button } from '@mui/material'
import { addTeamDocToFireStore } from '../utils/add-team-doc-to-firestore'
import { AuthContext } from '../Auth/AuthContext'
import { useNavigate } from 'react-router-dom'

const AddTeam = (): React.ReactElement => {
  const navigate = useNavigate()
  const { currentUser } = useContext(AuthContext)
  const [disabled, setDisabled] = useState(true)
  const [formData, setFormData] = useState({
    teamName: '',
    userUid: currentUser != null ? currentUser.uid : '',
  })

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setFormData({ ...formData, [event.target.name]: event.target.value })
    if (event.target.value === '') {
      setDisabled(true)
    } else {
      setDisabled(false)
    }
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
    void (async () => {
      event.preventDefault()
      try {
        setDisabled(true)
        await addTeamDocToFireStore(formData)
        navigate('/')
      } catch (error) {
        console.log(error)
      }
    })()
  }

  return (
    <Box
      sx={{
        width: 500,
        maxWidth: '100%',
      }}
    >
      <form onSubmit={handleSubmit}>
        <TextField
          name="teamName"
          label="Team Name"
          fullWidth
          onChange={handleInputChange}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          disabled={disabled}
        >
          Submit
        </Button>
      </form>
    </Box>
  )
}

export default AddTeam
