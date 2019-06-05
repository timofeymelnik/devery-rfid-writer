import merge from 'lodash/merge'
import { updateObjectInArray } from '../../helpers/updateObjectInArray'

export const types = {
  'string': {
    type: 'string',
    label: 'text',
    options: {
      isRequired: false,
    }
  },
  'integer': {
    type: 'integer',
    label: 'number',
    options: {
      isRequired: false,
      min: '',
      max: '',
    }
  },
  'select': {
    type: 'select',
    label: 'list',
    options: {
      isRequired: false,
      options: '',
    }
  },
  'date': {
    type: 'date',
    label: 'date',
    options: {
      isRequired: false,
      min: new Date(),
      max: new Date(),
    }
  }
}

export const reducer = (state, { type, payload = { index: -1 } }) => {
  switch (type) {
    case 'fields@add':
      return [...state, {
        name: '',
        type: '',
        field: {
          type: '',
          label: '',
          options: {
            isRequired: false
          }
        }
      }]

    case 'fields@remove':
      return state.filter((item, index) => index !== payload.index)

    case 'fields@update_options':
      return updateObjectInArray(state, payload.index, item => ({
        ...item,
        field: {
          ...item.field,
          options: merge(item.field.options, payload)
        }
      }))

    case 'fields@set_type':
      return updateObjectInArray(state, payload.index, item => ({
        ...item,
        type: payload.type,
        field: types[payload.type]
      }))

    case 'fields@set_name':
      return updateObjectInArray(state, payload.index, item => ({
        ...item,
        name: payload.name
      }))

    default:
      return state
  }
}

export const initialState = []
