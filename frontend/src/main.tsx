import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import Login from './routes/login'
import './index.css'
import { AuthProvider } from './Auth/AuthContext'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root data-testid="root" />,
  },
  {
    path: '/login',
    element: <Login data-testid="login" />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  // </React.StrictMode>
)
