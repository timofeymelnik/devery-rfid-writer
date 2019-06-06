import { Forms } from '../bootstrap/db'
import uuid from 'uuid'

class Form {
  constructor () {
    this.forms = Forms
  }

  save(name, userId) {
    const newForm = {
      name,
      userId,
      _id: uuid(),
      fields: []
    }

    this.forms
      .push(newForm)
      .write()

    return newForm
  }

  getAll(userId) {
    return this.forms
      .filter(form => form.userId === userId)
      .value()
  }

  findOne (options = {}) {
    return this.forms
      .find(options)
      .value()
  }

  findById (formId) {
    return this.forms
      .find({ _id: formId })
      .value()
  }

  updateOne (formId, data) {
    return this.forms
      .find({ _id: formId })
      .assign(data)
      .write()
  }
}

export default new Form()
