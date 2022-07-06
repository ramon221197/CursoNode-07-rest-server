
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

//Para sobre escribir el metodo json (la funcion para imprimir lo que se desea insertar)
CategoriaSchema.methods.toJSON = function(){
    //... es el operador rest, para sacar __v y password del objeto
    const { __v, estado, ...categoria } = this.toObject(); //los ... es para almacenar el resto de las propiedades del objeto en la variable categoria ()...categoria)
    return categoria;//retorna usuario sin el valor de password y __v
}




//Utilizamos la funcion "model" de Mongoose para exportar el modelo creado
module.exports = model('Categoria', CategoriaSchema);
//la cadena 'Usuario' es como se va a nombrar al modelo.