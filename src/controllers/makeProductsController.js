export default function makeProductsController({ logger, productsActions }) {
    async function getProductsController() {
      try {
        logger.info('[makeProductsController][getProductsController] -> Starting Request')
        const resp = await productsActions.getProductsActions()
        let response
        if (resp) {
          response = {
            status: resp.statusCode,
            body: resp.resp
          }
        }
        return response
      } catch (error) {
        logger.error(`[makeProductsController][getProductsController] -> Error not handle ${error}`)
        return response = {
            status: 400,
            body: {}
          }
      }
    }

    async function crearProductoController(request) {
      try {
        const data = request.body
        logger.info('[makeProductsController][crearProductoController] -> Starting Request')
        const resp = await productsActions.createProductAction(data)
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
        getProductsController,
        crearProductoController
    })
}