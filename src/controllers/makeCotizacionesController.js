export default function makeCotizacionesController({ logger, cotizacionesActions }) {

    // Registrar cotización
    async function crearCotizacionController(request) {
        try {
            const data = request.body;

            const resp = await cotizacionesActions.crearCotizacionAction(data);

            return {
                status: resp.statusCode,
                body: resp.resp
            };

        } catch (error) {
            logger.error(`[controller][makeCotizacionesController][crearCotizacionController] ${error}`);

            return {
                status: 500,
                body: {
                    flag: false,
                    mensaje: 'Error al registrar la cotización'
                }
            };
        }
    }

    // Consultar historial de cotizaciones
    async function getHistorialCotizacionesController() {
        try {
            const resp = await cotizacionesActions.getHistorialCotizacionesAction();

            return {
                status: resp.statusCode,
                body: resp.resp
            };

        } catch (error) {
            logger.error(`[controller][makeCotizacionesController][getHistorialCotizacionesController] ${error}`);

            return {
                status: 500,
                body: {
                    flag: false,
                    mensaje: 'Error al consultar el historial de cotizaciones'
                }
            };
        }
    }

    // Consultar detalle de una cotización
    async function getDetalleCotizacionController(request) {
        try {
            const { idCotizacion } = request.params;

            const resp = await cotizacionesActions.getDetalleCotizacionAction(idCotizacion);

            return {
                status: resp.statusCode,
                body: resp.resp
            };

        } catch (error) {
            logger.error(`[controller][makeCotizacionesController][getDetalleCotizacionController] ${error}`);

            return {
                status: 500,
                body: {
                    flag: false,
                    mensaje: 'Error al consultar el detalle de la cotización'
                }
            };
        }
    }

    return Object.freeze({
        crearCotizacionController,
        getHistorialCotizacionesController,
        getDetalleCotizacionController
    });
}