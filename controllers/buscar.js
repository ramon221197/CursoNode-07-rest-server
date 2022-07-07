const { response } = require("express");

const buscar = (req, resp = response) => {

    resp.json({
        msg: 'Buscar...'
    });

}

module.exports = {
    buscar
}