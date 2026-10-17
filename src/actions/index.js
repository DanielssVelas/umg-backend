import easyOracleDb from '../database/index.js'
import { logger } from '../utils/index.js'


import makeProductsActions from './makeProductsActions.js'

const productsActions = makeProductsActions({ logger, easyOracleDb })

export {
    productsActions
}