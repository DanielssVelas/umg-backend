import { logger } from '../utils/index.js'

export default function routerCallback(controller) {
  return async (req, res) => {
    const { id: requestId } = req

    let requestTimedOut = false

    const requestTimeout = setTimeout(() => {
      if (res.headersSent || res.writableEnded) {
        return
      }

      requestTimedOut = true
      res.status(504).send({
        result: false,
        code: 504,
        description: 'La solicitud excedio el tiempo de espera',
        data: {}
      })
    }, 80000)

    const request = {
      id: requestId || '',
      body: req.body,
      host: req.get('host'),
      origin: req.get('origin') || req.socket.remoteAddress,
      query: req.query,
      protocol: req.protocol,
      params: req.params,
      method: req.method,
      path: req.path,
      headers: req.headers,
      user: req.user,
      files: req.files
    }

    let httpResponse

    try {
      httpResponse = await controller(request)
    } catch (error) {
      logger.error(`[${requestId}][routerCallback] -> Error no manejado en el controlador: ${error?.stack || error?.message || error}`)
      if (!res.headersSent && !res.writableEnded) {
        res.status(500)
        res.setHeader('Content-Type', 'application/problem+json')
        res.send({
          result: false,
          code: 500,
          description: 'an internal server error ocurred',
          data: {}
        })
      }
      return
    } finally {
      clearTimeout(requestTimeout)
    }

    clearTimeout(requestTimeout)

    if (requestTimedOut || res.headersSent || res.writableEnded) {
      return
    }

    let transactionResult = false

    if (httpResponse) {
      const { status, headers, body, description } = httpResponse
      if (headers) res.set(headers)
      if (status === 409 || status === 404 || status === 400) {
        res.setHeader('Content-Type', 'application/problem+json')
      } else {
        transactionResult = true
        res.setHeader('Content-Type', 'application/json')
      }
      res.status(status)
      const response = {
        // id: requestId,
        result: transactionResult,
        code: status,
        description,
        data: body
      }
      res.send(response)
    } else {
      res.status(500)
      res.setHeader('Content-Type', 'application/problem+json')
      const response = {
        // id: requestId,
        result: false,
        code: 500,
        description: 'an internal server error ocurred',
        data: {}
      }
      res.send(response)
    }
  }
}
