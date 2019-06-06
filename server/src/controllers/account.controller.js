import User from '../models/user'
import { _issueToken } from '../helpers/issueToken'

/**
 * Create account
 *
 * @return string account
 * @param req
 * @param res
 */
export function createAccount (req, res) {
  const { pbkey } = req.body
  const { _id, isExisting } = User.save(pbkey)
  const payload = {
    pbkey,
    _id
  }

  if (isExisting) payload.signed = true

  res.setHeader('Authorization', _issueToken(payload))
  res.sendSuccess()
}

export function updateAccount (req, res) {
  const {
    origin,
    firstName,
    lastName,
    brandName
  } = req.body
  const { _id } = req.user

  const { pbkey } = User.updateOne(_id, {
    origin,
    firstName,
    lastName,
    brandName
  })

  res.setHeader('Authorization', _issueToken({ _id, pbkey, signed: true }))
  res.sendSuccess()
}
