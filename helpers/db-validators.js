const {Usuario, Categoria, Role, Producto} = require("../models");

const esRoleValido = async (rol = "") => {
  const existeRol = await Role.findOne({ rol }); //esta linea es para buscar el rol que se esta mandando como argumento en la BD
  if (!existeRol) { //si no esxiste el rol, entonces mandamos el error
    throw new Error(`el rol ${rol} no esta registrado en la BD`);
  }
}

const emailExiste = async (correo = "") => {
    //verificar si el correo existe
  const existeEmail = await Usuario.findOne({ correo }); //findOne va buscar el objeto que tenga el correo que sea igual al que recibo como argumento
  if (existeEmail) {//si el email existe, retorna un error y mensaje de que el correo ya esta registrado
    throw new Error(`el correo ${correo} ya existe en la BD`);
  }
}

const existeUsuarioPorID = async ( id ) => {
    //verificar si el correo existe
  const existeUsuario = await Usuario.findById( id ); //findOne va buscar el objeto que tenga el correo que sea igual al que recibo como argumento
  if ( !existeUsuario) {//si el ID existe, retorna un error y mensaje de que el Usuario ya esta registrado
    throw new Error(`El id: ${id} no existe en la BD`);
  }
}

const existeCategoriaPorId = async ( id ) => {

  //verificar si la categoria existe
  const existeCategoria = await Categoria.findById( id ); //findOne va buscar el objeto que tenga el correo que sea igual al que recibo como argumento
  if ( !existeCategoria) {//si el ID NO existe, retorna un error y mensaje de que el Usuario ya esta registrado
        throw new Error(`El id: ${id} no existe en la BD`);
  }
}

const existeProductoPorId = async ( id ) => {

  //verificar si la categoria existe
  const existeProducto = await Producto.findById( id ); //findOne va buscar el objeto que tenga el correo que sea igual al que recibo como argumento
  if ( !existeProducto) {//si el ID NO existe, retorna un error y mensaje de que el Usuario ya esta registrado
        throw new Error(`El id: ${id} no existe en la BD`);
  }
}

module.exports = {
  esRoleValido,
  emailExiste,
  existeUsuarioPorID,
  existeCategoriaPorId,
  existeProductoPorId
}
