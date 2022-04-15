import app from '../app.js'
import debug0 from 'debug'
import http from 'http'
import { PORT } from '../utils/config.js'
import logger from '../utils/logger.js'

const debug = debug0('nodeauth:server')

const port = normalizePort(PORT || '3000')

const server = http.createServer(app)

server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

function normalizePort(val) {
  const port = parseInt(val, 10)

  if (isNaN(port)) {
    // named pipe
    return val
  }

  if (port >= 0) {
    // port number
    return port
  }

  return false
}

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? 'Pipe ' + port
    : 'Port ' + port

  switch (error.code) {
  case 'EACCES':
    logger.error(bind + ' requires elevated privileges')
    process.exit(1)
    break
  case 'EADDRINUSE':
    logger.error(bind + ' is already in use')
    process.exit(1)
    break
  default:
    throw error
  }
}

function onListening() {
  const adder = server.address()
  const bind = typeof adder === 'string'
    ? 'pipe ' + adder
    : 'port ' + adder.port
  debug('Listening on ' + bind)
}
