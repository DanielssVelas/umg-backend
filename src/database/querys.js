const querys = {
    productsdb: `
        select * from productos
    `,
    clientedb: `
        select * from clientes
    `,
    proveedoredb: `
        select * from proveedores
    `,
    usuariodb: `
        select * from usuario
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
    `

}

export default querys