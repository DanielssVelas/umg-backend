export default function makeSalesdb({ logger, execute, querys, oracledb }) {
    async function createSalesdb(data) {
        try {
            logger.info('[oracle][makeSalesdb][createSalesdb] -> starting DB');
            const query = querys.registrarVenta;
            const {
                idCliente,
                idUsuario,
                idCaja,
                detalles,
                total
            } = data;
            const result = await execute(query, {
                total: {
                    val: total,
                    dir: oracledb.BIND_INOUT,
                    type: oracledb.NUMBER,
                },
                idCliente: {
                    val: idCliente,
                    dir: oracledb.BIND_INOUT,
                    type: oracledb.NUMBER,
                },
                idUsuario: {
                    val: idUsuario,
                    dir: oracledb.BIND_INOUT,
                    type: oracledb.NUMBER,
                },
                idCaja: {
                    val: idCaja,
                    dir: oracledb.BIND_INOUT,
                    type: oracledb.NUMBER,
                },
                detalles: {
                    val: JSON.stringify(detalles),
                    dir: oracledb.BIND_INOUT,
                    type: oracledb.STRING,
                },
                mensaje: {
                    dir: oracledb.BIND_OUT,
                    type: oracledb.STRING,
                    maxSize: 4000,
                },
                resultado: {
                    dir: oracledb.BIND_OUT,
                    type: oracledb.STRING,
                    maxSize: 50,
                },
            });
            const {
                mensaje,
                resultado,
            } = result.outBinds;
            logger.info(`[oracle][makeSalesdb][createSalesdb] -> ${mensaje}`);
            return {
                flag: resultado === 'TRUE',
                mensaje,
            };
        } catch (e) {
            logger.error(`[oracle][makeSalesdb][createSalesdb] ${e}`);
            return {
                flag: false,
                mensaje: 'Error al crear el producto'
            };
        }
    }
    return Object.freeze({
        createSalesdb
    })
}