import ndef from 'ndef'

export function encode (req, res) {
  res.send(ndef.encodeMessage([
    ndef.textRecord(req.params.hash)
  ]))
}
