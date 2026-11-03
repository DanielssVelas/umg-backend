export default function makeComprasdb({ logger, execute, querys, oracledb }) {

    // ==========================================
    // REGISTRAR COMPRA
    // ==========================================

    async function createCompradb(data) {
        try {
            logger.info(
                '[oracle][makeComprasdb][createCompradb] -> starting DB'
            );

            const result = await execute(querys.registrarCompra, {
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
                    type: oracledb.STRING,
                    maxSize: 50
                },

                p_serie: {
                    val: data.serie ?? null,
                    dir: oracledb.BIND_IN,
                    type: oracledb.STRING,
                    maxSize: 50
                },

                p_numero_comprobante: {
                    val: data.numeroComprobante ?? null,
                    dir: oracledb.BIND_IN,
                    type: oracledb.STRING,
                    maxSize: 50
                },

                p_detalles: {
                    val: JSON.stringify(data.detalles),
                    dir: oracledb.BIND_IN,
                    type: oracledb.CLOB
                },

                // Primero P_RESULTADO
                p_resultado: {
                    dir: oracledb.BIND_OUT,
                    type: oracledb.STRING,
                    maxSize: 50
                },

                // Después P_MENSAJE
                p_mensaje: {
                    dir: oracledb.BIND_OUT,
                    type: oracledb.STRING,
                    maxSize: 4000
                }
            });

            const {
                p_resultado,
                p_mensaje
            } = result.outBinds;

            logger.info(
                `[oracle][makeComprasdb][createCompradb] -> ${p_mensaje}`
            );

            return {
                flag: p_resultado === 'TRUE',
                mensaje: p_mensaje
            };

        } catch (error) {
            logger.error(
                `[oracle][makeComprasdb][createCompradb] ${error}`
            );

            return {
                flag: false,
                mensaje: error.message || 'Error al registrar la compra'
            };
        }
    }

    // ==========================================
    // HISTORIAL DE COMPRAS
    // ==========================================

    async function getHistorialCompras() {
        try {
            logger.info(
                '[oracle][makeComprasdb][getHistorialCompras] -> Consultando historial'
            );

            const result = await execute(
                querys.historialComprasdb,
                []
            );

            return result?.rows || [];

        } catch (error) {
            logger.error(
                `[oracle][makeComprasdb][getHistorialCompras] ${error}`
            );

            throw error;
        }
    }

    // ==========================================
    // DETALLE DE COMPRA
    // ==========================================

    async function getDetalleCompra(idCompra) {
        try {
            const sql = querys.detalleHistorialComprasdb;

            if (typeof sql !== 'string') {
                throw new Error(
                    'La consulta detalleHistorialComprasdb no existe en querys.js'
                );
            }

            const result = await execute(sql, {
                idCompra: {
                    val: Number(idCompra),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                }
            });

            return result?.rows || [];

        } catch (error) {
            logger.error(
                `[oracle][makeComprasdb][getDetalleCompra] ${error}`
            );

            throw error;
        }
    }

    return Object.freeze({
        createCompradb,
        getHistorialCompras,
        getDetalleCompra
    });
}