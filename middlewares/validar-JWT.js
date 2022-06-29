const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const Usuario = require('../models/usuario');


//un moddleware se dispara con 3 argumentos (req, resp = response, next) next es para indicar si puede continuar con el sig middleware o con el controlador
const validarJWT = async(req = request, resp = response, next) => {

    const token = req.header('x-token');

    //si no existe el token, manda mensaje de que no hay token en la peticion
    if( !token ){
        return resp.status(401).json({
            msg: 'no hay token en la peticion'
        });
    }

    //validacion del token
    try {

        const { uid } = jwt.verify( token, process.env.SECRETORPRIVATEKEY );//esta funcion sirve para verificar el JWT
        
        //leer el usuario que corresponde al uid autenticado
        const usuario = await Usuario.findById( uid );

        //verificar que el token y el usuario existan en la DB
        if ( !usuario) {
            return resp.status(401).json({
                msg: 'Token no valido - usuario no existe en DB'
            });
            
        }

        //verificar si el usuario autenticado tiene estado: true
        if( !usuario.estado ){//si el usuario.estado = false
            return resp.status(401).json({
                msg: 'Token no valido - usuario con estado: false'
            });

        }

        req.usuario = usuario;

        next();//para que ejecute el siguiente middleware

    } catch (error) {
        console.log(error);
        resp.status(400).json({
            msg: 'token no valido'
        });
        
        
    }
    

}

module.exports = {
    validarJWT
}