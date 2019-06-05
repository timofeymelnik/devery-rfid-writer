import { reducer as fieldReducer, initialState as fieldsInitialState } from '../editForm/FieldReducer'
import { reducer as formsReducer, initialState as formsInitialState } from '../forms/FormReducer'

export default ({fields, forms}, action) => ({
  fields: fieldReducer(fields, action),
  forms: formsReducer(forms, action),
})

export const initialState = {
  fields: fieldsInitialState,
  forms: formsInitialState,
}
