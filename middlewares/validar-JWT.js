const { response, request } = require('express');
const jwt = require('jsonwebtoken');

//un moddleware se dispara con 3 argumentos (req, resp = response, next) next es para indicar si puede continuar con el sig middleware o con el controlador
const validarJWT = (req = request, resp = response, next) => {

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
        
        req.uid = uid;

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