const { request, response } = require("express");

const {Categoria} = require('../models');


//Obtener categorias paginado y el total - populate
const obtenerCategorias =  async(req = request, resp = response) => {

  const {limite = 5, desde = 0} = req.query;
  const query = { estado: true };

  const [total, categorias] = await Promise.all([
    Categoria.countDocuments(query), //countDocuments para el todal de un objeto o modelo
    
    Categoria.find(query) // {estado:true} para que regrese todos los usuarios con estado = true
    .populate('usuario','nombre')//para extraer la informacion del usuario que jace la peticion
    .skip( Number(desde) ) 
    .limit( Number(limite) )
  ])//Promise.all() es para ejecutar todas las promesas que se tengan dentro del arreglo all([])


  resp.json({
    total,
    categorias
  });

}

//Obtener una categoria por id - populate { }
const obtenerCategoria = async( req = request, resp = response ) => {

    const { id } = req.params; //extraer el id de la categoria que se va obtener

    const categoria = await Categoria.findById( id )
          .populate('usuario', 'nombre'); //Para mostrar el nombre del usuario que quiere hacer la peticion

    resp.json({
        msg: 'categoria encontrada',
        categoria
    })


}

//Crear una categoria
const crearCategoria = async(req = request, resp = response ) => {

    const nombre = req.body.nombre.toUpperCase(); //Para guardar todo en mayusculas en la DB

    //validar si ya existe una categoria con ese nombre en DB
    const categoriaDB = await Categoria.findOne({ nombre }); 
    if( categoriaDB ){
        resp.status(400).json({
            msg: `La categoria ${ categoriaDB.nombre }, ya existe en la DB`
        })
    }

    //Generar la data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id
    }

    const categoria = new Categoria( data );

    //Guardar en DB
    await categoria.save();

    resp.status(201).json( categoria );
}

//Actualizar una categoria
const actualizarCategoria =  async(req = request, resp = response) => {

    //extraccion del id de la categoria que se va actualizar
    const { id } = req.params;
    const { estado, usuario, ...resto} = req.body; //el estado y el usuario no van a cambiar, por eso se extraen. y lo demas lo almaceno en la variable ...resto.
  
    resto.nombre  = resto.nombre.toUpperCase();// para almacenar lo que se actualice en MAYUSCULAS
    // resto.usuario = req.usuario._id; //Para tener el id del usuario dueño del token que quiere hacer la actualizacion

    // findByIdAndUpdate para buscar un objeto por id y actualizar
    const categoria = await Categoria.findByIdAndUpdate(id, resto, { new: true} ); 

    resp.json({
        msg: 'categoria actualizada correctamente',
        categoria
      });
}

//Eliminar una categoria
const borrarCategoria =  async(req = request, resp = response) => {
  
  const { id } = req.params;

  //Eliminacion logica
  const categoriaBorrada =  await Categoria.findByIdAndUpdate( id, { estado: false} ); //el primer agumento es para el id y el segundo argumento es para lo que se va actualizar

  resp.status(201).json({
      msg: 'Categoria eliminada correctamente',
      categoriaBorrada
    });
}


module.exports = {
   obtenerCategorias,
   obtenerCategoria,
   crearCategoria,
   actualizarCategoria,
   borrarCategoria
}
