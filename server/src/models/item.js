import { Items } from '../bootstrap/db'
import uuid from 'uuid'

class Item {
  constructor () {
    this.items = Items
  }

  save(formId, values) {
    const newItem = {
      formId,
      _id: uuid(),
      ...values,
    }

    this.items
      .push(newItem)
      .write()

    return newItem
  }

  getAll(formId) {
    return this.items
      .filter(item => item.formId === formId)
      .value()
  }

  findById (itemId) {
    return this.items
      .find({ _id: itemId })
      .value()
  }

  updateOne (itemId, data) {
    return this.items
      .find({ _id: itemId })
      .assign(data)
      .write()
  }
}

export default new Item()
