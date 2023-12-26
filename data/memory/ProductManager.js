/**
 * ######################### DESAFÍO ENTREGABLE #######################
 *
 *  Clases con ECMAScript y ECMAScript avanzado
 *
 *  => Consigna:
 *
 *  > Programa una clase “ProductManager” que gestione un conjunto de productos.
 *  > Programar una clase “UserManager” que gestione un conjunto de usuarios.
 *
 *  => Aspectos a incluir:
 *
 *  > Debe crearse con una variable privada y que guarde todos los productos/usuarios en un arreglo
 *
 *  > Cada producto tiene las propiedades:
 *      - id (código identificador)
 *      - title (titulo)
 *      - photo (ruta de imagen)
 *      - price (precio)
 *      - stock (unidades disponibles)
 *
 *  > Cada usuario tiene las propiedades:
 *      - id (código identificador)
 *      - name (titulo)
 *      - photo (ruta de imagen)
 *      - email (precio)
 *  > Cada clase de contar con los métodos:
 *      - create(data) el cual agregará un producto/usuario al arreglo de productos/usuarios inicial.
 *        Todos los campos son obligatorios menos id que debe agregarse automáticamente  y auto- incrementable.
 *      - read() el cual debe devolver el arreglo con todos los productos/usuarios
 *      - readOne(id) el cual debe devolver el objeto producto/usuario buscado
 *
 *  => Formato del entregable:
 *
 *  > Pull Request (PR) de rama sprint1 hacia main/master según corresponda
 *  > Probar los métodos y realizar algunas capturas de pantalla para incluir en la PR.
 *  > Incluir readme.md explicando lo que se entregó
 *  > La entrega es individual, en caso de trabajar en parejas, informar al tutor con quién trabajaron (ambos deben avisar).
 */

class ProductManager {
  static #productos = [];
  constructor(data) {
    this.id =
      ProductManager.#productos.length == 0
        ? 1
        : ProductManager.#productos[ProductManager.#productos.length - 1].id +
          1;
    this.title = data.title;
    this.photo = data.photo || "NOT FOUND";
    this.price = data.price || 10;
    this.stock = data.stock || 0;
    ProductManager.#productos.push(this);
  }
  create(data) {
    const product = {
      id:
        ProductManager.#productos.length == 0
          ? 1
          : ProductManager.#productos[ProductManager.#productos.length - 1].id +
            1,
      title: data.title,
      photo: data.photo,
      price: data.price,
      stock: data.stock,
    };
    ProductManager.#productos.push(product);
  }
  read() {
    return ProductManager.#productos;
  }
  readOne(id) {
    return ProductManager.#productos.find((each) => each.id == Number(id));
  }
  destroy(id) {
    const index = ProductManager.#productos.findIndex(
      (product) => product.id === Number(id)
    );
    ProductManager.#productos.splice(index, 1)[0];
    return ProductManager.#productos;
  }
}

const productos = new ProductManager({
  title: "TONER RICOH MP 301",
  photo: "TONER 301",
  price: 16,
  stock: 100,
});
productos.create({
  title: "TONER RICOH MP 401",
  photo: "TONER 401",
  price: 32,
  stock: 100,
});
productos.create({
  title: "TONER RICOH MP 171",
  photo: "TONER 171",
  price: 12,
  stock: 100,
});

console.log(productos.read());

console.log(productos.readOne(1));

console.log(productos.destroy(2));
