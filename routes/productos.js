//Importacion de los paquetes
const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT, tieneRole, esAdminRole } = require("../middlewares");

const validarCampos = require("../middlewares/validar-campos");

const {
    crearProducto,
    obtenerProductos,
    obtenerProducto,
    actualizarProducto,
    borrarProducto
    } = require('../controllers/productos');
const { existeCategoriaPorId, existeProductoPorId } = require("../helpers/db-validators");

//PARA CREAR LAS RUTAS
const router = Router();

//Obtener todas los productos- paginado - publico
router.get('/', obtenerProductos);

// Obtener un producto por ID - publico
router.get("/:id", [
    check('id', 'No es un ID de Mongo valido').isMongoId(),//el ID que se pone en la ruta debe ser un ID de mongo
    check('id').custom( existeProductoPorId ), //no existe el id en la BD
    validarCampos, //Para que no continue ejecutando el controlador si existe error en los middlewares
  ], 
obtenerProducto);


//crear producto - privado - cualquier pesona con un token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('categoria', 'No es un ID de Mongo valido').isMongoId(),//el ID que se pone en la ruta debe ser un ID de mongo
    check('categoria').custom( existeCategoriaPorId ),//verificar si existe la categoria en la DB
    validarCampos
  ], 
crearProducto);

//Actualizar - privado - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    // check('categoria', 'No es un ID de Mongo valido').isMongoId(),//el ID que se pone en la ruta debe ser un ID de mongo
    check('id').custom( existeProductoPorId  ), //no existe el id en la BD
    validarCampos
  ], 
actualizarProducto);

//Borrar una categoria - privado - cualquiera con token valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),//el ID que se pone en la ruta debe ser un ID de mongo
    check('id').custom( existeProductoPorId ), //checar que exista en la base de datos
    validarCampos //Para que no continue ejecutando el controlador si existe error en los middlewares
], 
borrarProducto);

module.exports = router;