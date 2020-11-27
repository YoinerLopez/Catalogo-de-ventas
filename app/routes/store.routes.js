module.exports = (app) => {
    const shops = require('../controllers/shop.controller.js');
    // Create a new Shop
    app.post('/shops', shops.create);
    // List all shops
    app.get('/shops', shops.findAll);
    // Get a single shop by id
    app.get('/shop/:id', shops.findOne);
    // Update a shop by id
    app.put('/shops/:id', shops.update);
    // Delete a shop by id
    app.delete('/shops/:id', shops.delete);
   }