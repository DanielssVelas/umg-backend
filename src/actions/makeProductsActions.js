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
    return Object.freeze({
        getProductsActions
    })
}