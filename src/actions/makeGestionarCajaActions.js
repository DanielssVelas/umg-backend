export default function makeGestionarCajaActions({ logger, easyOracleDb }) {
    async function consultarCajaActions(data) {
        try {
            logger.info('[makeGestionarCajaActions][consultarCajaActions] -> Starting Actions')
            const result = await easyOracleDb.gestionarCajadb.consultarCajaAbiertaDb(data)
            return {
                statusCode: 200,
                resp: {
                    flag: true,
                    mensaje: 'succesfully',
                    rows: result
                }
            }
        } catch (e) {
            logger.error(`[makeGestionarCajaActions][consultarCajaActions] -> Has ocurrent error: ${e}`)
            return {
                statusCode: 400,
                resp: {
                    flag: false,
                    mensaje: 'error',
                    rows: []
                }
            }
        }
    }
    async function createGestionCajaActions(data) {
        try {
            logger.info('[makeGestionarCajaActions][createGestionCajaSctions] -> Starting Actions')
            const result = await easyOracleDb.gestionarCajadb.createGestionCajadb(data)
            return {
                statusCode: 200,
                resp: result
            }
        } catch (e) {
            logger.error(`[makeGestionarCajaActions][createGestionCajaSctions] -> Has ocurrent error: ${e}`)
            return {
                statusCode: 400,
                resp: {
                    flag: false,
                    mensaje: 'error',
                }
            }
        }
    }
    return Object.freeze({
        createGestionCajaActions,
        consultarCajaActions
    })
}