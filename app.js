//Importacion de dependencias
const express = require('express')
require('dotenv').config();


//Uso de EXPRESS
const app = express();
const port = process.env.PORT;


app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
    console.log(`Servidor corriendo en el puetto ${port}`);
    
});