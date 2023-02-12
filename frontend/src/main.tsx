import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, redirect, RouterProvider } from 'react-router-dom'
import Root from './routes/root'
import Login from './routes/login'
import './index.css'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    loader: () => {
      const user = localStorage.getItem('firebaseUser')
      if (user != null) {
        return <Root />
      } else {
        return redirect('/login')
      }
    },
  },
  {
    path: '/login',
    element: <Login />,
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
