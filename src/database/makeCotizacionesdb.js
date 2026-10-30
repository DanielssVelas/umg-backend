export default function makeCotizacionesdb({ logger, execute, querys, oracledb }) {

    // Registrar una cotización
    async function crearCotizacion(data) {
        try {
            logger.info('[oracle][makeCotizacionesdb][crearCotizacion] -> starting DB');

            const result = await execute(querys.crearCotizacion, {
                idCliente: {
                    val: Number(data.idCliente),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                },
                idUsuario: {
                    val: Number(data.idUsuario),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                },
                fechaVencimiento: {
                    val: data.fechaVencimiento || null,
                    dir: oracledb.BIND_IN,
                    type: oracledb.STRING
                },
                subtotal: {
                    val: Number(data.subtotal),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                },
                descuento: {
                    val: Number(data.descuento || 0),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                },
                impuesto: {
                    val: Number(data.impuesto || 0),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                },
                total: {
                    val: Number(data.total),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                },
                detalles: {
                    val: JSON.stringify(data.detalles),
                    dir: oracledb.BIND_IN,
                    type: oracledb.CLOB
                },
                idCotizacion: {
                    dir: oracledb.BIND_OUT,
                    type: oracledb.NUMBER
                }
            });

            const idCotizacion = result.outBinds.idCotizacion;

            logger.info(`[oracle][makeCotizacionesdb][crearCotizacion] -> Cotización ${idCotizacion} registrada`);

            return {
                flag: true,
                mensaje: 'Cotización registrada correctamente',
                idCotizacion
            };

        } catch (error) {
            logger.error(`[oracle][makeCotizacionesdb][crearCotizacion] ${error}`);

            return {
                flag: false,
                mensaje: error.message || 'Error al registrar la cotización'
            };
        }
    }

    // Obtener historial de cotizaciones
    async function getHistorialCotizaciones() {
        try {
            logger.info('[oracle][makeCotizacionesdb][getHistorialCotizaciones] -> Consultando historial');

            const result = await execute(querys.historialCotizacionesdb, []);

            return result?.rows || [];

        } catch (error) {
            logger.error(`[oracle][makeCotizacionesdb][getHistorialCotizaciones] ${error}`);
            throw error;
        }
    }

    // Obtener detalle de una cotización
    async function getDetalleCotizacion(idCotizacion) {
        try {
            const result = await execute(querys.detalleHistorialCotizacionesdb, {
                idCotizacion: {
                    val: Number(idCotizacion),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                }
            });

            return result?.rows || [];

        } catch (error) {
            logger.error(`[oracle][makeCotizacionesdb][getDetalleCotizacion] ${error}`);
            throw error;
        }
    }

    return Object.freeze({
        crearCotizacion,
        getHistorialCotizaciones,
        getDetalleCotizacion
    });
}