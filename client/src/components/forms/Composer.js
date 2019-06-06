import React, { useEffect, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Route from '../shared/Route'
import FormsList from './FormsList'
import Form from './Forms'
import Button from '@material-ui/core/Button'
import size from 'lodash/size'
import { useStateValue } from '../app/AppContext'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AccountCircle from '@material-ui/icons/AccountCircle'
import auth from '../../helpers/auth'
import AddProduct from '../shared/AddProduct'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(1, 3),
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  space: {
    flex: '1 1 auto',
  },
  toolbar: theme.mixins.toolbar,
}))

export default function ({ history, location, data }) {
  const classes = useStyles()
  const [{ forms }, dispatch] = useStateValue()
  const [isModalOpen, setIsModalOpen] = useState(!size(forms))

  useEffect(() => {
    dispatch({ type: 'forms@populate', payload: data })
  }, [data, dispatch])

  function handleLogout () {
    auth.logout()
    history.replace(location.pathname)
  }

  const handleSelectForm = (formId, path) => () => {
    history.push(`/forms/${formId}/${path}`)
  }

  if (!size(forms)) return (
    <AddProduct isOpen={isModalOpen} onClose={setIsModalOpen} canClose={false} />
  )

  return (
    <div className={classes.root}>
      <CssBaseline />

      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography>Devery RFID writer</Typography>
          <div className={classes.space}></div>
          <Button onClick={handleLogout}><AccountCircle /> Logout</Button>
        </Toolbar>
      </AppBar>

      <FormsList handleSelectForm={handleSelectForm} />

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Route path={`/forms/:formId/:tab`} component={Form} />
      </main>
    </div>
  )
}
