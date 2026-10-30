import {
  productsActions,
  salesActions,
  proveedoresActions,
  gestionarCajaActions,
  comprasActions
} from '../actions/index.js'

import { logger } from '../utils/index.js'

import makeProductsController from './makeProductsController.js'
import makeSalesController from './makeSalesControllers.js'
import makeProveedoresController from './makeProveedoresController.js'
import makeGestionarCajaController from './makeGestionarCajaController.js'
import makeComprasController from './makeComprasController.js'

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

const gestionarCajaController = makeGestionarCajaController({
  logger,
  gestionarCajaActions
})

const comprasController = makeComprasController({
    logger,
    comprasActions
})

export {
  productsController,
  salesController,
  proveedoresController,
  gestionarCajaController,
  comprasController
}