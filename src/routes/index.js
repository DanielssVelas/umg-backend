import { Router } from 'express';

import productsRouter from './productsRouter.js';
import salesRouter from './salesRouter.js';
import proveedoresRouter from './proveedoresRouter.js';
import usuariosRouter from './usuariosRouter.js';
import authRouter from './authRouter.js';

const router = Router();

router.use('', productsRouter);
router.use('', salesRouter);
router.use('', proveedoresRouter);
router.use('', usuariosRouter);
router.use('', authRouter);

export default router;