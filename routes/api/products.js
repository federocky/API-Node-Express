const express = require('express');
const uuid = require('uuid');

const router = express.Router();

const products = require('../../product-list');


//devolvemos todos los productos
router.get('/', (req,res) => {

    // devuelve los products en formato json
    res.json(products);

});


//devolvemos producto seleccionado.
router.get('/:id', (req, res) => {

    ///recogemos el parametro
    const id = parseInt(req.params.id);

    // comprbamos si el id pasado es correcto
    const found = products.some( member => member.id === id);

    //si lo encontramos
    if( found ) {

        //almaceno el valor buscado
        const elem = products.filter( member => member.id === id );

        //devuelvo la respuesta
        res.status(200).json( {ok: true, data: elem});

    } else {

        //en caso de no encontrarlo damos la respuesta pertinente
        res.status(404).json( { ok: false, msg: 'Product not found'} );
    }

});



//creamos un producto
router.post('/', (req, res) => {

    

    ///variable temporal  
    const newProduct = {
        id:     uuid.v4(),
        name:   req.body.name,
        price:  req.body.price,
        amount: req.body.amount = 0
    };

    //compronbamos que se envien todos los campos
    if ( !newProduct.name || !newProduct.price ) {
        return res.status(400).json( { ok:false, msg:'Name and Price Required' });
    }

    //agregamos el producto
    products.push(newProduct);

    //damos la respuesta positiva y enviamos todos los productos.
    res.status(200).json( { ok: true, data: products} );


});



///actualizar un producto
router.put('/:id', (req, res) => {

    //recibimos el id por parametro
    const id = parseInt(req.params.id);

    //comprobamos si existe el id
    const found = products.some( product => product.id === id);

    if( found ){

        //recibimos los data
        const updatedProduct = req.body;

        //buscamos nuestro producto
        products.forEach( product => {

            //cuando encontramos el producto actualizamos los datos.
            if( product.id === id) {
                product.name = ( updatedProduct.name )   ? updatedProduct.name : product.name;
                product.price = (updatedProduct.price)   ? updatedProduct.price : product.price;
                product.amount = (updatedProduct.amount) ? updatedProduct.amount : product.amount;

                //devolvemos la respuesta y mostramos los productos
                return res.status(200).json( { ok: true, msg: 'Product Updated', data: products})
            }

        });

    } else {

        //si no encontramos el producto
        res.status(404).json( { ok:false, msg: 'Product not found' } );
    }

});


//eliminamos un producto
router.delete('/:id', (req, res) => {

    //recibimos el id por parametro.
    const id = parseInt(req.params.id);

    //buscamos el producto
    const found = products.some( product => product.id === id );

    if ( found ){

        //si encontramos el producto damos respuesta afirmativa con el array filtrado.
        res.status(200)
            .json( 
                { 
                    ok: true, 
                    msg: 'Product deleted', 
                    data: products.filter( product => product.id !== id )
                });

    } else {

        //si no encontramos el producto damos la respuesta necesaria.
        res.status(404).json( { ok:false, msg: 'Product not Found'} );
    }


});


// Module exports 
module.exports = router;