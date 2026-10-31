
export default function makeClientesdb({ logger, execute, querys }) {
  async function getClientes() {
    try {
      logger.info('[oracle][makeClientesdb][getClientes] -> Consultando clientes');

      const result = await execute(querys.clientedb, []);

      return result?.rows || [];
    } catch (error) {
      logger.error(`[oracle][makeClientesdb][getClientes] ${error}`);
      throw error;
    }
  }

  return Object.freeze({ getClientes });
}
