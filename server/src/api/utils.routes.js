import { Router } from 'express'
import { encode } from '../controllers/utils.controller'

const router = new Router()

router.get(
  '/rfid/:hash',
  encode
)

export default router
