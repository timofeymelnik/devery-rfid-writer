import { Router } from 'express'
import { createItem, getItem, getItems, updateItem } from '../controllers/items.controller'
import { verifyJWT } from '../middleware/verification'

const router = new Router()

router.post(
  '/',
  verifyJWT,
  createItem
)

router.get(
  '/',
  verifyJWT,
  getItems
)

router.get(
  '/:itemId',
  verifyJWT,
  getItem
)

router.put(
  '/:itemId',
  verifyJWT,
  updateItem
)

export default router
