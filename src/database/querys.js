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
        CALL LAB1.PR_GESTIONAR_PRODUCTO(
            :id_producto,
            :nombre,
            :precio_compra,
            :precio_venta,
            :mensaje,
            :resultado
        )
    `,

}

export default querys