export default function makeProveedoresController({
  logger,
  proveedoresActions
}) {
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

  return Object.freeze({
    getProveedoresController,
    crearProveedorController
  });
}