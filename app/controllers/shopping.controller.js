const Shopping = require('../models/shopping.model.js');
// Create and save a new Shopping
exports.create = (req, res) => {
 console.log("Creating a Shopping ... soon!");
};
// Retrieve and list all Shopping with idclient
exports.findAll = (req, res) => {
 console.log("Listing all Shoppings ... soon!");
};
// Get a single Shopping by its id
exports.findOne = (req, res) => {
 console.log("Getting a particular Shopping ... soon!");
};
exports.uppdate=(req,res)=>{
console.log("update a Shopping ... soon!");
}
// Create and save a new Shopping
exports.create = (req, res) => {
    // Validate if the request's body is empty
    // (does not include required data)
    if(Object.keys(req.body).length === 0) {
        return res.status(400).send({
            message: "Shopping data can not be empty"
        });
    }

    // Create a new Shopping with request's data
    
    const shopping = new Shopping({
        idclient: req.body.idclient,
        idproducts: req.body.idproducts,
        quantities: req.body.quantities,
        resulted: req.body.resulted|| -1,
        status: req.body.status || "solicitada"
    });
    // Save the Shopping in the database
    shopping.save()
    .then(data => {
        res.status(200).send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong occurred while creating the record."
        });
    });
   };

// Get a single Shopping by its id
exports.findOne = (req, res) => {
    Shopping.findById(req.params.id)
    .then(Shopping => {
        if(!Shopping) {
            return res.status(404).send({
                message: "Shopping not found with id:" + req.params.id
            });
        }
        res.status(200).send(Shopping);
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Shopping not found with id:" + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong ocurred while retrieving the record with id:"+ req.params.id
        });
    });
};     
// Retrieve and list all Shoppings for id_store
exports.findAll = (req, res) => {

    Shopping.find({ idclient: req.params.id})
    .then(Shoppings => {
        res.status(200).send(Shoppings);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Something wrong occurred while retrieving the records."
        });
    });
   };

exports.update= (req, res) => {
    Shopping.findByIdAndUpdate(req.params.id, {
        status: req.body.status
    }, { new: true }).then(shopping => {
        if(!shopping) {
            return res.status(404).send({
                message: "client not found with id:" + req.params.id
            });
        }
        res.status(200).send(shopping);
        }).catch(err => {
            if(err.kind === 'ObjectId') {
                return res.status(404).send({
                    message: "client not found with id:" + req.params.id
                });
            }
            return res.status(500).send({
                message: "Something wrong ocurred while updating the record with id:" + req.params.id
            });
        });
};