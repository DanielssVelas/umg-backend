export default function makeHealtActions({ logger }) {
    async function healt() {
        try {
            logger.info('[makeHealtActions][healt] -> Starting Actions')
            return {
                statusCode: 200,
                resp: {
                    flag: true,
                    mensaje: 'success',
                }
            }
        } catch (e) {
            logger.error(`[makeHealtActions][healt] -> Has ocurrent error: ${e}`)
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
        healt
    })
}