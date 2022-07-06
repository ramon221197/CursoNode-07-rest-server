
const {Schema, model} = require('mongoose');

const ProductoSchema = Schema({
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
    },
    precio: {
        type: Number,
        default: 0
    },
    categoria: {
        type: Schema.Types.ObjectId,
        ref: 'Categoria',
        required: true
    },
    descripcion: {
        type: String
    },
    disponible: {
        type: Boolean,
        default: true
    }

});

//Para sobre escribir el metodo json (la funcion para imprimir lo que se desea insertar)
ProductoSchema.methods.toJSON = function(){
    //... es el operador rest, para sacar __v y password del objeto
    const { __v, estado, ...data } = this.toObject(); //los ... es para almacenar el resto de las propiedades del objeto en la variable categoria ()...categoria)
    return data;//retorna usuario sin el valor de password y __v
}




//Utilizamos la funcion "model" de Mongoose para exportar el modelo creado
module.exports = model('Producto', ProductoSchema);
//la cadena 'Usuario' es como se va a nombrar al modelo.