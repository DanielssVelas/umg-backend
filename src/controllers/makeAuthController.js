export default function makeAuthController({ authActions }) {
  async function loginController(request) {
    const result = await authActions.login(request.body)

    return {
      status: result.statusCode,
      body: result.resp,
      description: 'Autenticación de usuario'
    }
  }

  return Object.freeze({
    loginController
  })
}