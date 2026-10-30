import { Router } from 'express'
import productsRouter from './productsRouter.js'
import salesRouter from './salesRouter.js'
import proveedoresRouter from './proveedoresRouter.js'
import gestionarCajaRouter from './gestionCajaRouter.js'
import comprasRouter from './comprasRouter.js'
import cotizacionesRouter from './cotizacionesRouter.js'

const router = Router()

router.use('', productsRouter)
router.use('', salesRouter)
router.use('', proveedoresRouter)
router.use('', gestionarCajaRouter)
router.use('', comprasRouter)
router.use('', cotizacionesRouter)

export default router