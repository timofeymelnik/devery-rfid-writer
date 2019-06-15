import React from 'react'
import Avatar from '@material-ui/core/Avatar/index'
import CssBaseline from '@material-ui/core/CssBaseline/index'
import Paper from '@material-ui/core/Paper/index'
import Grid from '@material-ui/core/Grid/index'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import Typography from '@material-ui/core/Typography/index'
import { makeStyles } from '@material-ui/core/styles/index'
import bg from '../../assets/praticle-orb.png'
import SignInButton from './SignInButton'
import auth from '../../helpers/auth'
import connectors from '../app/connectors'

const useStyles = makeStyles(theme => ({
  root: {
    height: '100vh'
  },
  image: {
    backgroundImage: `url(${bg}),  linear-gradient(to right, #d9e3ee, #fcfeff)`,
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'left center'
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  }
}))

export default function ({ history }) {
  const classes = useStyles()

  if (auth.loggedIn() && !auth.isSigned()) onLogin()

  async function onLogin () {
    history.push('/signup')
  }

  const keys = Object.keys(connectors)

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className={classes.form} noValidate>
            {keys.map((connector, index) => (
              <div key={connector}>
                <SignInButton onLogin={onLogin} connector={connector} />
                {index < keys.length - 1
                  ? (
                    <Typography variant="body1" display="block" align="center">
                      or
                    </Typography>
                  ) : null}
              </div>
            ))}
          </form>
        </div>
      </Grid>
    </Grid>
  )
}
