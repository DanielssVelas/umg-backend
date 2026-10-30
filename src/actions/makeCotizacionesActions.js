export default function makeCotizacionesActions({ logger, easyOracleDb }) {

    // Registrar una cotización
    async function crearCotizacionAction(data) {
        try {
            logger.info('[actions][makeCotizacionesActions][crearCotizacionAction] -> starting');

            const result = await easyOracleDb.cotizacionesdb.crearCotizacion(data);

            return {
                statusCode: result.flag ? 201 : 400,
                resp: result
            };

        } catch (error) {
            logger.error(`[actions][makeCotizacionesActions][crearCotizacionAction] ${error}`);

            return {
                statusCode: 500,
                resp: {
                    flag: false,
                    mensaje: 'Error al registrar la cotización'
                }
            };
        }
    }

    // Consultar historial de cotizaciones
    async function getHistorialCotizacionesAction() {
        try {
            logger.info('[actions][makeCotizacionesActions][getHistorialCotizacionesAction] -> starting');

            const result = await easyOracleDb.cotizacionesdb.getHistorialCotizaciones();

            return {
                statusCode: 200,
                resp: {
                    flag: true,
                    data: result
                }
            };

        } catch (error) {
            logger.error(`[actions][makeCotizacionesActions][getHistorialCotizacionesAction] ${error}`);

            return {
                statusCode: 500,
                resp: {
                    flag: false,
                    mensaje: 'Error al consultar el historial de cotizaciones'
                }
            };
        }
    }

    // Consultar detalle de una cotización
    async function getDetalleCotizacionAction(idCotizacion) {
        try {
            logger.info('[actions][makeCotizacionesActions][getDetalleCotizacionAction] -> starting');

            const result = await easyOracleDb.cotizacionesdb.getDetalleCotizacion(idCotizacion);

            return {
                statusCode: 200,
                resp: {
                    flag: true,
                    data: result
                }
            };

        } catch (error) {
            logger.error(`[actions][makeCotizacionesActions][getDetalleCotizacionAction] ${error}`);

            return {
                statusCode: 500,
                resp: {
                    flag: false,
                    mensaje: 'Error al consultar el detalle de la cotización'
                }
            };
        }
    }

    return Object.freeze({
        crearCotizacionAction,
        getHistorialCotizacionesAction,
        getDetalleCotizacionAction
    });
}