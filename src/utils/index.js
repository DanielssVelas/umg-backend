import winston from 'winston'
import moment from 'moment-timezone'

import env from '../config/env.js'

import makeLogger from './logger.js'
import makeDateManaguer from './date.js'
const dateManaguer = makeDateManaguer({ moment })
const logger = makeLogger({ winston, dateManaguer, env })
export {
  logger,
  dateManaguer
}
