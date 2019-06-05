import React from 'react'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import { DatePicker } from '@material-ui/pickers'
import { useStateValue } from '../app/AppContext'

export default function ({ index, handleChange, errors }) {
  const [{ fields }, dispatch] = useStateValue()
  const field = fields[index]

  function updateOptions (payload) {
    dispatch({ type: 'fields@update_options', payload: { ...payload, index } })

    handleChange()
  }

  switch (field.field.type) {
    case 'integer':
      return (
        <Grid container spacing={1}>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Min"
              value={field.field.options.min}
              onChange={e => updateOptions({ min: +e.target.value })}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              fullWidth
              label="Max"
              value={field.field.options.max}
              onChange={e => updateOptions({ max: +e.target.value })}
              variant="outlined"
            />
          </Grid>
        </Grid>
      )

    case 'select':
      return (
        <TextField
          required
          error={!!errors.options}
          label="Options"
          placeholder="Comma separated options"
          helperText={(!!errors.options) ? errors.options : null}
          multiline
          fullWidth
          rowsMax="4"
          value={field.field.options.options}
          onChange={e => updateOptions({ options: e.target.value })}
          variant="outlined"
          onBlur={handleChange}
        />
      )

    case 'date':
      return (
        <Grid container spacing={1}>
          <Grid item justify="space-between" xs={6}>
            <DatePicker
              label="Min Date"
              inputVariant='outlined'
              value={field.field.options.min}
              onChange={date => updateOptions({ min: date })} />
          </Grid>
          <Grid item xs={6}>
            <DatePicker
              label="Max Date"
              inputVariant='outlined'
              value={field.field.options.max}
              onChange={date => updateOptions({ max: date })} />
          </Grid>
        </Grid>
      )

    default:
      return null
  }

}
