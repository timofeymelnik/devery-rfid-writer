import Forms from '../models/forms'
import User from '../models/user'

export function createForm (req, res) {
  const { name } = (req.body)
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

  res.sendSuccess(forms)
}
