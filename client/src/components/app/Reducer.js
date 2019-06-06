import { reducer as formsReducer } from '../forms/FormReducer'
import { reducer as itemsReducer } from '../items/ItemsReducer'

export default ({ forms, items }, action) => ({
  forms: formsReducer(forms, action),
  items: itemsReducer(items, action)
})

export const initialState = {
  forms: [],
  items: []
}
