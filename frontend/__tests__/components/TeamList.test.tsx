import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import TeamList from '../../src/features/team-list'
import { QueryClient, QueryClientProvider } from 'react-query'
import { AuthContext } from '../../src/Auth/AuthContext'
import useTeams from '../../src/hooks/useTeams'

jest.mock('../../src/hooks/useTeams')

const mockNavigate = jest.fn()
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}))

describe('TeamList component', () => {
  let queryClient: QueryClient

  const mockContext = {
    currentUser: {
      uid: '1234',
    },
  }

  beforeAll(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
        },
      },
    })
  })

  afterEach(() => {
    queryClient.clear()
  })

  it('renders loading message while teams are being fetched', async () => {
    useTeams.mockReturnValue({ isLoading: true })

    render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockContext}>
          <TeamList />
        </AuthContext.Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    )

    expect(await screen.findByText('Loading...')).toBeInTheDocument()
  })

  it('renderrs error message if teams fail to fetch', async () => {
    useTeams.mockReturnValue({ isError: true })

    render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockContext}>
          <TeamList />
        </AuthContext.Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    )

    expect(await screen.findByText('Error loading teams')).toBeInTheDocument()
  })

  it('renders team names after teams are fetched', async () => {
    const mockTeams = [
      { id: '1', teamName: 'Team A' },
      { id: '2', teamName: 'Team B' },
    ]
    useTeams.mockReturnValue({ data: mockTeams })

    render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockContext}>
          <TeamList />
        </AuthContext.Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    )

    expect(await screen.findByText('Team A')).toBeInTheDocument()
    expect(screen.getByText('Team B')).toBeInTheDocument()
  })

  it('renders nothing if teams is null', () => {
    const mockTeams = null
    useTeams.mockReturnValue({ data: mockTeams })
    render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockContext}>
          <TeamList />
        </AuthContext.Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    )
    const newTeamButton = screen.getByRole('button', { name: /new team/i })
    const divider = screen.getByRole('separator')
    expect(newTeamButton).toBeInTheDocument()
    expect(divider).toBeInTheDocument()
    expect(screen.queryByText(/error loading teams/i)).not.toBeInTheDocument()
    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
  })

  it('navigates to add team page when "New Team" button is clicked', () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AuthContext.Provider value={mockContext}>
          <TeamList />
        </AuthContext.Provider>
      </QueryClientProvider>,
      { wrapper: BrowserRouter }
    )
    const newTeamButton = screen.getByText('New Team')
    newTeamButton.click()
    expect(mockNavigate).toHaveBeenCalledWith('/add-team')
  })
})
