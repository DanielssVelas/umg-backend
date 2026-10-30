
import { Router } from 'express'
import routerCallback from './router-callback.js'
import { comprasController } from '../controllers/index.js'

const router = Router()

router.post(
    '/registrar-compra',
    routerCallback(comprasController.crearCompraController)
)

export default router
