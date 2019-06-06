import { set } from '../../helpers/updateObjectInArray'
import merge from 'lodash/merge'
import get from 'lodash/get'

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'items@populate':
      return payload

    case 'items@add':
      return [
        ...state,
        payload.data
      ]

    case 'items@remove':
      return [
        ...state.filter((item, index) => index !== payload.itemIndex)
      ]

    case 'items@update':
      return set(
        [payload.itemIndex],
        merge(
          get(state, [payload.itemIndex]),
          payload.data
        ),
        state
      )

    default:
      return state
  }
}
