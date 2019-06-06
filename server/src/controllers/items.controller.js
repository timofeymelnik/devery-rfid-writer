import Items from '../models/item'
import { NOT_FOUND } from '../constants/errors'

export function createItem (req, res) {
  const { data, formId } = req.body

  const item = Items.save(formId, data)

  if (!item) {
    res.sendError(NOT_FOUND)
    return
  }

  res.sendSuccess(item)
}

export function getItems (req, res) {
  const { formId } = req.params

  const items = Items.getAll(formId)

  if (!items) {
    res.sendError(NOT_FOUND)
    return
  }

  res.sendSuccess(items)
}

export function getItem (req, res) {
  const { itemId } = req.params

  const item = Items.findById(itemId)

  if (!item) {
    res.sendError(NOT_FOUND)
    return
  }

  res.sendSuccess(item)
}

export function updateItem (req, res) {
  const { itemId } = req.params
  const { item: data } = req.body

  const item = Items.updateOne(itemId, data)

  if (!item) {
    res.sendError(NOT_FOUND)
    return
  }

  res.sendSuccess(item)
}
