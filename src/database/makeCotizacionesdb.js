export default function makeCotizacionesdb({ logger, execute, executeTransaction, querys, oracledb }) {

    // Registrar una cotización
    async function crearCotizacion(data) {
        try {
            logger.info('[oracle][makeCotizacionesdb][crearCotizacion] -> starting DB');

            const result = await execute(querys.crearCotizacion, {
                idCliente: {
                    val: Number(data.idCliente),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                },
                idUsuario: {
                    val: Number(data.idUsuario),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                },
                fechaVencimiento: {
                    val: data.fechaVencimiento || null,
                    dir: oracledb.BIND_IN,
                    type: oracledb.STRING
                },
                subtotal: {
                    val: Number(data.subtotal),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                },
                descuento: {
                    val: Number(data.descuento || 0),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                },
                impuesto: {
                    val: Number(data.impuesto || 0),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                },
                total: {
                    val: Number(data.total),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                },
                detalles: {
                    val: JSON.stringify(data.detalles),
                    dir: oracledb.BIND_IN,
                    type: oracledb.CLOB
                },
                idCotizacion: {
                    dir: oracledb.BIND_OUT,
                    type: oracledb.NUMBER
                }
            });

            const idCotizacion = result.outBinds.idCotizacion;

            logger.info(`[oracle][makeCotizacionesdb][crearCotizacion] -> Cotización ${idCotizacion} registrada`);

            return {
                flag: true,
                mensaje: 'Cotización registrada correctamente',
                idCotizacion
            };

        } catch (error) {
            logger.error(`[oracle][makeCotizacionesdb][crearCotizacion] ${error}`);

            return {
                flag: false,
                mensaje: error.message || 'Error al registrar la cotización'
            };
        }
    }

    // Convertir una cotización en venta
async function convertirCotizacionEnVenta(idCotizacion, idUsuario, idCaja) {
    try {
        logger.info('[oracle][makeCotizacionesdb][convertirCotizacionEnVenta] -> starting');

        return await executeTransaction(async (conn) => {

            // 1. Bloquear y consultar la cotización
            const cotizacion = await conn.execute(
                querys.obtenerCotizacionParaConversion,
                { idCotizacion: Number(idCotizacion) },
                { outFormat: oracledb.OBJECT }
            );

            if (!cotizacion.rows.length) {
                throw new Error('La cotización no existe');
            }

            const encabezado = cotizacion.rows[0];

            if (encabezado.ESTADO !== 'PENDIENTE') {
                throw new Error('Esta cotización ya fue procesada o no está pendiente');
            }

            // 2. Consultar los productos de la cotización
            const detalle = await conn.execute(
                querys.detalleHistorialCotizacionesdb,
                { idCotizacion: Number(idCotizacion) },
                { outFormat: oracledb.OBJECT }
            );

            if (!detalle.rows.length) {
                throw new Error('La cotización no tiene productos');
            }

            // 3. Preparar los detalles para el procedimiento de ventas
            const detallesVenta = detalle.rows.map((item) => ({
                id_producto: item.ID_PRODUCTO,
                cantidad: item.CANTIDAD,
                precio_venta: Number((item.TOTAL / item.CANTIDAD).toFixed(2)),
                subtotal: item.TOTAL
            }));

            // 4. Registrar la venta
            const venta = await conn.execute(
                querys.registrarVenta,
                {
                    total: {
                        val: Number(encabezado.TOTAL),
                        dir: oracledb.BIND_IN,
                        type: oracledb.NUMBER
                    },
                    idCliente: {
                        val: Number(encabezado.ID_CLIENTE),
                        dir: oracledb.BIND_IN,
                        type: oracledb.NUMBER
                    },
                    idUsuario: {
                        val: Number(idUsuario),
                        dir: oracledb.BIND_IN,
                        type: oracledb.NUMBER
                    },
                    idCaja: {
                        val: Number(idCaja),
                        dir: oracledb.BIND_IN,
                        type: oracledb.NUMBER
                    },
                    detalles: {
                        val: JSON.stringify(detallesVenta),
                        dir: oracledb.BIND_IN,
                        type: oracledb.CLOB
                    },
                    mensaje: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.STRING,
                        maxSize: 4000
                    },
                    resultado: {
                        dir: oracledb.BIND_OUT,
                        type: oracledb.STRING,
                        maxSize: 50
                    }
                },
                { outFormat: oracledb.OBJECT }
            );

            const { mensaje, resultado } = venta.outBinds;
                
            logger.info(
                `[CONVERSION] Respuesta del procedimiento: ${JSON.stringify(venta.outBinds)}`
            );
            
            if (resultado !== 'TRUE') {
                throw new Error(mensaje || 'No se pudo registrar la venta');
            }

            // 5. Marcar la cotización como aceptada
            await conn.execute(
                querys.actualizarEstadoCotizacion,
                { idCotizacion: Number(idCotizacion) }
            );

            return {
                flag: true,
                mensaje: 'Cotización convertida en venta correctamente'
            };
        });

    } catch (error) {
        logger.error(`[oracle][makeCotizacionesdb][convertirCotizacionEnVenta] ${error}`);

        return {
            flag: false,
            mensaje: error.message || 'Error al convertir la cotización'
        };
    }
}

    // Obtener historial de cotizaciones
    async function getHistorialCotizaciones() {
        try {
            logger.info('[oracle][makeCotizacionesdb][getHistorialCotizaciones] -> Consultando historial');

            const result = await execute(querys.historialCotizacionesdb, []);

            return result?.rows || [];

        } catch (error) {
            logger.error(`[oracle][makeCotizacionesdb][getHistorialCotizaciones] ${error}`);
            throw error;
        }
    }

    // Obtener detalle de una cotización
    async function getDetalleCotizacion(idCotizacion) {
        try {
            const result = await execute(querys.detalleHistorialCotizacionesdb, {
                idCotizacion: {
                    val: Number(idCotizacion),
                    dir: oracledb.BIND_IN,
                    type: oracledb.NUMBER
                }
            });

            return result?.rows || [];

        } catch (error) {
            logger.error(`[oracle][makeCotizacionesdb][getDetalleCotizacion] ${error}`);
            throw error;
        }
    }

    return Object.freeze({
        crearCotizacion,
        getHistorialCotizaciones,
        getDetalleCotizacion,
        convertirCotizacionEnVenta
    });
}