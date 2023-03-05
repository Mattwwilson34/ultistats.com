import React from 'react'
import { render, screen } from '@testing-library/react'
import TeamListItem from '../../src/features/team-list/components/TeamListItem'

describe('TeamListItem component', () => {
  it('matches snapshot', () => {
    const { asFragment } = render(<TeamListItem teamName="Team A" />)
    expect(asFragment()).toMatchSnapshot()
  })

  it('renders the team name', () => {
    const teamName = 'Team A'
    render(<TeamListItem teamName={teamName} />)
    const teamNameText = screen.getByText(teamName)
    expect(teamNameText).toBeInTheDocument()
  })

  it('does not render any additional text', () => {
    const teamName = 'Team A'
    render(<TeamListItem teamName={teamName} />)
    const additionalText = screen.queryByText(/Team [BCDEFGH]/)
    expect(additionalText).not.toBeInTheDocument()
  })
})
