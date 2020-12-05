const routeprivate = require('../../helper/validation.auth');
module.exports = (app) => {
    const clients = require('../controllers/client.controller.js');
    // Create a new sesion
    app.post('/register', clients.register);
    // Create a new client 
    app.post('/login',clients.login);
    // Update a client by id
    app.put('/clients/:id',routeprivate, clients.update);
    app.put('/clients/:id/password',routeprivate, clients.updatePassword);
    app.get('/clients/:id',routeprivate,clients.findOne)
    app.get('/clients',routeprivate,clients.findAll);
   };