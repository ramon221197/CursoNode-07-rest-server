//Importaciones necesarias
const mongoose = require('mongoose');


//Conexion a la base de datos
const dbConnection = async() => {

    try {
        //Conexion a MongoDB
        await mongoose.connect(process.env.MONGODB_CNN);

        console.log('Base de datos online..');
        
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar la base de datos..');
    }
}



//exportacion para utilizarla en otros archivos
module.exports = {
    dbConnection,
}