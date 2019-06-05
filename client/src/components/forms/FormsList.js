import React, { Fragment, useState } from 'react'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import { makeStyles } from '@material-ui/core/styles'
import api from '../../helpers/api'
import FormDialog from './NewForm'
import { useStateValue } from '../app/AppContext'

export const drawerWidth = 240

const useStyles = makeStyles(() => ({
  root: {
    display: 'flex',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
}))

export default function ({ handleSelectForm }) {
  const classes = useStyles()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [{ forms }, dispatch] = useStateValue()

  if (forms.length < 1) return null

  const handleClose = value => async event => {
    const name = value.trim()
    if (!!name) {
      const { success, data } = await api.post('/api/forms/new', { name })

      if (!success) return

      dispatch({type: 'forms@add', payload: { data }})

      setIsModalOpen(false)
    }

    if (forms.length < 1) {
      event.preventDefault()

      return
    }

    setIsModalOpen(false)
  }

  return (
    <Fragment>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
        anchor="left"
      >
        <Button color='primary' size="large" onClick={() => setIsModalOpen(true)}>
          Create form
        </Button>
        <Divider />
        <List>
          {forms.map(({ name, _id } = {}, index) => (
            <ListItem button key={`${name}_${index}`} onClick={handleSelectForm(_id)} >
              <ListItemText primary={name}/>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <FormDialog isOpen={isModalOpen} handleClose={handleClose} />
    </Fragment>
  )
}
