import React, { useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import Route from '../shared/Route'
import FormsList from './FormsList'
import Form from './Form'
import { useStateValue } from '../app/AppContext'

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  toolbar: {
    minHeight: '48px',
  },
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}))

export default function ({ history, data }) {
  const classes = useStyles()
  const [, dispatch] = useStateValue()

  const handleSelectForm = tab => () => {
    history.push(`/forms/${tab}/edit`)
  }

  useEffect(() => {
    dispatch({ type: 'forms@populate', payload: data })
  }, [data, dispatch])


  return (
    <div className={classes.root}>
      <CssBaseline />

      <FormsList handleSelectForm={handleSelectForm} />

      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Route path={`/forms/:formId`} component={Form} />
      </main>
    </div>
  )
}
