import React, { useState } from 'react'
import Grid from '@material-ui/core/Grid'
import Edit from './Edit'
import Preview from '../preview/Preview'
import { useStateValue } from '../app/AppContext'
import findIndex from 'lodash/findIndex'
import times from 'lodash/times'
import size from 'lodash/size'
import constant from 'lodash/constant'

export default function (props) {
  const { params: { formId } } = props.match
  const [{ forms }] = useStateValue()

  const formIndex = findIndex(forms, { _id: formId })
  const form = forms[formIndex]

  const [isValid, setIsValid] = useState(times(size(form.fields), constant(true)))

  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <Edit
          form={form}
          isValid={isValid}
          setIsValid={setIsValid}
          formId={formId}
          formIndex={formIndex}
          {...props} />
      </Grid>
      <Grid item xs={6}>
        <Preview
          form={form}
          isValid={isValid}
          formId={formId}
          formIndex={formIndex}
          {...props} />
      </Grid>
    </Grid>
  )
}
