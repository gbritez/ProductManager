import ProductManager from "./ProductManager.js";

const manager = new ProductManager();

//Nuevo producto
manager.addProduct("test", "test de nuevo producto", 1, 'test', '1', 1);
//Nuevo producto
manager.addProduct("test2", "test de nuevo producto 2", 2, 'test', '2', 1);

//Producto duplicado
manager.addProduct("test", "test de nuevo producto", 1, 'test', '1', 1);

//Producto con propiedades faltantes
manager.addProduct("test", "test de nuevo producto", 1, 'test', '1');

//Obtener producto con id (inexistente)
manager.getProductById(0)

//Obtener producto con id 
manager.getProductById(1)

//Obtener Productos
manager.getProducts()
