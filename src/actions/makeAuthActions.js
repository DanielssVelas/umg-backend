
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export default function makeAuthActions({ logger, easyOracleDb }) {
    async function login(data) {
        try {
            logger.info('[makeAuthActions][login] -> Starting login');

            const usuario = String(data?.usuario || '').trim();
            const password = String(data?.password || '');

            if (!usuario || !password) {
                logger.warn('[makeAuthActions][login] -> Username or password missing');
                return {
                    statusCode: 400,
                    resp: { flag: false, mensaje: 'Usuario y contraseña son obligatorios' }
                };
            }

            if (!env.JWT_SECRET) {
                logger.error('[makeAuthActions][login] -> JWT_SECRET no está configurado');
                return {
                    statusCode: 500,
                    resp: { flag: false, mensaje: 'Error de configuración del servidor' }
                };
            }

            logger.info(`[makeAuthActions][login] -> Searching user: ${usuario}`);
            const cuenta = await easyOracleDb.authdb.getUsuarioByNombre(usuario);

            if (!cuenta || cuenta.ESTADO !== 'A') {
                logger.warn(`[makeAuthActions][login] -> User not found or inactive: ${usuario}`);
                return {
                    statusCode: 401,
                    resp: { flag: false, mensaje: 'Este usuario esta incativo.' }
                };
            }

            const passwordGuardada = String(cuenta.PASSWORD);
            const esBcrypt = /^\$2[aby]\$/.test(passwordGuardada);
            let passwordCorrecta = false;

            if (esBcrypt) {
                passwordCorrecta = await bcrypt.compare(password, passwordGuardada);
            } else {
                passwordCorrecta = password === passwordGuardada;

                // Convierte una contraseña antigua en texto plano a bcrypt.
                if (passwordCorrecta) {
                    logger.info(`[makeAuthActions][login] -> Migrating password to bcrypt for user: ${usuario}`);
                    const nuevoHash = await bcrypt.hash(password, 12);
                    await easyOracleDb.authdb.updatePassword(
                        cuenta.ID_USUARIO,
                        nuevoHash
                    );
                }
            }

            if (!passwordCorrecta) {
                logger.warn(`[makeAuthActions][login] -> Invalid credentials for user: ${usuario}`);
                return {
                    statusCode: 401,
                    resp: { flag: false, mensaje: 'Usuario o contraseña incorrectos' }
                };
            }

            const token = jwt.sign(
                {
                    id_usuario: cuenta.ID_USUARIO,
                    usuario: cuenta.USUARIO,
                    rol: cuenta.ROL
                },
                env.JWT_SECRET,
                { expiresIn: '8h' }
            );

            logger.info(`[makeAuthActions][login] -> Authentication successful for user: ${usuario}`);
            logger.info(`[makeAuthActions][login] -> Open cash register ID: ${cuenta.ID_CAJA || 0}`);

            return {
                statusCode: 200,
                resp: {
                    flag: true,
                    mensaje: 'Inicio de sesión exitoso',
                    token,
                    usuario: {
                        id_usuario: cuenta.ID_USUARIO,
                        usuario: cuenta.USUARIO,
                        id_rol: cuenta.ID_ROL,
                        rol: cuenta.ROL,
                        id_caja: Number(cuenta.ID_CAJA) || 0
                    }
                }
            };
        } catch (error) {
            logger.error(`[makeAuthActions][login] -> Has occurred error: ${error}`);
            return {
                statusCode: 500,
                resp: { flag: false, mensaje: 'Error al iniciar sesión' }
            };
        }
    }

    return Object.freeze({ login });
}
