import { Router } from 'express'
import { checkBody, validate } from '../middleware/validation'
import { createAccount, updateAccount } from '../controllers/account.controller'
import { WRONG_REQUEST } from '../constants/errors'
import { verifyJWT } from '../middleware/verification'

const router = new Router()

/**
 * @api {post} /login Login account
 * @apiName LoginAccount
 * @apiGroup Account
 *
 * @apiParam {String} email Account email
 * @apiParam {String} password Account password
 *
 * @apiSuccess {String} token Account auth token
 *
 * @apiError WRONG_REQUEST
 * @apiError VALIDATION_ERROR
 * @apiError WRONG_LOGIN_OR_PASSWORD
 * @apiError INTERNAL_ERROR
 */
router.post(
  '/',
  validate([
    checkBody(['pbkey'], WRONG_REQUEST).exists(),
  ]),
  createAccount
)

router.put(
  '/',
  validate([
    checkBody(['firstName', 'lastName', 'origin', 'brandName'], WRONG_REQUEST)
      .exists()
      .not()
      .isEmpty()
  ]),
  verifyJWT,
  updateAccount
)

export default router
