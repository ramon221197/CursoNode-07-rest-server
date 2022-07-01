//Importacion de los paquetes
const { Router } = require("express");
const { check } = require("express-validator");

const { login, googleSingIn } = require('../controllers/auth');
const { emailExiste } = require("../helpers/db-validators");
const validarCampos = require("../middlewares/validar-campos");



//PARA CREAR LAS RUTAS
const router = Router();


//endpoint POST en EXPRESS (CREAR)
router.post('/login', [

    check('correo', 'El correo no es valido').isEmail(),//debe ser un correo valido
    check('correo', 'El correo es requerido').not().isEmpty(),//no debe ir vacio
    check('password', 'El password es requerido').not().isEmpty(),//no debe estar vacio y mayor a 6 letras
    validarCampos

], login );


//endpoint login google
router.post('/google', [

    check('id_token', 'El id_token es necesario').not().isEmpty(),//debe ser un correo valido
    validarCampos

], googleSingIn );


module.exports = router;