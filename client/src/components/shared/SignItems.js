import React, { Fragment } from 'react'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import Typography from '@material-ui/core/Typography'
import ImageIcon from '@material-ui/icons/Image'
import CodeIcon from '@material-ui/icons/Code'
import forEach from 'lodash/forEach'
import reduce from 'lodash/reduce'
import isUndefined from 'lodash/isUndefined'
import findIndex from 'lodash/findIndex'
import { makeStyles } from '@material-ui/core'
import { useStateValue } from '../app/AppContext'
import { addProduct } from '../../helpers/deveryHelper'
import api from '../../helpers/api'

const useStyles = makeStyles(theme => ({
  grid: {
    textAlign: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: '260px',
    flexDirection: 'column',
    padding: theme.spacing(3),
    '& + &': {
      borderLeft: `1px solid ${theme.palette.divider}`
    }
  },
  dialog: {
    padding: 0
  },
}))

export default function ({ isOpen, onClose }) {
  const classes = useStyles()
  const [{ items }, dispatch] = useStateValue()

  function handleClose () {
    onClose(false)
  }

  function download (file, name) {
    const element = document.createElement('a')
    element.href = URL.createObjectURL(file)
    element.download = name
    document.body.appendChild(element)
    element.click()
    document.getElementsByTagName.removeChild(element)
  }

  async function generateHashes () {
    return reduce(items, async (acc, item) => {

      if (!isUndefined(item.address)) return acc

      try {
        const { _id } = item

        const { hash } = await addProduct(_id)

        item.address = hash

        const { error, success } = await api.put(`/api/items/${_id}`, { data: item })

        if (error) console.error(error)
        if (success) {
          dispatch({
            type: 'items@update',
            payload: { data: item, itemIndex: findIndex(items, { _id }) }
          })

          acc.push(Promise.resolve(hash))

          return acc
        }
      } catch (e) {
        console.error(e)
      }
    }, [])
  }

  async function downloadRFIDHash () {
    const hashes = await Promise.all(generateHashes())
    forEach(hashes, async hash => {
      try {
        const response = await fetch(`/api/utils/rfid/${hash}`)
        download(response.blob(), `${hash}.txt`)
      } catch (e) {
        console.error(e)
      }
    })
  }

  async function handleGenerateQR () {
    const hashes = await Promise.all(generateHashes())

    forEach(hashes, async hash => {
      try {
        const response = await fetch(`https://chart.googleapis.com/chart?cht=qr&chl=${hash}`)

        download(response.blob(), `${hash}.png`)
      } catch (e) {
        console.error(e)
      }
    })
  }

  return (
    <Fragment>
      <Dialog maxWidth='xl' fullWidth open={isOpen} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogContent className={classes.dialog}>
          <Grid container>
            <Grid item xs={6} className={classes.grid}>
              <ImageIcon fontSize="large" />
              <Typography>Generated qr codes for each item will be automatically saved to your computer as
                images</Typography>
              <Button variant="contained" color="primary" onClick={handleGenerateQR}>Generate QR code</Button>
            </Grid>
            <Grid item xs={6} className={classes.grid}>
              <CodeIcon fontSize="large" />
              <Typography>Generated and encoded hashes for each item will be automatically saved to your computer as
                text files</Typography>
              <Button variant="contained" color="primary" onClick={downloadRFIDHash}>Generate RFID code</Button>
            </Grid>
          </Grid>
        </DialogContent>
      </Dialog>
    </Fragment>
  )
}
