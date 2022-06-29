const validaCampos = require("../middlewares/validar-campos");
const validaJWT  = require("../middlewares/validar-JWT");
const validaRole = require("../middlewares/validar-roles");


module.exports = {
    ...validaCampos,
    ...validaJWT,
    ...validaRole
}