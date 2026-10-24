import { productsActions, salesActions } from "../actions/index.js"
import { logger } from "../utils/index.js"

import makeProductsController from "./makeProductsController.js"
import makeSalesController from "./makeSalesControllers.js"

const productsController = makeProductsController({ logger, productsActions})
const salesController = makeSalesController({ logger, salesActions })

export {
    productsController,
    salesController
}