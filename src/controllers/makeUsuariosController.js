export default function makeUsuariosController({ usuariosActions }) {
  async function getUsuariosController() {
    const result = await usuariosActions.getUsuarios();

    return {
      status: result.statusCode,
      body: result.resp
    };
  }

  async function getRolesController() {
    const result = await usuariosActions.getRoles();

    return {
      status: result.statusCode,
      body: result.resp
    };
  }

  async function createUsuarioController(request) {
    const result = await usuariosActions.createUsuario(request.body);

    return {
      status: result.statusCode,
      body: result.resp
    };
  }

  async function updateUsuarioController(request) {
    const result = await usuariosActions.updateUsuario(
      request.params.id,
      request.body
    );

    return {
      status: result.statusCode,
      body: result.resp
    };
  }

  return Object.freeze({
    getUsuariosController,
    getRolesController,
    createUsuarioController,
    updateUsuarioController
  });
}