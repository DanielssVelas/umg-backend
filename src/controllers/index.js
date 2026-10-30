import {
  productsActions,
  salesActions,
  proveedoresActions,
  gestionarCajaActions,
  usuariosActions,
  authActions
} from '../actions/index.js'

import { logger } from '../utils/index.js'

import makeProductsController from './makeProductsController.js'
import makeSalesController from './makeSalesControllers.js'
import makeProveedoresController from './makeProveedoresController.js'
import makeGestionarCajaController from './makeGestionarCajaController.js'
import makeUsuariosController from './makeUsuariosController.js';
import makeAuthController from './makeAuthController.js';

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

const usuariosController = makeUsuariosController({
  logger,
  usuariosActions
});


const authController = makeAuthController({
  logger,
  authActions
});

export {
  productsController,
  salesController,
  proveedoresController,
  gestionarCajaController,
  authController,
  usuariosController
}