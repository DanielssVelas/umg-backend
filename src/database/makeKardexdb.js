export default function makeKardexdb({ logger, execute, querys, oracledb }) {

  async function getMovimientos(filtros = {}) {
    try {
      logger.info('[makeKardexdb][getMovimientos] Consultando movimientos');

      const result = await execute(querys.kardexdb, {
        idProducto: {
          val: filtros.idProducto ? Number(filtros.idProducto) : null,
          dir: oracledb.BIND_IN,
          type: oracledb.NUMBER
        },
        tipoMovimiento: {
          val: filtros.tipoMovimiento || null,
          dir: oracledb.BIND_IN,
          type: oracledb.STRING
        },
        fechaInicio: {
          val: filtros.fechaInicio || null,
          dir: oracledb.BIND_IN,
          type: oracledb.STRING
        },
        fechaFin: {
          val: filtros.fechaFin || null,
          dir: oracledb.BIND_IN,
          type: oracledb.STRING
        }
      });

      return result?.rows || [];

    } catch (error) {
      logger.error(`[makeKardexdb][getMovimientos] ${error}`);
      throw error;
    }
  }

  async function getExistencias() {
    try {
      logger.info('[makeKardexdb][getExistencias] Consultando existencias');

      const result = await execute(querys.kardexExistenciasdb, []);

      return result?.rows || [];

    } catch (error) {
      logger.error(`[makeKardexdb][getExistencias] ${error}`);
      throw error;
    }
  }

  return Object.freeze({
    getMovimientos,
    getExistencias
  });
}