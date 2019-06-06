import Forms from '../models/forms'
import User from '../models/user'
import { NOT_FOUND } from '../constants/errors'

export function createForm (req, res) {
  const { name } = req.body
  const { _id: UserId } = req.user

  const { forms } = User.findOne({ _id: UserId })

  const form = Forms.save(name, UserId)
  const { _id: FormId } = form

  User.updateOne(UserId, { forms: [...forms, FormId] })

  res.sendSuccess(form)
}

export function getForms (req, res) {
  const { _id: UserId } = req.user
  const forms = Forms.getAll(UserId)

  if (!forms) {
    res.sendError(NOT_FOUND)
    return
  }

  res.sendSuccess(forms)
}


export function updateForm (req, res) {
  const { formId } = req.params
  const { form: data } = req.body

  const form = Forms.updateOne(formId, data)

  if (!form) {
    res.sendError(NOT_FOUND)
    return
  }

  res.sendSuccess(form)
}
