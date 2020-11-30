module.exports = (app) => {
    const account = require('../controllers/account.controller.js');
    app.get('/account/',account.findAll);
    // Get a single account by id_client
    app.get('/account/:id', account.findOne);
    // Update a account by id
    app.put('/account/:id', account.update);
   }