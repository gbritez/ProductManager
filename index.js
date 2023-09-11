const ProductManager = require('./ProductManager')
const PATH = 'db.txt'

const main = async () => {

    const manager = new ProductManager(PATH);

    //Obtener Productos
    // let products = await manager.getProducts()
    // console.table(products)

    //Nuevo producto
    //await manager.addProduct("test", "test de nuevo producto", 1, 'test', '1', 1);

    //Producto duplicado
    // manager.addProduct("test", "test de nuevo producto", 1, 'test', '1', 1);

    //Producto con propiedades faltantes
    //await manager.addProduct("test", "test de nuevo producto", 1, 'test', '1');

    // //Obtener producto con id (inexistente)
    // await manager.getProductById(0)

    // //Obtener producto con id 
    // await manager.getProductById(1)

    //Borrar un producto
    //await manager.deleteProduct(1)

    //Actualizar producto
    //await manager.updateProduct(1,'stock',3)

    //Actualizar producto (propiedad invalida)
    //await manager.updateProduct(1, 'stock1', 3)


    //Obtener Productos
    const products = await manager.getProducts()
    console.table(products)

}

main()