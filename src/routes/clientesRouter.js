
import { Router } from 'express'
import routerCallback from './router-callback.js'
import { clientesController } from '../controllers/index.js'

const router = Router()

router.get('/clientes', routerCallback(clientesController.getClientesController))

export default router
