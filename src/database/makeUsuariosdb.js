export default function makeUsuariosdb({ logger, execute }) {
  async function getUsuarios() {
    const sql = `
      SELECT
        U.ID_USUARIO,
        U.USUARIO,
        U.ESTADO,
        U.ID_ROL,
        R.NOMBRE AS ROL
      FROM USUARIO U
      INNER JOIN ROLES R ON R.ID_ROL = U.ID_ROL
      ORDER BY U.ID_USUARIO
    `;

    const result = await execute(sql, []);
    return result?.rows || [];
  }

  async function getRoles() {
    const sql = `
      SELECT ID_ROL, NOMBRE, DESCRIPCION
      FROM ROLES
      ORDER BY ID_ROL
    `;

    const result = await execute(sql, []);
    return result?.rows || [];
  }

  async function createUsuario({ usuario, password, id_rol, estado }) {
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

    return true;
  }

  async function updateUsuario({
    id,
    usuario,
    password,
    id_rol,
    estado
  }) {
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

    return result.rowsAffected > 0;
  }

  return Object.freeze({
    getUsuarios,
    getRoles,
    createUsuario,
    updateUsuario
  });
}