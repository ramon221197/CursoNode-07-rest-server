//IMPORTACIONES
const {validationResult} = require('express-validator');


const validarCampos = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) { //si existen errores, retorna un status de error con errores encontrados por express-validators
    return res.status(400).json(errors);
  }

  next();
};

module.exports = validarCampos;
