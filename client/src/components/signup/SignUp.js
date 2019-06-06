import React, { useState } from 'react'
import Avatar from '@material-ui/core/Avatar'
import Button from '@material-ui/core/Button'
import CssBaseline from '@material-ui/core/CssBaseline'
import TextField from '@material-ui/core/TextField'
import Grid from '@material-ui/core/Grid'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'
import Container from '@material-ui/core/Container'
import OriginSelect from './OriginSelect'
import api from '../../helpers/api'
import { SignInSnack } from '../shared/Snacks'

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}))

export default function ({ history }) {
  const classes = useStyles()

  const [snackState, setSnackState] = useState({
    snackMessage: '',
    isSnackOpen: false
  })

  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [brandName, setBrandName] = useState('')
  const [origin, setOrigin] = useState('')

  const { snackMessage, isSnackOpen } = snackState

  async function handleSubmit (e) {
    e.preventDefault()

    try {
      const { error, success } = await api.put('/api/accounts', {
        origin,
        firstName,
        lastName,
        brandName
      })

      if (!success) {
        setSnackState({ isSnackOpen: true, snackMessage: error.type })
        return
      }

      history.push('/forms')
    } catch (e) {
      console.error(e)
      setSnackState({ isSnackOpen: true, snackMessage: e })
    }
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Finish Sign up
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                autoFocus
                onChange={e => setFirstName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                onChange={e => setLastName(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <OriginSelect onChange={selected => setOrigin(selected)} />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="brandName"
                label="Brand Name"
                name="brandName"
                onChange={e => setBrandName(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Finish Sign Up
          </Button>
        </form>
      </div>

      <SignInSnack
        isSnackOpen={isSnackOpen}
        snackMessage={snackMessage}
        onClose={() => setSnackState({ isSnackOpen: false })} />
    </Container>
  )
}
