//Importacion de los paquetes
const { Router } = require("express");
const { check } = require("express-validator");
const {
  usuariosGet,
  usuariosPut,
  usuariosPost,
  usuariosDelete,
} = require("../controllers/usuarios");



//PARA CREAR LAS RUTAS
const router = Router();

//endpoint GET en EXPRESS (Obtener)
router.get("/", usuariosGet);

//endpoint PUT en EXPRESS (Actualizar)
router.put("/:id", usuariosPut);

//endpoint POST en EXPRESS (Crear)
router.post("/", [
  check('correo', 'El correo no es valido').isEmail(),
] ,usuariosPost); 

//endpoint DELETE en EXPRESS (Eliminar)
router.delete("/", usuariosDelete);




//Exportacion para utilizarlos en otro archivo
module.exports = router;
