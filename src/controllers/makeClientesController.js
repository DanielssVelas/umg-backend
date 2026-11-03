export default function makeClientesController({ logger, clientesActions }) {

  async function getClientesController() {
    try {
      const resp = await clientesActions.getClientes();

      return {
        status: resp.statusCode,
        body: resp.resp
      };
    } catch (error) {
      logger.error(`[controller][getClientesController] ${error}`);

      return {
        status: 500,
        body: {
          flag: false,
          mensaje: 'Error al consultar los clientes'
        }
      };
    }
  }

  async function crearClienteController(req) {
    try {
      const resp = await clientesActions.crearCliente(req.body);

      return {
        status: resp.statusCode,
        body: resp.resp
      };
    } catch (error) {
      logger.error(`[controller][crearClienteController] ${error}`);

      return {
        status: 500,
        body: {
          flag: false,
          mensaje: 'Error al registrar el cliente'
        }
      };
    }
  }

  async function actualizarClienteController(req) {
    try {
      const resp = await clientesActions.actualizarCliente({
        ...req.body,
        idCliente: req.params.id
      });

      return {
        status: resp.statusCode,
        body: resp.resp
      };
    } catch (error) {
      logger.error(`[controller][actualizarClienteController] ${error}`);

      return {
        status: 500,
        body: {
          flag: false,
          mensaje: 'Error al actualizar el cliente'
        }
      };
    }
  }

  async function buscarClientesController(req) {
    try {
      const resp = await clientesActions.buscarClientes(req.query.texto);

      return {
        status: resp.statusCode,
        body: resp.resp
      };
    } catch (error) {
      logger.error(`[controller][buscarClientesController] ${error}`);

      return {
        status: 500,
        body: {
          flag: false,
          mensaje: 'Error al buscar clientes'
        }
      };
    }
  }

  return Object.freeze({
    getClientesController,
    crearClienteController,
    actualizarClienteController,
    buscarClientesController
  });
}