//Importaciones
const express = require("express");
const cors = require("cors");
const { dbConnection } = require("../database/config");

// const port = process.env.PORT;

class Server {
  constructor() {
    this.app = express(); //uso se EXPRESS
    this.port = process.env.PORT; //variable de entorno de PORT

    this.paths = {
      auth:         "/api/auth", //path para auetnticación
      buscar:       "/api/buscar", //path para auetnticación
      categorias:   "/api/categorias", //path para auetnticación
      productos:    "/api/productos", //path para los productos
      usuarios:     "/api/usuarios", //path para los usuarios
    }
    

    //Conectar a base de datos
    this.conectarDB();

    // Middlewares
    this.middlewares();

    // rutas de mi aplicacion
    this.routes();
  }

  //Conectar a base de datos
  async conectarDB() {

    await dbConnection();

  }


  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y Parseo del Body
    this.app.use(express.json());

    //directorio publico
    this.app.use(express.static("public"));
  }


  //Para rutas de la aplicacion
  routes() {

    //ponemos el url para las rutas, y el path donde se encuentran esas rutas
    this.app.use(this.paths.auth, require("../routes/auth"));
    this.app.use(this.paths.buscar, require("../routes/buscar"));
    this.app.use(this.paths.categorias, require("../routes/categorias"));
    this.app.use(this.paths.productos, require("../routes/productos"));
    this.app.use(this.paths.usuarios, require("../routes/usuarios"));
  }


  listen() {
    
    //Uso de EXPRESS
    this.app.listen(this.port, () => {
      console.log(`\nServidor corriendo en el puerto ${this.port}...`);
    });
  }
}

module.exports = Server;
