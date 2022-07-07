//Importacion de los paquetes
const { Router } = require("express");
const { buscar } = require("../controllers/buscar");


//PARA CREAR LAS RUTAS
const router = Router();


router.get('/:coleccion/:termino', buscar)


module.exports = router;