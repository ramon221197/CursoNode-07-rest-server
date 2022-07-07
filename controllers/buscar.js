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
    
    //verificacion para saber si el termino es un MongoID valido
    const esMongoId = ObjectId.isValid( termino ); //TRUE

    if ( esMongoId ) {
        const usuario = await Usuario.findById( termino );
        resp.json({
            results: (usuario) ? [ usuario ] : [ ] //si el usuario existe regresa el arreglo con lel usuario encontrado, si no regresa un arreglo vacio
        })
    }
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
            
        break;
        case 'productos':
            
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