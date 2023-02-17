import React from 'react'
import LoginButton from '../features/login'
import Logo from '../assets/logo-color.svg'
const Login = (): JSX.Element => {
  return (
    <div className="Login" data-testid="Login">
      <img src={Logo} alt="UltiStats logo" />
      <LoginButton />
    </div>
  )
}

export default Login
