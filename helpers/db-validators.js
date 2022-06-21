const Role = require('../models/role');

const esRoleValido = async( rol = '' ) => {
    const existeRol = await Role.findOne({ rol });//esta linea es para buscar el rol que se esta mandando como argumento en la BD 
    if ( !existeRol ) {//si no esxiste el rol, entonces mandamos el error
      throw new Error(`el rol ${rol} no esta registrado en la BD`)
    }
  } 

  module.exports = {
    esRoleValido,
    
  }