export default function makeGestionarCajaController({ logger, gestionarCajaActions }) {
    async function consultarCajaController(request) {
      try {
        logger.info('[makeProductsController][getProductsController] -> Starting Request')
        const resp = await gestionarCajaActions.consultarCajaActions(request.params)
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
    async function createGestionCajaController(request) {
      try {
        const data = request.body
        logger.info('[makeGestionarCajaController][createGestionCajaController] -> Starting Request')
        const resp = await gestionarCajaActions.createGestionCajaActions(data)
        let response
        if (resp) {
          response = {
            status: resp.statusCode,
            body: resp.resp
          }
        }
        return response
      } catch (error) {
        logger.error(`[makeGestionarCajaController][createGestionCajaController] -> Error not handle ${error}`)
        return response = {
            status: 400,
            body: {}
          }
      }
    }
    return Object.freeze({
        createGestionCajaController,
        consultarCajaController
    })
}