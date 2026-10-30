
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

    // Consultar historial
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

    // Consultar detalle
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

    // Convertir cotización en venta
    async function convertirCotizacionEnVentaController(request) {
        try {
            const data = {
                idCotizacion: Number(request.params.idCotizacion),
                idUsuario: Number(request.body.idUsuario),
                idCaja: Number(request.body.idCaja)
            };

            if (
                !Number.isInteger(data.idCotizacion) || data.idCotizacion <= 0 ||
                !Number.isInteger(data.idUsuario) || data.idUsuario <= 0 ||
                !Number.isInteger(data.idCaja) || data.idCaja <= 0
            ) {
                return {
                    status: 400,
                    body: {
                        flag: false,
                        mensaje: 'Debes proporcionar un ID de cotización, usuario y caja válidos'
                    }
                };
            }

            const resp = await cotizacionesActions.convertirCotizacionEnVentaAction(data);

            return {
                status: resp.statusCode,
                body: resp.resp
            };
        } catch (error) {
            logger.error(`[controller][makeCotizacionesController][convertirCotizacionEnVentaController] ${error}`);
            return {
                status: 500,
                body: {
                    flag: false,
                    mensaje: 'Error al convertir la cotización en venta'
                }
            };
        }
    }

    return Object.freeze({
        crearCotizacionController,
        getHistorialCotizacionesController,
        getDetalleCotizacionController,
        convertirCotizacionEnVentaController
    });
}
