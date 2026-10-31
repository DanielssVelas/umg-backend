
export default function makeUsuariosdb({ logger, execute, querys }) {
    async function getUsuarios() {
        try {
            logger.info('[makeUsuariosdb][getUsuarios] -> Starting query');
            const sql = `
                SELECT
                    U.ID_USUARIO,
                    U.USUARIO,
                    U.ESTADO,
                    U.ID_ROL,
                    R.NOMBRE AS ROL
                FROM USUARIO U
                INNER JOIN ROL R ON R.ID_ROL = U.ID_ROL
                ORDER BY U.ID_USUARIO
            `;
            const result = await execute(sql, []);
            logger.info(`[makeUsuariosdb][getUsuarios] -> Retrieved ${result?.rows?.length || 0} users`);
            return result?.rows || [];
        } catch (error) {
            logger.error(`[makeUsuariosdb][getUsuarios] -> Has occurred error: ${error}`);
            throw error;
        }
    }

    async function getRoles() {
        try {
            logger.info('[makeUsuariosdb][getRoles] -> Starting query');
            const sql = `
                SELECT ID_ROL, NOMBRE, DESCRIPCION
                FROM ROL
                ORDER BY ID_ROL
            `;
            const result = await execute(sql, []);
            logger.info(`[makeUsuariosdb][getRoles] -> Retrieved ${result?.rows?.length || 0} roles`);
            return result?.rows || [];
        } catch (error) {
            logger.error(`[makeUsuariosdb][getRoles] -> Has occurred error: ${error}`);
            throw error;
        }
    }

    async function createUsuario({ usuario, password, id_rol, estado }) {
        try {
            logger.info(`[makeUsuariosdb][createUsuario] -> Starting insert for user: ${usuario}`);
            const sql = `
                INSERT INTO USUARIO (
                    ID_USUARIO, USUARIO, PASSWORD, ESTADO, ID_ROL
                )
                VALUES (
                    SEQ_USUARIO.NEXTVAL, :usuario, :password, :estado, :id_rol
                )
            `;
            await execute(sql, {
                usuario,
                password,
                estado: estado || 'A',
                id_rol: Number(id_rol)
            });
            logger.info(`[makeUsuariosdb][createUsuario] -> User created successfully: ${usuario}`);
            return true;
        } catch (error) {
            logger.error(`[makeUsuariosdb][createUsuario] -> Has occurred error: ${error}`);
            throw error;
        }
    }

    async function updateUsuario({ id, usuario, password, id_rol, estado }) {
        try {
            logger.info(`[makeUsuariosdb][updateUsuario] -> Starting update for user ID: ${id}`);

            if (password) {
                const sql = `
                    UPDATE USUARIO
                    SET USUARIO = :usuario,
                        PASSWORD = :password,
                        ID_ROL = :id_rol,
                        ESTADO = :estado
                    WHERE ID_USUARIO = :id
                `;
                const result = await execute(sql, {
                    id: Number(id),
                    usuario,
                    password,
                    id_rol: Number(id_rol),
                    estado
                });
                logger.info(`[makeUsuariosdb][updateUsuario] -> User ID: ${id} updated successfully`);
                return result.rowsAffected > 0;
            }

            const sql = `
                UPDATE USUARIO
                SET USUARIO = :usuario,
                    ID_ROL = :id_rol,
                    ESTADO = :estado
                WHERE ID_USUARIO = :id
            `;
            const result = await execute(sql, {
                id: Number(id),
                usuario,
                id_rol: Number(id_rol),
                estado
            });

            logger.info(`[makeUsuariosdb][updateUsuario] -> User ID: ${id} updated successfully`);
            return result.rowsAffected > 0;
        } catch (error) {
            logger.error(`[makeUsuariosdb][updateUsuario] -> Has occurred error: ${error}`);
            throw error;
        }
    }

    async function getModulosdb(params) {
        try {
            logger.info('[oracle][makeProductsdb][getModulosdb] -> starting DB')
            const queri = querys.modulosdb
            const result =  await execute(queri, [params.idRol])
            return result?.rows.length > 0 ? result.rows : []
        } catch (error) {
            logger.error(`[oracle][makeProductsdb][getModulosdb] ${e}`)
            return []
        }
    }
    return Object.freeze({
        getUsuarios,
        getRoles,
        createUsuario,
        updateUsuario,
        getModulosdb
    });
}
