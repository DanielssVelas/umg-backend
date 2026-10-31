export default function makeGestionCajadb({ logger, execute, querys, oracledb }) {
    async function consultarCajaAbiertaDb(data) {
        try {
            console.log('data', data.idUsuario);
            
            logger.info('[oracle][makeProductsdb][productsdb] -> starting DB')
            const queri = querys.consultarCajaAbiertaDb
            const result =  await execute(queri, [data.idUsuario])
            return result?.rows.length > 0 ? result.rows : []
        } catch (error) {
            logger.error(`[oracle][makeProductsdb][getProducts] ${e}`)
            return []
        }
    }
    async function createGestionCajadb(data) {
        try {
            logger.info('[oracle][makeGestionCajadb][createGestionCajadb] -> starting DB');
            console.log('data', data);
            
            const query = querys.gestionarCajadb

            const result = await execute(query, {
                p_accion: data.p_accion,
                p_usuario: data.p_usuario,
                p_nombre: data.p_nombre ?? null,
                p_monto_inicial: data.p_monto_inicial ?? null,
                p_id_caja: data.p_id_caja ?? null,
                p_monto_contado: data.p_monto_contado ?? null,

                resultado: {
                    dir: oracledb.BIND_OUT,
                    type: oracledb.STRING,
                    maxSize: 200
                },
                mensaje: {
                    dir: oracledb.BIND_OUT,
                    type: oracledb.STRING,
                    maxSize: 200
                }
            });
            const {
                mensaje,
                resultado,
            } = result.outBinds;
            logger.info(`[oracle][makeGestionCajadb][createGestionCajadb] -> ${mensaje}`);
            return {
                flag: resultado === 'TRUE',
                mensaje,
            };
        } catch (e) {
            logger.error(`[oracle][makeGestionCajadb][createGestionCajadb] ${e}`);
            return {
                flag: false,
                mensaje: 'Error al crear el producto'
            };
        }
    }
    return Object.freeze({
        createGestionCajadb,
        consultarCajaAbiertaDb
    })
}