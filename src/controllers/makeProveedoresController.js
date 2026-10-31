export default function makeProveedoresController({
  logger,
  proveedoresActions
}) {

  // ==========================================
  // CONSULTAR PROVEEDORES
  // ==========================================
  async function getProveedoresController() {
    try {
      logger.info(
        '[makeProveedoresController][getProveedoresController] -> Starting Request'
      );

      const resp = await proveedoresActions.getProveedoresActions();

      return {
        status: resp.statusCode,
        body: resp.resp
      };

    } catch (error) {
      logger.error(
        `[makeProveedoresController][getProveedoresController] -> Error: ${error}`
      );

      return {
        status: 500,
        body: {
          flag: false,
          mensaje: 'Error al consultar proveedores',
          rows: []
        }
      };
    }
  }

  // ==========================================
  // REGISTRAR PROVEEDOR
  // ==========================================
  async function crearProveedorController(request) {
    try {
      logger.info(
        '[makeProveedoresController][crearProveedorController] -> Starting Request'
      );

      const resp = await proveedoresActions.createProveedorAction(
        request.body
      );

      return {
        status: resp.statusCode,
        body: resp.resp
      };

    } catch (error) {
      logger.error(
        `[makeProveedoresController][crearProveedorController] -> Error: ${error}`
      );

      return {
        status: 500,
        body: {
          flag: false,
          mensaje: 'Error al registrar proveedor'
        }
      };
    }
  }

  // ==========================================
  // EDITAR PROVEEDOR
  // ==========================================
  async function actualizarProveedorController(request) {
    try {
      logger.info(
        '[makeProveedoresController][actualizarProveedorController] -> Starting Request'
      );

      const idProveedor = Number(request.params.id);

      if (!Number.isInteger(idProveedor) || idProveedor <= 0) {
        return {
          status: 400,
          body: {
            flag: false,
            mensaje: 'El ID del proveedor no es válido'
          }
        };
      }

      const resp = await proveedoresActions.updateProveedorAction({
        ...request.body,
        idProveedor
      });

      return {
        status: resp.statusCode,
        body: resp.resp
      };

    } catch (error) {
      logger.error(
        `[makeProveedoresController][actualizarProveedorController] -> Error: ${error}`
      );

      return {
        status: 500,
        body: {
          flag: false,
          mensaje: 'Error al actualizar proveedor'
        }
      };
    }
  }

  // ==========================================
  // EXPORTAR CONTROLADORES
  // ==========================================
  return Object.freeze({
    getProveedoresController,
    crearProveedorController,
    actualizarProveedorController
  });
}