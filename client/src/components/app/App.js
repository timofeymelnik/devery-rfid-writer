import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns';

import Route from '../shared/Route'
import NoMatch from '../shared/RouteNotMatch'
import SignInSide from '../siginin/SignIn'
import SignUp from '../signup/SignUp'
import Forms from '../forms/Forms'
import { StateProvider } from './AppContext'
import reducer, { initialState } from './Reducer'

function App () {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <StateProvider reducer={reducer} initialState={initialState}>
        <Router>
          <Switch>
            <Route exact path='/' component={SignInSide} />
            <Route exact requireAuth path='/signup' component={SignUp} />
            <Route requireAuth path='/forms' component={Forms} />
            <Route component={NoMatch} />
          </Switch>
        </Router>
      </StateProvider>
    </MuiPickersUtilsProvider>
  )
}

export default App
