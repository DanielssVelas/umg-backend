
export default function makeUsuariosController({ logger, usuariosActions }) {
    async function getUsuariosController() {
        try {
            logger.info('[makeUsuariosController][getUsuariosController] -> Starting Controller');
            const result = await usuariosActions.getUsuarios();
            logger.info(`[makeUsuariosController][getUsuariosController] -> Response status: ${result.statusCode}`);

            return {
                status: result.statusCode,
                body: result.resp
            };
        } catch (error) {
            logger.error(`[makeUsuariosController][getUsuariosController] -> Has occurred error: ${error}`);
            return {
                status: 500,
                body: { flag: false, mensaje: 'Error al consultar usuarios' }
            };
        }
    }

    async function getRolesController() {
        try {
            logger.info('[makeUsuariosController][getRolesController] -> Starting Controller');
            const result = await usuariosActions.getRoles();
            logger.info(`[makeUsuariosController][getRolesController] -> Response status: ${result.statusCode}`);

            return {
                status: result.statusCode,
                body: result.resp
            };
        } catch (error) {
            logger.error(`[makeUsuariosController][getRolesController] -> Has occurred error: ${error}`);
            return {
                status: 500,
                body: { flag: false, mensaje: 'Error al consultar roles' }
            };
        }
    }

    async function createUsuarioController(request) {
        try {
            logger.info('[makeUsuariosController][createUsuarioController] -> Starting Controller');
            const result = await usuariosActions.createUsuario(request.body);
            logger.info(`[makeUsuariosController][createUsuarioController] -> Response status: ${result.statusCode}`);

            return {
                status: result.statusCode,
                body: result.resp
            };
        } catch (error) {
            logger.error(`[makeUsuariosController][createUsuarioController] -> Has occurred error: ${error}`);
            return {
                status: 500,
                body: { flag: false, mensaje: 'Error al crear usuario' }
            };
        }
    }

    async function updateUsuarioController(request) {
        try {
            logger.info(`[makeUsuariosController][updateUsuarioController] -> Starting Controller for user ID: ${request.params.id}`);
            const result = await usuariosActions.updateUsuario(
                request.params.id,
                request.body
            );
            logger.info(`[makeUsuariosController][updateUsuarioController] -> Response status: ${result.statusCode}`);

            return {
                status: result.statusCode,
                body: result.resp
            };
        } catch (error) {
            logger.error(`[makeUsuariosController][updateUsuarioController] -> Has occurred error: ${error}`);
            return {
                status: 500,
                body: { flag: false, mensaje: 'Error al modificar usuario' }
            };
        }
    }

    return Object.freeze({
        getUsuariosController,
        getRolesController,
        createUsuarioController,
        updateUsuarioController
    });
}
