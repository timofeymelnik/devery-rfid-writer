import { Router } from 'express'
import { checkBody, validate } from '../middleware/validation'
import { createForm, getForms, updateForm } from '../controllers/forms.controller'
import { verifyJWT } from '../middleware/verification'
import { WRONG_REQUEST } from '../constants/errors'

const router = new Router()

router.post(
  '/',
  validate([
    checkBody(['name'], WRONG_REQUEST)
      .exists()
      .not()
      .isEmpty(),
  ]),
  verifyJWT,
  createForm
)

router.get(
  '/',
  verifyJWT,
  getForms
)

router.put(
  '/:formId',
  verifyJWT,
  updateForm
)

export default router
