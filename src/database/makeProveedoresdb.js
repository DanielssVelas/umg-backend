export default function makeProveedoresdb({
    logger,
    execute,
    querys,
    oracledb
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

    async function createProveedor(data) {
        try {
            logger.info(
                '[oracle][makeProveedoresdb][createProveedor] -> Gestionando proveedor'
            );
            const query = querys.crearProveedor;
            const {
                id_proveedor,
                nombre,
                direccion,
                telefono,
                nit
            } = data;
            const result = await execute(query, {
                id_proveedor: id_proveedor ?? null,
                nombre,
                direccion,
                telefono,
                nit: nit || null,
                p_resultado: {
                    dir: oracledb.BIND_OUT,
                    type: oracledb.STRING,
                    maxSize: 4000,
                },
                p_mensaje: {
                    dir: oracledb.BIND_OUT,
                    type: oracledb.STRING,
                    maxSize: 4000,
                }
            });
            const {
                p_mensaje,
                p_resultado,
            } = result.outBinds;
            console.log('result.outBinds', result.outBinds);
            logger.info(
                `[oracle][makeProveedoresdb][createProveedor] -> ${p_mensaje}`
            );
            return {
                flag: p_resultado === 'TRUE',
                mensaje: p_mensaje,
            };
        } catch (e) {
            logger.error(
                `[oracle][makeProveedoresdb][createProveedor] ${e}`
            );
            return {
                flag: false,
                mensaje: 'Error al gestionar el proveedor'
            };
        }
    }
    // ACTUALIZAR PROVEEDOR
    async function updateProveedor({
        idProveedor,
        nombre,
        direccion,
        telefono,
        nit
    }) {
        try {
            logger.info(
                '[makeProveedoresdb][updateProveedor] -> Actualizando proveedor'
            );

            const sql = `
                UPDATE PROVEEDORES
                SET
                    NOMBRE = :1,
                    DIRECCION = :2,
                    TELEFONO = :3,
                    NIT = :4
                WHERE ID_PROVEEDOR = :5
            `;

            const result = await execute(sql, [
                nombre,
                direccion,
                telefono,
                nit || null,
                idProveedor
            ]);

            return result;

        } catch (error) {
            logger.error(
                `[makeProveedoresdb][updateProveedor] Error: ${error}`
            );

            throw error;
        }
    }
    return Object.freeze({
        getProveedores,
        createProveedor,
        updateProveedor
    });
}