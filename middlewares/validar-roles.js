const { response, request } = require('express');


const esAdminRole = async(req = request, resp = response, next) => {
    

    if( !req.usuario ){
        resp.status(500).json({
            msg: 'Se quiere verificar el role sin validar un token primero'
        });
    } 

    //Verificar que sea un usuario ADMIN
    const { rol, nombre} = req.usuario;

    if ( rol !== 'ADMIN_ROLE') { //si el usuario no es admin
        return resp.status(400).json({
            msg: `${nombre} no es administrador - no puede hacer esto`
        });
        
    }

    next();//para que se ejecute el sig middleware

}

module.exports = {
    esAdminRole
}