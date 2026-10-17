export default function makeLogger({ winston, dateManaguer, env }) {
  const { NODE_ENV, LOG_FILENAME, ENABLE_LOG_FILE } = env
  const { combine, timestamp, printf, colorize, json } = winston.format

  const config = {
    file: {
      level: 'info',
      filename: `${process.cwd()}/logs/${LOG_FILENAME}.log`,
      handleExceptions: true,
      json: true,
      maxFiles: 5,
      colorize: false,
      format: combine(
        timestamp({
          format: () => dateManaguer.getSysdate()
        }),
        json()
      )
    },
    console: {
      level: NODE_ENV !== 'production' ? 'debug' : 'info',
      handleExceptions: true,
      json: false,
      colorize: true,
      format: combine(
        colorize(),
        timestamp({
          format: () => dateManaguer.getSysdate()
        }),
        printf((info) => {
          // eslint-disable-next-line no-shadow
          const { timestamp, level, message, ...extra } = info

          return `${timestamp} [${level}]: ${message} ${
            Object.keys(extra).length ? JSON.stringify(extra, null, 2) : ''
          }`
        })
      )
    }
  }

  const loggerTransports = [new winston.transports.Console(config.console)]

  if (ENABLE_LOG_FILE === 'true') loggerTransports.push(new winston.transports.File(config.file))

  const myLogger = winston.createLogger({
    transports: loggerTransports,
    exitOnError: false
  })

  myLogger.stream = {
    write(message) {
      myLogger.info(message)
    }
  }
  return myLogger
}
