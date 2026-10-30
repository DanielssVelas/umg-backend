import { Router } from 'express';
import routerCallback from './router-callback.js';
import { usuariosController } from '../controllers/index.js';
import { requireAuth, allowRoles } from '../middleware/auth.js';

const router = Router();

router.get(
  '/usuarios',
  requireAuth,
  allowRoles('ADMINISTRADOR'),
  routerCallback(usuariosController.getUsuariosController)
);

router.get(
  '/usuarios/roles',
  requireAuth,
  allowRoles('ADMINISTRADOR'),
  routerCallback(usuariosController.getRolesController)
);

router.post(
  '/usuarios',
  requireAuth,
  allowRoles('ADMINISTRADOR'),
  routerCallback(usuariosController.createUsuarioController)
);

router.put(
  '/usuarios/:id',
  requireAuth,
  allowRoles('ADMINISTRADOR'),
  routerCallback(usuariosController.updateUsuarioController)
);

export default router;