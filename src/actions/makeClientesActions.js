
export default function makeClientesActions({ logger, easyOracleDb }) {
  async function getClientes() {
    try {
      logger.info('[actions][makeClientesActions][getClientes] -> Consultando clientes');

      const data = await easyOracleDb.clientesdb.getClientes();

      return {
        statusCode: 200,
        resp: {
          flag: true,
          data
        }
      };
    } catch (error) {
      logger.error(`[actions][makeClientesActions][getClientes] ${error}`);

      return {
        statusCode: 500,
        resp: {
          flag: false,
          mensaje: 'Error al consultar los clientes'
        }
      };
    }
  }

  return Object.freeze({ getClientes });
}
