const { request, response } = require("express");

const {Producto} = require('../models');


//Obtener productos paginado y el total - populate
const obtenerProductos =  async(req = request, resp = response) => {

  const {limite = 5, desde = 0} = req.query;
  const query = { estado: true };

  const [total, productos] = await Promise.all([
    Producto.countDocuments(query), //countDocuments para el todal de un objeto o modelo
    
    Producto.find(query) // {estado:true} para que regrese todos los usuarios con estado = true
    .populate('usuario','nombre')//para extraer la informacion del usuario que jace la peticion
    .populate('categoria', 'nombre')
    .skip( Number(desde) ) 
    .limit( Number(limite) )
  ])//Promise.all() es para ejecutar todas las promesas que se tengan dentro del arreglo all([])


  resp.json({
    total,
    productos
  });

}

//Obtener un producto por id - populate { }
const obtenerProducto = async( req = request, resp = response ) => {

    const { id } = req.params; //extraer el id de la categoria que se va obtener

    const producto = await Producto.findById( id )
          .populate('usuario', 'nombre') //Para mostrar el nombre del usuario que quiere hacer la peticion
          .populate('categoria', 'nombre'); //Para mostrar el nombre de la categoria

    resp.json({
        msg: 'producto encontrado',
        producto
    })


}

//Crear una categoria
const crearProducto = async(req = request, resp = response ) => {

    const {estado, usuario, ...body} = req.body; //se extrae el estado y el usuario para ignorarlos al momento de la creacion

    //validar si ya existe un producto con ese nombre en DB
    const productoDB = await Producto.findOne({ nombre: body.nombre.toUpperCase() }); 
    if( productoDB ){
        resp.status(400).json({
            msg: `El producto ${ productoDB.nombre }, ya existe en la DB`
        })
    }

    //Generar la data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),//para guardar el nombre del producto en mayusculas
        usuario: req.usuario._id
    }

    const producto = new Producto( data );

    //Guardar en DB
    await producto.save();

    resp.status(201).json( producto );
}

//Actualizar una categoria
const actualizarProducto =  async(req = request, resp = response) => {

    //extraccion del id de la Producto que se va actualizar
    const { id } = req.params;
    const { estado, usuario, ...data} = req.body; //el estado y el usuario no van a cambiar, por eso se extraen. y lo demas lo almaceno en la variable ...data.
  
    if (data.nombre) {
       data.nombre  = data.nombre.toUpperCase();// para almacenar lo que se actualice en MAYUSCULAS
    }
    data.usuario = req.usuario._id; //Para tener el id del usuario dueño del token que quiere hacer la actualizacion

    // findByIdAndUpdate para buscar un objeto por id y actualizar
    const producto = await Producto.findByIdAndUpdate(id, data ); 

    resp.json({
        msg: 'producto actualizado correctamente',
        producto
      });
}

//Eliminar una categoria
const borrarProducto =  async(req = request, resp = response) => {
  
  const { id } = req.params;

  //Eliminacion logica
  const productoBorrado =  await Producto.findByIdAndUpdate( id, { estado: false} ); //el primer agumento es para el id y el segundo argumento es para lo que se va actualizar

  resp.status(201).json({
      msg: 'Producto eliminado correctamente',
      productoBorrado
    });
}


module.exports = {
   obtenerProductos,
   obtenerProducto,
   crearProducto,
   actualizarProducto,
   borrarProducto
}
