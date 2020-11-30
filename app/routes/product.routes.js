module.exports = (app) => {
    const products = require('../controllers/product.controller.js');
    // Create a new Product 
    //eliminar lineas -----------------------------------------------
    //app.post('/products', products.create);
    //--------------------------------------------------------------
    // List all Products
    app.get('/products', products.findAll);
    // Get a single Product by id
    app.get('/product/:id', products.findOne);
    // Get a all Product by id
    app.get('/products/:id', products.findAllStore);
   }
   