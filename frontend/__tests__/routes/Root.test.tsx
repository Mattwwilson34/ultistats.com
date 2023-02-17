import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { create } from 'react-test-renderer'
import App from '../../src/App'

describe('Root route', () => {
  test('renders Home component when user navigates to root path', () => {
    const renderer = create(
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </BrowserRouter>
    )
    const root = renderer.root
    expect(root.findByType(App)).toBeTruthy()
  })
})
