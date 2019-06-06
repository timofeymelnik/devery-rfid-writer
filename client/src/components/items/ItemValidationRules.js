import forEach from 'lodash/forEach'
import snakeCase from 'lodash/snakeCase'
import isNil from 'lodash/isNil'
import get from 'lodash/get'

export default function (fields) {
  return function (values) {
    let errors = {}
    forEach(fields, ({ name, field }) => {
      const id = snakeCase(name)
      const isRequired = get(field, 'options.isRequired')

      if (isRequired && (isNil(values[id]) || !values[id])) errors[id] = 'Required'
    })

    return errors
  }
}
