import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export default function makeAuthActions({ logger, easyOracleDb }) {
  async function login(data) {
    try {
      const usuario = String(data?.usuario || '').trim();
      const password = String(data?.password || '');

      if (!usuario || !password) {
        return {
          statusCode: 400,
          resp: { flag: false, mensaje: 'Usuario y contraseña son obligatorios' }
        };
      }

      if (!env.JWT_SECRET) {
        logger.error('JWT_SECRET no está configurado');
        return {
          statusCode: 500,
          resp: { flag: false, mensaje: 'Error de configuración del servidor' }
        };
      }

      const cuenta = await easyOracleDb.authdb.getUsuarioByNombre(usuario);

      if (!cuenta || cuenta.ESTADO !== 'A') {
        return {
          statusCode: 401,
          resp: { flag: false, mensaje: 'Usuario o contraseña incorrectos' }
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
          const nuevoHash = await bcrypt.hash(password, 12);
          await easyOracleDb.authdb.updatePassword(
            cuenta.ID_USUARIO,
            nuevoHash
          );
        }
      }

      if (!passwordCorrecta) {
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
            rol: cuenta.ROL
          }
        }
      };
    } catch (error) {
      logger.error('Error en login:', error);
      return {
        statusCode: 500,
        resp: { flag: false, mensaje: 'Error al iniciar sesión' }
      };
    }
  }

  return Object.freeze({ login });
}