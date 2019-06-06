import { createLogger } from '../services/logger'
import fs from 'fs'

require('dotenv').config()

const logger = createLogger('Bootstrap')
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const dbFile = 'db.json'

fs.open(dbFile, 'r', err => {
  if (err) {
    fs.writeFile(dbFile, '', err => {
      if (err) {
        logger.warn(err)
      }
    })
  }
})

const adapter = new FileSync(dbFile)
const db = low(adapter)

db.defaults({
  users: [],
  forms: [],
  items: [],
  app: {}
}).write()

export default db

export const Users = db.get('users')
export const Forms = db.get('forms')
export const Items = db.get('items')
export const App = db.get('app')
