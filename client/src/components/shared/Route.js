import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Auth from '../../helpers/auth'

const render = (requireAuth, Component) => props => {
  const { location } = props
  const { pathname } = location

  if (requireAuth && !Auth.loggedIn())
    return <Redirect to={{ pathname: '/', state: { from: location } }} />

  if (Auth.loggedIn() && !Auth.isSigned() && pathname !== '/signup')
    return <Redirect to={{ pathname: '/signup' }} />

  if (Auth.loggedIn() && Auth.isSigned() && (pathname === '/signup' || pathname === '/'))
    return <Redirect to={{ pathname: '/forms' }} />

  return <Component {...props} />
}

export default ({ component: Component, requireAuth, ...rest }) => (
  <Route {...rest} render={render(requireAuth, Component)} />
)
