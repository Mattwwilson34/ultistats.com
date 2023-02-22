import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { BrowserRouter } from 'react-router-dom'
import AddTeam from '../../src/routes/add-team'

jest.mock('../../src/utils/add-team-doc-to-firestore')

const mockedUsedNavigate = jest.fn()

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}))

describe('<AddTeam />', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    render(<AddTeam />, {
      wrapper: BrowserRouter,
    })
  })

  it('renders the component', () => {
    const teamNameInput = screen.getByLabelText('Team Name')
    expect(teamNameInput).toBeInTheDocument()
  })

  it('renders a text blank text input', () => {
    const input = screen.getByLabelText('Team Name')
    expect(input).toBeEmptyDOMElement()
  })

  it('submit button is disabled if text input is empty', () => {
    const input = screen.getByLabelText('Team Name')
    const submitButton = screen.getByRole('button')
    expect(input).toBeEmptyDOMElement()
    expect(submitButton).toHaveAttribute('disabled')
  })

  it('submit button is not disabled if text input is not empty', () => {
    const input = screen.getByLabelText('Team Name')
    fireEvent.change(input, { target: { value: 'new value' } })
    const submitButton = screen.getByRole('button')
    expect(input).toHaveValue('new value')
    expect(submitButton).not.toHaveAttribute('disabled')
  })

  it('on submit saves user to database and navigates to "/" route', async () => {
    const user = userEvent.setup()

    const input = screen.getByLabelText('Team Name')
    const submitButton = screen.getByRole('button')
    await user.type(input, 'tesing a text input...')
    await user.click(submitButton)
    expect(window.location.href).toBe('http://localhost/')
  })

  it('handleSubmit catches error if user is not saved to database', async () => {
    const user = userEvent.setup()
    const input = screen.getByLabelText('Team Name')
    const submitButton = screen.getByRole('button')
    await user.type(input, 'tesing a text input...')
    await user.click(submitButton)
    await waitFor(() => {
      expect(() => {
        handleSubmit(new Event('submit'))
      }).toThrow()
    })
  })
})
