import ndef from 'ndef'
import App from '../models/app'
import { NOT_FOUND } from '../constants/errors'

export function encode (req, res) {
  res.send(ndef.encodeMessage([
    ndef.textRecord(req.params.hash)
  ]))
}

export function getAppInfo (req, res) {
  const address = App.getAll()

  if (!address) res.sendError(NOT_FOUND)

  res.sendSuccess(address)
}

export function saveAppInfo (req, res) {
  App.save(req.body.address)

  res.sendSuccess()
}
