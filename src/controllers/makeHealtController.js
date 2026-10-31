
export default function makeHealtController({ logger, healtActions }) {

    async function getHealtController() {
        try {
            const resp = await healtActions.healt();

            return {
                status: resp.statusCode,
                body: resp.resp
            };

        } catch (error) {
            logger.error(`[controller][makeHealtController][getHealtController] ${error}`);

            return {
                status: 500,
                body: {
                    flag: false,
                    mensaje: 'Error al consultar la salud'
                }
            };
        }
    }

    return Object.freeze({
        getHealtController
    });
}
