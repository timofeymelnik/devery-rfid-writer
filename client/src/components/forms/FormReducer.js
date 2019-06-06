import { set } from '../../helpers/updateObjectInArray'
import merge from 'lodash/merge'
import filter from 'lodash/filter'
import get from 'lodash/get'
import cloneDeep from 'lodash/cloneDeep'
import { emptyField } from '../composer/OptionsTypes'

export const reducer = (state, { type, payload }) => {
  let path
  switch (type) {
    case 'forms@populate':
      return payload

    case 'forms@add':
      return [...state, payload.data]

    case 'forms@approve':
      return set(
        [payload.formIndex],
        merge(get(state, [payload.formIndex]), { approved: true }),
        state
      )

    case 'fields@add':
      path = [payload.formIndex, 'fields']
      return set(
        path,
        [...get(state, path), cloneDeep(emptyField)],
        state
      )

    case 'fields@remove':
      path = [payload.formIndex, 'fields']
      return set(
        path,
        [
          ...filter(
            get(state, path),
            (item, index) => index !== payload.fieldIndex
          )
        ],
        state
      )

    case 'fields@update_options':
      path = [payload.formIndex, 'fields', payload.fieldIndex, 'field', 'options']
      return set(
        path,
        merge(get(state, path), payload.data),
        state
      )

    case 'fields@set_type':
      path = [payload.formIndex, 'fields', payload.fieldIndex, 'field']
      return set(
        path,
        merge(get(state, path), payload.data),
        state
      )

    case 'fields@update_field':
      path = [payload.formIndex, 'fields', payload.fieldIndex]
      return set(
        path,
        merge(get(state, path), payload.data),
        state
      )

    default:
      return state
  }
}
