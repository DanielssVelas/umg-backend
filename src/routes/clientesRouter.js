import { Router } from 'express';
import routerCallback from './router-callback.js';
import { clientesController } from '../controllers/index.js';

const router = Router();

router.get(
  '/clientes',
  routerCallback(clientesController.getClientesController)
);

router.post(
  '/clientes',
  routerCallback(clientesController.crearClienteController)
);

router.put(
  '/clientes/:id',
  routerCallback(clientesController.actualizarClienteController)
);

router.get(
  '/clientes/buscar',
  routerCallback(clientesController.buscarClientesController)
);

export default router;