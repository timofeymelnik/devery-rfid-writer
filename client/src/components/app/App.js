import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'

import Route from '../shared/Route'
import NoMatch from '../shared/RouteNotMatch'
import SignInSide from '../siginin/SignIn'
import SignUp from '../signup/SignUp'

function App () {
  return (
    <Router>
      <Switch>
        <Route exact path='/' component={SignInSide} />
        <Route requireAuth path='/signup' component={SignUp} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  )
}

export default App
