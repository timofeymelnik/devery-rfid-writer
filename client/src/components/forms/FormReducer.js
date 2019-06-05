import { updateObjectInArray } from '../../helpers/updateObjectInArray'

export const reducer = (state, { type, payload }) => {
  switch (type) {
    case 'forms@populate':
      return payload

    case 'forms@add':
      return [...state, payload.data]

    case 'forms@update_fields':
      return updateObjectInArray(state, payload.index, item => ({
        ...item,
        fields: payload.fields
      }))

    default:
      return state
  }
}

export const initialState = []
