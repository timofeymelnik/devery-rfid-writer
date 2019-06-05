import React, { Fragment, useState } from 'react'
import Button from '@material-ui/core/Button'
import TextField from '@material-ui/core/TextField'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'

export default function FormDialog ({ isOpen = false, handleClose }) {
  const [name, setName] = useState('')

  function onClose(event, reason) {
    handleClose(name)(event, reason)
    setName('')

  }

  return (
    <Fragment>
      <Dialog open={isOpen} onClose={onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Create your first form</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Create first form
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Form Name"
            type="text"
            fullWidth
            onChange={e => setName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Create
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
