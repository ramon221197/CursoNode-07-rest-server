const express = require("express");


// const port = process.env.PORT;

class Server {
  constructor() {
    this.app = express();//uso se EXPRESS
    this.port = process.env.PORT;//variable de entorno de PORT


    // Middlewares
    this.middlewares();

    // rutas de mi aplicacion
    this.routes();
  }


  middlewares(){
    //directorio publico
    this.app.use(express.static('public')); //
  }

  routes() {
    this.app.get("/api", (req, res) => {
      res.send("Hello World");
    });
  }

  listen() {
    //Uso de EXPRESS

    this.app.listen(this.port, () => {
      console.log(`\nServidor corriendo en el puerto ${this.port}...`);
    });
  }
}

module.exports = Server;
