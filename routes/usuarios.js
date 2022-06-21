//Importacion de los paquetes
const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios");
const validarCampos = require("../middlewares/validar-campos");



//PARA CREAR LAS RUTAS
const router = Router();

//endpoint GET en EXPRESS (Obtener)
router.get("/", usuariosGet);

//endpoint PUT en EXPRESS (Actualizar)
router.put("/:id", usuariosPut);

//endpoint POST en EXPRESS (Crear)
router.post("/", [
  check('nombre', 'El nombre es requerido').not().isEmpty(),//no debe estar vacio
  check('correo', 'El correo es requerido').not().isEmpty(),//no debe estar vacio
  check('correo', 'El correo no es valido').isEmail(),
  check('rol', 'No es un rol valido').isIn(['ADMIN_ROLE', 'USER_ROLE']),//isIn(), para decir si se encuentra dentro de un arreglo
  check('password', 'El password es requerido y mayor a 6 letras').not().isEmpty().isLength({ min: 6, max: 20 } ),//no debe estar vacio y mayor a 6 letras
  validarCampos //Para indicar que haga las validaciones del middleware
] ,usuariosPost); 

//endpoint DELETE en EXPRESS (Eliminar)
router.delete("/", usuariosDelete);




//Exportacion para utilizarlos en otro archivo
module.exports = router;
