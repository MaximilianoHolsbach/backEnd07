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

class UserManager {
  static #usuarios = [];
  constructor(data) {
    this.id =
      UserManager.#usuarios.length == 0
        ? 1
        : UserManager.#usuarios[UserManager.#usuarios.length - 1].id + 1;
    this.name = data.name;
    this.photo = data.photo || "NOT FOUNT";
    this.email = data.email;
    UserManager.#usuarios.push(this);
  }
  create(data) {
    const user = {
      id:
        UserManager.#usuarios.length == 0
          ? 1
          : UserManager.#usuarios[UserManager.#usuarios.length - 1].id + 1,
      name: data.name,
      photo: data.photo,
      email: data.email,
    };
    UserManager.#usuarios.push(user);
  }
  read() {
    return UserManager.#usuarios;
  }
  readOne(id) {
    return UserManager.#usuarios.find((each) => each.id == Number(id));
  }
  destroy(id) {
    const index = UserManager.#usuarios.findIndex(
      (user) => usuarios.id === Number(id)
    );
    UserManager.#usuarios.splice(index, 1)[0];
    return UserManager.#usuarios;
  }
}

const usuarios = new UserManager({
  name: "J.BARRETO",
  photo: "PERFIL",
  email: "J.BARRETO@GMAIL.COM",
});
usuarios.create({
  name: "L.VERA",
  photo: "PERFIL",
  email: "L.VERA@GMAIL.COM",
});
usuarios.create({
  name: "G.TUR",
  photo: "PERFIL",
  email: "G.TUR@GMAIL.COM",
});

console.log(usuarios.read());

console.log(usuarios.readOne(3));

console.log(usuarios.destroy(2));
