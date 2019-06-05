import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Fab from '@material-ui/core/Fab'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save'
import AddField from './AddField'
import { useStateValue } from '../app/AppContext'
import findIndex from 'lodash/findIndex'

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: 500,
    position: 'relative',
    minHeight: 200,
  },
  fab: {
    position: 'absolute',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  rootGrid: {
    overflowX: 'scroll',
    maxHeight: 'calc(100vh - 86px)'
  },
  rightIcon: {
    marginLeft: theme.spacing(1),
  },
}))

export default function ({ match }) {
  const classes = useStyles()
  const [{ fields, forms }, dispatch] = useStateValue()
  const [isValid, setIsValid] = useState([])

  if (!forms.length) return null

  const { params: { formId } } = match
  const formIndex = findIndex(forms, { _id: formId })

  function handleSaveForm (event) {
    event.preventDefault()

    console.log(isValid, !isValid.every(field => field))

    if (!isValid.every(field => field)) return

    dispatch({ type: 'forms@update_fields', payload: { index: formIndex } })
  }

  function handleAddField () {
    setIsValid([...isValid, false])
    dispatch({ type: 'fields@add' })
  }

  const isFieldValid = index => value => {
    const temp = [...isValid]
    temp[index] = value
    setIsValid(temp)
  }

  function handleSubmit (event) {
    event.preventDefault()
  }

  return (
    <Fragment>
      <Grid container spacing={2} direction="column" className={classes.rootGrid}>
        <Grid container item spacing={0} justify="center">
          <Grid item xs={8}>
            <form noValidate onSubmit={handleSubmit}>
              {fields.map((field, index) =>
                <AddField key={`${field.label}_${index}`} isFieldValid={isFieldValid(index)} index={index} />)}

              {fields.length > 0 && (
                <Button variant="contained" color='primary' onClick={handleSaveForm}>
                  Save
                  <SaveIcon className={classes.rightIcon} />
                </Button>
              )}
            </form>
          </Grid>
        </Grid>
      </Grid>

      <Fab color="primary" aria-label="Add" className={classes.fab} onClick={handleAddField}>
        <AddIcon />
      </Fab>
    </Fragment>
  )
}
