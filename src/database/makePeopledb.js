export default function makeProductsdb ({ logger, execute, querys }) {

    async function getProducts() {
        try {
            logger.info('[oracle][makeProductsdb][productsdb] -> starting DB')
            const queri = querys.productsdb
            const result =  await execute(queri, [])
            return result?.rows.length > 0 ? result.rows : []
        } catch (error) {
            logger.error(`[easyport-oracle][makeAppoitmentDB][validateVesselDB] ${e}`)
            return []
        }
    }

    return Object.freeze({
        getProducts
    })
}