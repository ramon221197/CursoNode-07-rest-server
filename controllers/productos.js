const { request, response } = require("express");

const {Producto} = require('../models');


//Obtener Productos paginado y el total - populate
const obtenerProductos =  async(req = request, resp = response) => {


}

//Obtener una Producto por id - populate { }
const obtenerProducto = async( req = request, resp = response ) => {


}

//Crear una Producto
const crearProducto = async(req = request, resp = response ) => {

  
}

//Actualizar una Producto
const actualizarProducto =  async(req = request, resp = response) => {

 
}

//Eliminar una Producto
const borrarProducto =  async(req = request, resp = response) => {
  
}


module.exports = {
   obtenerProductos,
   obtenerProducto,
   crearProducto,
   actualizarProducto,
   borrarProducto
}
