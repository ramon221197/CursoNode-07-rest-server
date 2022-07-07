//IMPORTACIONES
const { response } = require("express");
const { ObjectId } = require('mongoose').Types;

const { Usuario, Categoria, Producto } = require("../models"); //Importacion de los modelos



//colecciones permitidad para las busquedas
const colecccionesPermitidas = [
    'usuarios',
    'categorias',
    'productos',
    'roles',
];

const buscarUsuarios = async( termino = '', resp = response) => {
    
    //BUSQUEDA POR ID
    //verificacion para saber si el termino es un MongoID valido
    const esMongoId = ObjectId.isValid( termino ); //TRUE

    if ( esMongoId ) {
        const usuario = await Usuario.findById( termino );
        return resp.json({ //IMPORTANTE: poner el return para que no siga ejecutando nda de la funcion
            results: (usuario) ? [ usuario ] : [ ] //si el usuario existe regresa el arreglo con lel usuario encontrado, si no regresa un arreglo vacio
        });
    }

    //BUSQUEDA POR NOMBRE O CORREO
    const regexp = new RegExp( termino , 'i'); //expresion regular para hacer insencible a mayusculas y minusculas la busqueda

    const usuarios = await Usuario.find({ 
        $or: [ {nombre: regexp}, {correo: regexp} ], // donde encuentre el nombre/correo sea = al termino
        $and: [{ estado: true}] //Y ademas debe estar activo
    }); // donde encuentre el nombre se = al termino

    return resp.json({ //IMPORTANTE: poner el return para que no siga ejecutando nda de la funcion
        results: usuarios
    });
}

const buscarCategorias = async( termino = '', resp = response) => {

    //BUSQUEDA POR ID
    //verificacion para saber si el termino es un MongoID valido
    const esMongoId = ObjectId.isValid( termino ); //TRUE

    if ( esMongoId ) {
        const categoria = await Categoria.findById( termino );
        return resp.json({ //IMPORTANTE: poner el return para que no siga ejecutando nda de la funcion
            results: (categoria) ? [ categoria ] : [ ] //si el usuario existe regresa el arreglo con lel usuario encontrado, si no regresa un arreglo vacio
        });
    }

    //BUSQUEDA POR NOMBRE O CORREO
    const regexp = new RegExp( termino , 'i'); //expresion regular para hacer insencible a mayusculas y minusculas la busqueda

    const categorias = await Categoria.find({ nombre: regexp, estado: true }); //que encuentre por nombre y que el estado: true
    return resp.json({ //IMPORTANTE: poner el return para que no siga ejecutando nda de la funcion
        results: categorias
    });

}

const buscarProductos = async( termino = '', resp = response) => {

    //BUSQUEDA POR ID
    //verificacion para saber si el termino es un MongoID valido
    const esMongoId = ObjectId.isValid( termino ); //TRUE

    if ( esMongoId ) {
        const productos = await Producto.findById( termino ).
                        populate('categoria','nombre');
        return resp.json({ //IMPORTANTE: poner el return para que no siga ejecutando nda de la funcion
            results: (productos) ? [ productos ] : [ ] //si el usuario existe regresa el arreglo con lel usuario encontrado, si no regresa un arreglo vacio
        });
    }

    //BUSQUEDA POR NOMBRE 
    const regexp = new RegExp( termino , 'i'); //expresion regular para hacer insencible a mayusculas y minusculas la busqueda

    const productos = await Producto.find({ nombre: regexp, estado: true })//que encuentre por nombre y que el estado: true
                    .populate('categoria','nombre'); 
    return resp.json({ //IMPORTANTE: poner el return para que no siga ejecutando nda de la funcion
        results: productos
    });

}

const buscar = (req, resp = response) => {

    const {coleccion, termino } = req.params;

    //validar si la coleccion que se esta mandando en la url se encuentra en las colecciones permitidas
    if ( !colecccionesPermitidas.includes( coleccion )) {
        return resp.status(400).json({
            msg:  `Las colecciones permitidas son: ${colecccionesPermitidas}`
        })
        
    }

    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, resp);

        break;
        case 'categorias':
            buscarCategorias(termino, resp);
            
        break;
        case 'productos':
            buscarProductos(termino, resp);
            
        break;

        default:
            resp.status(500).json({
                msg: 'Se me olvido hacer sta busqueda'
            })

    }

}

module.exports = {
    buscar
}