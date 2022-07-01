//Importacion de paquetes
const { request, response, json } = require("express");
const bcryptjs = require("bcryptjs");

const Usuario = require("../models/usuario");
const { generarJWT } = require("../helpers/generarJWT");
const { googleverify } = require("../helpers/google-verify");

const login = async (req = request, resp = response) => {
  const { correo, password } = req.body;

  try {
    //verificar si el email existe
    const usuario = await Usuario.findOne({ correo });
    if (!usuario) {
      //si no existe el usuario
      return resp.status(400).json({
        msg: "Usuario / Password no son correctos - correo",
      });
    }

    //Verificar que el usuario esta activo
    if (!usuario.estado) {
      //si no existe usuario.estado (estado: false)
      return resp.status(400).json({
        msg: "Usuario / Password no son correctos - estado: false",
      });
    }

    //verificar la contraseña
    const validaPasswd = bcryptjs.compareSync(password, usuario.password); //compareSync compara el correo que se recibe en el req.body (1er argumento) y lo compara con el paaswd del usuario (2do argumento) deben hacer match
    if (!validaPasswd) {
      return resp.status(400).json({
        msg: "Usuario / Password no son correctos - password",
      });
    }

    //Generar el JWT
    const token = await generarJWT(usuario.id);

    resp.json({
      msg: "login ok",
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);

    resp.status(500).json({
      msg: "Hable con el administrador",
    });
  }
};

const googleSingIn = async (req = request, res = response) => {

  const { id_token } = req.body;

  try {
    const { correo, nombre, img } = await googleverify( id_token );

        let usuario = await Usuario.findOne({ correo });

        if ( !usuario ) {
            // Tengo que crearlo
            const data = {
                nombre,
                correo,
                password: ':P',
                img,
                rol: "USER_ROLE",
                google: true
            };

            usuario = new Usuario( data );
            await usuario.save();
        }

        // Si el usuario en DB
        if ( !usuario.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT( usuario.id );
        
        res.json({
            usuario,
            token
        });
    
  } catch (error) {
    console.log(error);
    
    res.status(400).json({
        msg: 'El token no se pudo verificar'
    })
  }
}

module.exports = {
  login,
  googleSingIn,
};
