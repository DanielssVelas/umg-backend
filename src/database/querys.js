const querys = {
    productsdb: `
        SELECT * FROM PRODUCTOS
    `,

    clientedb: `
        SELECT * FROM CLIENTES
    `,

    proveedoredb: `
        SELECT
            ID_PROVEEDOR,
            NOMBRE,
            DIRECCION,
            TELEFONO,
            NIT
        FROM PROVEEDORES
        ORDER BY ID_PROVEEDOR
    `,

    usuariodb: `
        SELECT * FROM USUARIO
    `,

    crearProducto: `
        CALL PR_GESTIONAR_PRODUCTO(
            :id_producto,
            :nombre,
            :precio_compra,
            :precio_venta,
            :mensaje,
            :resultado
        )
    `,

    registrarVenta: `
        CALL PR_REGISTRAR_VENTAS(
            :total,
            :idCliente,
            :idUsuario,
            :idCaja,
            :detalles,
            :mensaje,
            :resultado
        )
    `,

    crearProveedor: `
        BEGIN
            PR_GESTIONAR_PROVEEDOR(
                :id_proveedor,
                :nombre,
                :direccion,
                :telefono,
                :nit
            );
        END;
    `,
    gestionarCajadb: `
        CALL PR_GESTIONAR_CAJA(
            :p_accion,
            :p_usuario,
            :p_nombre,
            :p_monto_inicial,
            :p_id_caja,
            :p_monto_contado,
            :resultado,
            :mensaje
        )
    `,
    consultarCajaAbiertaDb: `
        SELECT
            C.ID_CAJA AS "idCaja",
            C.ID_USUARIO AS "idUsuario",
            C.NOMBRE AS "nombre",
            C.FECHA_APERTURA AS "fechaApertura",
            C.MONTO_INICIAL AS "montoInicial",
            C.ESTADO AS "estado",

            -- Total de ventas
            NVL((
                SELECT SUM(V.TOTAL)
                FROM LAB1.VENTAS V
                WHERE V.ID_CAJA = C.ID_CAJA
            ), 0) AS "totalVentas",

            -- Total de entradas
            NVL((
                SELECT SUM(M.MONTO)
                FROM LAB1.MOVIMIENTOS_CAJA M
                WHERE M.ID_CAJA = C.ID_CAJA
                AND UPPER(M.TIPO_MOVIMIENTO) = 'ENTRADA'
            ), 0) AS "entradas",

            -- Total de salidas
            NVL((
                SELECT SUM(M.MONTO)
                FROM LAB1.MOVIMIENTOS_CAJA M
                WHERE M.ID_CAJA = C.ID_CAJA
                AND UPPER(M.TIPO_MOVIMIENTO) = 'SALIDA'
            ), 0) AS "salidas",

            -- Efectivo esperado
            (
                C.MONTO_INICIAL
                + NVL((
                    SELECT SUM(V.TOTAL)
                    FROM LAB1.VENTAS V
                    WHERE V.ID_CAJA = C.ID_CAJA
                ), 0)
                + NVL((
                    SELECT SUM(M.MONTO)
                    FROM LAB1.MOVIMIENTOS_CAJA M
                    WHERE M.ID_CAJA = C.ID_CAJA
                    AND UPPER(M.TIPO_MOVIMIENTO) = 'ENTRADA'
                ), 0)
                - NVL((
                    SELECT SUM(M.MONTO)
                    FROM LAB1.MOVIMIENTOS_CAJA M
                    WHERE M.ID_CAJA = C.ID_CAJA
                    AND UPPER(M.TIPO_MOVIMIENTO) = 'SALIDA'
                ), 0)
            ) AS "montoEsperado"

        FROM LAB1.CAJAS C
        WHERE C.ID_USUARIO = :idUsuario
        ORDER BY 1 DESC
    `
};

export default querys;