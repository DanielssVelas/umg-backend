import { Router } from 'express'
import productsRouter from './productsRouter.js'
import salesRouter from './salesRouter.js'

const router = Router()

router.use('', productsRouter)
router.use('', salesRouter)

export default router
