
export default function makeComprasdb({ logger, execute, querys, oracledb }) {

    async function createCompradb(data) {
        try {
            logger.info('[oracle][makeComprasdb][createCompradb] -> starting DB');

            const query = querys.registrarCompra;

            const result = await execute(query, {
                p_total: {
                    val: data.total,
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                },
                p_proveedor: {
                    val: data.idProveedor,
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                },
                p_usuario: {
                    val: data.idUsuario,
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                },
                p_tipo_comprobante: {
                    val: data.tipoComprobante,
                    dir: oracledb.BIND_IN,
                    type: oracledb.STRING
                },
                p_serie: {
                    val: data.serie ?? null,
                    dir: oracledb.BIND_IN,
                    type: oracledb.STRING
                },
                p_numero_comprobante: {
                    val: data.numeroComprobante,
                    dir: oracledb.BIND_IN,
                    type: oracledb.STRING
                },
                p_detalles: {
                    val: JSON.stringify(data.detalles),
                    dir: oracledb.BIND_IN,
                    type: oracledb.CLOB
                },
                p_mensaje: {
                    dir: oracledb.BIND_OUT,
                    type: oracledb.STRING,
                    maxSize: 4000
                },
                p_resultado: {
                    dir: oracledb.BIND_OUT,
                    type: oracledb.STRING,
                    maxSize: 50
                }
            });

            const { p_mensaje, p_resultado } = result.outBinds;

            logger.info(`[oracle][makeComprasdb][createCompradb] -> ${p_mensaje}`);

            return {
                flag: p_resultado === 'TRUE',
                mensaje: p_mensaje
            };

        } catch (error) {
            logger.error(`[oracle][makeComprasdb][createCompradb] ${error}`);

            return {
                flag: false,
                mensaje: error.message || 'Error al registrar la compra'
            };
        }
    }

    return Object.freeze({
        createCompradb
    });
}
