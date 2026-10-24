import { Router } from 'express'
import routerCallback from './router-callback.js'
import { salesController } from '../controllers/index.js'

const router = Router()

router.post('/registrar-venta', routerCallback(salesController.createSalesController))

export default router
