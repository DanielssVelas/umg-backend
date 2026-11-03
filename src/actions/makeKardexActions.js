export default function makeKardexActions({ logger, easyOracleDb }) {

  async function getMovimientosAction(filtros = {}) {
    try {
      const data = await easyOracleDb.kardexdb.getMovimientos(filtros);

      return {
        statusCode: 200,
        resp: {
          flag: true,
          data
        }
      };

    } catch (error) {
      logger.error(`[makeKardexActions][getMovimientosAction] ${error}`);

      return {
        statusCode: 500,
        resp: {
          flag: false,
          message: 'Error al consultar los movimientos del Kardex'
        }
      };
    }
  }

  async function getExistenciasAction() {
    try {
      const data = await easyOracleDb.kardexdb.getExistencias();

      return {
        statusCode: 200,
        resp: {
          flag: true,
          data
        }
      };

    } catch (error) {
      logger.error(`[makeKardexActions][getExistenciasAction] ${error}`);

      return {
        statusCode: 500,
        resp: {
          flag: false,
          message: 'Error al consultar las existencias'
        }
      };
    }
  }

  return Object.freeze({
    getMovimientosAction,
    getExistenciasAction
  });
}