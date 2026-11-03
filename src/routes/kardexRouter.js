import { Router } from 'express';
import routerCallback from './router-callback.js';
import { kardexController } from '../controllers/index.js';

const router = Router();

router.get(
  '/kardex/movimientos',
  routerCallback(kardexController.getMovimientosController)
);

router.get(
  '/kardex/existencias',
  routerCallback(kardexController.getExistenciasController)
);

export default router;