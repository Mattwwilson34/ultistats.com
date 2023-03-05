import React from 'react'
import { render, screen } from '@testing-library/react'
import useTeams from '../../src/hooks/useTeams'
import { QueryClient, QueryClientProvider } from 'react-query'
import getTeams from '../../src/utils/get-teams'

jest.mock('../../src/utils/get-teams', () => jest.fn())

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
})

const TestComponent = ({ userId }: { userId: string }): JSX.Element => {
  const { data, error, isLoading, isError } = useTeams(userId)

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (isError) {
    return <div>Error: {error.message}</div>
  }

  return (
    <div>
      <h1>Teams</h1>
      <ul>
        {data.map((team: any) => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  )
}

describe('useTeams', () => {
  test('fetches and renders teams', async () => {
    getTeams.mockResolvedValueOnce([
      { id: 1, name: 'Team 1' },
      { id: 2, name: 'Team 2' },
      { id: 3, name: 'Team 3' },
    ])

    const userId = '123'
    render(
      <QueryClientProvider client={queryClient}>
        <TestComponent userId={userId} />
      </QueryClientProvider>
    )

    // Check if loading state is displayed
    expect(screen.getByText('Loading...')).toBeInTheDocument()

    // Wait for data to load
    await screen.findByText('Teams')

    // Check if team names are rendered
    expect(screen.getByText('Team 1')).toBeInTheDocument()
    expect(screen.getByText('Team 2')).toBeInTheDocument()
  })
})
