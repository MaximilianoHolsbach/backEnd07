/**
 * # Registrador de tickets de eventos
 */

import fs from "fs";

class EventManager {
  // Inicializo la clase EventManager
  // Inicializo las constantes privadas de la clase
  static #pergain = 0.3;
  static #totalgain = 0;
  constructor(ruta) {
    // Pasamos como argumento del constructor la ruta donde se alojara el archivo
    this.ruta = ruta;
    this.events = [];
    this.init(); // Metodo para inicializar la clase dependiendo de la existencia del archivo
  }
  init() {
    const file = fs.existsSync(this.ruta); // Consultamos la existencia del archivo
    if (file) {
      // Creo un if para consultar si existe el archivo, en el caso que si, leemos el archivo, los parseamos y lo asignamos a una constante
      this.events = JSON.parse(fs.readFileSync(this.ruta, "utf8"));
    } else {
      // En el caso de que no exista  creamos el archivo con el array vacio
      fs.writeFileSync(this.ruta, JSON.stringify(this.events, null, 2));
    }
  }

  async createEvent(data) {
    try {
      if (!(data.name || data.place)) {
        throw new Error("Cargue propiedades verdaderas");
      }
      const event = {
        id:
          this.events.length === 0
            ? 1
            : this.events[this.events.length - 1].id + 1,
        name: data.name,
        place: data.place,
        price: data.price || 10,
        capacity: data.capacity || 50,
        date: data.date || new Date(),
      };
      this.events.push(event);
      const movies = JSON.stringify(this.events, null, 2);
      await fs.promises.writeFile(this.ruta, movies, "utf8");
    } catch (error) {
      return error.message;
    }
  }

  async readEvents() {
    try {
      if (this.events.length === 0) {
        throw new Error("NOT FOUND");
      } else {
        return this.events;
      }
    } catch (error) {
      return error.message;
    }
  }
  readEventById(id) {
    const eventId = this.events.find((each) => each.id === Number(id));
    try {
      if (!eventId) {
        throw new Error("El indice no se encuentra");
      } else {
        return eventId;
      }
    } catch (error) {
      return error.message;
    }
  }

  async soldTicket(quantity, eventId) {
    try {
      if (!(quantity > 0)) {
        throw new Error(`Ingrese una cantidad ${quantity} valida`);
      }
      const event = this.readEventById(eventId);
      if (quantity > event.capacity) {
        throw new Error(
          `La cantidad ${quantity} solicitada, no esta disponible`
        );
      }
      event.capacity = event.capacity - quantity;
      EventManager.#totalgain =
        EventManager.#totalgain +
        event.price * quantity * EventManager.#pergain;
      const Index = this.events.findIndex((event) => event.id == eventId);
      this.events[Index] = event;
      const movies = JSON.stringify(this.events, null, 2);
      await fs.promises.writeFile(this.ruta, movies, "utf8");
    } catch (error) {
      return error.message;
    }
  }
  getGain() {
    try {
      if (EventManager.#totalgain == 0) {
        throw new Error(`No hay ganancias!`);
      }
      return EventManager.#totalgain;
    } catch (error) {
      return error.message;
    }
  }
  async removeEventById(id) {
    const Index = this.events.findIndex((event) => event.id == id);
    console.log(Index);
    try {
      if (Index == -1) {
        throw new Error("No existe el Id");
      }
      this.events.splice(Index, 1)[0];
      const movies = JSON.stringify(this.events, null, 2);
      await fs.promises.writeFile(this.ruta, movies, "utf8");
    } catch (error) {
      return error.message;
    }
  }
}

const event = new EventManager("./data/fs/files/eventManager.json");

export default event
/*
event.createEvent({name:"Recuerdos del ayer",place:"Shopping Sarmiento"});
event.createEvent({name:"Se levanta el viento",place:"Paseo libertad"});
event.createEvent({name:"La princesa Mononoke",place:"Cinemacenter"})


event.createEvent({ name: "Recuerdos del ayer", place: "Shopping Sarmiento" });
event.createEvent({ name: "Se levanta el viento", place: "Paseo libertad" });
event.createEvent({ name: "La princesa Mononoke", place: "Cinemacenter" });
*/
//console.log(event.readEvents())

//console.log(event.readEventById(2));

//event.soldTicket(3,1)

//console.log(event.readEvents())

//console.log(event.getGain())

//event.removeEventById(2)

//event.removeEventById(1);
