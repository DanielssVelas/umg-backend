export default function makeProveedoresActions({ logger, easyOracleDb }) {

  // ==========================================
  // CONSULTAR PROVEEDORES
  // ==========================================
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

  // ==========================================
  // REGISTRAR PROVEEDOR
  // ==========================================
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

  // ==========================================
  // EDITAR PROVEEDOR
  // ==========================================
  async function updateProveedorAction(data) {
    try {
      logger.info(
        '[makeProveedoresActions][updateProveedorAction] -> Actualizando proveedor'
      );

      if (
        !data.idProveedor ||
        !data.nombre?.trim() ||
        !data.direccion?.trim() ||
        !data.telefono?.trim()
      ) {
        return {
          statusCode: 400,
          resp: {
            flag: false,
            mensaje: 'Completa los datos obligatorios del proveedor',
          },
        };
      }

      const result = await easyOracleDb.proveedoresdb.updateProveedor({
        idProveedor: data.idProveedor,
        nombre: data.nombre.trim(),
        direccion: data.direccion.trim(),
        telefono: data.telefono.trim(),
        nit: data.nit?.trim() || null,
      });

      if (!result || result.rowsAffected === 0) {
        return {
          statusCode: 404,
          resp: {
            flag: false,
            mensaje: 'No se encontró el proveedor',
          },
        };
      }

      return {
        statusCode: 200,
        resp: {
          flag: true,
          mensaje: 'Proveedor actualizado correctamente',
        },
      };

    } catch (error) {
      logger.error(
        `[makeProveedoresActions][updateProveedorAction] Error: ${error}`
      );

      return {
        statusCode: 500,
        resp: {
          flag: false,
          mensaje: 'Error al actualizar proveedor',
        },
      };
    }
  }

  // ==========================================
  // EXPORTAR FUNCIONES
  // ==========================================
  return Object.freeze({
    getProveedoresActions,
    createProveedorAction,
    updateProveedorAction,
  });
}