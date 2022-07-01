//Importacion de paquetes
const { request, response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");





const login = async(req = request, resp = response) => {

    const { correo, password} = req.body;

    try {

        //verificar si el email existe
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ) { //si no existe el usuario
            return resp.status(400).json({
                msg: 'Usuario / Password no son correctos - correo'
            });
        }

        //Verificar que el usuario esta activo
        if ( !usuario.estado ) { //si no existe usuario.estado (estado: false)
            return resp.status(400).json({
                msg: 'Usuario / Password no son correctos - estado: false'
            });
        }

        //verificar la contraseña
        const validaPasswd = bcryptjs.compareSync(password, usuario.password); //compareSync compara el correo que se recibe en el req.body (1er argumento) y lo compara con el paaswd del usuario (2do argumento) deben hacer match
        if( !validaPasswd ){
            return resp.status(400).json({
                msg: 'Usuario / Password no son correctos - password'
            });
        }

        //Generar el JWT
        const token = await generarJWT( usuario.id );
        
        resp.json({
            msg: 'login ok',
            usuario,
            token
        })

    } catch (error) {
        console.log(error);

        resp.status(500).json({
            msg: 'Hable con el administrador'
        });
    }

}

const googleSingIn = async( req = request, res = response) => {
    
    const {id_token} = req.body;

    res.json({
        msg: 'Todo bien',
        id_token
    })
}

module.exports = {
    login,
    googleSingIn
}