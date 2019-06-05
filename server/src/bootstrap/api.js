import { createLogger } from '../services/logger'
import { Router } from 'express'
// import { debugRequestMiddleware } from '../middleware/debugRequest'
import { sendErrorMiddleware } from '../middleware/sendError'
import { sendSuccessMiddleware } from '../middleware/sendSuccess'
import accountRoutes from '../api/account.routes'
import deveryRoutes from '../api/devery.routes'
import formsRoutes from '../api/forms.routes'

const logger = createLogger('Bootstrap')

export function API() {
  const api = Router()

  // api.use(debugRequestMiddleware)
  api.use(sendErrorMiddleware)
  api.use(sendSuccessMiddleware)

  api.use('/accounts', accountRoutes)
  api.use('/devery', deveryRoutes)
  api.use('/forms', formsRoutes)

  return api
}

export default function(app) {
  app.use(process.env.API_PREFIX ? process.env.API_PREFIX : '', API())
  /***/ logger.info('API attached')
}
