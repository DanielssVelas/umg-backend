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
    `
};

export default querys;