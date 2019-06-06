import React from 'react'
import Route from '../shared/Route'
import { useStateValue } from '../app/AppContext'
import findIndex from 'lodash/findIndex'
import Items from '../items/Items'
import EditForm from '../composer/EditForm'

export default function ({ history, match }) {
  const { params: { formId, tab } } = match

  const [{ forms }] = useStateValue()
  const formIndex = findIndex(forms, { _id: formId })
  const { approved } = forms[formIndex]

  if (approved) {
    if (tab !== 'items') history.push(`/forms/${formId}/items`)
    return (
      <Route path={`/forms/:formId/items`} component={Items} />
    )
  }

  return <Route path={`/forms/:formId/edit`} component={EditForm} />
}
