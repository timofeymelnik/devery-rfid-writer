import React, { Fragment, useEffect } from 'react'
import { useStateValue } from '../app/AppContext'
import Paper from '@material-ui/core/Paper'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableRow from '@material-ui/core/TableRow'
import TableCell from '@material-ui/core/TableCell'
import startCase from 'lodash/startCase'
import omit from 'lodash/omit'
import map from 'lodash/map'
import Button from '@material-ui/core/Button'
import EditIcon from '@material-ui/icons/Edit'
import CancelIcon from '@material-ui/icons/Cancel'
import DeleteIcon from '@material-ui/icons/Delete'
import { makeStyles } from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(2),
    overflowX: 'auto',
  },
  td: {
    wordBreak: 'break-all',
  },
  button: {
    marginLeft: theme.spacing(1),
  },
}))

export default function ({ setSelectedItem, selectedItem, data }) {
  const classes = useStyles()
  const [{ items }, dispatch] = useStateValue()

  useEffect(() => {
    dispatch({ type: 'items@populate', payload: data })
  }, [data, dispatch])

  if (!items) return null

  const _items = map(items, item => omit(item, ['_id', 'formId', 'address']))

  const handleSetItem = itemIndex => () => {
    setSelectedItem(itemIndex)
  }

  const handleRemoveItem = itemIndex => () => {
    dispatch({
      type: 'items@remove',
      payload: { itemIndex }
    })
  }

  function handleCancelEditing () {
    setSelectedItem(-1)
  }

  return (
    <Fragment>
      {_items.map((item, index) => (
        <Paper
          className={classes.root}
          key={`item_${index}`}>
          <Table>
            <TableBody>
              {Object.keys(item).map(key => (
                <TableRow key={key}>
                  <TableCell className={classes.td} component="th" scope="row">{startCase(key)}</TableCell>
                  <TableCell className={classes.td} align="right">{`${item[key]}`}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={2} align="right">
                  {selectedItem === index
                    ? (<Button
                      className={classes.button}
                      color="secondary"
                      variant="contained"
                      size="small"
                      onClick={handleCancelEditing}>
                      <CancelIcon /> Cancel
                    </Button>)
                    : (
                      <Button
                        className={classes.button}
                        color="secondary"
                        variant="contained"
                        size="small"
                        onClick={handleSetItem(index)}>
                        <EditIcon /> Edit
                      </Button>
                    )}
                  <Button
                    className={classes.button}
                    color="secondary"
                    variant="contained"
                    size="small"
                    onClick={handleRemoveItem(index)}>
                    <DeleteIcon /> Delete
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Paper>
      ))}
    </Fragment>
  )
}
