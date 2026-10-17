import { productsActions } from "../actions/index.js"
import { logger } from "../utils/index.js"

import makeProductsController from "./makeProductsController.js"

const productsController = makeProductsController({ logger, productsActions})

export {
    productsController
}