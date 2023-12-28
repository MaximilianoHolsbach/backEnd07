/**
 *  # EXPRESS AVANZADO
 *
 *  # Métodos HTTP
 *  *GET* :  Obtener un recurso
 *  *POST* : Crear o añadir un recurso
 *  *PUT* : Modificar un recurso
 *  *DELETE* : Eliminar un recurso
 *
 *  # Como declarar endpoints correctamente
 *  GETapi/dogs
 *  GETapi/dogs/:did
 *  POSTapi/dogs
 *  PUTapi/dogs/:did
 *  DELETEapi/dogs/:did
 *
 * *api/dogs* y api/dogs/:did son perfectamente funcional, sin necesidad de declarar cosas adicionales,
 * entonces podemos reutiliazar el endpoint, siempre y cuando sean diferentes sus métodos.
 *
 *  # POST
 * * Debemos agregar las siguientes líneas
 * * server.use(express.json())
 * * server.use(express.urlencoded({extended:true}))
 * * para que el servidor pueda interpretar de forma automatica los mensajes JSON
 *
 * > ### POSTMAN
 *  1 - *Crear una collección* : Es el equivalente a un proyecto VSC
 *  2 - *Crear un request* : Deben estar todas dentro de la misma colección para que el proyecto se entienda
 *  3 - *Agregar un nombre a nuestro request* : Nombre para el requerimiento
 *  4 - *Cambiar metodos* : Indicar con cual de los metodos trabajaremos
 *  5 - *Ingresamos la URL* : Indicar el endpoint para trabajar, el mismo debe coincidir con el declarado en el servidor
 *  6 - *Seleccionamos la pestaña body* : Sirve para ingresar contenido para enviar al servidor
 *  7 - *Colocamos el modo raw* : Indicando que el cuerpo se creará from scratch
 *  8 - *JSON* : Seleccionamos la opción JSON, que es la estructura que utilizaremos
 *  9 - *Especificamos* : Enviamos el JSON
 *  10 - *Send* : Click al botón SEND
 *  11 - *Cuáles son los resultados* : En el panel visualizaremos los resultados
 */

import express from "express";
import producto from "./data/fs/ProductFsManager.js";
import user from "./data/fs/UserFsManager.js";
import event from "./data/fs/ticketevent.js";

const server = express();

const PORT = 8080;

const ready = () => console.log(`Server ready on port ${PORT}`);

// middlewares

server.use(express.json());

server.use(express.urlencoded({ extended: true }));

server.listen(PORT, ready);

// Endpoints

//Ejemplo = server.metodo("ruta", (req,res)=>{})

//Para crear

server.post("/api/events", async (req, res) => {
  try {
    const data = req.body;
    const response = await event.createEvent(data);
    if (response == "Todos los campos deben ser cargados") {
      return res.json({
        statusCode: 400,
        response,
      });
    } else {
      return res.json({
        statusCode: 201,
        message: "Created",
        response,
      });
    }
  } catch (error) {
    console.log(error);
    return res.json({
      statusCode: 500,
    });
  }
});

server.get("/api/events", async (req, res) => {
  try {
    const all = await event.readEvents();
    if (Array.isArray(all)) {
      return res.json({
        statusCode: 200,
        response: all,
      });
    } else {
      return res.json({
        statusCode: 404,
        message: all,
      });
    }
  } catch (error) {}
});

server.get("/api/events/:eid", async (req, res) => {
  try {
    const { eid } = req.params;
    const movie = event.readEventById(eid);
    if (typeof movie == "string") {
      return res.json({
        statusCode: 404,
        message: movie,
      });
    } else {
      return res.json({
        statusCode: 200,
        response: movie,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});

server.put("/api/events/:eid/:quantity", async (req, res) => {
  try {
    const { eid, quantity } = req.params;
    const sold = await event.soldTicket(quantity, eid);
    const response = await event.readEventById(eid);
    if (response == "string") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else if (
      sold == `Ingrese una cantidad ${quantity} valida` ||
      sold == `La cantidad ${quantity} solicitada, no esta disponible`
    ) {
      return res.json({
        statusCode: 400,
        message: sold,
      });
    } else {
      return res.json({
        statusCode: 200,
        mesage: response,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      mesage: error.message,
    });
  }
});

server.delete("/api/events/:eid", async (req, res) => {
  try {
    const { eid } = req.params;
    const response = await event.removeEventById(eid);
    if (response == "No existe el Id") {
      return res.json({
        statusCode: 404,
        message: response,
      });
    } else {
      return res.json({
        statusCode: 200,
      });
    }
  } catch (error) {
    return res.json({
      statusCode: 500,
      message: error.message,
    });
  }
});


