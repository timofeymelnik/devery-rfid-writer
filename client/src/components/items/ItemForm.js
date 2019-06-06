import React, { Fragment, useCallback, useEffect } from 'react'
import { makeStyles } from '@material-ui/core'
import Paper from '@material-ui/core/Paper'
import Input from '../preview/Input'
import Button from '@material-ui/core/Button'
import AddIcon from '@material-ui/icons/Add'
import SaveIcon from '@material-ui/icons/Save'
import useForm from '../../helpers/useForm'
import { useStateValue } from '../app/AppContext'
import findIndex from 'lodash/findIndex'
import ItemValidationRules from './ItemValidationRules'
import api from '../../helpers/api'

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2, 2),
    margin: theme.spacing(2, 0),
  },
  input: {
    margin: theme.spacing(1, 0),
  },
}))

export default function ({ formId, selectedItem, setSelectedItem }) {
  const classes = useStyles()

  const [{ forms, items }, dispatch] = useStateValue()
  const formIndex = findIndex(forms, { _id: formId })
  const { fields } = forms[formIndex]

  const {
    errors,
    values,
    handleSubmit,
    handleChange,
    handleSetValues
  } = useForm(handleItemAction, items[selectedItem] || {}, ItemValidationRules(fields))

  const handleSetValuesRef = useCallback(handleSetValues, [])

  useEffect(() => {
    handleSetValuesRef(items[selectedItem])
  }, [selectedItem, items, handleSetValuesRef])

  async function handleAddItem (values) {
    const payload = { data: values }

    try {
      const { error, success } = await api.post('/api/items', payload)

      if (error) console.error(error)
      if (success) {
        dispatch({
          type: 'items@add',
          payload
        })
      }
    } catch (e) {
      console.error(e)
    }
  }

  async function handleUpdateItem (values) {
    try {
      const { error, success } = await api.put(`/api/items/${values._id}`, { data: values })


      if (error) console.error(error)
      if (success) {
        dispatch({
          type: 'items@update',
          payload: { data: values, itemIndex: selectedItem }
        })

        setSelectedItem(-1)
      }
    } catch (e) {
      console.error(e)
    }
  }

  function handleItemAction (values) {
    if (selectedItem >= 0) {
      handleUpdateItem(values)
    } else {
      handleAddItem(values)
    }

    handleSetValues()
  }

  return (
    <Fragment>
      <Paper className={classes.paper}>
        <form
          onSubmit={handleSubmit} noValidate>
          {fields.map(({ field, name }, index) => (
            <div
              key={`${field.label}_${index}`}
              className={classes.input}>
              <Input
                values={values}
                name={name}
                errors={errors}
                handleChange={handleChange}
                field={field} />
            </div>
          ))}

          {selectedItem >= 0
            ? (
              <Button color="primary" variant="contained" type='submit'>
                <SaveIcon />
                Update item
              </Button>
            ) : (
              <Button color="primary" variant="contained" type='submit'>
                <AddIcon />
                Add item
              </Button>
            )}
        </form>
      </Paper>
    </Fragment>
  )
}
