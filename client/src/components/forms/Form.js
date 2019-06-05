import React, { Fragment, useState } from 'react'
import AppBar from '@material-ui/core/AppBar'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import { drawerWidth } from './FormsList'
import { makeStyles } from '@material-ui/core'
import Edit from '../editForm/Edit'
import Preview from './Preview'
import Route from '../shared/Route'

const useStyles = makeStyles(() => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
}))

export default function ({ history, match }) {
  const tabs = ['edit', 'preview']
  const { params: { formId } } = match

  const classes = useStyles()
  const [value, setValue] = useState(0)

  function handleChange (event, newValue) {
    history.push(`/forms/${formId}/${tabs[newValue]}`)

    setValue(newValue)
  }

  return (
    <Fragment>
      <AppBar position="fixed" className={classes.appBar}>
        <Tabs
          value={value}
          indicatorColor="secondary"
          textColor="secondary"
          onChange={handleChange}
          centered>
          {tabs.map(tab => <Tab key={tab} label={tab} />)}
        </Tabs>
      </AppBar>

      <Route path={`/forms/:formId/edit`} component={Edit} />
      <Route path={`/forms/:formId/preview`} component={Preview} />
    </Fragment>
  )
}
