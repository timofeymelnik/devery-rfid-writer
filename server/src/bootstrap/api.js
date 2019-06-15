import { Router } from 'express'
import { createLogger } from '../services/logger'
import { sendErrorMiddleware } from '../middleware/sendError'
import { sendSuccessMiddleware } from '../middleware/sendSuccess'
import accountRoutes from '../api/account.routes'
import formsRoutes from '../api/forms.routes'
import itemsRoutes from '../api/items.routes'
import utilsRoutes from '../api/utils.routes'

// import { debugRequestMiddleware } from '../middleware/debugRequest'

const logger = createLogger('Bootstrap')

export function API () {
  const api = Router()

  // api.use(debugRequestMiddleware)
  api.use(sendErrorMiddleware)
  api.use(sendSuccessMiddleware)

  api.use('/accounts', accountRoutes)
  api.use('/forms', formsRoutes)
  api.use('/items', itemsRoutes)
  api.use('/utils', utilsRoutes)

  return api
}

export default function (app) {
  app.use(process.env.API_PREFIX ? process.env.API_PREFIX : '', API())
  /***/
  logger.info('API attached')
}
