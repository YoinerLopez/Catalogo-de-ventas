const Store = require('../models/store.model.js');
/**
 * findALL
 * findOne
 */
// Retrieve and list all store
/*exports.create = (req, res) => {
    console.log("Listing create stores ... soon!");
   };*/
// Retrieve and list all store
exports.findAll = (req, res) => {
    console.log("Listing all store ... soon!");
   };
// Get a single store by its id
exports.findOne = (req, res) => {
    console.log("Getting a particular store ... soon!");
   };
// Retrieve and list all stores
exports.findAll = (req, res) => {
    Store.find()
    .then(stores => {
        res.status(200).send(stores);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong occurred while retrieving the records."
        });
    });
   };

// Get a single store by its id
exports.findOne = (req, res) => {
    Store.findById(req.params.id)
    .then(store => {
        if(!store) {
            return res.status(404).send({
                message: "store not found with id:" + req.params.id
            });
        }
        res.status(200).send(store);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "store not found with id:" + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong ocurred while retrieving the record with id:"+ req.params.id
        });
    });
};
/*
exports.create = (req, res) => {
    // Validate if the request's body is empty
    // (does not include required data)
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "store data can not be empty"
        });
    }
    // Create a new store with request's data
    const store = new Store({
        name: req.body.name,
        content: req.body.content,
        nit: req.body.nit|| null,
        address:req.body.address || null, 
        phone: req.body.phone || null,
        idstore: req.body.idstore||null,
    });
    // Save the store in the database
    store.save()
    .then(data => {
        res.status(200).send(data);
    }).catch(err => {
        
        res.status(500).send({
            message: err.message || "Something wrong occurred while creating the record."
        });
    });
   };
   */