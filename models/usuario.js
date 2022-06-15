// Importaciones necesarias
const { Schema, model } = require('mongoose');

//Creacion del esquema del Usuario (tabla usuario)
const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es requerido']
    },
    corre: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true //para evitar correo duplicados
    },
    password: {
        type: String,
        required: [true, 'La contraseña es requerida']
    },
    img: {
        type: String //para almacenar URL de la img
    },
    rol: {
        type: String,
        required: [true, 'El rol es requerido'],
        enum: ['ADMIN_ROLE', 'USER_ROLE'] //estos son los usuarios que se van a permitir
    },
    estado: {
        type: Boolean,
        default: true //cuando se cree el usuario por defecto estara activado
    },
    google: { //para verificar si el usuario se autentico por guenta de google o por autenticacion del sistema
        type: Boolean,
        default: false
    }

});


//Utilizamo la funcion "model" de Mongoose para exportar el modelo creado
module.exports = model('Usuario', UsuarioSchema);
//la cadena 'Usuario' es como se va a nombrar al modelo.