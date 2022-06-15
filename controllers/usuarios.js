//IMPORTACIONES
const { response, request } = require("express"); //Para tener los metodos y propiedades de una RESPONSE (status, json, etc)



const usuariosGet = (req = request, res = response) => {

  const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;  

  res.status(201).json({
    ok: true,
    msg: "get API - Controlador",
    q,
    nombre,
    apikey,
    page,
    limit
  });
};

const usuariosPut = (req, res = response) => {

  //Obtener un parametros de segmentos y query
  const { id } = req.params;
  
  res.status(400).json({
    ok: true,
    id,
    msg: "put API- Controlador",
  });
};

const usuariosPost = (req, res = response) => {

    //Obtener informacion
    const {nombre, edad} = req.body;


    res.status(201).json({
      ok: true,
      msg: 'post API - Controlador',
      nombre,
      edad
    });
  }

const usuariosDelete = (req, res = response) => {
    res.status(201).json({
      ok: true,
      msg: 'delete API - Controlador'
    });
  }

module.exports = {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete
};
