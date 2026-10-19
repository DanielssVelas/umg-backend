import { Router } from 'express'
import routerCallback from './router-callback.js'
import { productsController } from '../controllers/index.js'

const router = Router()

router.get('/products', routerCallback(productsController.getProductsController))
router.post('/crear-producto', routerCallback(productsController.crearProductoController))

export default router
