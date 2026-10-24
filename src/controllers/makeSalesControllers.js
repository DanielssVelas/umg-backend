export default function makeSalesController({ logger, salesActions }) {
    async function createSalesController(request) {
      try {
        const data = request.body
        logger.info('[makeProductsController][crearProductoController] -> Starting Request')
        const resp = await salesActions.createSalesActions(data)
        let response
        if (resp) {
          response = {
            status: resp.statusCode,
            body: resp.resp
          }
        }
        return response
      } catch (error) {
        logger.error(`[makeProductsController][crearProductoController] -> Error not handle ${error}`)
        return response = {
            status: 400,
            body: {}
          }
      }
    }
    return Object.freeze({
        createSalesController
    })
}