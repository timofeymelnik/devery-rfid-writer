import React, { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import makeStyles from '@material-ui/core/styles/makeStyles'
import SignInSnack from './SignInSnack'
import TrezorConnect from 'trezor-connect'
import api from '../../helpers/api'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(3, 0, 2),
  }
}))

TrezorConnect.manifest({
  email: 'developer@xyz.com',
  appUrl: 'http://your.application.com'
})

export default function ({ onLogin }) {
  const classes = useStyles()

  const [state, setState] = React.useState({
    snackMessage: '',
    isSnackOpen: false
  })

  const { isSnackOpen, snackMessage } = state

  async function handleTrezorLogin () {
    const { success, payload } = await TrezorConnect.requestLogin({
      challengeHidden: '0123456789abcdef',
      challengeVisual: 'Login to',
    })

    if (success) {
      try {
        await api.post('/api/accounts/signup', { pbkey: success.publicKey })

        onLogin()
      } catch (e) {
        setState({ snackMessage: e })
      }

      return
    }
    setState({ snackMessage: payload.error })
  }

  return (
    <Fragment>
      <Button
        type="button"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.button}
        onClick={handleTrezorLogin}
      >
        Sign In with Trezor
      </Button>

      <SignInSnack
        isSnackOpen={isSnackOpen}
        snackMessage={snackMessage}
        onClose={() => setState({ isSnackOpen: false })} />
    </Fragment>
  )
}
