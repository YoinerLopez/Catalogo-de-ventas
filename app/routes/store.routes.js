module.exports = (app) => {
    const store = require('../controllers/store.controller.js');
    //Create a store
    //app.post('/store', store.create);
    // List all stores
    app.get('/store', store.findAll);
    // Get a single store by id
    app.get('/store/:id', store.findOne);
   }