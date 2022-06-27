const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '' ) => { //uid -> user identified / identificador unico

    return new Promise((resolve, reject) => {

        const payload = { uid }

        //Instruccion para generar el JWT
        jwt.sign(payload, process.env.SECRETORPRIVATEKEY,{
            expiresIn: '4h' //tiempo de expiracion del JWT
        }, (err, token) =>{
            if(err){
                console.log(err);
                reject( 'No se pudo generar el token' )
            }else{
                resolve(token);
            }
        } ) //para firmar el JWT

    })
}

module.exports = {
    generarJWT
}