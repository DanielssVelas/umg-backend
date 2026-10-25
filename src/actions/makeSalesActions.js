export default function makeSalesActions({ logger, easyOracleDb }) {
    async function createSalesActions(data) {
        try {
            logger.info('[makeSalesActions][createSalesActions] -> Starting Actions')
            const result = await easyOracleDb.salesdb.createSalesdb(data)
            return {
                statusCode: 200,
                resp: result
            }
        } catch (e) {
            logger.error(`[makeSalesActions][createSalesActions] -> Has ocurrent error: ${e}`)
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
        createSalesActions
    })
}