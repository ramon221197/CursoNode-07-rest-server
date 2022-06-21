//IMPORTACIONES
const { response, request } = require("express"); //Para tener los metodos y propiedades de una RESPONSE (status, json, etc)
const bcrypt = require('bcryptjs'); //Para encryptar las contraseñas

const Usuario = require('../models/usuario');//importacion de la tabla usuario
const {validationResult} = require('express-validator');


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

const usuariosPost = async (req, res = response) => {

    //Validaciones de Express-validators
    const errors = validationResult(req);
    if ( !errors.isEmpty() ) { //si existen errores, retorna un status de error con errores encontrados por express-validators
      return res.status(400).json(errors);
    }

    //Obtener informacion
    const {nombre, correo, password, rol}= req.body;

    //Proceso para crear usuarios
    const usuario = new Usuario( {nombre, correo, password, rol} ); //intancia para crear un usuario
    
    //verificar si el correo ya existe en la BD
    const existeEmail = await Usuario.findOne({ correo }) //findOne va buscar el objeto que tenga el correo que sea igual al que recibo como argumento
    if(existeEmail){ //si el email existe, retorna un error y mensaje de que el correo ya esta registrado
      return res.status(400).json({
        msg: 'Ese correo ya esta registrado'
      })
    }
    //Encriptar el password (Hashear la contraseña)
    const salt = bcrypt.genSaltSync(10); //salt es el numero de vueltas que se hace para la encryptacion por defecto esta en 10
    usuario.password = bcrypt.hashSync(password, salt); // "usuario.password" es el campo que se va encriptar, "hashSync" es el hash de una sola via y me pide el campo que se encripta y el numero de salt

    //guardar el usuario con Mongoose en MongoDB
    await usuario.save(); 


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
