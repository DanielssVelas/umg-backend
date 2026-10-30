import { Router } from 'express'
import productsRouter from './productsRouter.js'
import salesRouter from './salesRouter.js'
import proveedoresRouter from './proveedoresRouter.js'
import gestionarCajaRouter from './gestionCajaRouter.js'
import usuariosRouter from './usuariosRouter.js';
import authRouter from './authRouter.js';
import comprasRouter from './comprasRouter.js'
import cotizacionesRouter from './cotizacionesRouter.js'
import clientesRouter from './clientesRouter.js'

const router = Router()

router.use('', productsRouter)
router.use('', salesRouter)
router.use('', proveedoresRouter)
router.use('', gestionarCajaRouter)
router.use('', usuariosRouter)
router.use('', authRouter)
router.use('', comprasRouter)
router.use('', cotizacionesRouter)
router.use('', clientesRouter)

export default router