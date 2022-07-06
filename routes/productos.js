//Importacion de los paquetes
const { Router, response } = require("express");

//PARA CREAR LAS RUTAS
const router = Router();

//Obtener todos los productos - paginado - publico
router.get('/', (req, res = response) => {
    res.json({
        msg: 'get de productos paginados'
    })
});

//Obtener un producto por id - publico
router.get('/:id', (req, res = response) => {
    res.json({
        msg: 'get de producto por id'
    })
});

//Crear un producto
router.post('/', (req, res = response) => {
    res.json({
        msg: 'Crear producto'
    })
});

//Actualizar producto
router.put('/:id', (req, res = response) => {
    res.json({
        msg: 'actualizar producto'
    })
});

//Eliminar producto
router.delete('/:id', (req, res = response) => {
    res.json({
        msg: 'eliminar producto'
    })
});

module.exports = router;