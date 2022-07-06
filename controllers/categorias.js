const { request, response } = require("express");

const {Categoria} = require('../models');


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


module.exports = {
    crearCategoria
}
