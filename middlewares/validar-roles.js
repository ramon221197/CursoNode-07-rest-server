const { response, request } = require('express');


const esAdminRole = async(req = request, resp = response, next) => {
    
    //validacion del JWT
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

const tieneRole = ( ...roles ) =>{ //operador rest (...) para almacenar el arreglo de roles
    return (req = request, resp = response, next) => {

        // console.log(roles, req.usuario.rol);

        //validacion del JWT
        if( !req.usuario ){
            resp.status(500).json({
                msg: 'Se quiere verificar el role sin validar un token primero'
            });
        }
        
        if ( !roles.includes( req.usuario.rol ) ) { //si roles incluye el rol del usuario autenticado
            return resp.status(401).json({
                msg: `El servicio requiere uno dde estos roles [ ${roles} ]`
            });
        }
        
        next();

    }
}

module.exports = {
    esAdminRole,
    tieneRole
}