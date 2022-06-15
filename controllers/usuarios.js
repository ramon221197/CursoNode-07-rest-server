//IMPORTACIONES
const { response } = require("express"); //Para tener los metodos y propiedades de una RESPONSE (status, json, etc)



const usuariosGet = (req, res = response) => {
  res.status(201).json({
    ok: true,
    msg: "get API - Controlador",
  });
};

const usuariosPut = (req, res = response) => {
  res.status(400).json({
    ok: true,
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
