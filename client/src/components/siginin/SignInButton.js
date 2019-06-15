import React, { Fragment, useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import api from '../../helpers/api'
import { SignInSnack } from '../shared/Snacks'
import { useWeb3Context } from 'web3-react'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(3, 0, 2)
  }
}))

export default function ({ onLogin, connector }) {
  const classes = useStyles()
  const { error, active, account, setConnector } = useWeb3Context()
  const [isLoading, setIsLoading] = useState(false)
  const [state, setState] = useState({
    snackMessage: '',
    isSnackOpen: false
  })

  const { isSnackOpen, snackMessage } = state
  savePBKey(account)

  useEffect(() => {
    if (!active && !error) {
    } else if (error) {
      setIsLoading(false)
      setState({ snackMessage: error })
    } else {
      savePBKey(account)
      setIsLoading(false)
    }
  }, [active, error, account])

  async function savePBKey (pbkey) {
    try {
      await api.post('/api/accounts', { pbkey })

      onLogin()
    } catch (e) {
      setState({ snackMessage: e })
    }
  }

  function handleClick () {
    setIsLoading(true)
    setConnector(connector)
  }

  return (
    <Fragment>
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleClick}
      >
        {isLoading ? 'Loading...' : `Sign In with ${connector}`}
      </Button>

      <SignInSnack
        isSnackOpen={isSnackOpen}
        snackMessage={snackMessage}
        onClose={() => setState({ isSnackOpen: false })} />
    </Fragment>
  )
}
