import React, { useEffect, useRef, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import InputLabel from '@material-ui/core/InputLabel'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Select from '@material-ui/core/Select'
import FormControl from '@material-ui/core/FormControl'
import Paper from '@material-ui/core/Paper'
import Checkbox from '@material-ui/core/Checkbox'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import { makeStyles } from '@material-ui/core'
import { types } from './FieldReducer'
import Options from './Options'
import { useStateValue } from '../app/AppContext'
import useValidation from '../../helpers/useValidation'
import rules from './FieldsValidationRules'

const useStyles = makeStyles(theme => ({
  textField: {
    margin: theme.spacing(1, 0),
  },
  paper: {
    padding: theme.spacing(2, 2),
    margin: theme.spacing(2, 0),
  },
  formControl: {
    width: '100%'
  },
  select: {
    marginBottom: theme.spacing(1),
  },
}))

export default function ({ index, isFieldValid }) {
  const classes = useStyles()

  const [{ fields }, dispatch] = useStateValue()
  const field = fields[index]

  const [labelWidth, setLabelWidth] = useState(0)
  const inputLabel = useRef(null)

  const { errors, handleChange } = useValidation(field, isFieldValid, rules)

  useEffect(() => {
    setLabelWidth(inputLabel.current.offsetWidth)
  }, [])

  function handleSelectType (e) {
    const { target: { value: type } } = e
    dispatch({ type: 'fields@set_type', payload: { index, type } })
  }

  function handleUpdateName (e) {
    const { target: { value: name } } = e
    dispatch({ type: 'fields@set_name', payload: { index, name } })
  }

  function handleIsRequired (e, isRequired) {
    dispatch({ type: 'fields@update_options', payload: { index, isRequired } })
  }

  return (
    <Paper className={classes.paper} onBlur={handleChange}>
      <TextField
        error={!!errors.name}
        fullWidth
        required
        label="Name"
        value={field.name}
        className={classes.textField}
        helperText={(!!errors.name) ? errors.name : null}
        onChange={handleUpdateName}
        margin="normal"
        variant="outlined"
      />

      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel ref={inputLabel}>
          Type
        </InputLabel>

        <Select
          className={classes.select}
          value={field.field.type}
          onChange={handleSelectType}
          input={<OutlinedInput labelWidth={labelWidth} name="type" />}
        >
          <MenuItem value={''} disabled>
            <em>Not Selected</em>
          </MenuItem>

          {Object.keys(types).map(type => <MenuItem key={type} value={type}>{types[type].label}</MenuItem>)}
        </Select>
      </FormControl>

      <Options errors={errors} index={index} />

      <FormControlLabel
        control={
          <Checkbox
            checked={field.field.options.isRequired}
            onChange={handleIsRequired}
            color="primary"
          />
        }
        label="Is required"
      />
    </Paper>
  )
}
