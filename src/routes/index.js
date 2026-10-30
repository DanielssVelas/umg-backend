import { Router } from 'express'
import productsRouter from './productsRouter.js'
import salesRouter from './salesRouter.js'
import proveedoresRouter from './proveedoresRouter.js'
import gestionarCajaRouter from './gestionCajaRouter.js'

const router = Router()

router.use('', productsRouter)
router.use('', salesRouter)
router.use('', proveedoresRouter)
router.use('', gestionarCajaRouter)

export default router