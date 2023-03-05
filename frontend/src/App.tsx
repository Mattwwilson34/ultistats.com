import React from 'react'
import TopAppNav from './features/top-app-nav'
import TeamList from './features/team-list'

const mockTeamData: string[] = [
  'Atlanta Hustle',
  'Austin Sol',
  'Chicago Union',
  'Dallas Roughnecks',
]

function App(): React.ReactElement {
  return (
    <div className="App" data-testid="App">
      <TopAppNav />
      <TeamList teams={mockTeamData} />
    </div>
  )
}

export default App
