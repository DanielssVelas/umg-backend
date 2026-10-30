
import bcrypt from 'bcryptjs';

export default function makeUsuariosActions({ logger, easyOracleDb }) {
    async function getUsuarios() {
        try {
            logger.info('[makeUsuariosActions][getUsuarios] -> Starting Actions');
            const rows = await easyOracleDb.usuariosdb.getUsuarios();
            logger.info(`[makeUsuariosActions][getUsuarios] -> Retrieved ${rows.length} users`);

            return {
                statusCode: 200,
                resp: { flag: true, rows }
            };
        } catch (error) {
            logger.error(`[makeUsuariosActions][getUsuarios] -> Has occurred error: ${error}`);
            return {
                statusCode: 500,
                resp: { flag: false, mensaje: 'Error al consultar usuarios' }
            };
        }
    }

    async function getRoles() {
        try {
            logger.info('[makeUsuariosActions][getRoles] -> Starting Actions');
            const rows = await easyOracleDb.usuariosdb.getRoles();
            logger.info(`[makeUsuariosActions][getRoles] -> Retrieved ${rows.length} roles`);

            return {
                statusCode: 200,
                resp: { flag: true, rows }
            };
        } catch (error) {
            logger.error(`[makeUsuariosActions][getRoles] -> Has occurred error: ${error}`);
            return {
                statusCode: 500,
                resp: { flag: false, mensaje: 'Error al consultar roles' }
            };
        }
    }

    async function createUsuario(data) {
        try {
            logger.info('[makeUsuariosActions][createUsuario] -> Starting Actions');
            const { usuario, password, id_rol, estado = 'A' } = data;

            if (!usuario || !password || !id_rol) {
                logger.warn('[makeUsuariosActions][createUsuario] -> Required fields missing');
                return {
                    statusCode: 400,
                    resp: { flag: false, mensaje: 'Completa usuario, contraseña y rol' }
                };
            }

            if (!['A', 'I'].includes(estado)) {
                logger.warn('[makeUsuariosActions][createUsuario] -> Invalid user status');
                return {
                    statusCode: 400,
                    resp: { flag: false, mensaje: 'Estado inválido' }
                };
            }

            const hash = await bcrypt.hash(password, 12);

            await easyOracleDb.usuariosdb.createUsuario({
                usuario: usuario.trim(),
                password: hash,
                id_rol,
                estado
            });

            logger.info(`[makeUsuariosActions][createUsuario] -> User created successfully: ${usuario}`);

            return {
                statusCode: 201,
                resp: { flag: true, mensaje: 'Usuario creado correctamente' }
            };
        } catch (error) {
            logger.error(`[makeUsuariosActions][createUsuario] -> Has occurred error: ${error}`);

            const duplicado = error.errorNum === 1;

            if (duplicado) logger.warn('[makeUsuariosActions][createUsuario] -> Duplicate user');

            return {
                statusCode: duplicado ? 409 : 500,
                resp: {
                    flag: false,
                    mensaje: duplicado
                        ? 'El usuario ya existe'
                        : 'No se pudo crear el usuario'
                }
            };
        }
    }

    async function updateUsuario(id, data) {
        try {
            logger.info(`[makeUsuariosActions][updateUsuario] -> Starting Actions for user ID: ${id}`);
            const { usuario, password, id_rol, estado } = data;

            if (!usuario || !id_rol || !['A', 'I'].includes(estado)) {
                logger.warn(`[makeUsuariosActions][updateUsuario] -> Invalid modification data for user ID: ${id}`);
                return {
                    statusCode: 400,
                    resp: { flag: false, mensaje: 'Datos de modificación inválidos' }
                };
            }

            const hash = password
                ? await bcrypt.hash(password, 12)
                : null;

            const actualizado = await easyOracleDb.usuariosdb.updateUsuario({
                id,
                usuario: usuario.trim(),
                password: hash,
                id_rol,
                estado
            });

            if (actualizado) {
                logger.info(`[makeUsuariosActions][updateUsuario] -> User updated successfully: ${id}`);
                return {
                    statusCode: 200,
                    resp: { flag: true, mensaje: 'Usuario actualizado correctamente' }
                };
            }

            logger.warn(`[makeUsuariosActions][updateUsuario] -> User not found: ${id}`);
            return {
                statusCode: 404,
                resp: { flag: false, mensaje: 'Usuario no encontrado' }
            };
        } catch (error) {
            logger.error(`[makeUsuariosActions][updateUsuario] -> Has occurred error: ${error}`);

            return {
                statusCode: 500,
                resp: { flag: false, mensaje: 'No se pudo modificar el usuario' }
            };
        }
    }

    return Object.freeze({
        getUsuarios,
        getRoles,
        createUsuario,
        updateUsuario
    });
}
