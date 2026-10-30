import express from 'express'
import cors from 'cors'
import requestID from 'express-request-id'
import compression from 'compression'
import bodyParser from 'body-parser'
import config from '../config/env.js'
import router from '../routes/index.js'

const { SERVER_PORT, SERVER_TIMEOUT } = config
const app = express()

app.use(cors())
app.use(requestID())
app.use(express.static('files'))
app.use(express.urlencoded({ extended: true }))
app.use(express.text())
app.use(bodyParser.json())
app.use(compression())
app.use(express.json())

// Health check endpoint para Docker y monitoreo en Azure
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  })
})

app.use(router)
app.disable('x-powered-by')

const server = app.listen(SERVER_PORT, (e) => {
  if (e) throw e
  console.log('Server running on port:', SERVER_PORT)
})

server.timeout = parseInt(SERVER_TIMEOUT, 10) * 1000 || 90000
server.keepAliveTimeout = 65000
server.headersTimeout = 66000

// Manejo de apagado ordenado (Graceful Shutdown) para contenedores Docker
process.on('SIGTERM', () => {
  console.log('SIGTERM recibido: cerrando servidor HTTP ordenadamente...')
  server.close(() => {
    console.log('Servidor HTTP cerrado.')
    process.exit(0)
  })
})
