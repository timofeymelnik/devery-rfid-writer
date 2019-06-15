import React from 'react'
import { BrowserRouter as Router, Switch } from 'react-router-dom'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import DateFnsUtils from '@date-io/date-fns'
import Web3Provider from 'web3-react'
import Web3 from 'web3'
import connectors from "./connectors";

import Route from '../shared/Route'
import NoMatch from '../shared/RouteNotMatch'
import SignInSide from '../siginin/SignIn'
import SignUp from '../signup/SignUp'
import Forms from '../forms/FormsLoader'
import { StateProvider } from './AppContext'
import reducer, { initialState } from './Reducer'

function App () {
  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <StateProvider reducer={reducer} initialState={initialState}>
        <Web3Provider connectors={connectors} libraryName="web3.js" web3Api={Web3}>
          <Router>
            <Switch>
              <Route exact path='/' component={SignInSide} />
              <Route exact requireAuth path='/signup' component={SignUp} />
              <Route requireAuth path='/forms' component={Forms} />
              <Route component={NoMatch} />
            </Switch>
          </Router>
        </Web3Provider>
      </StateProvider>
    </MuiPickersUtilsProvider>
  )
}

export default App
