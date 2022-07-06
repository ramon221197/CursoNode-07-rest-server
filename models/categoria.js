
const {Schema, model} = require('mongoose');

const CategoriaSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido'],
        unique: true
    },
    estado: {
        type: Boolean,
        default: true,
        required: true
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    }

});


//Utilizamos la funcion "model" de Mongoose para exportar el modelo creado
module.exports = model('Categoria', CategoriaSchema);
//la cadena 'Usuario' es como se va a nombrar al modelo.