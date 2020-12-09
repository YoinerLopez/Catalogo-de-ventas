const Shopping = require('../models/shopping.model.js');
const Product = require('../models/product.model.js');
const AccountController = require('../controllers/account.controller');
const productsController = require('../controllers/product.controller.js');
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
function getPrice(product){
    const price =(product.price-((product.price*product.discount)/100)).toFixed(2);
    console.log('price '+price+ ' descuento '+product.discount)
    return Number(price);
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
    var resultado=0;
    // Create a new Shopping with request's data
    if(req.body.idproducts!=undefined){
        var hola=0;
        const iduser =req.body.idclient;
        for (let index = 0; index < req.body.idproducts.length; index++) {
            const id= req.body.idproducts[index];
            console.log(req.body.idproducts[index]);
            Product.findById(id)
            .then(data => {
                if(!data) {
                    console.log(id);
                }else{
                    
                    resultado+= Number(getPrice(data))*req.body.quantities[index];
                    hola+=1;
                    if((hola)==req.body.idproducts.length){
                        
                        const shopping = new Shopping({
                            idclient: req.body.idclient,
                            idproducts: req.body.idproducts,
                            quantities: req.body.quantities,
                            resulted:resultado,
                            status: req.body.status || "solicitada"
                        });
                        // Save the Shopping in the database
                        shopping.save()
                        .then(info => {
                            //subir dinero a la cuenta
                            upAccount(iduser,resultado);
                            return res.status(200).send(info);
                        }).catch(err => {
                            return res.status(500).send({
                                message: err.message || "Something wrong occurred while creating the record."
                            });
                        });
                    }
                }
                
                
            }).catch(err => {
                console.log(err);
            });
        }
    }else{
        console.log('!!!problemas')
    }
    
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
        }).sort('created', 'descending');
};
exports.findAllShopping = (req, res) => {

    Shopping.findById(req.params.id)
    .then(Shopping => {
        if(!Shopping) {
            return res.status(404).send({
                message: "Shopping not found with id:" + req.params.id
            });
        }
        product = [];
        contador = 0;
        Shopping.idproducts.forEach(element => {
            Product.findById(element)
            .then(products => {
                product.push(products);
                contador=contador+1;
                if(contador===(Shopping.idproducts.length)){
                    res.status(200).send(product);
                }
            }).catch(err => {});
            
        });
    }).catch(err => {
        if(err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "Shopping not found with id:" + req.params.id
            });
        }
        return res.status(500).send({
            message: "Something wrong ocurred while retrieving the record with id:"+ req.params.id +" "+err
        });
    });

    
   };
function upAccount(id,money){
    AccountController.update(id,money);
}