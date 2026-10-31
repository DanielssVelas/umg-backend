import easyOracleDb from '../database/index.js'
import { logger } from '../utils/index.js'

import makeProductsActions from './makeProductsActions.js'
import makeSalesActions from './makeSalesActions.js'
import makeProveedoresActions from './makeProveedoresActions.js'
import makeGestionarCajaActions from './makeGestionarCajaActions.js'
import makeUsuariosActions from './makeUsuariosActions.js';
import makeAuthActions from './makeAuthActions.js';
import makeComprasActions from './makeComprasActions.js'
import makeCotizacionesActions from './makeCotizacionesActions.js'
import makeClientesActions from './makeClientesActions.js'
import makeHealtActions from './makeHealtActions.js'

const productsActions = makeProductsActions({ logger, easyOracleDb })
const salesActions = makeSalesActions({ logger, easyOracleDb })
const proveedoresActions = makeProveedoresActions({ logger, easyOracleDb })
const gestionarCajaActions = makeGestionarCajaActions({ logger, easyOracleDb })

const usuariosActions = makeUsuariosActions({
  logger,
  easyOracleDb
});

// NUEVO: acciones de autenticación
const authActions = makeAuthActions({
  logger,
  easyOracleDb
});

const comprasActions = makeComprasActions({ logger, easyOracleDb })
const cotizacionesActions = makeCotizacionesActions({ logger, easyOracleDb })
const clientesActions = makeClientesActions({ logger, easyOracleDb })
const healtActions = makeHealtActions({ logger })

export {
    productsActions,
    salesActions,
    proveedoresActions,
    gestionarCajaActions,
    usuariosActions,
    authActions,
    comprasActions,
    cotizacionesActions,
    clientesActions,
    healtActions
}