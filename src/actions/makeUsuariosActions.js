import bcrypt from 'bcryptjs';

export default function makeUsuariosActions({ logger, easyOracleDb }) {
  async function getUsuarios() {
    try {
      const rows = await easyOracleDb.usuariosdb.getUsuarios();

      return {
        statusCode: 200,
        resp: { flag: true, rows }
      };
    } catch (error) {
      logger.error(`[usuarios][getUsuarios] ${error}`);
      return {
        statusCode: 500,
        resp: { flag: false, mensaje: 'Error al consultar usuarios' }
      };
    }
  }

  async function getRoles() {
    try {
      const rows = await easyOracleDb.usuariosdb.getRoles();

      return {
        statusCode: 200,
        resp: { flag: true, rows }
      };
    } catch (error) {
      logger.error(`[usuarios][getRoles] ${error}`);
      return {
        statusCode: 500,
        resp: { flag: false, mensaje: 'Error al consultar roles' }
      };
    }
  }

  async function createUsuario(data) {
    try {
      const { usuario, password, id_rol, estado = 'A' } = data;

      if (!usuario || !password || !id_rol) {
        return {
          statusCode: 400,
          resp: { flag: false, mensaje: 'Completa usuario, contraseña y rol' }
        };
      }

      if (!['A', 'I'].includes(estado)) {
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

      return {
        statusCode: 201,
        resp: { flag: true, mensaje: 'Usuario creado correctamente' }
      };
    } catch (error) {
      logger.error(`[usuarios][createUsuario] ${error}`);

      const duplicado = error.errorNum === 1;

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
      const { usuario, password, id_rol, estado } = data;

      if (!usuario || !id_rol || !['A', 'I'].includes(estado)) {
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

      return actualizado
        ? {
            statusCode: 200,
            resp: { flag: true, mensaje: 'Usuario actualizado correctamente' }
          }
        : {
            statusCode: 404,
            resp: { flag: false, mensaje: 'Usuario no encontrado' }
          };
    } catch (error) {
      logger.error(`[usuarios][updateUsuario] ${error}`);

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