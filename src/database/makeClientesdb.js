export default function makeClientesdb({ logger, execute, querys }) {

  async function getClientes() {
    try {
      logger.info('[oracle][makeClientesdb][getClientes]');

      const result = await execute(querys.clientedb, []);

      return result?.rows || [];
    } catch (error) {
      logger.error(`[oracle][getClientes] ${error}`);
      throw error;
    }
  }

  async function crearCliente(cliente) {
    const sql = `
      INSERT INTO CLIENTES (
        NOMBRE,
        DIRECCION,
        TELEFONO,
        CORREO
      )
      VALUES (
        :nombre,
        :direccion,
        :telefono,
        :correo
      )
    `;

    try {
      const result = await execute(sql, {
        nombre: cliente.nombre,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        correo: cliente.correo || null
      });

      return result;
    } catch (error) {
      logger.error(`[oracle][crearCliente] ${error}`);
      throw error;
    }
  }

  async function actualizarCliente(cliente) {
    const sql = `
      UPDATE CLIENTES
      SET
        NOMBRE = :nombre,
        DIRECCION = :direccion,
        TELEFONO = :telefono,
        CORREO = :correo
      WHERE ID_CLIENTE = :idCliente
    `;

    try {
      const result = await execute(sql, {
        nombre: cliente.nombre,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        correo: cliente.correo || null,
        idCliente: cliente.idCliente
      });

      return result;
    } catch (error) {
      logger.error(`[oracle][actualizarCliente] ${error}`);
      throw error;
    }
  }

  async function buscarClientes(texto) {
    const sql = `
      SELECT *
      FROM CLIENTES
      WHERE
        UPPER(NOMBRE) LIKE UPPER(:texto)
        OR TELEFONO LIKE :texto
        OR UPPER(CORREO) LIKE UPPER(:texto)
      ORDER BY ID_CLIENTE DESC
    `;

    try {
      const result = await execute(sql, {
        texto: `%${texto}%`
      });

      return result?.rows || [];
    } catch (error) {
      logger.error(`[oracle][buscarClientes] ${error}`);
      throw error;
    }
  }

  return Object.freeze({
    getClientes,
    crearCliente,
    actualizarCliente,
    buscarClientes
  });
}