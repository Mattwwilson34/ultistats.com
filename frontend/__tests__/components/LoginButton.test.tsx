import React from 'react'
import LoginButton from '../../src/features/login'
import ShallowRenderer from 'react-test-renderer/shallow'

describe('LoginButton Component', () => {
  test('Renders LoginButtonComponent', () => {
    const renderer = ShallowRenderer.createRenderer()
    renderer.render(<LoginButton />)
    const result = renderer.getRenderOutput()
    expect(result).toMatchSnapshot()
  })
})
