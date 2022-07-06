//Importacion de los paquetes
const { Router } = require("express");
const { check } = require("express-validator");

const validarCampos = require("../middlewares/validar-campos");



//PARA CREAR LAS RUTAS
const router = Router();

//Obtener todas las categorias - publico
router.get('/', (req, res) => {
    res.json({
        msg: 'get'
    })
});

// Obtener una categoria por ID - publico
router.get('/:id', (req, res) => {
    res.json({
        msg: 'get por id'
    })
});

//crear categoria - privado - cualquier pesona con un token valido
router.post('/', (req, res) => {
    res.json({
        msg: 'post'
    })
});

//Actualizar - privado - cualquiera con token valido
router.put('/:id', (req, res) => {
    res.json({
        msg: 'actualizar categorias'
    })
});

//Borrar una categoria - privado - cualquiera con token valido
router.delete('/:id', (req, res) => {
    res.json({
        msg: 'borrar categoria'
    })
});

module.exports = router;