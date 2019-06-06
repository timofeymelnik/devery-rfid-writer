import React, { Fragment, useState } from 'react'
import { makeStyles } from '@material-ui/core'
import { useDataApi } from '../../helpers/api'
import Dialog from '@material-ui/core/Dialog'
import CircularProgress from '@material-ui/core/CircularProgress'

const useStyles = makeStyles(theme => ({
  progress: {
    margin: theme.spacing(2),
  },
}))

export default ({url, initialState, component: Component, ...rest}) => {
  const classes = useStyles()
  const [isOpen, setIsOpen] = useState(true)
  const [{ data, isLoading, isError, isLoaded }] = useDataApi(url, initialState)

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
      {isLoaded && isError && <div>Something went wrong ...</div>}
      {isLoaded && !isError && <Component data={data} {...rest} />}
    </Fragment>
  )
}
