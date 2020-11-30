const Product = require('../models/product.model.js');
// Create and save a new Product
/*exports.create = (req, res) => {
 console.log("Creating a product ... soon!");
};*/
// Retrieve and list all Products
exports.findAll = (req, res) => {
 console.log("Listing all products ... soon!");
};
// Get a single Product by its id
exports.findOne = (req, res) => {
 console.log("Getting a particular product ... soon!");
};
// Retrieve and list all Products
exports.findAllStore = (req, res) => {
    console.log("Listing all products for id_store... soon!");
   };
// Create and save a new Product
/*exports.create = (req, res) => {
    // Validate if the request's body is empty
    // (does not include required data)
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Product data can not be empty"
        });
    }

    // Create a new Product with request's data
    
    const product = new Product({
        name: req.body.name,
        content: req.body.content,
        price: req.body.price || 0,
        urlphoto: req.body.urlphoto||"https://c0.klipartz.com/pngpicture/21/312/gratis-png-iconos-de-la-computadora-de-la-camara-thumbnail.png",
        discount: req.body.discount||0,
        idstore: req.body.idstore ||null
    });
    // Save the Product in the database
    product.save()
    .then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong occurred while creating the record."
        });
    });
   };
*/   // Retrieve and list all Products
exports.findAll = (req, res) => {
    Product.find()
    .then(products => {
        res.status(200).send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong occurred while retrieving the records."
        });
    });
   };

// Get a single Product by its id
exports.findOne = (req, res) => {
    /*var token = req.headers['authorization']
    if (!token) {
        res.status(401).send({
        ok: false,
        message: 'Toket inválido'
        })
    }*/

    Product.findById(req.params.id)
    .then(product => {
        if(!product) {
            return res.status(404).send({
                message: "Product not found with id:" + req.params.id
            });
        }
        res.status(200).send(product);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Product not found with id:" + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong ocurred while retrieving the record with id:"+ req.params.id
        });
    });
};     
// Retrieve and list all Products for id_store
exports.findAllStore = (req, res) => {

    Product.find({ idstore: req.params.id})
    .then(products => {
        res.status(200).send(products);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong occurred while retrieving the records."
        });
    });
   };