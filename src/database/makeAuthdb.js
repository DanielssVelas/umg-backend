export default function makeAuthdb({ execute }) {
  async function getUsuarioByNombre(usuario) {
    const sql = `
      SELECT
        U.ID_USUARIO,
        U.USUARIO,
        U.PASSWORD,
        U.ESTADO,
        U.ID_ROL,
        R.NOMBRE AS ROL
      FROM USUARIO U
      INNER JOIN ROLES R ON R.ID_ROL = U.ID_ROL
      WHERE U.USUARIO = :usuario
    `

    const result = await execute(sql, { usuario })

    return result?.rows?.[0] || null
  }

  async function updatePassword(id, password) {
    const sql = `
      UPDATE USUARIO
      SET PASSWORD = :password
      WHERE ID_USUARIO = :id
    `

    const result = await execute(sql, {
      id: Number(id),
      password
    })

    return result.rowsAffected > 0
  }

  return Object.freeze({
    getUsuarioByNombre,
    updatePassword
  })
}