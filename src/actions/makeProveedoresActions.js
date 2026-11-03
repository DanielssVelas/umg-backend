export default function makeProveedoresActions({ logger, easyOracleDb }) {
  async function getProveedoresActions() {
    try {
      logger.info(
        '[makeProveedoresActions][getProveedoresActions] -> Iniciando consulta'
      );

      const result = await easyOracleDb.proveedoresdb.getProveedores();

      return {
        statusCode: 200,
        resp: {
          flag: true,
          mensaje: 'Proveedores obtenidos correctamente',
          rows: result,
        },
      };
    } catch (error) {
      logger.error(
        `[makeProveedoresActions][getProveedoresActions] Error: ${error}`
      );

      return {
        statusCode: 500,
        resp: {
          flag: false,
          mensaje: 'Error al consultar proveedores',
          rows: [],
        },
      };
    }
  }

  async function createProveedorAction(data) {
    try {
      logger.info(
        '[makeProveedoresActions][createProveedorAction] -> Registrando proveedor'
      );

      const result = await easyOracleDb.proveedoresdb.createProveedor(data);

      return {
        statusCode: 201,
        resp: result
      };
    } catch (error) {
      logger.error(
        `[makeProveedoresActions][createProveedorAction] Error: ${error}`
      );

      return {
        statusCode: 500,
        resp: {
          flag: false,
          mensaje: 'Error al registrar proveedor',
        },
      };
    }
  }

  return Object.freeze({
    getProveedoresActions,
    createProveedorAction,
  });
}