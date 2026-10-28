export default function makeProveedoresdb({
    logger,
    execute,
    querys
}) {

    async function getProveedores() {
        try {
            logger.info(
                '[makeProveedoresdb][getProveedores] -> Consultando proveedores'
            );

            const result = await execute(
                querys.proveedoredb,
                []
            );

            return result?.rows || [];

        } catch (error) {
            logger.error(
                `[makeProveedoresdb][getProveedores] Error: ${error}`
            );

            throw error;
        }
    }

    async function createProveedor({
        nombre,
        direccion,
        telefono,
        nit
    }) {
        try {
            logger.info(
                '[makeProveedoresdb][createProveedor] -> Registrando proveedor'
            );

            const result = await execute(
                querys.crearProveedor,
                [
                    null,
                    nombre,
                    direccion,
                    telefono,
                    nit || null
                ]
            );

            return result;

        } catch (error) {
            logger.error(
                `[makeProveedoresdb][createProveedor] Error: ${error}`
            );

            throw error;
        }
    }

    return Object.freeze({
        getProveedores,
        createProveedor
    });
}