
export default function makeAuthdb({ logger, execute }) {
    async function getUsuarioByNombre(usuario) {
        try {
            logger.info(`[makeAuthdb][getUsuarioByNombre] -> Starting query for user: ${usuario}`);
            const sql = `
                SELECT
                    U.ID_USUARIO,
                    U.USUARIO,
                    U.PASSWORD,
                    U.ESTADO,
                    U.ID_ROL,
                    R.NOMBRE AS ROL,
                    NVL(C.ID_CAJA, 0) AS ID_CAJA
                FROM USUARIO U
                INNER JOIN ROL R ON R.ID_ROL = U.ID_ROL
                LEFT JOIN CAJAS C
                    ON C.ID_USUARIO = U.ID_USUARIO
                    AND C.ESTADO = 'ABIERTA'
                WHERE U.USUARIO = :usuario
            `;
            const result = await execute(sql, { usuario });
            const cuenta = result?.rows?.[0] || null;

            if (cuenta) logger.info(`[makeAuthdb][getUsuarioByNombre] -> User found: ${usuario}`);
            else logger.warn(`[makeAuthdb][getUsuarioByNombre] -> User not found: ${usuario}`);

            return cuenta;
        } catch (error) {
            logger.error(`[makeAuthdb][getUsuarioByNombre] -> Has occurred error: ${error}`);
            throw error;
        }
    }

    async function updatePassword(id, password) {
        try {
            logger.info(`[makeAuthdb][updatePassword] -> Starting password update for user ID: ${id}`);
            const sql = `
                UPDATE USUARIO
                SET PASSWORD = :password
                WHERE ID_USUARIO = :id
            `;
            const result = await execute(sql, {
                id: Number(id),
                password
            });

            logger.info(`[makeAuthdb][updatePassword] -> Password update result for user ID: ${id}: ${result.rowsAffected > 0}`);
            return result.rowsAffected > 0;
        } catch (error) {
            logger.error(`[makeAuthdb][updatePassword] -> Has occurred error: ${error}`);
            throw error;
        }
    }

    return Object.freeze({
        getUsuarioByNombre,
        updatePassword
    });
}
