import React from 'react'
import { Link } from 'react-router-dom'

interface ErrorProps {
  message?: string
}

function ErrorPage({ message }: ErrorProps): React.ReactElement {
  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 Not Found</h1>
      {message != null && <p style={styles.message}>{message}</p>}
      <p style={styles.back}>
        <Link to="/" style={styles.link}>
          Go back to the homepage
        </Link>
      </p>
    </div>
  )
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    textAlign: 'center',
    backgroundColor: '#f9f9f9',
  },
  heading: {
    fontSize: '4rem',
    marginBottom: '1rem',
    color: '#333',
  },
  message: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: '#666',
  },
  back: {
    fontSize: '1.2rem',
    marginTop: '2rem',
  },
  link: {
    color: '#0077cc',
    textDecoration: 'none',
    fontWeight: 'bold',
  },
}

export default ErrorPage
