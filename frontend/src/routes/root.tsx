import React, { useContext, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { AuthContext } from '../Auth/AuthContext'
import TopAppNav from '../features/top-app-nav'
import TeamList from '../features/team-list'

const mockTeamData: string[] = [
  'Atlanta Hustle',
  'Austin Sol',
  'Chicago Union',
  'Dallas Roughnecks',
]

const Root = (): JSX.Element => {
  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate()

  useEffect(() => {
    if (
      currentUser == null &&
      window.location.href !== 'http://localhost:5173/login'
    ) {
      navigate('/login')
    }
  }, [])

  return (
    <>
      <TopAppNav />
      {window.location.href === 'http://localhost:5173/' ? (
        <>
          <TeamList teams={mockTeamData} />
        </>
      ) : null}
      <Outlet />
    </>
  )
}

export default Root
