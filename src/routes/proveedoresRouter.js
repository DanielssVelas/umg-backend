import { Router } from 'express'
import routerCallback from './router-callback.js'
import { proveedoresController } from '../controllers/index.js'

const router = Router()

router.get(
  '/proveedores',
  routerCallback(proveedoresController.getProveedoresController)
)

router.post(
  '/crear-proveedor',
  routerCallback(proveedoresController.crearProveedorController)
)

export default router