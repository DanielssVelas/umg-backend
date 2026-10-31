import { Router } from 'express'
import routerCallback from './router-callback.js'
import { healtController } from '../controllers/index.js'

const router = Router()

router.get('/health', routerCallback(healtController.getHealtController))

export default router
