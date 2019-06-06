import { Users } from '../bootstrap/db'
import uuid from 'uuid'

class User {
  constructor () {
    this.users = Users
  }

  save (pbkey) {
    const existingUser = this.findOne({ pbkey })

    if (existingUser) return {
      isExisting: true,
      isNew: false,
      ...existingUser
    }

    const newUser = {
      pbkey,
      _id: uuid(),
      forms: []
    }

    this.users
      .push(newUser)
      .write()

    return {
      isExisting: true,
      isNew: false,
      ...newUser
    }
  }

  findOne (options = {}) {
    return this.users
      .find(options)
      .value()
  }

  findById (userId) {
    return this.users
      .find({ _id: userId })
      .value()
  }

  updateOne (userId, data) {
    return this.users
      .find({ _id: userId })
      .assign(data)
      .write()
  }
}

export default new User()
