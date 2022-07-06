//Importacion de los paquetes
const { Router } = require("express");
const { check } = require("express-validator");
const { validarJWT, tieneRole, esAdminRole } = require("../middlewares");

const validarCampos = require("../middlewares/validar-campos");

const {
    crearCategoria,
    obtenerCategorias,
    obtenerCategoria,
    actualizarCategoria,
    borrarCategoria
    } = require('../controllers/categorias');
const { existeCategoriaPorId } = require("../helpers/db-validators");

//PARA CREAR LAS RUTAS
const router = Router();

//Obtener todas las categorias- paginado - publico
router.get('/', obtenerCategorias);

// Obtener una categoria por ID - publico
router.get("/:id", [
    check('id', 'No es un ID de Mongo valido').isMongoId(),//el ID que se pone en la ruta debe ser un ID de mongo
    check('id').custom( existeCategoriaPorId ), //no existe el id en la BD
    validarCampos, //Para que no continue ejecutando el controlador si existe error en los middlewares
  ], 
obtenerCategoria);


//crear categoria - privado - cualquier pesona con un token valido
router.post('/', [
    validarJWT,
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    validarCampos
  ], 
crearCategoria);

//Actualizar - privado - cualquiera con token valido
router.put('/:id',[
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),//el ID que se pone en la ruta debe ser un ID de mongo
    check('id').custom( existeCategoriaPorId  ), //no existe el id en la BD
    validarCampos
  ], 
actualizarCategoria);

//Borrar una categoria - privado - cualquiera con token valido
router.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'No es un ID valido').isMongoId(),//el ID que se pone en la ruta debe ser un ID de mongo
    check('id').custom( existeCategoriaPorId ), //checar que exista en la base de datos
    validarCampos //Para que no continue ejecutando el controlador si existe error en los middlewares
], 
borrarCategoria);

module.exports = router;