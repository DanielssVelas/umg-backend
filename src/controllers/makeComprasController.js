
export default function makeComprasController({ logger, comprasActions }) {

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

    return Object.freeze({
        crearCompraController
    });
}
