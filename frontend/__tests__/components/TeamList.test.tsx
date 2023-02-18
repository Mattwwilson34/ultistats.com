import React from 'react'
import { render, screen } from '@testing-library/react'
import ShallowRenderer from 'react-test-renderer/shallow'
import TeamList from '../../src/features/team-list'

const mockTeamData: string[] = [
  'Atlanta Hustle',
  'Austin Sol',
  'Chicago Union',
  'Dallas Roughnecks',
]

describe('AppBar Component', () => {
  test('should render the AppBar component correctly', () => {
    const renderer = ShallowRenderer.createRenderer()
    renderer.render(<TeamList teams={mockTeamData} />)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })

  it('renders a "New Team" button', () => {
    render(<TeamList teams={null} />)
    const newTeamButton = screen.getByText('New Team')
    expect(newTeamButton).toBeInTheDocument()
  })

  it('renders a list of teams when teams prop is not null', () => {
    const teams = ['Team A', 'Team B', 'Team C']
    render(<TeamList teams={teams} />)
    teams.forEach((team) => {
      const teamListItem = screen.getByText(team)
      expect(teamListItem).toBeInTheDocument()
    })
  })

  it('does not render any teams when teams prop is null', () => {
    render(<TeamList teams={null} />)
    const listItems = screen.queryAllByRole('listitem')
    expect(listItems.length).toBe(1) // only "New Team" button
  })
})
