export default function makeProductsActions({ logger, easyOracleDb }) {
    async function getProductsActions() {
        try {
            logger.info('[makeProductsActions][getProductsActions] -> Starting Actions')
            const result = await easyOracleDb.productsdb.getProducts()
            return {
                statusCode: 200,
                resp: {
                    flag: true,
                    mensaje: 'succesfully',
                    rows: result
                }
            }
        } catch (e) {
            logger.error(`[makeSchedulesActions][looseLoadSchedulesExport] -> Has ocurrent error: ${e}`)
            return {
                statusCode: 400,
                resp: {
                    flag: false,
                    mensaje: 'error',
                    rows: []
                }
            }
        }
    }
    async function createProductAction(data) {
        try {
            logger.info('[makeProductsActions][createProductAction] -> Starting Actions')
            const result = await easyOracleDb.productsdb.createProductdb(data)
            return {
                statusCode: 200,
                resp: result
            }
        } catch (e) {
            logger.error(`[makeProductsActions][createProductAction] -> Has ocurrent error: ${e}`)
            return {
                statusCode: 400,
                resp: {
                    flag: false,
                    mensaje: 'error',
                }
            }
        }
    }
    return Object.freeze({
        getProductsActions,
        createProductAction
    })
}