
export default function makeComprasActions({ logger, easyOracleDb }) {

    async function createCompraAction(data) {
        try {
            logger.info('[actions][makeComprasActions][createCompraAction] -> starting');

            const result = await easyOracleDb.comprasdb.createCompradb(data);

            return {
                statusCode: result.flag ? 201 : 400,
                resp: result
            };

        } catch (error) {
            logger.error(`[actions][makeComprasActions][createCompraAction] ${error}`);

            return {
                statusCode: 500,
                resp: {
                    flag: false,
                    mensaje: 'Error al registrar la compra'
                }
            };
        }
    }

    return Object.freeze({
        createCompraAction
    });
}
