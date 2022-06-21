
const {Schema, model} = require('mongoose');

const RoleSchema = Schema({
    rol: {
        type: String,
        required: [true, 'El role es requerido']
    }
});


//Utilizamos la funcion "model" de Mongoose para exportar el modelo creado
module.exports = model('Role', RoleSchema);
//la cadena 'Usuario' es como se va a nombrar al modelo.