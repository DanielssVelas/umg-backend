import { Router } from 'express'
import routerCallback from './router-callback.js'
import { gestionarCajaController } from '../controllers/index.js'

const router = Router()

router.get('/check-account/:idUsuario', routerCallback(gestionarCajaController.consultarCajaController))
router.post('/manage-cash', routerCallback(gestionarCajaController.createGestionCajaController))

export default router
