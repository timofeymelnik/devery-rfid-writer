import React from 'react'
import Composer from './Composer'
import { useStateValue } from '../app/AppContext'

import Loader from '../shared/Loader'

export default function (props) {
  const [{ forms }] = useStateValue()
  return <Loader
    component={Composer}
    initialState={forms}
    url={'/api/forms'}
    {...props} />
}
