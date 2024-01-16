# backEnd07
Clase 07 de back end express avanzado

 # EXPRESS AVANZADO
 
 ## Métodos HTTP
 * **GET**  :  Obtener un recurso
 * **POST**  : Crear o añadir un recurso
 * **PUT**  : Modificar un recurso
 * **DELETE**  : Eliminar un recurso
  
 ## Como declarar endpoints correctamente
 * **GET**api/dogs
 * **GET**api/dogs/:did
 * **POST**api/dogs
 * **PUT**api/dogs/:did
 * **DELETE**api/dogs/:did

**api/dogs** y api/dogs/:did son perfectamente funcional, sin necesidad de declarar cosas adicionales,
entonces podemos reutiliazar el endpoint, siempre y cuando sean diferentes sus métodos. 
 
 ## POST 
Debemos agregar las siguientes líneas
server.use(express.json())
server.use(express.urlencoded({extended:true}))
para que el servidor pueda interpretar de forma automatica los mensajes JSON
  
 ## POSTMAN
 * 1 - **Crear una collección** : Es el equivalente a un proyecto VSC  
 * 2 - **Crear un request** : Deben estar todas dentro de la misma colección para que el proyecto se entienda
 * 3 - **Agregar un nombre a nuestro request** : Nombre para el requerimiento
 * 4 - **Cambiar metodos** : Indicar con cual de los metodos trabajaremos 
 * 5 - **Ingresamos la URL** : Indicar el endpoint para trabajar, el mismo debe coincidir con el declarado en el servidor
 * 6 - **Seleccionamos la pestaña body** : Sirve para ingresar contenido para enviar al servidor
 * 7 - **Colocamos el modo raw** : Indicando que el cuerpo se creará from scratch
 * 8 - **JSON** : Seleccionamos la opción JSON, que es la estructura que utilizaremos
 * 9 - **Especificamos** : Enviamos el JSON
 * 10 - **Send** : Click al botón SEND 
 * 11 - **Cuáles son los resultados** : En el panel visualizaremos los resultados  


 ![Plataforma POSTMAN](/backEnd07/POSTMAN.jpg)
