import { Router } from 'express'
import routerCallback from './router-callback.js'
import { proveedoresController } from '../controllers/index.js'

const router = Router()

// Obtener todos los proveedores
router.get(
  '/proveedores',
  routerCallback(proveedoresController.getProveedoresController)
)

// Crear un proveedor
router.post(
  '/crear-proveedor',
  routerCallback(proveedoresController.crearProveedorController)
)

// Actualizar un proveedor por su ID
router.put(
  '/proveedores/:id',
  routerCallback(proveedoresController.actualizarProveedorController)
)

export default router