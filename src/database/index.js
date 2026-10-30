import oracledb from 'oracledb';
import env from '../config/env.js';
import { logger } from '../utils/index.js';

import makeProductsdb from './makeProductsdb.js';
import makeSalesdb from './makeSalesdb.js';
import makeProveedoresdb from './makeProveedoresdb.js';
import makeUsuariosdb from './makeUsuariosdb.js';
import makeAuthdb from './makeAuthdb.js';

import querys from './querys.js';

const {
  ORACLE_USER,
  ORACLE_PASSWORD,
  ORACLE_CONNECT_STRING,
  ORACLE_POOL_MAX,
  ORACLE_POOL_MIN,
  ORACLE_POOL_INCREMENT,
  ORACLE_POOL_TIMEOUT,
  ORACLE_CALL_TIMEOUT
} = env;

const config = {
  user: ORACLE_USER,
  password: ORACLE_PASSWORD,
  connectString: ORACLE_CONNECT_STRING,
  poolMax: ORACLE_POOL_MAX,
  poolMin: ORACLE_POOL_MIN,
  poolIncrement: ORACLE_POOL_INCREMENT,
  poolTimeout: ORACLE_POOL_TIMEOUT,
  poolAlias: 'default'
};

oracledb.createPool(config);

async function execute(sql, params) {
  let conn;
  const parameters = params || [];

  try {
    oracledb.queueTimeout = 3000;
    conn = await oracledb.getConnection();

    const result = await conn.execute(sql, parameters, {
      outFormat: oracledb.OBJECT,
      autoCommit: true,
      callTimeout: ORACLE_CALL_TIMEOUT
    });

    return result;
  } catch (e) {
    logger.error(`[easyport-oracle][execute][catch] ${e}`);
    throw e;
  } finally {
    if (conn) {
      try {
        await conn.close();
      } catch (e) {
        logger.error(`[easyport-oracle][execute][finally] ${e}`);
        throw e;
      }
    }
  }
}

// Base de datos de productos
const productsdb = makeProductsdb({
  logger,
  execute,
  querys,
  oracledb
});

// Base de datos de ventas
const salesdb = makeSalesdb({
  logger,
  execute,
  querys,
  oracledb
});

// Base de datos de proveedores
const proveedoresdb = makeProveedoresdb({
  logger,
  execute,
  querys,
  oracledb
});

// Base de datos de usuarios
const usuariosdb = makeUsuariosdb({
  logger,
  execute
});

// Base de datos de autenticación
const authdb = makeAuthdb({
  execute
});

const easyOracleDb = {
  productsdb,
  salesdb,
  proveedoresdb,
  usuariosdb,
  authdb
};

export default easyOracleDb;