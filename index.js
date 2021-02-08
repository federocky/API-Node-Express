const express = require('express');
const path = require('path');

const app = express();

// para poder recibir parametros en el body
app.use( express.json() );      
// para recibir formularios
app.use( express.urlencoded({ extended: false }) );  

//asignamos un puerto
const PORT = process.env.PORT || 3000;

//guardamos la ruta en una variable.
const productsRoutes = require('./routes/api/products');

//cuando se entre a /api/products, lo manejamos desde el otro fichero
app.use( '/api/products', productsRoutes);


// lo hacemos para probar si funciona antes de seguir
app.get('/', (req,res) => {
    
     res.send('<h1>Hello World</h1>');

});

//lo ponemos a la escucha.
app.listen(PORT, ()  => {
    console.log( `Server Started on port ${PORT}`);
});