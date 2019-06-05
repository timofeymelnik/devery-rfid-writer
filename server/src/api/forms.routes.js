import { Router } from 'express'
import { checkBody, validate } from '../middleware/validation'
import { createForm, getForms } from '../controllers/forms.controller'
import { verifyJWT } from '../middleware/verification'

const router = new Router()

router.post(
  '/new',
//  validate for name
  verifyJWT,
  createForm
)

router.get(
  '/',
  verifyJWT,
  getForms
)

export default router
