import easyOracleDb from '../database/index.js'
import { logger } from '../utils/index.js'

import makeProductsActions from './makeProductsActions.js'
import makeSalesActions from './makeSalesActions.js'
import makeProveedoresActions from './makeProveedoresActions.js'

const productsActions = makeProductsActions({ logger, easyOracleDb })
const salesActions = makeSalesActions({ logger, easyOracleDb })
const proveedoresActions = makeProveedoresActions({ logger, easyOracleDb })

export {
    productsActions,
    salesActions,
    proveedoresActions
}