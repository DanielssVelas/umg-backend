
import { Router } from 'express'
import routerCallback from './router-callback.js'
import { comprasController } from '../controllers/index.js'

const router = Router()

// Registrar compra
router.post(
    '/registrar-compra',
    routerCallback(comprasController.crearCompraController)
)

// Consultar historial de compras
router.get(
    '/historial-compras',
    routerCallback(comprasController.getHistorialComprasController)
)

// Consultar detalle de una compra
router.get(
    '/detalle-compra/:idCompra',
    routerCallback(comprasController.getDetalleCompraController)
)

export default router
