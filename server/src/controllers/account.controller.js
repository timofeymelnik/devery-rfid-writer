import User from '../models/user'
import { _issueToken } from '../helpers/issueToken'

/**
 * Create account
 *
 * @param pbkey Account public key
 * @return string account
 */
export function createAccount (pbkey) {
  const existingUser = User.findOne({ pbkey })

  if (existingUser) {
    const { _id } = existingUser
    return _issueToken({ _id })
  }

  const { _id } = User.save(pbkey)
  return _issueToken({ _id })
}

export function updateAccount ({ _id }, data) {
  User.updateOne(_id, data)
  return _issueToken({ _id, signed: true })
}
