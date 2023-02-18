import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import Login from './routes/login'
import AddTeam from './routes/add-team'
import './index.css'
import { AuthProvider } from './Auth/AuthContext'
import ErrorPage from './errors/components/ErrorPage'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root data-testid="root" />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <Login data-testid="login" />,
      },
      {
        path: '/add-team',
        element: <AddTeam data-testid="add-team" />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  // </React.StrictMode>
)
