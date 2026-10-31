
export default function makeAuthController({ logger, authActions }) {
    async function loginController(request) {
        try {
            logger.info('[makeAuthController][loginController] -> Starting Controller');

            const result = await authActions.login(request.body);

            logger.info(`[makeAuthController][loginController] -> Authentication response: ${result.statusCode}`);

            return {
                status: result.statusCode,
                body: result.resp,
                description: 'Autenticación de usuario'
            };
        } catch (error) {
            logger.error(`[makeAuthController][loginController] -> Has occurred error: ${error}`);

            return {
                status: 500,
                body: { flag: false, mensaje: 'Error al procesar la autenticación' },
                description: 'Autenticación de usuario'
            };
        }
    }

    return Object.freeze({
        loginController
    });
}
