import oracledb from 'oracledb'
import env from '../config/env.js'
import {
  logger
} from '../utils/index.js'
import makeProductsdb from './makeProductsdb.js'
import querys from './querys.js'

const {
  ORACLE_USER,
  ORACLE_PASSWORD,
  ORACLE_CONNECT_STRING,
  ORACLE_POOL_MAX,
  ORACLE_POOL_MIN,
  ORACLE_POOL_INCREMENT,
  ORACLE_POOL_TIMEOUT,
  ORACLE_CALL_TIMEOUT
} = env
const config = {
  user: ORACLE_USER,
  password: ORACLE_PASSWORD,
  connectString: ORACLE_CONNECT_STRING,
  poolMax: ORACLE_POOL_MAX,
  poolMin: ORACLE_POOL_MIN,
  poolIncrement: ORACLE_POOL_INCREMENT,
  poolTimeout: ORACLE_POOL_TIMEOUT,
  poolAlias: 'default'
}

// agregue un comentario
oracledb.createPool(config)

async function execute(sql, params) {
  let conn
  const parameters = params || []
  try {
    oracledb.queueTimeout = 3000
    conn = await oracledb.getConnection()
    const result = await conn.execute(sql, parameters, {
      outFormat: oracledb.OBJECT,
      autoCommit: true,
      callTimeout: ORACLE_CALL_TIMEOUT
    })
    return result
  } catch (e) {
    logger.error(`[easyport-oracle][execute][catch] ${e}`)
    throw e
  } finally {
    if (conn) {
      try {
        await conn.close()
      } catch (e) {
        logger.error(`[easyport-oracle][execute][finally] ${e}`)
        // eslint-disable-next-line no-unsafe-finally
        throw e
      }
    }
  }
}

const productsdb = makeProductsdb({ logger, execute, querys, oracledb })

const easyOracleDb = {
  productsdb
}

export default easyOracleDb
