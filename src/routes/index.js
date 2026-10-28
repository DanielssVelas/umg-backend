import { Router } from 'express'
import productsRouter from './productsRouter.js'
import salesRouter from './salesRouter.js'
import proveedoresRouter from './proveedoresRouter.js'

const router = Router()

router.use('', productsRouter)
router.use('', salesRouter)
router.use('', proveedoresRouter)

export default router