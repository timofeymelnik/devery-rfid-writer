import Snackbar from '@material-ui/core/Snackbar'
import React from 'react'

export default ({ isSnackOpen, snackMessage, onClose }) => <Snackbar
  anchorOrigin={{
    vertical: 'bottom',
    horizontal: 'right'
  }}
  autoHideDuration={3000}
  onClose={onClose}
  open={isSnackOpen}
  ContentProps={{
    'aria-describedby': 'message-id',
  }}
  message={<span id="message-id">{snackMessage}</span>}
/>
