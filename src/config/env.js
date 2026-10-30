import dotenv from 'dotenv'
import fs from 'fs'

// Priorizar archivo específico en etc/ (ej: etc/main/.env o etc/dev/.env) si existe
const targetEnv = process.env.ENV_FILE || (process.env.NODE_ENV === 'production' ? 'etc/main/.env' : 'etc/dev/.env')
if (fs.existsSync(targetEnv)) {
    dotenv.config({ path: targetEnv })
}
dotenv.config() // Fallback o carga de variables de la raíz (.env)

const env = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    ENABLE_LOG_FILE: process.env.ENABLE_LOG_FILE || 'false',
    SERVER_PORT: process.env.PORT || 3000,
    SERVER_TIMEOUT: process.env.TIMEOUT || '90s',
    ORACLE_USER: process.env.ORACLE_USER || '',
    ORACLE_PASSWORD: process.env.ORACLE_PASSWORD || '',
    ORACLE_CONNECT_STRING: process.env.ORACLE_CONNECT_STRING || '',
    ORACLE_POOL_MAX: parseInt(process.env.ORACLE_POOL_MAX, 10) || 1,
    ORACLE_POOL_MIN: parseInt(process.env.ORACLE_POOL_MIN, 10) || 0,
    ORACLE_POOL_INCREMENT: parseInt(process.env.ORACLE_POOL_INCREMENT, 10) || 1,
    ORACLE_POOL_TIMEOUT: parseInt(process.env.ORACLE_POOL_TIMEOUT, 10) || 0,
    ORACLE_CALL_TIMEOUT: parseInt(process.env.ORACLE_CALL_TIMEOUT, 10) || 30000,
    JWT_SECRET: process.env.JWT_SECRET || '',
}


export default env