import {
  productsActions,
  salesActions,
  proveedoresActions
} from '../actions/index.js'

import { logger } from '../utils/index.js'

import makeProductsController from './makeProductsController.js'
import makeSalesController from './makeSalesControllers.js'
import makeProveedoresController from './makeProveedoresController.js'

const productsController = makeProductsController({
  logger,
  productsActions
})

const salesController = makeSalesController({
  logger,
  salesActions
})

const proveedoresController = makeProveedoresController({
  logger,
  proveedoresActions
})

export {
  productsController,
  salesController,
  proveedoresController
}