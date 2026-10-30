
export default function makeClientesController({ logger, clientesActions }) {

    async function getClientesController() {
        try {
            const resp = await clientesActions.getClientes();

            return {
                status: resp.statusCode,
                body: resp.resp
            };

        } catch (error) {
            logger.error(`[controller][makeClientesController][getClientesController] ${error}`);

            return {
                status: 500,
                body: {
                    flag: false,
                    mensaje: 'Error al consultar los clientes'
                }
            };
        }
    }

    return Object.freeze({
        getClientesController
    });
}
