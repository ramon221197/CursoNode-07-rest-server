//Importaciones
const express = require("express");
const cors = require('cors');

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

    //CORS
      this.app.use( cors() );

    //directorio publico
    this.app.use(express.static('public')); 
  }

  routes() {

    //endpoint GET en EXPRESS (Obtener)
    this.app.get("/api", (req, res) => {
      res.status(201).json({
        ok: true,
        msg: 'get API'
      });
    });

    //endpoint PUT en EXPRESS (Actualizar)
    this.app.put("/api", (req, res) => {
        res.status(400).json({
          ok: true,
          msg: 'put API'
        });
      });

      //endpoint POST en EXPRESS (Crear)
    this.app.post("/api", (req, res) => {
        res.status(201).json({
          ok: true,
          msg: 'post API'
        });
      });

      //endpoint DELETE en EXPRESS (Eliminar)
    this.app.delete("/api", (req, res) => {
        res.status(201).json({
          ok: true,
          msg: 'delete API'
        });
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
