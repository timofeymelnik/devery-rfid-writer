import { decode } from 'jwt-simple'
import User from '../models/user'
import { UNAUTHORIZED } from '../constants/errors'
import { _issueToken } from '../helpers/issueToken'

require('dotenv').config()

export const verifyJWT = (req, res, next) => {
  try {
    const token = req.headers.authorization
    let payload

    try {
      payload = decode(token, process.env.JWT_SECRET)
    } catch (e) {
      return res.sendError(UNAUTHORIZED)
    }

    const { _id } = payload || {}

    if (!_id) return res.sendError(UNAUTHORIZED)

    const user = User.findById(_id)

    if (!user) return res.sendError(UNAUTHORIZED)

    req.user = user
    res.setHeader('Authorization', _issueToken(payload))

    next()
  } catch (e) {
    next()
  }
}
