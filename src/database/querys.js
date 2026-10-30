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
    `
    ,
    registrarCompra: `
    BEGIN
        PR_REGISTRAR_COMPRAS(
            :p_total,
            :p_proveedor,
            :p_usuario,
            :p_tipo_comprobante,
            :p_serie,
            :p_numero_comprobante,
            :p_detalles,
            :p_mensaje,
            :p_resultado
        );
    END;
`,
historialComprasdb: `
    SELECT
        C.ID_COMPRA,
        C.FECHA,
        C.TOTAL,
        C.ID_PROVEEDOR,
        P.NOMBRE AS PROVEEDOR,
        C.ID_USUARIO,
        C.TIPO_COMPROBANTE,
        C.SERIE,
        C.NUMERO_COMPROBANTE
    FROM COMPRAS C
    LEFT JOIN PROVEEDORES P
        ON P.ID_PROVEEDOR = C.ID_PROVEEDOR
    ORDER BY C.FECHA DESC, C.ID_COMPRA DESC
`,

detalleHistorialComprasdb: `
    SELECT
        D.ID_DETALLE_COMPRA,
        D.ID_COMPRA,
        D.ID_PRODUCTO,
        P.NOMBRE AS PRODUCTO,
        D.CANTIDAD,
        D.PRECIO_COSTO,
        D.SUBTOTAL
    FROM DETALLE_COMPRA D
    LEFT JOIN PRODUCTOS P
        ON P.ID_PRODUCTO = D.ID_PRODUCTO
    WHERE D.ID_COMPRA = :idCompra
    ORDER BY D.ID_DETALLE_COMPRA
`,
};

export default querys;