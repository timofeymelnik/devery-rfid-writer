import React, { Fragment, useState } from 'react'
import api from '../../helpers/api'
import { addBrand } from '../../helpers/deveryHelper'
import { useStateValue } from '../app/AppContext'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function ({ isOpen, onClose, canClose = true }) {
  const [, dispatch] = useStateValue()
  const [value, setValue] = useState('')

  async function handleSubmit (event) {
    event.preventDefault()

    const name = value.trim()
    if (!!name) {
      const { success, data } = await api.post('/api/forms', { name })

      if (!success) return

      dispatch({ type: 'forms@add', payload: { data } })

      await addBrand(name)
    }

    onClose(false)

    setValue('')
  }

  function handleClose (event, reason) {
    if (!!reason && !canClose) {
      event.preventDefault()
      return
    }

    onClose(false)
  }

  return (
    <Fragment>
      <Dialog maxWidth='xs' fullWidth open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <form onSubmit={handleSubmit}>
          <DialogTitle id="form-dialog-title">Set Brand Name</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Brand Name"
              type="text"
              fullWidth
              onChange={e => setValue(e.target.value)}
            />
          </DialogContent>
          <DialogActions>
            <Button type='submit' color="primary">
              Add
            </Button>
          </DialogActions>
        </form>
      </Dialog>
    </Fragment>
  )
}
