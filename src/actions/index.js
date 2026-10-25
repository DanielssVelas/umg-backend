import easyOracleDb from '../database/index.js'
import { logger } from '../utils/index.js'


import makeProductsActions from './makeProductsActions.js'
import makeSalesActions from './makeSalesActions.js'

const productsActions = makeProductsActions({ logger, easyOracleDb })
const salesActions = makeSalesActions({ logger, easyOracleDb })

export {
    productsActions,
    salesActions
}