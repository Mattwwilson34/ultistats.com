import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import App from '../../src/App'

describe('App Component', () => {
  test('should render the App component correctly', () => {
    const renderer = ShallowRenderer.createRenderer()
    renderer.render(<App />)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
