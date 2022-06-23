//IMPORTACIONES
const { response, request } = require("express"); //Para tener los metodos y propiedades de una RESPONSE (status, json, etc)
const bcrypt = require('bcryptjs'); //Para encryptar las contraseñas

const Usuario = require('../models/usuario');//importacion de la tabla usuario


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

const usuariosPut = async(req, res = response) => {

  //extraccion de password y google por que no ocupo que se actualicen
  const { id } = req.params;
  const { _id, password, google, correo, ...resto} = req.body;

  //TDO validar vs base de datos
  if( password ){ //si existe el password
    //Encripta la contraseña
    const salt = bcrypt.genSaltSync(10); //salt es el numero de vueltas que se hace para la encryptacion por defecto esta en 10
    resto.password = bcrypt.hashSync(password, salt); // "usuario.password" es el campo que se va encriptar, "hashSync" es el hash de una sola via y me pide el campo que se encripta y el numero de salt
  }
  // findByIdAndUpdate para buscar un objeto por id y actualizar
  const usuario = await Usuario.findByIdAndUpdate( id, resto ); //el primer agumento es para el id y el segundo argumento es para lo que se va actualizar
  
  res.json({
    ok: true,
    msg: "put API- Controlador",
    usuario
  });
};

const usuariosPost = async (req, res = response) => {

    //Obtener informacion
    const {nombre, correo, password, rol}= req.body;

    //Proceso para crear usuarios
    const usuario = new Usuario( {nombre, correo, password, rol} ); //intancia para crear un usuario
    
    //verificar si el correo ya existe en la BD

    //Encriptar el password (Hashear la contraseña)
    const salt = bcrypt.genSaltSync(10); //salt es el numero de vueltas que se hace para la encryptacion por defecto esta en 10
    usuario.password = bcrypt.hashSync(password, salt); // "usuario.password" es el campo que se va encriptar, "hashSync" es el hash de una sola via y me pide el campo que se encripta y el numero de salt

    //guardar el usuario con Mongoose en MongoDB
    await usuario.save(); 


    //Para imprimir el objeto que se va insertar 
    res.status(201).json({
      ok: true,
      msg: 'post API - Controlador',
      usuario
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
