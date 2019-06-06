import _set from 'lodash/set'
import cloneDeep from 'lodash/cloneDeep'

export const set = (key, value, state) => {
  const temp = cloneDeep(state)
  _set(temp, key, value)
  return temp
}
