import jwt from 'jsonwebtoken';
import env from '../config/env.js';

export function requireAuth(req, res, next) {
  try {
    if (!env.JWT_SECRET) {
      return res.status(500).json({
        mensaje: 'JWT_SECRET no está configurado'
      });
    }

    const authorization = req.headers.authorization;

    if (!authorization?.startsWith('Bearer ')) {
      return res.status(401).json({
        mensaje: 'Token no proporcionado'
      });
    }

    const token = authorization.split(' ')[1];

    req.user = jwt.verify(token, env.JWT_SECRET);

    next();
  } catch (error) {
    return res.status(401).json({
      mensaje: 'Token inválido o expirado'
    });
  }
}

export function allowRoles(...rolesPermitidos) {
  return (req, res, next) => {
    const rolUsuario = req.user?.rol;

    if (!rolUsuario || !rolesPermitidos.includes(rolUsuario)) {
      return res.status(403).json({
        mensaje: 'No tienes permisos para realizar esta acción'
      });
    }

    next();
  };
}