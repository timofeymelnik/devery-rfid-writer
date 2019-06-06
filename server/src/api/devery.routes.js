import { Router } from 'express'
import { encode, getAppInfo, saveAppInfo } from '../controllers/devery.controller'
import { verifyJWT } from '../middleware/verification'

const router = new Router()

router.get(
  '/rfid/:hash',
  encode
)

router.get(
  '/',
  verifyJWT,
  getAppInfo
)

router.post(
  '/',
  verifyJWT,
  saveAppInfo
)

export default router
