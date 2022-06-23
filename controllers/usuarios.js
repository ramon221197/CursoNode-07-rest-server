//IMPORTACIONES
const { response, request } = require("express"); //Para tener los metodos y propiedades de una RESPONSE (status, json, etc)
const bcrypt = require('bcryptjs'); //Para encryptar las contraseñas

const Usuario = require('../models/usuario');//importacion de la tabla usuario


const usuariosGet = async(req = request, res = response) => {

  // const { q, nombre = 'No name', apikey, page = 1, limit } = req.query;  
  const {limite = 5, desde = 0} = req.query;

  // const usuarios = await Usuario.find({ estado: true }) // {estado:true} para que regrese todos los usuarios con estado = true
  //   .skip( Number(desde) ) 
  //   .limit( Number(limite) );

  // const total = await Usuario.countDocuments({ estado: true }); //countDocuments para el todal de un objeto o modelo

  const [total, usuarios] = await Promise.all([
    Usuario.countDocuments({ estado: true }), //countDocuments para el todal de un objeto o modelo
    
    Usuario.find({ estado: true }) // {estado:true} para que regrese todos los usuarios con estado = true
    .skip( Number(desde) ) 
    .limit( Number(limite) )
  ])//Promise.all() es para ejecutar todas las promesas que se tengan dentro del arreglo all([])


  res.json({
    total,
    usuarios
  });
}

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
    usuario
  });
}

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
}
