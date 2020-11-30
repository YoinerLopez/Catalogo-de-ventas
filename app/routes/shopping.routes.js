const routeprivate = require('../../helper/validation.auth');
module.exports = (app) => {
    const shopping = require('../controllers/shopping.controller.js');
    // Create a new sphopping
    app.post('/shopping/',routeprivate, shopping.create);
    // List all shopping by  id_client
    app.get('/shopping/:id', routeprivate,shopping.findAll);
    // Get a single shopping by id_client
    app.get('/shopping/user/:id', routeprivate,shopping.findOne);
    // Update a Product by id
    //app.put('/shopping/:id', routeprivate,shopping.update);
   };