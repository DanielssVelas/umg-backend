export default function makeClientesActions({ logger, easyOracleDb }) {

  async function getClientes() {
    try {
      const data = await easyOracleDb.clientesdb.getClientes();

      return {
        statusCode: 200,
        resp: { flag: true, data }
      };
    } catch (error) {
      logger.error(`[actions][getClientes] ${error}`);

      return {
        statusCode: 500,
        resp: {
          flag: false,
          mensaje: 'Error al consultar los clientes'
        }
      };
    }
  }

  async function crearCliente(cliente) {
    try {
      if (!cliente.nombre || !cliente.direccion || !cliente.telefono) {
        return {
          statusCode: 400,
          resp: {
            flag: false,
            mensaje: 'Nombre, dirección y teléfono son obligatorios'
          }
        };
      }

      await easyOracleDb.clientesdb.crearCliente(cliente);

      return {
        statusCode: 201,
        resp: {
          flag: true,
          mensaje: 'Cliente registrado correctamente'
        }
      };
    } catch (error) {
      logger.error(`[actions][crearCliente] ${error}`);

      return {
        statusCode: 500,
        resp: {
          flag: false,
          mensaje: 'Error al registrar el cliente'
        }
      };
    }
  }

  async function actualizarCliente(cliente) {
    try {
      if (!cliente.idCliente || !cliente.nombre ||
          !cliente.direccion || !cliente.telefono) {
        return {
          statusCode: 400,
          resp: {
            flag: false,
            mensaje: 'ID, nombre, dirección y teléfono son obligatorios'
          }
        };
      }

      const result = await easyOracleDb.clientesdb.actualizarCliente(cliente);

      if (!result.rowsAffected) {
        return {
          statusCode: 404,
          resp: {
            flag: false,
            mensaje: 'Cliente no encontrado'
          }
        };
      }

      return {
        statusCode: 200,
        resp: {
          flag: true,
          mensaje: 'Cliente actualizado correctamente'
        }
      };
    } catch (error) {
      logger.error(`[actions][actualizarCliente] ${error}`);

      return {
        statusCode: 500,
        resp: {
          flag: false,
          mensaje: 'Error al actualizar el cliente'
        }
      };
    }
  }

  async function buscarClientes(texto) {
    try {
      const data = await easyOracleDb.clientesdb.buscarClientes(texto || '');

      return {
        statusCode: 200,
        resp: {
          flag: true,
          data
        }
      };
    } catch (error) {
      logger.error(`[actions][buscarClientes] ${error}`);

      return {
        statusCode: 500,
        resp: {
          flag: false,
          mensaje: 'Error al buscar clientes'
        }
      };
    }
  }

  return Object.freeze({
    getClientes,
    crearCliente,
    actualizarCliente,
    buscarClientes
  });
}