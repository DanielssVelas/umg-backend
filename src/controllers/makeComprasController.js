
export default function makeComprasController({ logger, comprasActions }) {

    // Registrar compra
    async function crearCompraController(request) {
        try {
            const data = request.body;

            const resp = await comprasActions.createCompraAction(data);

            return {
                status: resp.statusCode,
                body: resp.resp
            };

        } catch (error) {
            logger.error(`[controller][makeComprasController][crearCompraController] ${error}`);

            return {
                status: 500,
                body: {
                    flag: false,
                    mensaje: 'Error al registrar la compra'
                }
            };
        }
    }

    // Consultar historial de compras
    async function getHistorialComprasController() {
        try {
            const resp = await comprasActions.getHistorialComprasAction();

            return {
                status: resp.statusCode,
                body: resp.resp
            };

        } catch (error) {
            logger.error(`[controller][makeComprasController][getHistorialComprasController] ${error}`);

            return {
                status: 500,
                body: {
                    flag: false,
                    mensaje: 'Error al consultar el historial de compras'
                }
            };
        }
    }

    // Consultar detalle de una compra
    async function getDetalleCompraController(request) {
        try {
            const { idCompra } = request.params;

            const resp = await comprasActions.getDetalleCompraAction(idCompra);

            return {
                status: resp.statusCode,
                body: resp.resp
            };

        } catch (error) {
            logger.error(`[controller][makeComprasController][getDetalleCompraController] ${error}`);

            return {
                status: 500,
                body: {
                    flag: false,
                    mensaje: 'Error al consultar el detalle de la compra'
                }
            };
        }
    }

    return Object.freeze({
        crearCompraController,
        getHistorialComprasController,
        getDetalleCompraController
    });
}
