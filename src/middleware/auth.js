
import jwt from 'jsonwebtoken';
import env from '../config/env.js';
import { logger } from '../utils/index.js';

export function requireAuth(req, res, next) {
    try {
        logger.info('[authMiddleware][requireAuth] -> Validating authentication');

        if (!env.JWT_SECRET) {
            logger.error('[authMiddleware][requireAuth] -> JWT_SECRET no está configurado');
            return res.status(500).json({
                mensaje: 'JWT_SECRET no está configurado'
            });
        }

        const authorization = req.headers.authorization;

        if (!authorization?.startsWith('Bearer ')) {
            logger.warn('[authMiddleware][requireAuth] -> Token not provided');
            return res.status(401).json({
                mensaje: 'Token no proporcionado'
            });
        }

        const token = authorization.split(' ')[1];

        req.user = jwt.verify(token, env.JWT_SECRET);

        logger.info(`[authMiddleware][requireAuth] -> Authenticated user ID: ${req.user.id_usuario}`);

        next();
    } catch (error) {
        logger.error(`[authMiddleware][requireAuth] -> Has occurred error: ${error.message}`);

        return res.status(401).json({
            mensaje: 'Token inválido o expirado'
        });
    }
}

export function allowRoles(rolesPermitidos) {
    return (req, res, next) => {
        const rolUsuario = req.user?.rol;

        logger.info(`[authMiddleware][allowRoles] -> Validating role: ${rolUsuario}`);

        if (!rolUsuario || !rolesPermitidos.includes(rolUsuario)) {
            logger.warn(`[authMiddleware][allowRoles] -> Access denied for role: ${rolUsuario || 'UNKNOWN'}`);

            return res.status(403).json({
                mensaje: 'No tienes permisos para realizar esta acción'
            });
        }

        logger.info(`[authMiddleware][allowRoles] -> Access granted for role: ${rolUsuario}`);

        next();
    };
}
