import React from 'react'
import { Redirect, Route } from 'react-router-dom'
import Auth from '../../helpers/auth'

const render = Component => props => {
  const { requireAuth } = props

  if (
    requireAuth &&
    !Auth.loggedIn()
  ) return (
    <Redirect to={{
      pathname: '/',
      state: { from: props.location }
    }} />
  )

  if (
    Auth.loggedIn() &&
    !Auth.isSigned() &&
    props.location.pathname !== '/signup'
  ) return (
    <Redirect to={{ pathname: '/signup' }} />
  )

  if (
    Auth.loggedIn() &&
    Auth.isSigned() &&
    (props.location.pathname === '/signup' || props.location.pathname === '/')
  ) return (
    <Redirect to={{ pathname: '/forms' }} />
  )

  return <Component {...props} />
}

export default ({ component: Component, ...rest }) => (
  <Route {...rest} render={render(Component)} />
)
