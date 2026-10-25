export default function makeProductsdb ({ logger, execute, querys, oracledb }) {

    async function getProducts() {
        try {
            logger.info('[oracle][makeProductsdb][productsdb] -> starting DB')
            const queri = querys.productsdb
            const result =  await execute(queri, [])
            return result?.rows.length > 0 ? result.rows : []
        } catch (error) {
            logger.error(`[oracle][makeProductsdb][getProducts] ${e}`)
            return []
        }
    }

    async function createProductdb(data) {
        try {
            logger.info('[oracle][makeProductsdb][createProductdb] -> starting DB');
            const query = querys.crearProducto;
            const {
                nombre,
                precio_compra,
                precio_venta,
            } = data;
            const result = await execute(query, {
                id_producto: {
                    val: data.id_producto ?? null,
                    dir: oracledb.BIND_INOUT,
                    type: oracledb.NUMBER,
                },
                nombre,
                precio_compra,
                precio_venta,
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
            logger.info(`[oracle][makeProductsdb][createProductdb] -> ${mensaje}`);
            return {
                flag: resultado === 'TRUE',
                mensaje,
            };
        } catch (e) {
            logger.error(`[oracle][makeProductsdb][createProductdb] ${e}`);
            return {
                flag: false,
                mensaje: 'Error al crear el producto'
            };
        }
    }

    return Object.freeze({
        getProducts,
        createProductdb
    })
}