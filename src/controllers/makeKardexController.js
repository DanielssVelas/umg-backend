export default function makeKardexController({ logger, kardexActions }) {

  async function getMovimientosController(request) {
    try {
      const { idProducto, tipoMovimiento, fechaInicio, fechaFin } = request.query;

      const filtros = {
        idProducto,
        tipoMovimiento,
        fechaInicio,
        fechaFin
      };

      const response = await kardexActions.getMovimientosAction(filtros);

      return {
        status: response.statusCode,
        body: response.resp
      };

    } catch (error) {
      logger.error(`[makeKardexController][getMovimientosController] ${error}`);

      return {
        status: 500,
        body: {
          flag: false,
          message: 'Error interno al consultar el Kardex'
        }
      };
    }
  }

  async function getExistenciasController() {
    try {
      const response = await kardexActions.getExistenciasAction();

      return {
        status: response.statusCode,
        body: response.resp
      };

    } catch (error) {
      logger.error(`[makeKardexController][getExistenciasController] ${error}`);

      return {
        status: 500,
        body: {
          flag: false,
          message: 'Error interno al consultar las existencias'
        }
      };
    }
  }

  return Object.freeze({
    getMovimientosController,
    getExistenciasController
  });
}