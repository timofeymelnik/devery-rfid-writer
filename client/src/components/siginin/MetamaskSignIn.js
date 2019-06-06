import React, { Fragment, useState } from 'react'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import api from '../../helpers/api'
import { SignInSnack } from '../shared/Snacks'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(3, 0, 2),
  }
}))

export default function ({ onLogin }) {
  const classes = useStyles()

  const [state, setState] = useState({
    snackMessage: '',
    isSnackOpen: false
  })

  const { isSnackOpen, snackMessage } = state

  async function handleMetaMaskSignIn () {
    // if (!window.web3 || !window.web3.eth.accounts[0] === undefined) {
    //   setState({ isSnackOpen: true, snackMessage: 'Please sign in to MetaMask.' })
    //   return
    // }

    // TODO: remove after debug
    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()

    try {
      const pbkey = `${mm}/${dd}/${yyyy}`
      await api.post('/api/accounts', { pbkey })

      onLogin(pbkey)
    } catch (e) {
      setState({ isSnackOpen: true, snackMessage: e })
    }
  }

  return (
    <Fragment>
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleMetaMaskSignIn}
      >
        Sign In with MetaMask
      </Button>

      <SignInSnack
        isSnackOpen={isSnackOpen}
        snackMessage={snackMessage}
        onClose={() => setState({ isSnackOpen: false })} />
    </Fragment>
  )
}
