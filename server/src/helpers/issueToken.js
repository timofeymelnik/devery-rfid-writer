import { encode } from 'jwt-simple'

require('dotenv').config()

export function _issueToken(payload) {
  let now = new Date().getTime()

  payload.expire = now + process.env.JWT_VALID_DAYS * 86400000

  return encode(payload, process.env.JWT_SECRET)
}
