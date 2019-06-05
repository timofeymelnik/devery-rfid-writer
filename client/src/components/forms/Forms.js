import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Dialog from '@material-ui/core/Dialog'
import CircularProgress from '@material-ui/core/CircularProgress'
import { useDataApi } from '../../helpers/api'
import Composer from './Composer'
import { useStateValue } from '../app/AppContext'

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}))

export default function Forms (props) {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(true)
  const [{ forms }] = useStateValue()
  const [{ data, isLoading, isError }] = useDataApi('/api/forms', forms)

  function handleClose () {
    setIsOpen(false)
  }

  return (
    <Fragment>
      {isLoading && (
        <Dialog fullScreen open={isOpen} onClose={handleClose}>
          <CircularProgress className={classes.progress} />
        </Dialog>
      )}
      {isError && <div>Something went wrong ...</div>}
      {!isError && !isLoading && data.length && <Composer data={data} {...props} />}
    </Fragment>
  )
}
