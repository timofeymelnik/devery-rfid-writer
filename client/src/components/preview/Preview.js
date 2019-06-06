import React, { useState } from 'react'
import Paper from '@material-ui/core/Paper'
import { useStateValue } from '../app/AppContext'
import Input from './Input'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core'
import PublishIcon from '@material-ui/icons/Publish'
import useForm from '../../helpers/useForm'
import snakeCase from 'lodash/snakeCase'
import size from 'lodash/size'
import api from '../../helpers/api'
import { ErrorSnack } from '../shared/Snacks'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2, 2),
    margin: theme.spacing(2, 0),
  },
  textField: {
    margin: theme.spacing(1, 0),
  },
  listGrid: {
    overflowX: 'scroll',
    height: 'calc(100vh - 86px)'
  },
}))

export default function ({ formId, formIndex, history, form, isValid }) {
  const classes = useStyles()

  const [, dispatch] = useStateValue()

  const [snackState, setSnackState] = useState({
    isSnackOpen: false,
    snackMessage: ''
  })

  const { values, handleChange } = useForm(() => {})

  async function handleFormApprove (event) {
    event.preventDefault()

    dispatch({ type: 'forms@approve', payload: { formIndex } })

    try {
      await api.put(`/api/forms/${formId}`, { form })

      history.push(`/forms/${formId}/items`)
    } catch (e) {
      console.error(e)
      setSnackState({ isSnackOpen: true, snackMessage: e })
    }
  }

  if (!size(form.fields)) return null

  return (
    <div className={classes.listGrid}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            {form.fields.map(({ field, name }, index) => (
              <div
                key={`${field.label}_${index}`}
                className={classes.textField}>
                <Input
                  value={values[snakeCase(name)]}
                  name={name}
                  handleChange={handleChange}
                  field={field} />
              </div>
            ))}
          </Paper>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item xs={12} md={9}>
          <Typography>To start marking items you must approve this form. After form is approved it can't be
            changed.</Typography>
        </Grid>
        <Grid item xs={12} md={3}>
          <Button
            color="primary"
            variant="contained"
            disabled={!isValid.every(field => !!field)}
            onClick={handleFormApprove}>
            <PublishIcon /> Approve
          </Button>
        </Grid>
      </Grid>

      <ErrorSnack
        isSnackOpen={snackState.isSnackOpen}
        snackMessage={snackState.snackMessage}
        onClose={() => setSnackState({ isSnackOpen: false })} />
    </div>
  )
}
