import { Router } from 'express'
import routerCallback from './router-callback.js'
import { cotizacionesController } from '../controllers/index.js'

const router = Router()

// Registrar cotización
router.post(
    '/registrar-cotizacion',
    routerCallback(cotizacionesController.crearCotizacionController)
)

// Consultar historial de cotizaciones
router.get(
    '/historial-cotizaciones',
    routerCallback(cotizacionesController.getHistorialCotizacionesController)
)

// Consultar detalle de una cotización
router.get(
    '/detalle-cotizacion/:idCotizacion',
    routerCallback(cotizacionesController.getDetalleCotizacionController)
)

// Convertimos la cotizacion en venta
router.post(
    '/convertir-cotizacion/:idCotizacion',
    routerCallback(cotizacionesController.convertirCotizacionEnVentaController)
);

export default router
