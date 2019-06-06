import React, { Fragment, useState } from 'react'
import Drawer from '@material-ui/core/Drawer'
import Button from '@material-ui/core/Button'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import LockIcon from '@material-ui/icons/Lock'
import { makeStyles } from '@material-ui/core/styles'
import { useStateValue } from '../app/AppContext'
import AddProduct from '../shared/AddProduct'

export const drawerWidth = 240

const useStyles = makeStyles(theme => ({
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
  toolbar: theme.mixins.toolbar,
}))

export default function ({ handleSelectForm }) {
  const classes = useStyles()
  const [{ forms }] = useStateValue()
  const [isModalOpen, setIsModalOpen] = useState(false)

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
        <div className={classes.toolbar} />
        <Button color='primary' size="large" onClick={() => setIsModalOpen(true)}>
          Add Product
        </Button>
        <Divider />
        <List>
          {forms.map(({ name, _id, approved } = {}, index) => (
            <ListItem button key={`${name}_${index}`} onClick={handleSelectForm(_id, approved ? 'item' : 'edit')} >
              <ListItemText primary={name}/> {approved && <LockIcon color="action" />}
            </ListItem>
          ))}
        </List>
      </Drawer>

      <AddProduct isOpen={isModalOpen} onClose={setIsModalOpen} />
    </Fragment>
  )
}
