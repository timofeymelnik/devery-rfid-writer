import app from './bootstrap/app'
import api from './bootstrap/api'
import devery from './services/devery'

api(app)
devery.init()
