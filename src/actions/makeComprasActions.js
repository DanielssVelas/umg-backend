
export default function makeComprasActions({ logger, easyOracleDb }) {

    // Registrar una compra
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

    // Consultar historial de compras
    async function getHistorialComprasAction() {
        try {
            logger.info('[actions][makeComprasActions][getHistorialComprasAction] -> starting');

            const result = await easyOracleDb.comprasdb.getHistorialCompras();

            return {
                statusCode: 200,
                resp: {
                    flag: true,
                    data: result
                }
            };

        } catch (error) {
            logger.error(`[actions][makeComprasActions][getHistorialComprasAction] ${error}`);

            return {
                statusCode: 500,
                resp: {
                    flag: false,
                    mensaje: 'Error al consultar el historial de compras'
                }
            };
        }
    }

    // Consultar detalle de una compra
    async function getDetalleCompraAction(idCompra) {
        try {
            logger.info('[actions][makeComprasActions][getDetalleCompraAction] -> starting');

            const result = await easyOracleDb.comprasdb.getDetalleCompra(idCompra);

            return {
                statusCode: 200,
                resp: {
                    flag: true,
                    data: result
                }
            };

        } catch (error) {
            logger.error(`[actions][makeComprasActions][getDetalleCompraAction] ${error}`);

            return {
                statusCode: 500,
                resp: {
                    flag: false,
                    mensaje: 'Error al consultar el detalle de la compra'
                }
            };
        }
    }

    return Object.freeze({
        createCompraAction,
        getHistorialComprasAction,
        getDetalleCompraAction
    });
}
