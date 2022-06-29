//Importacion de los paquetes
const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios");
const { esRoleValido, emailExiste, existeUsuarioPorID } = require("../helpers/db-validators");
const validarCampos = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-JWT");
const { esAdminRole, tieneRole } = require("../middlewares/validar-roles");



//PARA CREAR LAS RUTAS
const router = Router();

//endpoint GET en EXPRESS (Obtener)
router.get("/", usuariosGet);


//endpoint PUT en EXPRESS (Actualizar)
router.put("/:id", [
  check('id', 'No es un ID valido').isMongoId(),//el ID que se pone en la ruta debe ser un ID de mongo
  check('id').custom( existeUsuarioPorID ), //no existe el id en la BD
  check('rol').custom( esRoleValido ),
  validarCampos //Para que no continue ejecutando el controlador si existe error en los middlewares
] , usuariosPut);

//endpoint POST en EXPRESS (Crear)
router.post("/", [
  check('nombre', 'El nombre es requerido').not().isEmpty(),//no debe estar vacio
  check('password', 'El password es requerido y mayor a 6 letras').not().isEmpty().isLength({ min: 6, max: 20 } ),//no debe estar vacio y mayor a 6 letras
  check('correo', 'El correo no es valido').isEmail(),
  // check('correo', 'El correo es requerido').not().isEmpty(),//no debe estar vacio
  check('correo').custom( emailExiste ), //verificar email repetidos
  check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),//isIn(), para decir si se encuentra dentro de un arreglo
  //validar rol, con datos de la BD
  check('rol').custom( esRoleValido ),
  validarCampos //Para que no continue ejecutando el controlador si existe error en los middlewares
] ,usuariosPost); 


//endpoint DELETE en EXPRESS (Eliminar)
router.delete("/:id", [
  validarJWT,
  // esAdminRole,
  tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
  check('id', 'No es un ID valido').isMongoId(),//el ID que se pone en la ruta debe ser un ID de mongo
  check('id').custom( existeUsuarioPorID ), //checar que exista en la base de datos
  validarCampos //Para que no continue ejecutando el controlador si existe error en los middlewares
], usuariosDelete);




//Exportacion para utilizarlos en otro archivo
module.exports = router;
