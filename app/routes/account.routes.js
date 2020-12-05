const routeprivate = require('../../helper/validation.auth');

module.exports = (app) => {
    const account = require('../controllers/account.controller.js');
    app.get('/account/',routeprivate,account.findAll);
    // Get a single account by id_client
    app.get('/account/:id', routeprivate,account.findOne);
    // Update a account by id
    app.put('/account/:id', routeprivate,account.update);
   }