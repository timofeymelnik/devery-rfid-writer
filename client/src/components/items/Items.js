import React, { Fragment, useState } from 'react'
import Grid from '@material-ui/core/Grid'
import LabelIcon from '@material-ui/icons/Label'
import Fab from '@material-ui/core/Fab'
import ItemForm from './ItemForm'
import ItemsList from './ItemsList'
import Loader from '../shared/Loader'

import { useStateValue } from '../app/AppContext'
import { makeStyles } from '@material-ui/core'
import SignItems from '../shared/SignItems'

const useStyles = makeStyles(theme => ({
  fab: {
    position: 'fixed',
    bottom: theme.spacing(2),
    right: theme.spacing(2),
  },
  toolbar: theme.mixins.toolbar,
}))

export default function ({ match }) {
  const { params: { formId } } = match
  const classes = useStyles()

  const [selectedItem, setSelectedItem] = useState(-1)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [{ items }] = useStateValue()

  function handleMarkItems () {
    setIsModalOpen(true)
  }

  function handleModalClose () {
    setIsModalOpen(false)
  }

  return (
    <Fragment>
      <Grid container spacing={2}>
        <Grid item xs={6}>
          <ItemForm
            formId={formId}
            setSelectedItem={setSelectedItem}
            selectedItem={selectedItem} />
        </Grid>
        <Grid item xs={6}>
          <Loader
            component={ItemsList}
            initialState={items}
            url={`/api/items/${formId}`}
            selectedItem={selectedItem}
            setSelectedItem={setSelectedItem} />
          <div className={classes.toolbar} />
        </Grid>
      </Grid>

      <Fab color="primary" aria-label="Add" variant="extended" className={classes.fab} onClick={handleMarkItems}>
        <LabelIcon />
        Add Product
      </Fab>

      <SignItems onClose={handleModalClose} isOpen={isModalOpen} />
    </Fragment>
  )
}
